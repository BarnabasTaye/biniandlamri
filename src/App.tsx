/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PetalsOverlay } from './components/PetalsOverlay.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { InvitationCard } from './components/InvitationCard.tsx';
import { TheCouple } from './components/TheCouple.tsx';
import { ScheduleSection } from './components/ScheduleSection.tsx';
import { VenuesSection } from './components/VenuesSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { RsvpSection } from './components/RsvpSection.tsx';
import { GuestbookSection } from './components/GuestbookSection.tsx';
import { RegistrySection } from './components/RegistrySection.tsx';
import { EthiopianCustomsFaq } from './components/EthiopianCustomsFaq.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#223127] font-sans selection:bg-[#B68D40]/20 selection:text-[#183526] relative">
      {/* Gentle falling petals layer */}
      <PetalsOverlay enabled={petalsEnabled} />

      {/* Top Bar Navigation Contract */}
      <Navigation
        petalsEnabled={petalsEnabled}
        onTogglePetals={() => setPetalsEnabled(!petalsEnabled)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <InvitationCard />
        <TheCouple />
        <ScheduleSection />
        <VenuesSection />
        <GallerySection />
        <RsvpSection />
        <GuestbookSection />
        <RegistrySection />
        <EthiopianCustomsFaq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
