import { Capabilities } from '../components/home/Capabilities';
import { Hero } from '../components/home/Hero';
import { ImpactBand } from '../components/home/ImpactBand';
import { LabTeaser } from '../components/home/LabTeaser';
import { Principles } from '../components/home/Principles';
import { Recognition } from '../components/home/Recognition';
import { SelectedWork } from '../components/home/SelectedWork';
import { Trajectory } from '../components/home/Trajectory';
import { HireCta } from '../components/sections/HireCta';

/* Hero → proof → selected work → capabilities → how I think → lab →
   trajectory → recognition → contact. */
export function HomePage() {
  return (
    <>
      <Hero />
      <ImpactBand />
      <SelectedWork />
      <Capabilities />
      <Principles />
      <LabTeaser />
      <Trajectory />
      <Recognition />
      <HireCta location="home" />
    </>
  );
}
