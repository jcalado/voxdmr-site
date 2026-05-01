const LOGO_URL = "/logo.png";

const logoSizes = {
  sm: { container: "h-8 w-8 rounded-lg", img: "h-10 w-10" },
  md: { container: "h-10 w-10 lg:h-12 lg:w-12 rounded-xl", img: "h-12 w-12 lg:h-14 lg:w-14" },
  lg: { container: "h-20 w-20 lg:h-24 lg:w-24 rounded-2xl", img: "h-24 w-24 lg:h-28 lg:w-28" },
} as const;

export function Logo({ size = "md", className = "" }: { size?: keyof typeof logoSizes; className?: string }) {
  const s = logoSizes[size];
  return (
    <div className={`${s.container} bg-surface-raised overflow-hidden flex items-center justify-center ${className}`}>
      <img alt="VoxDMR Logo" className={`${s.img} object-cover`} src={LOGO_URL} />
    </div>
  );
}
