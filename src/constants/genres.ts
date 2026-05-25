import {
  AlertCircle,
  BookOpen,
  Compass,
  Crosshair,
  Eye,
  FileText,
  Ghost,
  Heart,
  Landmark,
  Music,
  Rocket,
  Shield,
  ShieldAlert,
  Smile,
  Sparkles,
  Theater,
  Trophy,
  Tv,
  Users,
  WandSparkles,
  Zap,
} from 'lucide-react';

import { Genre } from '@/types/base-movie-cards';

export const genresData: Genre[] = [
  { name: 'Action', slug: 'action', icon: Zap },
  { name: 'Comedy', slug: 'comedy', icon: Smile },
  { name: 'Drama', slug: 'drama', icon: Theater },
  { name: 'Thriller', slug: 'thriller', icon: AlertCircle },
  { name: 'Horror', slug: 'horror', icon: Ghost },
  { name: 'Sci-Fi', slug: 'sci-fi', icon: Rocket },
  { name: 'Fantasy', slug: 'fantasy', icon: WandSparkles },
  { name: 'Adventure', slug: 'adventure', icon: Compass },
  { name: 'Romance', slug: 'romance', icon: Heart },
  { name: 'Animation', slug: 'animation', icon: Sparkles },
  { name: 'Crime', slug: 'crime', icon: ShieldAlert },
  { name: 'Mystery', slug: 'mystery', icon: Eye },
  { name: 'Biography', slug: 'biography', icon: BookOpen },
  { name: 'History', slug: 'history', icon: Landmark },
  { name: 'Family', slug: 'family', icon: Users },
  { name: 'War', slug: 'war', icon: Crosshair },
  { name: 'Musical', slug: 'musical', icon: Music },
  { name: 'Sport', slug: 'sport', icon: Trophy },
  { name: 'Documentary', slug: 'documentary', icon: FileText },
  { name: 'Superhero', slug: 'superhero', icon: Shield },
];

export const genresIcons: Record<number, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  28: Zap, // Action
  12: Compass, // Adventure
  16: Sparkles, // Animation
  35: Smile, // Comedy
  80: ShieldAlert, // Crime
  99: FileText, // Documentary
  18: Theater, // Drama
  10751: Users, // Family
  14: WandSparkles, // Fantasy
  36: Landmark, // History
  27: Ghost, // Horror
  10402: Music, // Music
  9648: Eye, // Mystery
  10749: Heart, // Romance
  878: Rocket, // Science Fiction
  10770: Tv, // TV Movie
  53: AlertCircle, // Thriller
  10752: Crosshair, // War
  37: Compass, // Western
};
