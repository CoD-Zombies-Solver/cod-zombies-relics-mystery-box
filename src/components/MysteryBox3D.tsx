import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import type { Object3D } from 'three'
import './MysteryBox3D.css'
import { cursedTiers, grimRelics, sinisterRelics, wickedRelics } from '../data/relics'
import type { CursedTier, Relic } from '../data/relics'

// Served from /public so scene.bin + textures keep their relative paths in production
const MODEL_URL = `${import.meta.env.BASE_URL}mystery-box/scene.gltf`
const allRelics: Relic[] = [...grimRelics, ...sinisterRelics, ...wickedRelics]
const discoveredRelics = allRelics.filter((relic) => relic.discovered)
const undiscoveredRelicCount = allRelics.length - discoveredRelics.length
const SETTINGS_STORAGE_KEY = 'cursed-mystery-box-settings'

interface SavedSettings {
  tierId: string
  excludedRelicIds: string[]
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function loadSettings(): SavedSettings {
  const fallback = { tierId: cursedTiers[0].id, excludedRelicIds: [] }

  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '') as Partial<SavedSettings>
    const tierId = cursedTiers.some((tier) => tier.id === saved.tierId)
      ? saved.tierId!
      : fallback.tierId
    const excludedRelicIds = Array.isArray(saved.excludedRelicIds)
      ? saved.excludedRelicIds.filter((id) => discoveredRelics.some((relic) => relic.id === id))
      : []

    return { tierId, excludedRelicIds }
  } catch {
    return fallback
  }
}

function drawRelicsForTier(pool: Relic[], pointsRequired: number): Relic[] | null {
  const relics = shuffle(pool)
  const failedStates = new Set<string>()

  function findCombination(index: number, pointsLeft: number): Relic[] | null {
    if (pointsLeft === 0) return []
    if (index >= relics.length || pointsLeft < 0) return null

    const stateKey = `${index}:${pointsLeft}`
    if (failedStates.has(stateKey)) return null

    const relic = relics[index]
    const withRelic = findCombination(index + 1, pointsLeft - relic.cursedPoints)
    if (withRelic) return [relic, ...withRelic]

    const withoutRelic = findCombination(index + 1, pointsLeft)
    if (withoutRelic) return withoutRelic

    failedStates.add(stateKey)
    return null
  }

  return findCombination(0, pointsRequired)
}

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
      <p className="scene-loading">Loading box... {Math.round(progress)}%</p>
    </Html>
  )
}

