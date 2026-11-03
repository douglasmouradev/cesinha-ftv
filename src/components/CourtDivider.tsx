/** Linha de quadra / rede como divisor sutil. */
export function CourtDivider({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-full h-3 text-current ${className}`}
      viewBox="0 0 1200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line className="court-line" x1="0" y1="6" x2="1200" y2="6" />
      <line className="court-line" x1="600" y1="0" x2="600" y2="12" />
      <line className="court-line" x1="200" y1="2" x2="200" y2="10" />
      <line className="court-line" x1="1000" y1="2" x2="1000" y2="10" />
    </svg>
  )
}
