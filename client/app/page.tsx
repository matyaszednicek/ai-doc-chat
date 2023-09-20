import Hero from './components/Hero/Hero';
import NavBar from './components/NavBar/NavBar';

export default async function Home() {
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
}
