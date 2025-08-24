import heroImage from '@/assets/hero-wedding.jpg';
import venueImage from '@/assets/venue-photo.jpg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Heart, Mail, MapPin, Phone } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import Navigation from './Navigation';

const WeddingWebsite = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <section id="story" className="section-spacing bg-gradient-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-display-lg text-primary mb-12">
            Szerelmünk története
          </h2>
          <Card className="wedding-card bg-card/60 backdrop-blur-sm">
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
                <div className="mt-8 font-script text-script-lg text-primary">
                  Hamarosan...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="details" className="section-spacing">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-display-lg text-primary text-center mb-16">
            Esküvő részletei
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-primary" size={32} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Templomi szertartás</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    2026. május 1. (péntek)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    15:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-secondary" size={32} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Polgári szertartás</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    2026. május 1. (péntek)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    17:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-wedding-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-wedding-gold" size={32} />
                </div>
                <h3 className="text-display-md text-primary mb-4">Vacsora és buli</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    2026. május 1. (péntek)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    19:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="section-spacing bg-gradient-section">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-display-lg text-primary text-center mb-16">
            Helyszín
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="wedding-card">
                <CardContent className="p-8">
                  <h3 className="text-display-md text-primary mb-6">Deák Udvarház</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Kakucs, Magyarország</span>
                    </p>
                    <p className="text-body-elegant">
                      Egy gyönyörű történelmi helyszín, amelyet kertek és természeti szépség vesz körül, 
                      tökéletes tavaszi vadvirágos témájú ünneplésünkhöz.
                    </p>
                    <div className="pt-4">
                      <Button 
                        onClick={() => window.open('https://maps.app.goo.gl/quGw6pdp2ntsNVXV7', '_blank')}
                        variant="outline"
                        className="w-full"
                      >
                        <MapPin size={16} className="mr-2" />
                        Megtekintés térképen
                      </Button>
                    </div>
                    <div className="pt-2">
                      <Button 
                        onClick={() => window.open('https://deakudvarhaz.com/', '_blank')}
                        variant="outline"
                        className="w-full"
                      >
                        Helyszín weboldala
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src={venueImage} 
                alt="Deák Udvarház - Esküvői helyszín" 
                className="rounded-xl shadow-elegant w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel & Accommodation Section */}
      <section className="section-spacing">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-display-lg text-primary mb-12">
            Utazás és szállás
          </h2>
          <Card className="wedding-card">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-none text-muted-foreground">
                <p className="text-body-lg mb-6">
                  Dolgozunk azon, hogy összegyűjtsük a legjobb ajánlásokat 
                  szállodákról, közlekedésről és helyi látnivalókról, hogy 
                  látogatásotok a lehető legkényelmesebb és legélvezetesebb legyen.
                </p>
                <div className="font-script text-script-lg text-primary">
                  Szállás részletek hamarosan...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section-spacing bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-display-lg mb-12">
            Csatlakozz az ünnepléshez
          </h2>
          
          <Card className="wedding-card bg-background/95 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center text-foreground">
                <h3 className="text-display-md text-primary mb-6">
                  Visszajelzés hamarosan
                </h3>
                <p className="text-body-elegant text-muted-foreground mb-8">
                  Egy gyönyörű visszajelzési rendszert készítünk, hogy megerősíthesd részvételed. 
                  Addig is, bátran keress minket közvetlenül, ha bármilyen kérdésed van.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Phone size={20} className="text-primary" />
                    <span>Hívj fel minket</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Mail size={20} className="text-primary" />
                    <span>Írj nekünk emailt</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
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
      <footer className="py-12 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-primary/30 flex-1 max-w-20"></div>
            <Heart className="text-primary animate-float" size={20} />
            <div className="h-px bg-primary/30 flex-1 max-w-20"></div>
          </div>
          <p className="font-script text-script-lg text-primary mb-2">
            Barbi & Bence
          </p>
          <p className="text-muted-foreground">
            2026. május 1. • Deák Udvarház, Kakucs
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingWebsite;