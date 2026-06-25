interface ArtifactSlotProps {
  label?: string;
  accentColor: string;
  className?: string;
  imageUrl?: string;
}

export default function ArtifactSlot({
  label = 'ARTIFACT_IMG_01 // RAW_CAPTURE',
  accentColor,
  className = '',
  imageUrl,
}: ArtifactSlotProps) {
  return (
    <div
      className={`relative group overflow-hidden ${className}`}
      style={{ border: `1px solid ${accentColor}` }}
    >
      {/* Terminal label */}
      <span
        className="absolute top-3 left-4 font-mono text-[10px] tracking-[0.15em] uppercase z-20 bg-[#050505]/90 px-2 py-0.5 backdrop-blur-sm"
        style={{ color: accentColor }}
      >
        {label}
      </span>

      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l z-20" style={{ borderColor: accentColor }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r z-20" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l z-20" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r z-20" style={{ borderColor: accentColor }} />

      {/* Hover scanline */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
        }}
      />

      {/* Image or Placeholder */}
      <div className="w-full h-80 md:h-[450px] bg-zinc-900/80 flex flex-col items-center justify-center gap-3 text-neutral-600 font-mono relative">
        {imageUrl ? (
          <img src={`/${imageUrl}`} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs tracking-[0.15em] uppercase">AWAITING_ASSET_LOAD</span>
          </>
        )}
      </div>
    </div>
  );
}

