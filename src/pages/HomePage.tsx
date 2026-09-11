import { AgentTeaser } from '../components/home/AgentTeaser';
import { Capabilities } from '../components/home/Capabilities';
import { DemoReel } from '../components/home/DemoReel';
import { Hero } from '../components/home/Hero';
import { ImpactBand } from '../components/home/ImpactBand';
import { LabTeaser } from '../components/home/LabTeaser';
import { Principles } from '../components/home/Principles';
import { Recognition } from '../components/home/Recognition';
import { SelectedWork } from '../components/home/SelectedWork';
import { Trajectory } from '../components/home/Trajectory';
import { HireCta } from '../components/sections/HireCta';

/* Hero → proof → demos → selected work → the agent → capabilities →
   how I think → lab → trajectory → recognition → contact. */
export function HomePage() {
  return (
    <>
      <Hero />
      <ImpactBand />
      <DemoReel />
      <SelectedWork />
      <AgentTeaser />
      <Capabilities />
      <Principles />
      <LabTeaser />
      <Trajectory />
      <Recognition />
      <HireCta location="home" />
    </>
  );
}
