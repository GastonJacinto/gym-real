import Hero from '@/components/hero';
import StatsView from '@/components/views/stats';

export default async function Home() {
  return (
    <>
      <Hero />
      <StatsView />
    </>
  );
}
