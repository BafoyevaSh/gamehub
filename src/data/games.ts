import gameSnake from "@/assets/game-snake.jpg";
import gameMafia from "@/assets/game-mafia.jpg";
import gamePuzzle from "@/assets/game-puzzle.jpg";
import gameSpace from "@/assets/game-space.jpg";
import gameRacing from "@/assets/game-racing.jpg";
import gameChess from "@/assets/game-chess.jpg";

export interface Game {
  id: string;
  title: string;
  image: string;
  category: string;
  players: number;
  rating: number;
  isOnline?: boolean;
  isTrending?: boolean;
  description: string;
  embedUrl?: string;
}

export const games: Game[] = [
  {
    id: "1",
    title: "Neon Snake Multiplayer",
    image: gameSnake,
    category: "Arcade",
    players: 342,
    rating: 4.8,
    isOnline: true,
    isTrending: true,
    description: "Klassik snake o'yinining multiplayer versiyasi. Real vaqtda boshqa o'yinchilar bilan raqobatlashing!",
    embedUrl: "https://playsnake.org",
  },
  {
    id: "2",
    title: "Mafia Online",
    image: gameMafia,
    category: "Strategiya",
    players: 156,
    rating: 4.6,
    isOnline: true,
    isTrending: true,
    description: "2-8 o'yinchi uchun onlayn Mafia o'yini. Rollar, ovoz berish va sirli kechalar!",
  },
  {
    id: "3",
    title: "Neon Blocks",
    image: gamePuzzle,
    category: "Puzzle",
    players: 89,
    rating: 4.3,
    isOnline: false,
    description: "Neon bloklarni joylashtiring va yuqori ball to'plang. Cheksiz rejim mavjud!",
    embedUrl: "https://tetris.com/play-tetris",
  },
  {
    id: "4",
    title: "Space Blaster",
    image: gameSpace,
    category: "Shooter",
    players: 210,
    rating: 4.5,
    isOnline: true,
    description: "Kosmik jang o'yini. Kuchli qurollar va boss janglar!",
    embedUrl: "https://playclassic.games/games/shooting-browser-games-online/play-space-invaders-online/game/",
  },
  {
    id: "5",
    title: "Neon Racer",
    image: gameRacing,
    category: "Poyga",
    players: 178,
    rating: 4.7,
    isOnline: true,
    isTrending: true,
    description: "Futuristik poyga o'yini neon treklarda. Multiplayer rejimida do'stlar bilan poygalashing!",
  },
  {
    id: "6",
    title: "Quantum Chess",
    image: gameChess,
    category: "Strategiya",
    players: 95,
    rating: 4.9,
    isOnline: true,
    description: "AI yordamida shaxmat o'ynang. Raqibingiz sun'iy intellekt yoki real o'yinchi!",
    embedUrl: "https://www.chess.com/play/computer",
  },
];

export const categories = ["Barchasi", "Arcade", "Strategiya", "Puzzle", "Shooter", "Poyga"];
