import heroImage from '@/assets/hero-wedding.jpg';
import venueImage from '@/assets/venue-photo.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Heart, Mail, MapPin, Phone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import Navigation from './Navigation';

const WeddingWebsite = () => {
  // Contact information
  const CONTACT_PHONE = '+36 30 509 5330';
  const CONTACT_EMAIL = 'pinter.victoria@gmail.com ';

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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-display-xl text-white mb-4 drop-shadow-lg">
              Barbi & Bence
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-white/40 flex-1 max-w-20"></div>
              <Heart className="text-white animate-pulse-slow drop-shadow-md" size={24} />
              <div className="h-px bg-white/40 flex-1 max-w-20"></div>
            </div>
            <div className="font-script text-script-lg text-white/95 mb-2 drop-shadow-md">
              szeretettel meghívunk
            </div>
            <p className="text-body-lg text-white/90 mb-8 drop-shadow-md font-medium">
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

      {/* Event Details Section */}
      <section id="details" className="section-spacing bg-gradient-sage pattern-overlay">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg text-primary text-center mb-16 floating-element">
            Esküvő részletei
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="wedding-card-enhanced text-center floating-element">
              <CardContent className="p-8">
                <div className="bg-primary/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Calendar className="text-primary" size={36} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Templomi szertartás</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Calendar size={18} />
                    2026. május 1.
                  </p>
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Clock size={18} />
                    15:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card-enhanced text-center floating-element">
              <CardContent className="p-8">
                <div className="bg-secondary/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Heart className="text-secondary" size={36} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Polgári szertartás</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Calendar size={18} />
                    2026. május 1.
                  </p>
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Clock size={18} />
                    17:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card-enhanced text-center floating-element">
              <CardContent className="p-8">
                <div className="bg-wedding-gold/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Clock className="text-wedding-gold" size={36} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Vacsora és buli</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Calendar size={18} />
                    2026. május 1.
                  </p>
                  <p className="flex items-center justify-center gap-2 text-lg">
                    <Clock size={18} />
                    19:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
                      Egy gyönyörű történelmi helyszín, amelyet kertek és természeti szépség vesz körül, 
                      tökéletes tavaszi vadvirágos témájú ünneplésünkhöz.
                    </p>
                    <div className="pt-6 space-y-3">
                      <Button 
                        onClick={() => window.open('https://maps.app.goo.gl/quGw6pdp2ntsNVXV7', '_blank')}
                        variant="outline"
                        className="w-full wedding-button bg-primary/10 hover:bg-primary/20 border-primary/30"
                      >
                        <MapPin size={18} className="mr-2" />
                        Megtekintés térképen
                      </Button>
                      <Button 
                        onClick={() => window.open('https://deakudvarhaz.com/', '_blank')}
                        variant="outline"
                        className="w-full wedding-button bg-secondary/10 hover:bg-secondary/20 border-secondary/30"
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
                <img 
                  src={venueImage} 
                  alt="Deák Udvarház - Esküvői helyszín" 
                  className="w-full h-[450px] object-cover"
                />
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
      <section className="section-spacing bg-gradient-section-alt pattern-overlay">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg text-primary mb-12 floating-element">
            Utazás és szállás
          </h2>
          <Card className="wedding-card-enhanced">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-none text-muted-foreground">
                <p className="text-body-lg mb-6">
                  Dolgozunk azon, hogy összegyűjtsük a legjobb ajánlásokat 
                  szállodákról, közlekedésről és helyi látnivalókról, hogy 
                  látogatásotok a lehető legkényelmesebb és legélvezetesebb legyen.
                </p>
                <div className="font-script text-script-lg text-primary floating-element">
                  Szállás részletek hamarosan...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section-spacing bg-gradient-primary text-primary-foreground pattern-overlay">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="section-divider mb-8"></div>
          <h2 className="text-display-lg mb-12 floating-element">
            Csatlakozz az ünnepléshez
          </h2>
          
          <Card className="wedding-card-enhanced bg-background/95 backdrop-blur-md border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center text-foreground">
                <h3 className="text-display-md text-primary mb-6 floating-element">
                  Visszajelzés hamarosan
                </h3>
                <p className="text-body-elegant text-muted-foreground mb-8">
                  Egy gyönyörű visszajelzési rendszert készítünk, hogy megerősíthesd részvételed. 
                  Addig is, bátran keress minket közvetlenül, ha bármilyen kérdésed van.
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
                
                <div className="mt-8 p-6 bg-muted/30 rounded-xl backdrop-blur-sm border border-primary/20">
                  <p className="text-base text-muted-foreground">
                    A visszajelzési rendszer hamarosan elérhető lesz. 
                    Alig várjuk, hogy veletek ünnepelhessünk!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-romantic pattern-overlay border-t border-primary/20">
        <div className="container mx-auto text-center relative z-10">
          <div className="section-divider mb-8"></div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-primary/40 flex-1 max-w-32"></div>
            <Heart className="text-primary animate-float shadow-glow" size={28} />
            <div className="h-px bg-primary/40 flex-1 max-w-32"></div>
          </div>
          <p className="font-script text-script-xl text-primary mb-4 floating-element">
            Barbi & Bence
          </p>
          <p className="text-body-lg text-muted-foreground mb-6">
            2026. május 1. • Deák Udvarház, Kakucs
          </p>
          <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <p className="font-script text-script-lg text-primary">
              Szeretettel várunk minden kedves vendéget
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingWebsite;