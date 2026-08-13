export interface CursedTier {
    id: string;
    name: string;
    unlock: string;
    pointsRequired: number;
}

export interface Relic {
    id: string;
    name: string;
    type: string;
    description: string;
    image: string;
    cursedPoints: number;
    discovered: boolean;
}

export const cursedTiers: CursedTier[] = [
    {
        id: "tier-i",
        name: "Tier I",
        unlock: "Golden Armor",
        pointsRequired: 3
    },
    {
        id: "tier-ii",
        name: "Tier II",
        unlock: "Ultra Rarity",
        pointsRequired: 6
    },
    {
        id: "tier-iii",
        name: "Tier III",
        unlock: "Pack-a-Punch Tier IV",
        pointsRequired: 9
    }
]

export const grimRelics: Relic[] = [
    {
        id: "lawyers-pen",
        name: "Lawyer's Pen",
        type: "Grim",
        description: "Mimics props have infiltrated the map",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/lawyer's-pen.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "dragon-wings",
        name: "Dragon Wings",
        type: "Grim",
        description: "Normal Power-Up spawns are disabled",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/dragon-wings.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "teddy-bear",
        name: "Teddy Bear",
        type: "Grim",
        description: "Round start delay is cut down by 75%",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/teddy-bear.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "gong",
        name: "Gong",
        type: "Grim",
        description: "Field Upgrade starts charged, but can only be charged by full power.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/gong.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "seed",
        name: "Seed",
        type: "Grim",
        description: "Mystery Box is disabled.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/seed.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "rocket",
        name: "Rocket",
        type: "Grim",
        description: "No Score Streaks.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/rocket.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "power-switch",
        name: "Power Switch",
        type: "Grim",
        description: "Tactical and lethal equipment randomizes each round",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/power-switch.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "wrestlers-belt",
        name: "Wrestler's Belt",
        type: "Grim",
        description: "Weapon Wallbuys randomize each round",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/wrestler's-belt.png",
        cursedPoints: 1,
        discovered: false
    },
    {
        id: "gramophone",
        name: "Gramophone",
        type: "Grim",
        description: "Bullets deal increased damage, but each shot consumes 2 bullets.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/gramophone.png",
        cursedPoints: 1,
        discovered: true
    },
    {
        id: "druid-stone",
        name: "Druid Stone",
        type: "Grim",
        description: "No bleed out bar self-revives instantly revives you.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/druid-stone.png",
        cursedPoints: 1,
        discovered: true
    }
]

export const sinisterRelics: Relic[] = [
    {
        id: "vrill-sphere",
        name: "Vrill Sphere",
        type: "Sinister",
        description: "Players can only carry 4 Perk-a-Colas.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/vrill-sphere.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "samanthas-drawing",
        name: "Samantha's Drawing",
        type: "Sinister",
        description: "Every weapon the player has will swap each round, but retain the Pack-a-Punch and rarity level",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/samantha's-drawing.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "focusing-stone",
        name: "Focusing Stone",
        type: "Sinister",
        description: "No Self-Revive kits",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/focusing-stone.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "spider-fang",
        name: "Spider Fang",
        type: "Sinister",
        description: "Perks costs at machines never decrease.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/spider-fang.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "matryoshka-doll",
        name: "Matryoshka Doll",
        type: "Sinister",
        description: "Salvage drop rate halved.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/matryoshka-doll.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "summoning-key",
        name: "Summoning Key",
        type: "Sinister",
        description: "Zombies explode on death, dealing damage to other players.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/summoning-key.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "stuffed-elephant",
        name: "Stuffed Elephant",
        type: "Sinister",
        description: "Health regen delay is increased",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/stuffed-elephant.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "dancing-arnie",
        name: "Dancing Arnie",
        type: "Sinister",
        description: "All Perk-a-Cola machines have been cursed and now give out random Perk-a-Colas.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/dancing-arnie.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "film-reel",
        name: "Film Reel",
        type: "Sinister",
        description: "Players can only carry one Pack-a-Punch weapon.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/film-reel.png",
        cursedPoints: 2,
        discovered: true
    },
    {
        id: "valkyrie-helmet",
        name: "Valkyrie Helmet",
        type: "Sinister",
        description: "Areas you stay in start to spawn in electric fields that damage you.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/valkyrie-helmet.png",
        cursedPoints: 2,
        discovered: true
    }
]

export const wickedRelics: Relic[] = [
    {
        id: "bus",
        name: "Bus",
        type: "Wicked",
        description: "Enemy health regenerates",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/bus.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "dragon",
        name: "Dragon",
        type: "Wicked",
        description: "All Ammo Crates are disabled",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/dragon.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "blood-vials",
        name: "Blood Vials",
        type: "Wicked",
        description: "All Augments are turned off",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/blood-vials.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "golden-spork",
        name: "Golden Spork",
        type: "Wicked",
        description: "Enemies deal double damage.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/golden-spork.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "civil-protector-head",
        name: "Civil Protector Head",
        type: "Wicked",
        description: "Perk decay - every 100 kills you lose a perk.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/civil-protector-head.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "mangler-helmet",
        name: "Mangler Helmet",
        type: "Wicked",
        description: "Arsenal is disabled.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/mangler-helmet.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "agarthan-device",
        name: "Agarthan Device",
        type: "Wicked",
        description: "Each round, a different type of zombie will spawn",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/agarthan-device.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "music-box",
        name: "Music Box",
        type: "Wicked",
        description: "Enemies only take critical damage.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/music-box.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "mannequin-turret",
        name: "Mannequin Turret",
        type: "Wicked",
        description: "No starting Armor. Only armor available is gold armor from the wall buy.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/mannequin-turret.png",
        cursedPoints: 3,
        discovered: true
    },
    {
        id: "dragon-egg",
        name: "Dragon Egg",
        type: "Wicked",
        description: "Elites and Special zombies in normal round spawning in will now be randomized.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/dragon-egg.png",
        cursedPoints: 3,
        discovered: true
    }
]
