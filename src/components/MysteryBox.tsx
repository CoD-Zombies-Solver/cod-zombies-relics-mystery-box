import { useState } from 'react'
import '../App.css'
import './MysteryBox.css'
import { grimRelics, sinisterRelics, wickedRelics } from '../data/relics'
import type { Relic } from '../data/relics'

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const allRelics: Relic[] = [...grimRelics, ...sinisterRelics, ...wickedRelics]

export default function MysteryBox() {
  const [shown, setShown] = useState<Relic[]>(() => shuffle(allRelics).slice(0, 5))
  const [spinning, setSpinning] = useState(false)
  const [revealed, setRevealed] = useState(true)
  const [rerollsRemaining, setRerollsRemaining] = useState(3)

  function spin() {
    if (spinning) return
    // start spin: hide current cards, animate, then reveal new set
    setRevealed(false)
    setSpinning(true)
    setTimeout(() => {
      setShown(shuffle(allRelics).slice(0, 5))
      setRerollsRemaining(3)
      setSpinning(false)
      // small delay to allow DOM update then reveal with stagger
      setTimeout(() => setRevealed(true), 60)
    }, 900)
  }

  function rerollAt(index: number) {
    if (rerollsRemaining <= 0) return
    const currentIds = new Set(shown.map((r) => r.id))
    const candidates = allRelics.filter((r) => !currentIds.has(r.id))
    if (candidates.length === 0) return
    const replacement = candidates[Math.floor(Math.random() * candidates.length)]
    setShown((s) => s.map((r, i) => (i === index ? replacement : r)))
    setRerollsRemaining((v) => v - 1)
  }

  return (
    <section className="mystery-box">
      <header className="mb-header">
        <h1>Mystery Box</h1>
        <div className="controls">
          <button className="counter" onClick={spin} disabled={spinning}>
            {spinning ? 'Spinning…' : 'Spin Box'}
          </button>
          <div className="rerolls">Rerolls: {rerollsRemaining}</div>
        </div>
      </header>

      <div className={`box-grid ${spinning ? 'spinning' : ''} ${revealed ? 'revealed' : ''}`}>
        {shown.map((r, idx) => (
          <article key={r.id} className="relic-card" style={{ transitionDelay: `${idx * 80}ms` }}>
            <img src={r.image} alt={r.name} className="relic-image" />
            <div className="relic-body">
              <div className="relic-title">
                <strong>{r.name}</strong>
                <span className="relic-type">{r.type}</span>
              </div>
              <p className="relic-desc">{r.description}</p>
              <button
                type="button"
                onClick={() => rerollAt(idx)}
                disabled={rerollsRemaining <= 0}
                className="reroll-btn"
              >
                Reroll
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
