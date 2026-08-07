export function PhotoCard({
  src,
  alt,
  tag,
  title,
  sub,
  ratio = 'aspect-[4/3]',
  className = '',
  tone = 'dark',
}: {
  src: string
  alt: string
  tag?: string
  title?: string
  sub?: string
  ratio?: string
  className?: string
  tone?: 'dark' | 'orange'
}) {
  return (
    <figure className={`lift group relative overflow-hidden rounded-3xl border border-line bg-ink-800 shadow-card ${ratio} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${tone === 'dark' ? 'bg-gradient-to-t from-ug-black/95 via-ug-black/50 to-ug-black/10' : 'bg-gradient-to-t from-ug-black/80 via-ug-black/20 to-transparent'}`}
      />
      {(title || tag) && (
        <figcaption className="absolute inset-x-0 bottom-0 p-5">
          {tag && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-seasoning px-2.5 py-1 text-[11px] font-bold text-ug-black">
              {tag}
            </span>
          )}
          {title && <p className="mt-2 font-display text-lg font-bold text-white">{title}</p>}
          {sub && <p className="mt-1 text-sm text-white/75">{sub}</p>}
        </figcaption>
      )}
    </figure>
  )
}
