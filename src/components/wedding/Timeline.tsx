import {
    Cake,
    Camera,
    Car,
    Church,
    Gamepad2,
    Heart,
    Home,
    Moon,
    Music,
    PartyPopper,
    UtensilsCrossed
} from 'lucide-react';
  
  interface TimelineEvent {
    time: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }
  
  const timelineEvents: TimelineEvent[] = [
    {
      time: "13:30",
      title: "Érkezés Kakucsra",
      description: "Üdvözlünk minden kedves vendéget!",
      icon: <Car className="w-5 h-5" />
    },
    {
      time: "14:00",
      title: 'Templomi "igen"',
      description: "Szívből jövő pillanat, amikor kimondjuk a boldogító igent.",
      icon: <Church className="w-5 h-5" />
    },
    {
      time: "15:00",
      title: "Szállások elfoglalása & vendégvárás",
      description: "Érkezzetek meg lélekben is, beszélgessetek, egyetek-igyatok!",
      icon: <Home className="w-5 h-5" />
    },
    {
      time: "16:00",
      title: "Játékidő",
      description: "Közös móka, hogy jobban megismerjetek minket és egymást.",
      icon: <Gamepad2 className="w-5 h-5" />
    },
    {
      time: "17:00",
      title: 'Polgári "igen"',
      description: "Fogadalmat teszünk és hivatalosan is összekötjük életünket egy megható szertartás keretében.",
      icon: <Heart className="w-5 h-5" />
    },
    {
      time: "17:45",
      title: "Kiscsoportos fotók, gratulációk",
      description: "Megörökítjük a közös ünneplést, ezt követően lehetőség nyílik a jótanácsok, életbölcsességek és ajándékok átadására.",
      icon: <Camera className="w-5 h-5" />
    },
    {
      time: "19:30",
      title: "Vacsora",
      description: "Koccintás, ízek, jó hangulat – kezdődik a közös lakoma, közben beavatunk benneteket életünk emlékezetes pillanataiba.",
      icon: <UtensilsCrossed className="w-5 h-5" />
    },
    {
      time: "21:30",
      title: "Nyitótánc",
      description: "Első táncunk, amivel megnyitjuk a bulit – a parkett mindenkié, táncra fel!",
      icon: <Music className="w-5 h-5" />
    },
    {
      time: "23:00",
      title: "Torta",
      description: "Édes pillanatok következnek.",
      icon: <Cake className="w-5 h-5" />
    },
    {
      time: "0:00",
      title: "Menyecsketánc",
      description: "Eladó a menyasszony!",
      icon: <PartyPopper className="w-5 h-5" />
    },
    {
      time: "0:45",
      title: "Éjféli menü",
      description: "Újabb finom falatok, hogy a buli hajnalig kitartson és senki ne maradjon éhesen.",
      icon: <Moon className="w-5 h-5" />
    }
  ];
  
  const Timeline = () => {
    return (
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 md:-translate-x-px"></div>
        
        <div className="space-y-8 md:space-y-12">
          {timelineEvents.map((event, index) => (
            <div 
              key={index}
              className={`relative flex items-start gap-6 md:gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full shadow-glow -translate-x-1/2 mt-8 z-10 ring-4 ring-background"></div>
              
              {/* Content card */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div 
                  className="group relative bg-card/80 backdrop-blur-sm border border-border/30 rounded-2xl p-6 transition-all duration-500 hover:shadow-elegant hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl rounded-bl-3xl"></div>
                  
                  {/* Time badge */}
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {event.icon}
                    </div>
                    <span className="font-display text-2xl md:text-3xl font-bold text-primary">
                      {event.time}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Subtle decorative line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Spacer for alternating layout on desktop */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
            </div>
          ))}
        </div>
        
        {/* End decoration */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40"></div>
            <Heart className="w-6 h-6 text-primary animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Timeline;