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
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-4">
              Barbi & Bence
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-primary/30 flex-1 max-w-20"></div>
              <Heart className="text-primary animate-pulse-slow" size={24} />
              <div className="h-px bg-primary/30 flex-1 max-w-20"></div>
            </div>
            <p className="font-display text-xl md:text-2xl text-muted-foreground mb-8">
              May 1st, 2026 • Deák Udvarház, Kakucs
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
              RSVP Now
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="section-spacing bg-gradient-section">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-12">
            Our Love Story
          </h2>
          <Card className="wedding-card bg-card/60 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-xl leading-relaxed mb-6">
                  Our story is still being written, but what we know for sure is that 
                  May 1st, 2026 will be the most beautiful chapter yet.
                </p>
                <p className="text-lg leading-relaxed">
                  We can't wait to share all the details of how we met, 
                  fell in love, and decided to spend forever together. 
                  Check back soon for the full story of our journey to this special day.
                </p>
                <div className="mt-8 text-primary font-medium">
                  Coming soon...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Event Details Section */}
      <section id="details" className="section-spacing">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary text-center mb-16">
            Wedding Details
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Calendar className="text-primary" size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Temple Ceremony</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    May 1st, 2026 (Friday)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    3:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-secondary" size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Civil Ceremony</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    May 1st, 2026 (Friday)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    5:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="wedding-card text-center">
              <CardContent className="p-8">
                <div className="bg-wedding-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-wedding-gold" size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Reception Dinner</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    May 1st, 2026 (Friday)
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <Clock size={16} />
                    7:00 PM
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
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary text-center mb-16">
            Venue & Location
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="wedding-card">
                <CardContent className="p-8">
                  <h3 className="font-display text-2xl font-bold text-primary mb-6">Deák Udvarház</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span>Kakucs, Hungary</span>
                    </p>
                    <p className="text-lg leading-relaxed">
                      A beautiful historic venue surrounded by gardens and natural beauty, 
                      perfect for our spring wildflower themed celebration.
                    </p>
                    <div className="pt-4">
                      <Button 
                        onClick={() => window.open('https://maps.app.goo.gl/quGw6pdp2ntsNVXV7', '_blank')}
                        variant="outline"
                        className="w-full"
                      >
                        <MapPin size={16} className="mr-2" />
                        View on Map
                      </Button>
                    </div>
                    <div className="pt-2">
                      <Button 
                        onClick={() => window.open('https://deakudvarhaz.com/', '_blank')}
                        variant="outline"
                        className="w-full"
                      >
                        Visit Venue Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src={venueImage} 
                alt="Deák Udvarház - Wedding Venue" 
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
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary mb-12">
            Travel & Stay
          </h2>
          <Card className="wedding-card">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-xl leading-relaxed mb-6">
                  We're working on gathering the best recommendations for 
                  hotels, transportation, and local attractions to make 
                  your visit as comfortable and enjoyable as possible.
                </p>
                <div className="text-primary font-medium text-lg">
                  Accommodation details coming soon...
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="section-spacing bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
            Join Our Celebration
          </h2>
          
          <Card className="wedding-card bg-background/95 backdrop-blur-sm border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center text-foreground">
                <h3 className="font-display text-2xl font-bold text-primary mb-6">
                  RSVP Coming Soon
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We're preparing a beautiful RSVP system for you to confirm your attendance. 
                  In the meantime, feel free to reach out to us directly with any questions.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Phone size={20} className="text-primary" />
                    <span>Contact us by phone</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Mail size={20} className="text-primary" />
                    <span>Send us an email</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    RSVP system will be available soon. 
                    We can't wait to celebrate with you!
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
          <p className="font-display text-lg text-primary font-medium mb-2">
            Barbi & Bence
          </p>
          <p className="text-muted-foreground">
            May 1st, 2026 • Deák Udvarház, Kakucs
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingWebsite;