import exatomLogo from "@/assets/exatom-logo.svg";

interface LogoProps {
  className?: string;
  maxWidth?: string;
  opacity?: boolean;
  onClick?: () => void;
}

const Logo = ({ className = "", maxWidth = "96px", opacity = false, onClick }: LogoProps) => {
  return (
    <div
      className={`inline-flex items-center gap-2 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <img
        src={exatomLogo}
        alt="Exatom"
        style={{ maxWidth }}
        className={opacity ? "opacity-60" : ""}
      />
      <span className="text-[10px] font-semibold tracking-widest uppercase bg-gray-100 text-black px-1.5 py-0.5 rounded">
        v2
      </span>
    </div>
  );
};

export default Logo;
