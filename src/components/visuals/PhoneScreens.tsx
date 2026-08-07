import { Icon } from '../icons'

const img = (name: string) => `/images/modules/${name}.png`

function StatusBar({ tint = 'dark' }: { tint?: 'dark' | 'light' }) {
  const text = tint === 'dark' ? 'text-ug-black/80' : 'text-white'
  return (
    <div className={`flex items-center justify-between px-5 pt-3 text-[9px] font-semibold ${text}`}>
      <span>9:41</span>
      <span className={`h-4 w-20 rounded-full ${tint === 'dark' ? 'bg-ug-black' : 'bg-white'}`} />
      <span className="flex items-center gap-1">
        <span className="inline-block size-2 rounded-full bg-seasoning" />
        <span>5G</span>
      </span>
    </div>
  )
}

function HomeBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-center pb-2 pt-1 ${dark ? 'bg-ink-800' : 'bg-white/85'}`}>
      <span className={`h-1 w-16 rounded-full ${dark ? 'bg-white/30' : 'bg-ug-black/30'}`} />
    </div>
  )
}

export function PhoneFrame({
  children,
  className = '',
  screenBg = 'bg-paper',
}: {
  children: React.ReactNode
  className?: string
  screenBg?: string
}) {
  return (
    <div className={`relative mx-auto w-[280px] sm:w-[300px] ${className}`} aria-hidden="true">
      <div className="absolute -inset-8 rounded-[3.5rem] bg-seasoning/25 blur-3xl" />
      <div className="relative rounded-[2.75rem] border-[6px] border-ug-black bg-ink-800 p-2 shadow-lift">
        <div className={`relative overflow-hidden rounded-[2.25rem] ${screenBg}`}>
          <StatusBar />
          {children}
          <HomeBar />
        </div>
      </div>
    </div>
  )
}

function ScreenTitle({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-3">
      <div>{left}</div>
      {right}
    </div>
  )
}

export function ScreenWallet() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">Wallet</p>
            <p className="text-[11px] font-bold text-ug-black">$482.10 balance</p>
          </div>
        }
        right={
          <span className="grid size-8 place-items-center rounded-full grad-seasoning text-ug-black">
            <Icon name="bag" size={14} />
          </span>
        }
      />
      <div className="mx-4 mt-3 rounded-2xl bg-ug-black p-4 text-white">
        <p className="text-[9px] text-white/55">This week’s earnings</p>
        <p className="mt-0.5 font-display text-2xl font-bold text-seasoning-300">$284.00</p>
        <div className="mt-2 flex items-center gap-1 text-[8.5px] font-semibold text-dijon">
          <Icon name="arrow-up-right" size={9} /> +$42 vs last week
        </div>
        <div className="mt-3 flex h-8 items-end gap-1">
          {[40, 62, 48, 74, 55, 88, 70].map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-seasoning-600 to-seasoning" style={{ height: `${b}%`, opacity: i === 5 ? 1 : 0.55 }} />
          ))}
        </div>
      </div>
      <p className="px-5 pb-1 pt-3 text-[10px] font-bold text-ug-black">Recent</p>
      <div className="space-y-2 px-4">
        {[
          ['🍜', 'Angela’s Kitchen', 'Paid', '+$18.50', true],
          ['👟', 'FitFind payout', 'Settled', '+$42.00', true],
          ['💊', 'Medical route bonus', 'Earned', '+$9.00', false],
          ['🛍️', 'Retail delivery', 'Pending', '+$14.25', false],
        ].map(([e, n, t, v, bold]) => (
          <div key={n as string} className="flex items-center gap-2.5 rounded-xl border border-line bg-white p-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl grad-canvas text-sm">{e}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold text-ug-black">{n}</p>
              <p className="text-[8.5px] text-ug-black/50">{t}</p>
            </div>
            <p className={`text-[10px] font-bold ${bold ? 'text-ug-black' : 'text-ug-black/45'}`}>{v}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export function ScreenDriver() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-white/55">Marcus · Driver</p>
            <p className="text-[11px] font-bold text-white">Good afternoon</p>
          </div>
        }
        right={
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold text-dijon">
            <span className="size-1.5 rounded-full bg-seasoning" /> Online
          </span>
        }
      />
      <div className="mx-4 mt-3 rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-ug-black/55">Today</p>
            <p className="font-display text-xl font-bold text-ug-black">$96.00</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-dijon/25 px-2.5 py-1 text-[9px] font-bold text-seasoning-600">
            <Icon name="star" size={10} /> 4.9
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[['Jobs', '12'], ['Hours', '6.4'], ['Miles', '38']].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-sand/60 p-2 text-center">
              <p className="font-display text-sm font-bold text-ug-black">{v}</p>
              <p className="text-[8px] text-ug-black/55">{k}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-2xl border border-line bg-white p-3">
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-ug-black">
          <Icon name="routes" size={11} className="text-seasoning" /> Smart route · 6 stops
        </p>
        <svg viewBox="0 0 240 48" className="mt-1.5 w-full">
          <path d="M8 36 L60 30 L104 40 L150 16 L196 26 L232 10" fill="none" stroke="#ED9914" strokeWidth="2" strokeDasharray="5 5" className="animate-route-dash" />
          {[[8, 36], [60, 30], [104, 40], [150, 16], [196, 26], [232, 10]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 2.6} fill={i === 0 ? '#ED9914' : '#161616'} />
          ))}
        </svg>
        <p className="mt-1 text-[8.5px] text-ug-black/55">Pickup · Corner Pharmacy → UT Health Lab</p>
      </div>
      <p className="px-5 pb-1 pt-3 text-[10px] font-bold text-ug-black">Upcoming jobs</p>
      <div className="space-y-2 px-4 pb-1">
        {[
          ['🍜', "Angela's Kitchen", '0.8 mi · Marketplace'],
          ['👟', 'FitFind Boutique', '1.2 mi · Retail'],
          ['💊', 'Corner Pharmacy', '2.1 mi · Medical'],
        ].map(([e, n, d]) => (
          <div key={n as string} className="flex items-center gap-2.5 rounded-xl border border-line bg-white p-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl grad-canvas text-sm">{e}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold text-ug-black">{n}</p>
              <p className="text-[8.5px] text-ug-black/50">{d}</p>
            </div>
            <Icon name="arrow-right" size={13} className="text-seasoning" />
          </div>
        ))}
      </div>
    </>
  )
}

export function ScreenAi() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">AI Chief of Staff</p>
            <p className="flex items-center gap-1 text-[11px] font-bold text-ug-black">
              Goodz Copilot
              <span className="grid size-4 place-items-center rounded-full bg-seasoning text-ug-black">
                <Icon name="spark" size={8} />
              </span>
            </p>
          </div>
        }
      />
      <div className="space-y-2.5 px-4 pb-2 pt-3">
        <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-ink-800 p-2.5 text-white">
          <p className="text-[9px] leading-snug">
            Hey D’Andre — orders are up <b className="text-seasoning-300">18%</b> this week. Want me to launch a 15% promo for repeat customers?
          </p>
        </div>
        <div className="ml-auto max-w-[75%] rounded-2xl rounded-tr-md grad-seasoning p-2.5 text-ug-black">
          <p className="text-[9px] leading-snug">Yes — target 3-mile radius, drivers online now.</p>
        </div>
        <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-ink-800 p-2.5 text-white">
          <p className="text-[9px] leading-snug">
            Done. Promo drafted, 340 customers notified, and <b className="text-seasoning-300">12 drivers</b> matched for the evening window.
          </p>
        </div>
        <div className="ml-auto max-w-[60%] rounded-2xl rounded-tr-md grad-seasoning p-2.5 text-ug-black">
          <p className="text-[9px] leading-snug">Nice. Summary in the dashboard?</p>
        </div>
      </div>
      <div className="mx-4 mt-1 flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
        <span className="text-[9px] text-ug-black/45">Ask anything about your business…</span>
        <span className="ml-auto grid size-6 place-items-center rounded-full bg-ug-black text-dijon">
          <Icon name="ai" size={11} />
        </span>
      </div>
    </>
  )
}

export function ScreenFashion() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">Fashion Fit</p>
            <p className="text-[11px] font-bold text-ug-black">AI size prediction</p>
          </div>
        }
        right={
          <span className="rounded-full bg-ug-black px-2 py-1 text-[8.5px] font-bold text-dijon">
            <Icon name="spark" size={8} /> Fits: 8
          </span>
        }
      />
      <div className="mx-4 mt-3 grid grid-cols-[1fr_1.15fr] gap-3">
        <div className="relative grid place-items-center overflow-hidden rounded-2xl grad-canvas">
          <svg viewBox="0 0 80 150" className="h-36 w-auto">
            <circle cx="40" cy="16" r="11" fill="#161616" opacity="0.85" />
            <path d="M40 28c-13 0-21 9-25 25l-6 13 10 4 4-10 2 72 15-4 2-60 2 60 15 4 4-72 4 10 10-4-6-13c-4-16-12-25-25-25Z" fill="#161616" opacity="0.85" />
            <path d="M17 58h46M19 84h42M15 108h50" stroke="#ED9914" strokeWidth="1.6" strokeDasharray="4 4" fill="none" />
            <text x="1" y="56" fontSize="7" fill="#c97e0a">Bust</text>
            <text x="1" y="82" fontSize="7" fill="#c97e0a">Waist</text>
            <text x="1" y="106" fontSize="7" fill="#c97e0a">Hip</text>
          </svg>
        </div>
        <div className="space-y-2">
          {[
            ['Bust', '35.4″'],
            ['Waist', '27.9″'],
            ['Hip', '38.6″'],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-line bg-white p-2">
              <p className="text-[8px] text-ug-black/55">{k}</p>
              <p className="font-display text-sm font-bold text-ug-black">{v}</p>
            </div>
          ))}
          <div className="rounded-xl bg-ink-800 p-2 text-white">
            <p className="text-[8px] text-white/55">Recommended size</p>
            <p className="font-display text-sm font-bold text-seasoning-300">Size 8 · Urban Fit</p>
          </div>
        </div>
      </div>
      <p className="px-5 pb-1 pt-3 text-[10px] font-bold text-ug-black">Match at these boutiques</p>
      <div className="flex gap-2 px-4 pb-1">
        {['FitFind Boutique', 'Sole Station', 'Verve Lux'].map((b) => (
          <span key={b} className="rounded-full bg-sand px-2.5 py-1 text-[8.5px] font-semibold text-ug-black/70">
            {b}
          </span>
        ))}
      </div>
    </>
  )
}

export function ScreenMedical() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">Medical Courier</p>
            <p className="text-[11px] font-bold text-ug-black">Specimen #H-4821</p>
          </div>
        }
        right={
          <span className="rounded-full bg-seasoning/15 px-2 py-1 text-[8.5px] font-bold text-seasoning-600">
            In transit
          </span>
        }
      />
      <div className="mx-4 mt-3 rounded-2xl bg-ug-black p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="grid size-10 place-items-center rounded-xl bg-seasoning text-ug-black">
            <Icon name="medical" size={18} />
          </span>
          <div className="flex gap-4 text-center">
            {[['Temp', '4.1°C'], ['Sealed', 'Locked'], ['ETA', '12 min']].map(([k, v]) => (
              <div key={k}>
                <p className="text-[8px] text-white/55">{k}</p>
                <p className="text-[10px] font-bold text-seasoning-300">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-seasoning to-dijon" />
        </div>
        <p className="mt-1.5 text-[8px] text-white/50">Corner Pharmacy → UT Health Lab</p>
      </div>
      <p className="px-5 pb-1 pt-3 text-[10px] font-bold text-ug-black">Chain of custody</p>
      <div className="space-y-2.5 px-4 pb-1">
        {[
          ['Collected', '09:12 AM · secure seal', true],
          ['In transit', 'Temperature monitored', true],
          ['Verified handoff', 'Signature + scan', false],
        ].map(([t, d, done]) => (
          <div key={t as string} className="flex items-start gap-2.5">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${done ? 'bg-seasoning text-ug-black' : 'bg-sand text-ug-black/40'}`}>
              <Icon name="check" size={11} />
            </span>
            <div>
              <p className="text-[10px] font-bold text-ug-black">{t}</p>
              <p className="text-[8.5px] text-ug-black/50">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function ScreenTracking() {
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">Live order</p>
            <p className="text-[11px] font-bold text-ug-black">Marcus is on the way</p>
          </div>
        }
        right={
          <span className="flex items-center gap-1 rounded-full bg-seasoning/15 px-2 py-1 text-[8.5px] font-bold text-seasoning-600">
            <span className="size-1.5 rounded-full bg-seasoning" /> Live
          </span>
        }
      />
      <div className="mx-4 mt-3 rounded-2xl border border-line bg-white p-3">
        <svg viewBox="0 0 260 90" className="w-full">
          {[
            'M30 70 L70 62 L110 74 L150 40 L200 52 L230 24',
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke="#ED9914" strokeWidth="2" strokeDasharray="5 6" className="animate-route-dash" />
          ))}
          <circle cx="30" cy="70" r="4" fill="#161616" />
          <circle cx="110" cy="74" r="4" fill="#161616" />
          <circle cx="150" cy="40" r="4" fill="#161616" />
          <circle cx="230" cy="24" r="7" fill="#ED9914" stroke="#fff" strokeWidth="1.6" />
          <circle cx="230" cy="24" r="13" fill="#ED9914" opacity="0.2" className="animate-ping" style={{ transformOrigin: '230px 24px' }} />
          <rect x="16" y="44" width="34" height="16" rx="8" fill="#161616" />
          <text x="33" y="55" textAnchor="middle" fontSize="8" fill="#E5E276" fontWeight="700">You</text>
        </svg>
      </div>
      <div className="space-y-2 px-4 pb-1 pt-2">
        {[
          ['Order confirmed', 'Angela’s Kitchen · 12:04 PM', true],
          ['Driver picked up', 'Estimated 12:18 PM', true],
          ['Out for delivery', 'Arriving in 12 min', true],
          ['Delivered', 'Pending signature', false],
        ].map(([t, d, done]) => (
          <div key={t as string} className="flex items-start gap-2.5">
            <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${done ? 'bg-seasoning text-ug-black' : 'bg-sand text-ug-black/40'}`}>
              {done ? <Icon name="check" size={11} /> : <Icon name="clock" size={10} />}
            </span>
            <div>
              <p className="text-[10px] font-bold text-ug-black">{t}</p>
              <p className="text-[8.5px] text-ug-black/50">{d}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function ScreenBusiness() {
  const bars = [34, 48, 42, 58, 66, 54, 82]
  return (
    <>
      <ScreenTitle
        left={
          <div>
            <p className="text-[10px] text-ug-black/55">Business Portal</p>
            <p className="text-[11px] font-bold text-ug-black">Angela’s Kitchen</p>
          </div>
        }
        right={
          <span className="flex items-center gap-1 rounded-full bg-dijon/25 px-2 py-1 text-[9px] font-bold text-seasoning-600">
            <Icon name="arrow-up-right" size={10} /> +18%
          </span>
        }
      />
      <div className="mx-4 mt-3 rounded-2xl bg-white p-4 shadow-card">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] text-ug-black/55">This week’s revenue</p>
            <p className="font-display text-2xl font-bold text-ug-black">$4,820</p>
          </div>
          <p className="flex items-center gap-1 text-[9px] font-bold text-ug-black/60">
            <Icon name="ai" size={10} className="text-seasoning" /> AI insight
          </p>
        </div>
        <div className="mt-3 flex h-16 items-end gap-1.5">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-seasoning-600 to-seasoning" style={{ height: `${b}%`, opacity: i === 6 ? 1 : 0.5 }} />
          ))}
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-2xl bg-ug-black p-3 text-white">
        <p className="flex items-center gap-1.5 text-[9px] font-bold">
          <Icon name="spark" size={10} className="text-seasoning-300" /> AI Chief of Staff
        </p>
        <p className="mt-1 text-[8.5px] leading-snug text-white/70">
          Your weekends spike 32% after 6 PM. Want a 15% dinner promo to drive repeat orders?
        </p>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full bg-seasoning px-2 py-0.5 text-[8px] font-bold text-ug-black">Launch it</span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold text-white/70">Not now</span>
        </div>
      </div>
      <div className="mx-4 mt-3 grid grid-cols-3 gap-2 pb-1">
        {[['Orders', '214'], ['New', '38'], ['Repeat', '62%']].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-white p-2 text-center">
            <p className="font-display text-sm font-bold text-ug-black">{v}</p>
            <p className="text-[8px] text-ug-black/55">{k}</p>
          </div>
        ))}
      </div>
    </>
  )
}
