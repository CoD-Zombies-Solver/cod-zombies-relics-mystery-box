import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Html, useProgress } from '@react-three/drei'

// Served from /public so scene.bin + textures keep their relative paths in production
const MODEL_URL = `${import.meta.env.BASE_URL}mystery-box/scene.gltf`
import './MysteryBox3D.css'
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

function relicTypeClass(type: string) {
  const t = type.toLowerCase()
  if (t === 'grim') return 'relic-card--grim'
  if (t === 'sinister') return 'relic-card--sinister'
  if (t === 'wicked') return 'relic-card--wicked'
  return ''
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

useGLTF.preload(MODEL_URL)

function SceneLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <p className="scene-loading">Loading box… {Math.round(progress)}%</p>
    </Html>
  )
}

function BoxModel({ open, compact }: { open: boolean; compact?: boolean }) {
  const gltf = useGLTF(MODEL_URL)
  const topRef = useRef<any>(null)

  // try to find a node that matches common box top names
  useEffect(() => {
    if (!gltf) return
    const nodes = gltf.nodes || {}
    topRef.current = nodes.BoxTop_00 || nodes.BoxTop_end_02 || nodes.BoxTop || nodes['BoxTop'] || nodes['BoxTop.001'] || null
    // fallback: search by name
    if (!topRef.current) {
      for (const k of Object.keys(nodes)) {
        if (k.toLowerCase().includes('box') && k.toLowerCase().includes('top')) {
          topRef.current = nodes[k]
          break
        }
      }
    }
    // ensure the box top starts in closed position
    if (topRef.current) {
      topRef.current.rotation.x = Math.PI * 1
      topRef.current.rotation.y = topRef.current.rotation.y || 0
      topRef.current.rotation.z = topRef.current.rotation.z || 0
    }
  }, [gltf])

  useFrame((_state, dt) => {
    if (topRef.current) {
      const target = open ? 0 : Math.PI * 1
      // smooth rotation towards target
      topRef.current.rotation.x += (target - (topRef.current.rotation.x || 0)) * Math.min(0.18, dt * 8)
    }
  })

  if (!gltf.scene) return null

  return (
    <group position={[0, compact ? -2.65 : -3, 0]} scale={compact ? 1.12 : 1}>
      <primitive object={gltf.scene} />
    </group>
  )
}

export default function MysteryBox3D() {
  // pick a random number of relics between 1 and the total available
  function randomRelicCount() {
    const max = allRelics.length || 1
    return Math.floor(Math.random() * max) + 1
  }

  const [shown, setShown] = useState<Relic[]>(() => shuffle(allRelics).slice(0, randomRelicCount()))
  const [spinning, setSpinning] = useState(false)
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [rerollsRemaining, setRerollsRemaining] = useState(3)
  const isMobile = useMediaQuery('(max-width: 768px)')

  function spin() {
    if (spinning) return
    setSpinning(true)
    setRevealed(false)
    // open the lid animation
    setOpen(true)

    setTimeout(() => {
      setShown(shuffle(allRelics).slice(0, randomRelicCount()))
      setRerollsRemaining(3)
      setSpinning(false)
      // reveal cards after slight delay
      setTimeout(() => setRevealed(true), 120)
      // close lid after cards are visible
      setTimeout(() => setOpen(false), 1600)
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

  const camera = isMobile
    ? { position: [0, 3.35, 7.6] as [number, number, number], fov: 52 }
    : { position: [0, 4.2, 7.2] as [number, number, number], fov: 60 }

  return (
    <section className={`mystery-box-3d${revealed ? ' has-cards' : ''}`}>
      <div className={`canvas-wrap ${open ? 'open' : ''}`}>
        <Canvas shadows camera={camera}>
          <ambientLight intensity={isMobile ? 0.72 : 0.6} />
          <directionalLight position={[2, 5, 2]} intensity={isMobile ? 1.15 : 1} castShadow />
          <Suspense fallback={<SceneLoader />}>
            <BoxModel open={open} compact={isMobile} />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={!isMobile}
            autoRotate={false}
          />
        </Canvas>
        
        <header className="mb-header">
          <div className="title">
            <h1>Cursed Mystery Box</h1>
            <p className="subtitle">Spin this Mystery Box and reveal your Cursed Relics challenge.</p>
          </div>
          <div className="controls">
            <button className="counter" onClick={spin} disabled={spinning}>
              {spinning ? 'Opening…' : 'Open Box'}
            </button>
            <div className="rerolls">Rerolls: {rerollsRemaining}</div>
          </div>
        </header>
      </div>

      {revealed && (
        <div
          className={`box-grid floating ${spinning ? 'spinning' : ''} ${revealed ? 'revealed' : ''}`}
          data-count={shown.length}
        >
          {shown.map((r, idx) => (
            <article
              key={r.id}
              className={`relic-card ${relicTypeClass(r.type)}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="relic-image-wrap">
                <img src={r.image} alt={r.name} className="relic-image" loading="lazy" />
              </div>
              <div className="relic-body">
                <span className="relic-type">{r.type}</span>
                <h3 className="relic-name">{r.name}</h3>
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
      )}
    </section>
  )
}
