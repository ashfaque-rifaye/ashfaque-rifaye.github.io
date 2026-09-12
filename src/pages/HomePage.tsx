import { AgentTeaser } from '../components/home/AgentTeaser';
import { Capabilities } from '../components/home/Capabilities';
import { Competencies } from '../components/home/Competencies';
import { Hero } from '../components/home/Hero';
import { ImpactBand } from '../components/home/ImpactBand';
import { LabTeaser } from '../components/home/LabTeaser';
import { Principles } from '../components/home/Principles';
import { Recognition } from '../components/home/Recognition';
import { SelectedWork } from '../components/home/SelectedWork';
import { Trajectory } from '../components/home/Trajectory';
import { HireCta } from '../components/sections/HireCta';

/* Hero → proof → selected work → capabilities → skills with proof → the
   agent → how I think → lab → trajectory → recognition → contact. Video
   demos live in the AI Lab and on /demos/. */
export function HomePage() {
  return (
    <>
      <Hero />
      <ImpactBand />
      <SelectedWork />
      <Capabilities />
      <Competencies />
      <AgentTeaser />
      <Principles />
      <LabTeaser />
      <Trajectory />
      <Recognition />
      <HireCta location="home" />
    </>
  );
}
