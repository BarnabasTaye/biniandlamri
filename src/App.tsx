/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { InvitationCard } from './components/InvitationCard.tsx';
import { ScheduleSection } from './components/ScheduleSection.tsx';
import { VenuesSection } from './components/VenuesSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { GuestbookSection } from './components/GuestbookSection.tsx';
import { EthiopianCustomsFaq } from './components/EthiopianCustomsFaq.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#223127] font-sans selection:bg-[#B68D40]/20 selection:text-[#183526] relative">
      {/* Top Bar Navigation Contract */}
      <Navigation />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <InvitationCard />
        <ScheduleSection />
        <VenuesSection />
        <GallerySection />
        <GuestbookSection />
        <EthiopianCustomsFaq />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
