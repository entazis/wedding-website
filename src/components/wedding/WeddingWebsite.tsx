// Optimized image imports with responsive sizes and WebP format
import venueImageWebp from '@/assets/deak.jpeg?format=webp&w=1200&q=85';
import venueImageJpeg from '@/assets/deak.jpeg?w=1200&q=85';
import heroImageMobileWebp1200 from '@/assets/IMG_2705.jpg?format=webp&w=1200&q=85';
import heroImageMobileWebp800 from '@/assets/IMG_2705.jpg?format=webp&w=800&q=85';
import heroImageMobileJpeg1200 from '@/assets/IMG_2705.jpg?w=1200&q=85';
import heroImageMobileJpeg800 from '@/assets/IMG_2705.jpg?w=800&q=85';
import programImageWebp1920 from '@/assets/IMG_2862.jpg?format=webp&w=1920&q=85';
import programImageWebp800 from '@/assets/IMG_2862.jpg?format=webp&w=800&q=85';
import programImageJpeg1920 from '@/assets/IMG_2862.jpg?w=1920&q=85';
import programImageJpeg800 from '@/assets/IMG_2862.jpg?w=800&q=85';
import travelImageWebp1920 from '@/assets/IMG_2919.jpg?format=webp&w=1920&q=85';
import travelImageWebp800 from '@/assets/IMG_2919.jpg?format=webp&w=800&q=85';
import travelImageJpeg1920 from '@/assets/IMG_2919.jpg?w=1920&q=85';
import travelImageJpeg800 from '@/assets/IMG_2919.jpg?w=800&q=85';
import footerImageWebp1920 from '@/assets/IMG_3054.jpg?format=webp&w=1920&q=85';
import footerImageWebp800 from '@/assets/IMG_3054.jpg?format=webp&w=800&q=85';
import footerImageJpeg1920 from '@/assets/IMG_3054.jpg?w=1920&q=85';
import footerImageJpeg800 from '@/assets/IMG_3054.jpg?w=800&q=85';
import programImageMobileWebp1200 from '@/assets/IMG_3063.jpg?format=webp&w=1200&q=85';
import programImageMobileWebp800 from '@/assets/IMG_3063.jpg?format=webp&w=800&q=85';
import programImageMobileJpeg1200 from '@/assets/IMG_3063.jpg?w=1200&q=85';
import programImageMobileJpeg800 from '@/assets/IMG_3063.jpg?w=800&q=85';
import heroImageWebp1200 from '@/assets/IMG_3102.jpg?format=webp&w=1200&q=85';
import heroImageWebp1920 from '@/assets/IMG_3102.jpg?format=webp&w=1920&q=85';
import heroImageJpeg1200 from '@/assets/IMG_3102.jpg?w=1200&q=85';
import heroImageJpeg1920 from '@/assets/IMG_3102.jpg?w=1920&q=85';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import GuestForm from './GuestForm';
import Navigation from './Navigation';
import Timeline from './Timeline';

interface Accommodation {
  name: string;
  city: string;
  url: string;
  linkText?: string;
}

