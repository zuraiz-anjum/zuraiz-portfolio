export const PROJECT_GRADIENTS = [
  "from-violet/55 via-background to-cyan/40",
  "from-cyan/45 via-background to-pink/40",
  "from-pink/45 via-background to-violet/50",
  "from-violet/40 via-background to-pink/30",
];

export function projectGradient(index: number) {
  return PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length];
}
