import { cn } from "@/lib/utils";

export function GlowPanel({
  children,
  className,
  glow = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "holo-panel rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]",
        glow && "glow-border",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
