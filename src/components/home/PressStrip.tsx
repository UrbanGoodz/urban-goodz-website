import { Marquee, Reveal } from '../primitives'

const pressNames = [
  'AMERICAN EXPRESS',
  'gener8tor',
  'Houston Business Journal',
  'Houston Chronicle',
  'GoDaddy',
  'VoyageHouston',
  'InnovationMap',
  'CanvasRebel',
  'Melanin Minds',
]

export function PressStrip() {
  return (
    <section className="border-y border-line bg-cream/60 py-10">
      <div className="container-ug">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-ug-black/50">
            Recognized by
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={pressNames} />
        </div>
      </div>
    </section>
  )
}
