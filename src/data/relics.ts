export interface Relic {
    id: string;
    name: string;
    type: string;
    description: string;
    image: string;
}

export const grimRelics: Relic[] = [
    {
        id: "lawyers-pen",
        name: "Lawyer's Pen",
        type: "Grim",
        description: "Mimics props have infiltrated the map",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/lawyer's-pen.png"
    },
    {
        id: "dragon-wings",
        name: "Dragon Wings",
        type: "Grim",
        description: "Normal Power-Up spawns are disabled",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/dragon-wings.png"
    },
    {
        id: "teddy-bear",
        name: "Teddy Bear",
        type: "Grim",
        description: "Round start delay is cut down by 75%",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/teddy-bear.png"
    },
    {
        id: "gong",
        name: "Gong",
        type: "Grim",
        description: "Field Upgrade starts charged, but can only be charged by full power.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/gong.png"
    },
    {
        id: "seed",
        name: "Seed",
        type: "Grim",
        description: "Mystery Box is disabled.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/seed.png"
    },
    {
        id: "rocket",
        name: "Rocket",
        type: "Grim",
        description: "No Score Streaks.",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/rocket.png"
    },
    {
        id: "power-switch",
        name: "Power Switch",
        type: "Grim",
        description: "Tactical and lethal equipment randomizes each round",
        image: "https://images.codzombiessolver.com/cursed/grim-relics/power-switch.png"
    }
]

export const sinisterRelics: Relic[] = [
    {
        id: "vrill-sphere",
        name: "Vrill Sphere",
        type: "Sinister",
        description: "Players can only carry 4 Perk-a-Colas.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/vrill-sphere.png"
    },
    {
        id: "samanthas-drawing",
        name: "Samantha's Drawing",
        type: "Sinister",
        description: "Every weapon the player has will swap each round, but retain the Pack-a-Punch and rarity level",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/samantha's-drawing.png"
    },
    {
        id: "focusing-stone",
        name: "Focusing Stone",
        type: "Sinister",
        description: "No Self-Revive kits",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/focusing-stone.png"
    },
    {
        id: "spider-fang",
        name: "Spider Fang",
        type: "Sinister",
        description: "Perks costs at machines never decrease.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/spider-fang.png"
    },
    {
        id: "matryoshka-doll",
        name: "Matryoshka Doll",
        type: "Sinister",
        description: "Salvage drop rate halved.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/matryoshka-doll.png"
    },
    {
        id: "summoning-key",
        name: "Summoning Key",
        type: "Sinister",
        description: "Zombies explode on death, dealing damage to other players.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/summoning-key.png"
    },
    {
        id: "stuffed-elephant",
        name: "Stuffed Elephant",
        type: "Sinister",
        description: "Health regen delay is increased",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/stuffed-elephant.png"
    },
    {
        id: "dancing-arnie",
        name: "Dancing Arnie",
        type: "Sinister",
        description: "All Perk-a-Cola machines have been cursed and now give out random Perk-a-Colas.",
        image: "https://images.codzombiessolver.com/cursed/sinister-relics/dancing-arnie.png"
    }
]

export const wickedRelics: Relic[] = [
    {
        id: "bus",
        name: "Bus",
        type: "Wicked",
        description: "Enemy health regenerates",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/bus.png"
    },
    {
        id: "dragon",
        name: "Dragon",
        type: "Wicked",
        description: "All Ammo Crates are disabled",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/dragon.png"
    },
    {
        id: "blood-vials",
        name: "Blood Vials",
        type: "Wicked",
        description: "All Augments are turned off",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/blood-vials.png"
    },
    {
        id: "golden-spork",
        name: "Golden Spork",
        type: "Wicked",
        description: "Enemies deal double damage.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/golden-spork.png"
    },
    {
        id: "civil-protector-head",
        name: "Civil Protector Head",
        type: "Wicked",
        description: "Perk decay - every 100 kills you lose a perk.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/civil-protector-head.png"
    },
    {
        id: "mangler-helmet",
        name: "Mangler Helmet",
        type: "Wicked",
        description: "Arsenal is disabled.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/mangler-helmet.png"
    },
    {
        id: "agarthan-device",
        name: "Agarthan Device",
        type: "Wicked",
        description: "Each round, a different type of zombie will spawn",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/agarthan-device.png"
    },
    {
        id: "music-box",
        name: "Music Box",
        type: "Wicked",
        description: "Enemies only take critical damage.",
        image: "https://images.codzombiessolver.com/cursed/wicked-relics/music-box.png"
    }
]