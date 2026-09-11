// HIWI monogram: two upright bars bridged by an angled "live wire" crossbar.
// Bars inherit currentColor so the mark works on dark and light grounds.
const Monogram = ({ size = 28, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    className={className}
    aria-hidden="true"
  >
    <rect x="10" y="6" width="9" height="52" fill="currentColor" />
    <rect x="45" y="6" width="9" height="52" fill="currentColor" />
    <path d="M19 38 L45 24 L45 33 L19 47 Z" fill="#C7FF3D" />
  </svg>
);

export default Monogram;