const ACCOMMODATIONS: Accommodation[] = [
  {
    name: 'Flow Hotel & Conference Inárcs',
    city: 'Inárcs',
    url: 'https://szallas.hu/flow-hotel-conference-inarcs?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&rooms=1&provision=2&listIndex=0',
  },
  {
    name: 'Bagolyvár',
    city: 'Inárcs',
    url: 'https://bagolyvarinarcs.hu/foglalas',
    linkText: 'Foglalás',
  },
  {
    name: 'Palermo Kert Vendégház',
    city: 'Dabas',
    url: 'https://szallas.hu/palermo-kert-vendeghaz-dabas?_gl=1*13md9xj*_up*MQ..*_ga*NTc1MjgzMzk2LjE3NjUwMzYwMjI.*_ga_8QFX7JXGKS*czE3NjUwMzYwMjAkbzEkZzAkdDE3NjUwMzYwMjAkajYwJGwwJGgw&roomtypes=5130042:1328763:6&provision=2&adults=6',
  },
  {
    name: 'Dézsafürdő Vendégház',
    city: 'Dabas',
    url: 'https://szallas.hu/dezsafurdo-vendeghaz-dabas?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&provision=2&listIndex=2',
  },
  {
    name: 'P&A Vendégház',
    city: 'Dabas',
    url: 'https://szallas.hu/p-a-vendeghaz-dabas?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&rooms=1&provision=1&listIndex=2',
  },
  {
    name: 'Dabasi Lovas Vendégház',
    city: 'Dabas',
    url: 'https://szallas.hu/dabasi-lovas-vendeghaz-dabas?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&provision=1&listIndex=4',
  },
  {
    name: 'Zöld Lámpás Vendégház',
    city: 'Újhartyán',
    url: 'https://szallas.hu/zold-lampas-vendeghaz-ujhartyan?checkin=2026-05-01&checkout=2026-05-02&ref=list&provision=1&listIndex=5&roomtypes=4951395:1015419:2;4951395:1015419:2&adults=4',
  },
  {
    name: 'Akác Tanya Faházak',
    city: 'Újlengyel',
    url: 'https://szallas.hu/akac-tanya-fahazak-ujlengyel?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&provision=1&listIndex=6',
  },
  {
    name: 'City Apartmans',
    city: 'Dabas',
    url: 'https://szallas.hu/city-apartmans-dabas?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&provision=1&listIndex=7',
  },
  {
    name: 'Nautilus Étterem és Panzió',
    city: 'Dabas',
    url: 'https://szallas.hu/nautilus-etterem-es-panzio-dabas?checkin=2026-05-01&checkout=2026-05-02&ref=list&adults=2&provision=1&listIndex=8',
  },
];

