import { Quote, TrackInfo, RouteStop } from '../types';

export const NOSTALGiC_QUOTES: Quote[] = [
  {
    id: 1,
    phrase: "The sound of the engine is the heartbeat of the highway.",
    transliteration: "Engine reya\n saddag ge raaj hor reya\n hridoy kaana.",
    translation: "The sound of the engine is the heartbeat of the highway.",
    speaker: "Highway Legend",
    context: "Classic highway wisdom across NH-114A red soil roads"
  },
  {
    id: 2,
    phrase: "আগে চলো! আগে চলো! খালি আছে ভেতরে, সবাই ভেতরে চলে যান!",
    transliteration: "Aage Cholo! Aage Cholo! Khali acche bhitore, sobai bhitore chole jaan!",
    translation: "Move forward! Move forward! Plenty of space inside, everyone step right in!",
    speaker: "Conductor",
    context: "Classic bus conductor line when the bus is already packed to maximum capacity"
  },
  {
    id: 3,
    phrase: "Windows open, dusty hair, and the eastern wind.",
    transliteration: "Jharki jhijh-me, dhori-obang hoi.",
    translation: "Windows wide open, dusty hair, feeling the fresh highway wind.",
    speaker: "Passenger",
    context: "Nostalgic window seat memory on the Dumka to Ranchi corridor"
  },
  {
    id: 4,
    phrase: "পাপো-পাপো! ওভারটেক হবে এবার! কিসকু এক্সপ্রেসের ব্রেক নেই!",
    transliteration: "Paapo-Paapo! Over-take hobe ebar! Kisku Express-e break nei!",
    translation: "Horn please! Overtaking now! Kisku Express has no time to slow down!",
    speaker: "Driver",
    context: "Blasting the dual pneumatic air horn while passing another local bus on the two-lane highway"
  },
  {
    id: 5,
    phrase: "Stop at the Dhaba, the kulhad chai is waiting!",
    transliteration: "Dhaba re tinja-me, cha unak tetang-a!",
    translation: "Halt at the roadside Dhaba, the hot clay-cup tea is brewing!",
    speaker: "Conductor",
    context: "Mid-way tea break at the highway eatery"
  },
  {
    id: 6,
    phrase: "দাদা তোরা পাঞ্চ! টিকিট কাটুন, ব্যান্ডেল থেকে বর্ধমান!",
    transliteration: "Dada Tora Punch! Ticket Katun, Bandel to Bardhaman!",
    translation: "Brother, get your ticket punched! Tickets please, Bandel to Bardhaman!",
    speaker: "Conductor",
    context: "Clicking the metallic puncher with rhythmic speed as he weaves through passengers"
  },
  {
    id: 7,
    phrase: "Every ticket is a story, every mile a memory.",
    transliteration: "Miteg ticket miteg kahani, miteg mile miteg disa.",
    translation: "Every ticket is a story, every mile a cherished memory.",
    speaker: "Passenger",
    context: "Reflecting on long bus journeys across rural landscapes"
  }
];

export const ROUTE_STOPS: RouteStop[] = [
  { name: "Dumka Bus Stand", distanceKm: 0, popularFor: "Red Soil Corridor Terminal", fare: 0 },
  { name: "Kolkata Esplanade", distanceKm: 24, popularFor: "Central Terminal & Morning Tea", fare: 20 },
  { name: "Bandel Junction Highway", distanceKm: 48, popularFor: "Old Church View & Sweet Shops", fare: 45 },
  { name: "Bardhaman Station Mor", distanceKm: 102, popularFor: "Sitabhog & Mihidana Delicacies", fare: 80 },
  { name: "Deoghar Crossing (NH-114A)", distanceKm: 140, popularFor: "Peda Sweets & Pilgrim Junction", fare: 110 },
  { name: "Ranchi Kantatoli Terminal", distanceKm: 280, popularFor: "Capital Express Stop", fare: 210 }
];

export const PLAYLIST_TRACKS: TrackInfo[] = [
  {
    id: '1',
    youtubeId: 'Hfyx0xybClo',
    title: 'Kisku Driver Highway Special (Playlist 1)',
    artist: 'Nostalgic Folk & Highway Hits',
    album: 'NH-114A Red Soil Highway Express',
    year: '2026',
    duration: 'Playlist 1',
    coverUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    youtubeId: '1YddSDFIsk4',
    title: 'Red Soil Highway Driver Hits (Playlist 2)',
    artist: 'Retro Bengal & Santali Folk',
    album: 'Kisku Express Highway Beats',
    year: '2026',
    duration: 'Playlist 2',
    coverUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    youtubeId: 'YIhtkEjFOG8',
    title: 'Windshield Cassette Tape Groove (Playlist 3)',
    artist: 'Highway Folk Orchestra',
    album: 'Dumka to Esplanade Night Line',
    year: '2026',
    duration: 'Playlist 3',
    coverUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80'
  }
];

export const MEMORY_CARDS = [
  {
    title: "The Iconic Steering Wheel",
    year: "Circa 1994",
    tagline: "Wrapped in red spiral rubber grip with a polished brass Ganesha in center",
    desc: "Drivers spent 12 hours a day holding this wheel, navigating unpaved highway curves, dodging hand-carts, and waving at fellow drivers with a horn tap."
  },
  {
    title: "Air Horn ('Paapo') Culture",
    year: "Pneumatic Power",
    tagline: "Custom tuned dual brass air horns mounted on the roof rack",
    desc: "Not just for safety—the air horn was a musical signature. Each bus line had its own rhythm so villagers down the highway knew Kisku Express was coming."
  },
  {
    title: "The Ticket Puncher & Pouch",
    year: "Collector Souvenirs",
    tagline: "Thick leather pouch held with a strap, filled with colored paper tickets",
    desc: "The conductor knew the exact fare by heart. With a sharp metallic 'CLICK', holes were punched for origin, destination, and passenger category."
  },
  {
    title: "Genda Phool & Agarbatti",
    year: "Daily Ritual",
    tagline: "Fresh marigold garland placed on the dashboard idol every morning at 5 AM",
    desc: "Before starting the first trip to Esplanade, Driver Rabindra Kisku would light three agarbattis, touch the steering wheel in reverence, and say 'Ma Durga'."
  }
];
