import Game from '@/src/components/Game';

// Mark as client component to avoid hydration mismatch
export const dynamic = 'force-dynamic';

export default function Home() {
  return <Game />;
}
