import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Offerings } from './components/sections/Offerings';
import { Heritage } from './components/sections/Heritage';
import { SocialProof } from './components/sections/SocialProof';
import { FAQ } from './components/sections/FAQ';
import { ContactLocation } from './components/sections/ContactLocation';
import { Footer } from './components/layout/Footer';
import { MobileActionDrawer } from './components/layout/MobileActionDrawer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#09090b] selection:bg-neutral-900 selection:text-white pb-16 md:pb-0">
      {/* Non-blocking Sonner Toaster */}
      <Toaster />

      {/* Top Bar Contract Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero />
        <Offerings />
        <Heritage />
        <SocialProof />
        <FAQ />
        <ContactLocation />
      </main>

      {/* Footer with NAP consistency & Privacy Policy Modal */}
      <Footer />

      {/* Mobile Sticky Action Bar with Smart Voice Routing */}
      <MobileActionDrawer />
    </div>
  );
}
