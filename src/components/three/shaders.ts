export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;

  varying vec2 vUv;

  // Ashima Arts / Stefan Gustavson simplex noise (public domain)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    vec2 mouseInfluence = (uMouse - 0.5) * vec2(aspect, 1.0) * 0.3;
    p += mouseInfluence * 0.15;

    float t = uTime * 0.045;

    vec2 warpA = vec2(fbm(p * 1.1 + t), fbm(p * 1.1 - t * 0.8));
    vec2 warped = p + warpA * 0.35;
    float n = fbm(warped * 1.6 + t * 0.6);
    float n2 = fbm(warped * 2.4 - t * 0.4 + 4.2);

    float dist = length(p);
    float vignette = smoothstep(1.15, 0.15, dist);

    vec3 bg = vec3(0.027, 0.031, 0.043);
    vec3 violet = vec3(0.655, 0.545, 0.980);
    vec3 cyan = vec3(0.369, 0.918, 0.831);
    vec3 pink = vec3(0.957, 0.447, 0.714);

    float mixA = smoothstep(-0.4, 0.6, n);
    float mixB = smoothstep(0.1, 0.9, n2);

    vec3 color = bg;
    color = mix(color, violet, mixA * 0.55);
    color = mix(color, cyan, mixB * 0.35 * mixA);
    color = mix(color, pink, pow(max(n2 - 0.55, 0.0), 2.0) * 0.6);

    color *= vignette * uIntensity;
    color += bg * (1.0 - vignette);

    float grain = (fract(sin(dot(uv * uResolution.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`;
