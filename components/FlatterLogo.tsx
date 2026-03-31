type FlatterLogoProps = {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
};

export function FlatterLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="28" height="28" rx="6" className="fill-yellow" />
      <g className="fill-dark">
        <ellipse cx="14" cy="9" rx="3.2" ry="4.2" />
        <ellipse cx="14" cy="19" rx="3.2" ry="4.2" />
        <ellipse cx="9" cy="14" rx="4.2" ry="3.2" />
        <ellipse cx="19" cy="14" rx="4.2" ry="3.2" />
      </g>
    </svg>
  );
}

export default function FlatterLogo({
  className = "",
  iconClassName = "",
  wordmarkClassName = "",
}: FlatterLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <FlatterLogoIcon className={`flex-shrink-0 ${iconClassName}`} />
      <span
        className={`font-display font-bold tracking-tight ${wordmarkClassName}`}
      >
        flatter
      </span>
    </div>
  );
}
