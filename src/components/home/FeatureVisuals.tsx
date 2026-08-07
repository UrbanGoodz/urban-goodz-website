import { Icon } from '../icons'

function Shell({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="lift overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line bg-cream/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-seasoning/60" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-dijon/70" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-canvas-400/70" aria-hidden="true" />
        </div>
        <p className={`text-xs font-semibold ${accent}`}>{title}</p>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-ug-black/50">
          <Icon name="spark" size={13} className="text-seasoning" /> Live
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function MarketplaceVisual() {
  return (
    <Shell title="urbangoodz.market" accent="text-seasoning-600">
      <div className="flex items-center gap-2 rounded-full border border-line bg-sand/50 px-3 py-2 transition-colors hover:border-seasoning/40">
        <Icon name="search" size={13} className="text-ug-black/50" />
        <span className="text-xs text-ug-black/50">Search everything local…</span>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-seasoning/15 px-2 py-0.5 text-[10px] font-bold text-seasoning-600">
          <span className="size-1 rounded-full bg-seasoning animate-ping" /> Ebony AI
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { t: 'Angela’s Kitchen', tag: 'Restaurant', e: '🍔' },
          { t: 'FitFind Boutique', tag: 'Fashion', e: '👟' },
          { t: 'Harvest Grocer', tag: 'Groceries', e: '🥦' },
          { t: 'Sole Station', tag: 'Retail', e: '🧢' },
          { t: 'Bright Smile', tag: 'Services', e: '😁' },
          { t: 'Corner Rx', tag: 'Medical', e: '💊' },
        ].map((s) => (
          <div
            key={s.t}
            className="group cursor-pointer rounded-2xl border border-line bg-paper p-3 transition-all duration-300 hover:-translate-y-1 hover:border-seasoning/40 hover:shadow-card"
          >
            <span className="grid size-8 place-items-center rounded-xl grad-canvas text-base transition-transform duration-300 group-hover:scale-110">
              {s.e}
            </span>
            <p className="mt-2 truncate text-[11px] font-bold text-ug-black">{s.t}</p>
            <p className="text-[10px] text-ug-black/50">{s.tag}</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function FashionVisual() {
  return (
    <Shell title="Fashion Fit · AI Stylist" accent="text-seasoning-600">
      <div className="flex items-center gap-4">
        <div className="relative grid h-48 w-32 shrink-0 place-items-center rounded-2xl grad-canvas group cursor-pointer overflow-hidden border border-line">
          <svg viewBox="0 0 80 160" className="h-40 w-auto transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
            <circle cx="40" cy="18" r="12" fill="#161616" opacity="0.85" />
            <path
              d="M40 30c-14 0-22 10-26 26l-6 14 10 4 4-10 2 78 16-4 2-64 2 64 16 4 4-78 4 10 10-4-6-14c-4-16-12-26-26-26Z"
              fill="#161616"
              opacity="0.85"
            />
            <path
              d="M18 62h44M20 92h40M16 116h48"
              stroke="#ED9914"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
              className="animate-route-dash"
            />
            <text x="2" y="60" fontSize="7" fill="#c97e0a" fontWeight="bold">Bust</text>
            <text x="2" y="90" fontSize="7" fill="#c97e0a" fontWeight="bold">Waist</text>
            <text x="2" y="114" fontSize="7" fill="#c97e0a" fontWeight="bold">Hip</text>
          </svg>
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-ug-black px-2 py-0.5 text-[9px] font-bold text-dijon shadow-sm">
            <Icon name="spark" size={9} /> Fits: 8
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-ug-black">Ebony Predicted Size</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-4xl font-bold text-grad-dark">8</span>
            <span className="pb-1 text-xs font-medium text-ug-black/60">for this brand</span>
          </div>
          <div className="mt-4 space-y-2">
            {[
              ['Bust', '35.4″', 78],
              ['Waist', '27.9″', 62],
              ['Hip', '38.6″', 85],
            ].map(([k, v, w]) => (
              <div key={k as string} className="group">
                <div className="flex justify-between text-[10px] font-semibold text-ug-black/65">
                  <span>{k}</span>
                  <span className="text-seasoning-600">{v}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sand">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-seasoning to-dijon transition-all duration-500 group-hover:brightness-110"
                    style={{ width: `${w}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
}

export function MedicalVisual() {
  return (
    <Shell title="Medical Courier · Chain of custody" accent="text-seasoning-600">
      <div className="flex items-center gap-3 rounded-2xl bg-ug-black p-4 text-ink-on-dark shadow-card">
        <span className="grid size-10 place-items-center rounded-xl bg-seasoning text-ug-black shrink-0">
          <Icon name="medical" size={20} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Specimen #H-4821</p>
          <p className="text-xs text-mute-on-dark">Corner Pharmacy → UT Health Lab</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-seasoning/20 px-2.5 py-1 text-[10px] font-bold text-seasoning-300">
          <span className="size-1.5 rounded-full bg-seasoning animate-ping" /> Delivered
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {[
          ['Collected', '09:12 AM · secure seal', true],
          ['In transit', 'Temperature 4.1°C · monitored', true],
          ['Verified handoff', 'Signature + scan verified', true],
        ].map(([t, d, done]) => (
          <div key={t as string} className="flex items-start gap-3 group">
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:scale-110 ${
                done ? 'bg-seasoning text-ug-black' : 'bg-sand text-ug-black/40'
              }`}
            >
              <Icon name="check" size={12} />
            </span>
            <div>
              <p className="text-xs font-bold text-ug-black">{t}</p>
              <p className="text-[10px] text-ug-black/55">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function BusinessVisual() {
  const bars = [34, 48, 42, 58, 66, 54, 78]
  return (
    <Shell title="Business Portal · Skylar Operations" accent="text-seasoning-600">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ug-black/55 font-medium">This week’s revenue</p>
          <p className="font-display text-2xl font-bold text-ug-black">$4,820</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-dijon/25 px-2.5 py-1 text-xs font-bold text-seasoning-600">
          <Icon name="arrow-up-right" size={12} /> +18%
        </span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {bars.map((b, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-seasoning-600 to-seasoning transition-all duration-300 hover:scale-y-105 cursor-pointer"
            style={{ height: `${b}%`, opacity: i === 6 ? 1 : 0.55 }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          ['Orders', '214'],
          ['New customers', '38'],
          ['Skylar insights', '12'],
        ].map(([k, v]) => (
          <div key={k as string} className="rounded-xl border border-line bg-paper p-3 transition-colors hover:border-seasoning/40">
            <p className="text-[10px] text-ug-black/55 font-medium">{k}</p>
            <p className="mt-1 font-display text-lg font-bold text-ug-black">{v}</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function AiVisual() {
  return (
    <Shell title="AI Platform · 10 systems online" accent="text-seasoning-600">
      <div className="rounded-2xl bg-ug-black p-4 text-ink-on-dark shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 shrink-0">
            <img src="/images/ai/ebony-avatar.jpg" alt="Ebony" className="size-8 rounded-full object-cover ring-2 ring-seasoning" />
            <img src="/images/ai/skylar-avatar.jpg" alt="Skylar" className="size-8 rounded-full object-cover ring-2 ring-dijon" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              Ebony & Skylar
              <span className="flex items-center gap-1 rounded-full bg-seasoning/20 px-2 py-0.5 text-[10px] font-bold text-seasoning-300">
                <Icon name="spark" size={9} /> Online
              </span>
            </p>
            <p className="text-xs text-mute-on-dark truncate">“Your orders are up 18%. Shift request ready.”</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            'AI Copilot',
            'AI Concierge',
            'Business AI',
            'Shopping AI',
            'Fashion AI',
            'Routing AI',
            'Dispatch AI',
            'Creator AI',
            'Support AI',
          ].map((s) => (
            <span
              key={s}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] font-semibold text-ink-on-dark/90 transition-colors hover:border-seasoning/40 hover:bg-white/10 cursor-default"
            >
              <span className="size-1.5 rounded-full bg-dijon" aria-hidden="true" />
              {s}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs font-medium text-ug-black/60">
        <Icon name="shield" size={13} className="text-seasoning" />
        One AI layer across marketplace, logistics and business tools.
      </p>
    </Shell>
  )
}

export function DriverVisual() {
  return (
    <Shell title="Driver Platform · Marcus" accent="text-seasoning-600">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ug-black/55">This week</p>
          <p className="font-display text-2xl font-bold text-ug-black">$1,240</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-ug-black/60">
          <Icon name="star" size={14} className="text-seasoning" /> 4.9 · 340 trips
        </span>
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-paper p-4">
        <p className="flex items-center gap-2 text-xs font-bold text-ug-black">
          <Icon name="routes" size={14} className="text-seasoning" /> Smart route · 8 stops
        </p>
        <svg viewBox="0 0 280 60" className="mt-2 w-full" aria-hidden="true">
          <path
            d="M10 45 L70 38 L120 50 L170 20 L230 32 L270 12"
            fill="none"
            stroke="#ED9914"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-route-dash"
          />
          {[[10, 45], [70, 38], [120, 50], [170, 20], [230, 32], [270, 12]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 3} fill={i === 0 ? '#ED9914' : '#161616'} />
          ))}
          <text x="10" y="57" fontSize="8" fill="#161616">Start</text>
        </svg>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Scan & deliver', 'Earn fast', 'Keep 100%'].map((t) => (
            <span key={t} className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold text-ug-black/70">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Shell>
  )
}
