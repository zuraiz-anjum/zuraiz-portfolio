import { forwardRef } from "react";

type BookPageProps = {
  children: React.ReactNode;
  className?: string;
  cover?: boolean;
};

const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ children, className = "", cover = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex h-full w-full flex-col overflow-hidden ${
          cover
            ? "bg-background-raised"
            : "bg-background"
        } ${className}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(167,139,250,0.06),transparent_55%)]" />
        <div className="relative flex h-full flex-col px-8 py-10 sm:px-10 sm:py-12">
          {children}
        </div>
      </div>
    );
  }
);

BookPage.displayName = "BookPage";

export default BookPage;
