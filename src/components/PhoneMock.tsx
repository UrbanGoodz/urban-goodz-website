import { Icon } from './icons'

const chips = ['Restaurants', 'Groceries', 'Retail', 'Fashion Fit', 'Services']
const orders = [
  { emoji: '🍔', name: "Angela's Kitchen", eta: '18 min', tag: 'Marketplace' },
  { emoji: '👟', name: 'FitFind Boutique', eta: 'AI Size · 8', tag: 'Fashion Fit' },
  { emoji: '💊', name: 'Corner Pharmacy', eta: '24 min', tag: 'Medical' },
]

export function PhoneMock({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' }) {
  return (
    <div className={`relative mx-auto ${size === 'md' ? 'w-[280px] sm:w-[300px]' : 'w-[230px] sm:w-[250px]'} ${className}`} aria-hidden="true">
      {/* glow */}
      <div className="absolute -inset-8 rounded-[3.5rem] bg-seasoning/25 blur-3xl" />

      <div className="relative rounded-[2.75rem] border-[6px] border-ug-black bg-ink-800 p-2 shadow-lift">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-paper">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-semibold text-ug-black/80">
            <span>9:41</span>
            <span className="h-4 w-20 rounded-full bg-ug-black" />
            <span className="flex items-center gap-1">
              <span className="inline-block size-2 rounded-full bg-seasoning" />
              <span>5G</span>
            </span>
          </div>

          {/* app header */}
          <div className="flex items-center justify-between px-5 pt-3">
            <div>
              <p className="text-[10px] text-ug-black/55">Deliver to</p>
              <p className="flex items-center gap-1 text-[11px] font-bold text-ug-black">
                <Icon name="map-pin" size={11} className="text-seasoning" />
                Houston, TX
              </p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-full grad-seasoning text-ug-black">
              <Icon name="bag" size={14} />
            </div>
          </div>

          {/* search */}
          <div className="mx-4 mt-3 flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
            <Icon name="search" size={13} className="text-ug-black/50" />
            <span className="text-[10px] text-ug-black/45">Search local everything…</span>
            <span className="ml-auto rounded-full bg-seasoning/15 px-1.5 py-0.5 text-[8px] font-bold text-seasoning-600">
              AI
            </span>
          </div>

          {/* category chips */}
          <div className="mt-3 flex gap-1.5 overflow-hidden px-4">
            {chips.map((c) => (
              <span
                key={c}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                  c === 'Restaurants' ? 'bg-ug-black text-ink-on-dark' : 'bg-sand text-ug-black/70'
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* orders */}
          <div className="space-y-2 px-4 pb-3 pt-3">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-bold text-ug-black">Nearby for you</p>
              <p className="text-[9px] font-semibold text-seasoning-600">See all</p>
            </div>
            {orders.map((o, i) => (
              <div
                key={o.name}
                className={`flex items-center gap-2.5 rounded-2xl border border-line bg-white p-2 ${
                  i === 1 ? 'shadow-halo' : ''
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl grad-canvas text-lg">
                  {o.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-bold text-ug-black">{o.name}</p>
                  <p className="text-[8.5px] text-ug-black/50">{o.tag}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-ug-black">{o.eta}</p>
                  {i === 1 && (
                    <p className="flex items-center gap-0.5 text-[7.5px] font-semibold text-seasoning-600">
                      <Icon name="spark" size={8} /> AI match
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* delivery pill */}
          <div className="mx-4 mb-3 flex items-center gap-2 rounded-2xl bg-ug-black p-2.5 text-ink-on-dark">
            <span className="relative grid size-8 place-items-center rounded-full bg-seasoning text-ug-black">
              <span className="absolute inset-0 rounded-full bg-seasoning/60 animate-ping" />
              <Icon name="drivers" size={15} />
            </span>
            <div className="flex-1">
              <p className="text-[9px] font-bold">Marcus is on the way</p>
              <p className="text-[8px] text-mute-on-dark">Route optimized · 12 min · live</p>
            </div>
            <Icon name="routes" size={15} className="text-seasoning-300" />
          </div>

          {/* bottom nav */}
          <div className="flex items-center justify-around border-t border-line bg-white/80 px-4 py-2.5 text-ug-black/50">
            <Icon name="market" size={15} className="text-seasoning-600" />
            <Icon name="search" size={15} />
            <span className="grid size-8 place-items-center rounded-full grad-seasoning text-ug-black">
              <Icon name="bag" size={13} />
            </span>
            <Icon name="spark" size={15} />
            <Icon name="community" size={15} />
          </div>
        </div>
      </div>
    </div>
  )
}