function BoxModel({ open, compact }: { open: boolean; compact?: boolean }) {
  const gltf = useGLTF(MODEL_URL)
  const topRef = useRef<Object3D | null>(null)

  useEffect(() => {
    if (!gltf) return
    const nodes = gltf.nodes || {}
    topRef.current = nodes.BoxTop_00 || nodes.BoxTop_end_02 || nodes.BoxTop || nodes['BoxTop'] || nodes['BoxTop.001'] || null
    if (!topRef.current) {
      for (const k of Object.keys(nodes)) {
        if (k.toLowerCase().includes('box') && k.toLowerCase().includes('top')) {
          topRef.current = nodes[k]
          break
        }
      }
    }
    if (topRef.current) {
      topRef.current.rotation.x = Math.PI
      topRef.current.rotation.y = topRef.current.rotation.y || 0
      topRef.current.rotation.z = topRef.current.rotation.z || 0
    }
  }, [gltf])

  useFrame((_state, dt) => {
    if (topRef.current) {
      const target = open ? 0 : Math.PI
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

function TierOption({ tier, selected, onSelect }: { tier: CursedTier; selected: boolean; onSelect: () => void }) {
  return (
    <label className={`tier-option${selected ? ' selected' : ''}`}>
      <input type="radio" name="cursed-tier" checked={selected} onChange={onSelect} />
      <span className="tier-option-copy">
        <strong>{tier.name}</strong>
        <small>{tier.unlock}</small>
      </span>
    </label>
  )
}

export default function MysteryBox3D() {
  const [initialSettings] = useState(loadSettings)
  const [selectedTierId, setSelectedTierId] = useState(initialSettings.tierId)
  const [excludedRelicIds, setExcludedRelicIds] = useState<Set<string>>(
    () => new Set(initialSettings.excludedRelicIds),
  )
  const [shown, setShown] = useState<Relic[]>([])
  const [spinning, setSpinning] = useState(false)
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const selectedTier = cursedTiers.find((tier) => tier.id === selectedTierId) ?? cursedTiers[0]
  const eligibleRelics = useMemo(
    () => discoveredRelics.filter((relic) => !excludedRelicIds.has(relic.id)),
    [excludedRelicIds],
  )
  const hasValidDraw = useMemo(
    () => drawRelicsForTier(eligibleRelics, selectedTier.pointsRequired) !== null,
    [eligibleRelics, selectedTier.pointsRequired],
  )

  useEffect(() => {
    localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ tierId: selectedTierId, excludedRelicIds: [...excludedRelicIds] }),
    )
  }, [excludedRelicIds, selectedTierId])

  useEffect(() => {
    if (!settingsOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSettingsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [settingsOpen])

  function spin() {
    if (spinning) return
    const nextRelics = drawRelicsForTier(eligibleRelics, selectedTier.pointsRequired)
    if (!nextRelics) return

    setSpinning(true)
    setRevealed(false)
    setOpen(true)

    setTimeout(() => {
      setShown(nextRelics)
      setSpinning(false)
      setTimeout(() => setRevealed(true), 120)
      setTimeout(() => setOpen(false), 1600)
    }, 900)
  }

  function toggleExcludedRelic(relicId: string) {
    setExcludedRelicIds((current) => {
      const next = new Set(current)
      if (next.has(relicId)) next.delete(relicId)
      else next.add(relicId)
      return next
    })
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
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={!isMobile} autoRotate={false} />
        </Canvas>

        <header className="mb-header">
          <div className="title">
            <h1>Cursed Mystery Box</h1>
            <p className="subtitle">Spin this Mystery Box and reveal your Cursed Relics challenge.</p>
          </div>
          <div className="controls">
            <button type="button" className="settings-btn" onClick={() => setSettingsOpen(true)} disabled={spinning}>
              Settings
            </button>
            <button
              type="button"
              className="counter"
              onClick={hasValidDraw ? spin : () => setSettingsOpen(true)}
              disabled={spinning}
            >
              {spinning ? 'Opening...' : hasValidDraw ? `Open ${selectedTier.name} Box` : 'Adjust relic pool'}
            </button>
          </div>
        </header>
      </div>

      {revealed && (
        <div className={`box-grid floating ${spinning ? 'spinning' : ''} revealed`} data-count={shown.length}>
          {shown.map((relic, index) => (
            <article
              key={relic.id}
              className={`relic-card ${relicTypeClass(relic.type)}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relic-image-wrap">
                <img src={relic.image} alt={relic.name} className="relic-image" loading="lazy" />
              </div>
              <div className="relic-body">
                <span className="relic-type">{relic.type}</span>
                <h3 className="relic-name">{relic.name}</h3>
                <p className="relic-desc">{relic.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {settingsOpen && (
        <div className="settings-backdrop" onMouseDown={() => setSettingsOpen(false)}>
          <section
            className="settings-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="settings-header">
              <div>
                <p className="settings-eyebrow">Box configuration</p>
                <h2 id="settings-title">Cursed settings</h2>
              </div>
              <button type="button" className="settings-close" onClick={() => setSettingsOpen(false)} aria-label="Close settings">
                &times;
              </button>
            </header>

            <div className="settings-content">
              <fieldset className="settings-section tier-settings">
                <legend>Desired Cursed Tier</legend>
                <p className="settings-help">The box will draw relics totaling this tier's required points.</p>
                <div className="tier-options">
                  {cursedTiers.map((tier) => (
                    <TierOption
                      key={tier.id}
                      tier={tier}
                      selected={tier.id === selectedTierId}
                      onSelect={() => setSelectedTierId(tier.id)}
                    />
                  ))}
                </div>
              </fieldset>

              <section className="settings-section relic-settings">
                <div className="relic-settings-heading">
                  <div>
                    <h3 className="settings-section-title">Exclude locked relics</h3>
                    <p className="settings-help">Select any discovered relics you have not unlocked.</p>
                  </div>
                  <button
                    type="button"
                    className="clear-exclusions"
                    onClick={() => setExcludedRelicIds(new Set())}
                    disabled={excludedRelicIds.size === 0}
                  >
                    Clear
                  </button>
                </div>

                <div className="relic-options">
                  {(['Grim', 'Sinister', 'Wicked'] as const).map((type) => (
                    <div className="relic-option-group" key={type}>
                      <h3>{type}</h3>
                      {discoveredRelics
                        .filter((relic) => relic.type === type)
                        .map((relic) => (
                          <label className="relic-option" key={relic.id}>
                            <input
                              type="checkbox"
                              checked={excludedRelicIds.has(relic.id)}
                              onChange={() => toggleExcludedRelic(relic.id)}
                            />
                            <img src={relic.image} alt="" loading="lazy" />
                            <span>{relic.name}</span>
                          </label>
                        ))}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <footer className="settings-footer">
              <div>
                <strong>{eligibleRelics.length} relics available</strong>
                <span>
                  {excludedRelicIds.size} excluded by you / {undiscoveredRelicCount} undiscovered automatically filtered
                </span>
              </div>
              {!hasValidDraw && (
                <p className="settings-error" role="alert">
                  Restore at least one relic combination totaling {selectedTier.pointsRequired} points.
                </p>
              )}
              <button type="button" className="settings-done" onClick={() => setSettingsOpen(false)}>
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}
