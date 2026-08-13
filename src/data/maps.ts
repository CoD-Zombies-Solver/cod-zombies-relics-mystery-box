export type MapType = 'round-based' | 'survival'

export interface ZombieMap {
  id: string
  name: string
  image: string
  type: MapType
}

export const roundBasedMaps: ZombieMap[] = [
  {
    id: 'ashes-of-the-damned',
    name: 'Ashes of the Damned',
    image: 'https://images.codzombiessolver.com/black-ops-7/ashes-of-the-damned/ashes-of-the-damned.jpg',
    type: 'round-based',
  },
  {
    id: 'astra-malorum',
    name: 'Astra Malorum',
    image: 'https://images.codzombiessolver.com/black-ops-7/astra-malorum/astra-malorum.jpg',
    type: 'round-based',
  },
  {
    id: 'paradox-junction',
    name: 'Paradox Junction',
    image: 'https://images.codzombiessolver.com/black-ops-7/paradox-junction/paradox-junction.jpg',
    type: 'round-based',
  },
  {
    id: 'totenreich',
    name: 'Totenreich',
    image: 'https://images.codzombiessolver.com/black-ops-7/totenreich/totenreich.jpg',
    type: 'round-based',
  },
  {
    id: 'kowakujō',
    name: 'Kowakujō',
    image: 'https://images.codzombiessolver.com/black-ops-7/kowakujō/kowakujō.jpg',
    type: 'round-based',
  },
]

export const survivalMaps: ZombieMap[] = [
  {
    id: 'vandorn-farm',
    name: 'Vandorn Farm',
    image: 'https://images.codzombiessolver.com/black-ops-7/ashes-of-the-damned/ashes-of-the-damned.jpg',
    type: 'survival',
  },
  {
    id: 'exit-115',
    name: 'Exit 115',
    image: 'https://images.codzombiessolver.com/black-ops-7/ashes-of-the-damned/ashes-of-the-damned.jpg',
    type: 'survival',
  },
  {
    id: 'zarya-cosmodrome',
    name: 'Zarya Cosmodrome',
    image: 'https://images.codzombiessolver.com/black-ops-7/ashes-of-the-damned/ashes-of-the-damned.jpg',
    type: 'survival',
  },
  {
    id: 'ashwood',
    name: 'Ashwood',
    image: 'https://images.codzombiessolver.com/black-ops-7/ashes-of-the-damned/ashes-of-the-damned.jpg',
    type: 'survival',
  },
  {
    id: 'mars',
    name: 'Mars',
    image: 'https://images.codzombiessolver.com/black-ops-7/astra-malorum/astra-malorum.jpg',
    type: 'survival',
  },
  {
    id: 'nuked',
    name: 'Nuked',
    image: 'https://images.codzombiessolver.com/black-ops-7/paradox-junction/paradox-junction.jpg',
    type: 'survival',
  },
  {
    id: 'eidskallen-lighthouse',
    name: 'Eidskallen Lighthouse',
    image: 'https://images.codzombiessolver.com/black-ops-7/totenreich/totenreich.jpg',
    type: 'survival',
  },
]

export const maps: ZombieMap[] = [...roundBasedMaps, ...survivalMaps]