const WeddingWebsite = () => {
  // Contact information from environment variables
  const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE;
  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePhoneCall = (): void => {
    window.location.href = `tel:${CONTACT_PHONE}`;
  };

  const handleEmailSend = (): void => {
    const subject = encodeURIComponent('Esküvői visszajelzés - Barbi & Bence');
    const body = encodeURIComponent('Kedves Barbi és Bence,\n\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Mobile image - visible on small screens */}
        <picture className="absolute inset-0 w-full h-full md:hidden">
          <source
            srcSet={`${heroImageMobileWebp800} 800w, ${heroImageMobileWebp1200} 1200w`}
            type="image/webp"
          />
          <source
            srcSet={`${heroImageMobileJpeg800} 800w, ${heroImageMobileJpeg1200} 1200w`}
            type="image/jpeg"
          />
          <img
            src={heroImageMobileJpeg800}
            alt="Barbi & Bence"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            style={{
              objectPosition: '10% 80%',
              transform: 'scale(1.15) translateX(3%)'
            }}
          />
        </picture>
        {/* Desktop image - visible on medium screens and larger */}
        <picture className="hidden md:block absolute inset-0 w-full h-full">
          <source
            srcSet={`${heroImageWebp1200} 1200w, ${heroImageWebp1920} 1920w`}
            type="image/webp"
          />
          <source
            srcSet={`${heroImageJpeg1200} 1200w, ${heroImageJpeg1920} 1920w`}
            type="image/jpeg"
          />
          <img
            src={heroImageJpeg1200}
            alt="Barbi & Bence"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            style={{
              objectPosition: '50% 80%',
              transform: 'scale(1.15) translateX(3%)'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/60 md:from-black/40 md:via-black/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-display-xl text-white md:text-wedding-khaki mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Barbi & Bence
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-white/80 md:bg-wedding-khaki/40 flex-1 max-w-20"></div>
              <Heart className="text-white md:text-wedding-khaki animate-pulse-slow drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:drop-shadow-md" size={24} />
              <div className="h-px bg-white/80 md:bg-wedding-khaki/40 flex-1 max-w-20"></div>
            </div>
            <div className="font-script text-3xl text-white md:text-wedding-khaki/95 mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:drop-shadow-md">
              Szeretettel meghívunk esküvőnkre,
            </div>
            <div className="font-script text-white md:text-wedding-khaki/95 mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:drop-shadow-md text-xl">
              melynek időpontja és helyszíne:
            </div>
            <p className="font-script text-white md:text-wedding-khaki mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:drop-shadow-md text-3xl">
              2026. május 1. • Deák Udvarház, Kakucs
            </p>
          </div>
          
          <div className="animate-fade-in mb-12" style={{ animationDelay: '0.3s' }}>
            <CountdownTimer />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={() => scrollToSection('rsvp')}
              className="wedding-button text-lg px-8 py-4"
            >
              Visszajelzés most
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="section-spacing bg-gradient-romantic pattern-overlay">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg text-primary mb-12 floating-element">
            Szerelmünk története
          </h2>
          <Card className="wedding-card-enhanced">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-none text-muted-foreground">
                <p className="text-body-lg mb-6">
                  Történetünk még íródik, de azt biztosan tudjuk, hogy 
                  2026. május 1-je lesz a legszebb fejezet.
                </p>
                <p className="text-body-elegant">
                  Alig várjuk, hogy megosszuk veletek, hogyan találkoztunk, 
                  szerettünk egymásba, és döntöttünk úgy, hogy együtt töltjük az életet. 
                  Hamarosan itt lesz utazásunk teljes története ehhez a különleges naphoz.
                </p>
                <div className="mt-8 font-script text-script-lg text-primary floating-element">
                  Hamarosan...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Details Section - Timeline */}
      <section id="details" className="section-spacing bg-gradient-sage pattern-overlay relative overflow-hidden">
        {/* Mobile background image - visible on small screens */}
        <picture className="absolute inset-0 w-full h-full md:hidden">
          <source
            srcSet={`${programImageMobileWebp800} 800w, ${programImageMobileWebp1200} 1200w`}
            type="image/webp"
          />
          <source
            srcSet={`${programImageMobileJpeg800} 800w, ${programImageMobileJpeg1200} 1200w`}
            type="image/jpeg"
          />
          <img
            src={programImageMobileJpeg800}
            alt="Menetrend háttér"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              objectPosition: '80% 50%'
            }}
          />
        </picture>
        {/* Desktop background image - visible on medium screens and larger */}
        <picture className="hidden md:block absolute inset-0 w-full h-full">
          <source
            srcSet={`${programImageWebp800} 800w, ${programImageWebp1920} 1920w`}
            type="image/webp"
          />
          <source
            srcSet={`${programImageJpeg800} 800w, ${programImageJpeg1920} 1920w`}
            type="image/jpeg"
          />
          <img
            src={programImageJpeg800}
            alt="Menetrend háttér"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              objectPosition: 'center'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* <div className="section-divider mb-8"></div> */}
          
          <h2 className="text-display-lg text-primary text-center mb-6 floating-element">
            Menetrend
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto font-script text-xl">
            2026. május 1. • Kakucs
          </p>
          
          <Timeline />
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section-spacing bg-gradient-gold pattern-overlay">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg text-primary text-center mb-16 floating-element">
            Helyszín
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="floating-element">
              <Card className="wedding-card-enhanced">
                <CardContent className="p-8">
                  <h3 className="text-display-md text-primary mb-6">Deák Udvarház</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="flex items-start gap-3 text-lg">
                      <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
                      <span>Kakucs, Magyarország</span>
                    </p>
                    <p className="text-body-elegant">
                    A Budapesttől alig félórányi autóútra található kakucsi Deák Udvarház egy csodálatos, vidéki eleganciát és romantikát árasztó birtok. A kerti virágpompa, a legelésző pónik és a kis tavacska tökéletes hátteret adnak a Nagy Napnak, amelyet a finom ízek, a házigazdák vendégszeretete és a vintage stílus tesznek teljessé.
                    <br />
                    <br />
                    Örömmel vesszük, ha a májusi, virágos esküvőnk hangulatához igazodva színes, pasztell öltözetben érkeztek.
                    <br />
                    <br />
                    Alig várjuk, hogy együtt ünnepeljünk!
                    </p>
                    <div className="pt-6 space-y-3">
                      <Button 
                        onClick={() => window.open('https://maps.app.goo.gl/quGw6pdp2ntsNVXV7', '_blank')}
                        variant="outline"
                        className="w-full wedding-button bg-primary/10 hover:bg-primary/20 border-primary/30 text-primary font-medium"
                      >
                        <MapPin size={18} className="mr-2" />
                        Megtekintés térképen
                      </Button>
                      <Button 
                        onClick={() => window.open('https://deakudvarhaz.com/', '_blank')}
                        variant="outline"
                        className="w-full wedding-button bg-secondary/10 hover:bg-secondary/20 border-secondary/30 text-foreground font-medium"
                      >
                        Helyszín weboldala
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative floating-element">
              <div className="relative rounded-2xl overflow-hidden shadow-glow">
                <picture>
                  <source
                    srcSet={venueImageWebp}
                    type="image/webp"
                  />
                  <source
                    srcSet={venueImageJpeg}
                    type="image/jpeg"
                  />
                  <img
                    src={venueImageJpeg}
                    alt="Deák Udvarház - Esküvői helyszín"
                    className="w-full h-[450px] object-cover"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-wedding-gold/20"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-script text-script-lg text-primary">
                      Ahol a szerelem otthonra talál
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel & Accommodation Section */}
      <section className="section-spacing bg-gradient-section-alt pattern-overlay relative overflow-hidden">
        {/* Background image */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            srcSet={`${travelImageWebp800} 800w, ${travelImageWebp1920} 1920w`}
            type="image/webp"
          />
          <source
            srcSet={`${travelImageJpeg800} 800w, ${travelImageJpeg1920} 1920w`}
            type="image/jpeg"
          />
          <img
            src={travelImageJpeg800}
            alt="Utazás és szállás háttér"
            className="w-full h-full object-cover"
            loading="lazy"
            style={{
              objectPosition: '50% center',
              transform: 'translateY(-10%)',
              height: '120%'
            }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 pt-12">
          {/* <div className="section-divider mb-8"></div> */}
          <h2 className="text-display-lg text-primary mb-12 floating-element">
            Utazás és szállás
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Accommodation Section */}
            <Card 
              className="backdrop-blur-md border-primary/20 rounded-2xl"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: 'var(--shadow-elegant)',
                transition: 'var(--transition-elegant)'
              }}
            >
              <CardContent className="p-8 md:p-12">
                <h3 className="text-display-md text-primary mb-6 text-center">
                  Szálláslehetőségek
                </h3>
                <div className="space-y-6 text-muted-foreground">
                  <div className="space-y-4">
                    {ACCOMMODATIONS.map((accommodation, index) => {
                      const isLast = index === ACCOMMODATIONS.length - 1;
                      const linkText = accommodation.linkText || 'Szallas.hu';
                      return (
                        <div
                          key={accommodation.name}
                          className={isLast ? 'pb-4' : 'border-b border-primary/20 pb-4'}
                        >
                          <div className="mb-2">
                            <p className="font-medium text-foreground">{accommodation.name}</p>
                            <p className="text-sm">{accommodation.city}</p>
                          </div>
                          <a
                            href={accommodation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            {linkText} →
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Taxi Section */}
            <Card 
              className="backdrop-blur-md border-primary/20 rounded-2xl"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: 'var(--shadow-elegant)',
                transition: 'var(--transition-elegant)'
              }}
            >
              <CardContent className="p-8 md:p-12">
                <h3 className="text-display-md text-primary mb-6 text-center">
                  Taxi szolgáltatás
                </h3>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-2">Dabas-Gyóni Taxi</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="text-primary flex-shrink-0" size={18} />
                        <a 
                          href="tel:+36209233649" 
                          className="text-primary hover:underline"
                        >
                          0620 923 3649
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="text-primary flex-shrink-0" size={18} />
                        <a 
                          href="mailto:gyonitaxi@gmail.com" 
                          className="text-primary hover:underline break-all"
                        >
                          gyonitaxi@gmail.com
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-primary flex-shrink-0 mt-1" size={18} />
                        <a 
                          href="https://www.dabas-gyonitaxi.hu/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          www.dabas-gyonitaxi.hu
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/20">
                    <p className="font-medium text-foreground mb-4">Árak:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Dabas – Deák Udvarház</span>
                        <span className="font-medium text-foreground">~8,000 Ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Újhartyán – Deák Udvarház</span>
                        <span className="font-medium text-foreground">~6,000 Ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section-spacing bg-gradient-primary text-primary-foreground pattern-overlay">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg mb-12 text-center floating-element">
            Csatlakozz az ünnepléshez
          </h2>
          
          <div className="mb-12">
            <GuestForm />
          </div>
          
          {/* Contact Information */}
          <Card className="wedding-card-enhanced bg-background/95 backdrop-blur-md border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center text-foreground">
                <h3 className="text-display-md text-primary mb-6 floating-element">
                  Vagy vedd fel velünk a kapcsolatot
                </h3>
                <p className="text-body-elegant text-muted-foreground mb-8">
                  Ha bármilyen kérdésed van, vagy segítségre van szükséged a visszajelzéssel, 
                  bátran keress minket közvetlenül!
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <Button
                    onClick={handlePhoneCall}
                    variant="outline"
                    className="flex items-center justify-center gap-3 text-muted-foreground bg-primary/10 hover:bg-primary/20 border-primary/30 rounded-lg p-6 h-auto wedding-button floating-element hover:scale-102"
                    style={{ transition: 'var(--transition-elegant)' }}
                  >
                    <Phone size={24} className="text-primary" />
                    <div className="text-left">
                      <div className="text-lg font-medium">Hívj fel minket</div>
                      <div className="text-sm text-primary">{CONTACT_PHONE}</div>
                    </div>
                  </Button>
                  <Button
                    onClick={handleEmailSend}
                    variant="outline"
                    className="flex items-center justify-center gap-3 text-muted-foreground bg-secondary/10 hover:bg-secondary/20 border-secondary/30 rounded-lg p-6 h-auto wedding-button floating-element hover:scale-102"
                    style={{ transition: 'var(--transition-elegant)' }}
                  >
                    <Mail size={24} className="text-primary" />
                    <div className="text-left">
                      <div className="text-lg font-medium">Írj nekünk emailt</div>
                      <div className="text-sm text-primary">{CONTACT_EMAIL}</div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-primary/20">
        <div className="relative w-full" style={{ aspectRatio: '21/9', minHeight: '500px' }}>
          <picture className="absolute inset-0 w-full h-full">
            <source
              srcSet={`${footerImageWebp800} 800w, ${footerImageWebp1920} 1920w`}
              type="image/webp"
            />
            <source
              srcSet={`${footerImageJpeg800} 800w, ${footerImageJpeg1920} 1920w`}
              type="image/jpeg"
            />
            <img
              src={footerImageJpeg800}
              alt="Barbi & Bence"
              className="w-full h-full object-cover"
              loading="lazy"
              style={{
                objectPosition: '90% 100%'
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-start py-16">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-white/60 flex-1 max-w-32"></div>
              <Heart className="text-wedding-khaki animate-float shadow-glow" size={28} />
              <div className="h-px bg-white/60 flex-1 max-w-32"></div>
            </div>
            <p className="font-script text-script-xl text-wedding-khaki mb-4 floating-element drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Barbi & Bence
            </p>
            {/* <div className="mb-40 md:mb-40"></div> */}
            {/* <p className="text-body-lg text-white/90 mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              2026. május 1. • Deák Udvarház, Kakucs
            </p> */}
            <div className="bg-background/70 rounded-xl p-6 max-w-md mx-auto">
              <p className="font-script text-script-lg text-primary">
                Szeretettel várunk, ott tali!
              </p>
            </div>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingWebsite;