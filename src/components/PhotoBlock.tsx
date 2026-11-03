type Props = {
  src?: string
  alt: string
  className?: string
  aspect?: string
  note?: string
  priority?: boolean
  width?: number
  height?: number
}

/** Foto real ou bloco TODO com cor sólida. */
export function PhotoBlock({
  src,
  alt,
  className = '',
  aspect = 'aspect-[4/5]',
  note = 'TODO: foto real',
  priority = false,
  width = 800,
  height = 1000,
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={`${aspect} w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`photo-placeholder ${aspect} w-full relative overflow-hidden ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="relative z-[2] max-w-[12rem] leading-relaxed">{note}</span>
    </div>
  )
}
