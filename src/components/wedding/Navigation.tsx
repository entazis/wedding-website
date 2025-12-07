import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Főoldal', id: 'home' },
    { label: 'Történetünk', id: 'story' },
    { label: 'Program', id: 'details' },
    { label: 'Helyszín', id: 'location' },
    { label: 'Visszajelzés', id: 'rsvp' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky 
          ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => scrollToSection('home')}
              className={`font-script text-script-lg transition-colors duration-300 cursor-pointer ${
              isSticky ? 'text-primary' : 'text-wedding-khaki'
            }`}>
              B & B
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 font-body font-medium ${
                    isSticky 
                      ? 'text-primary hover:text-primary/80' 
                      : 'text-wedding-khaki hover:text-wedding-khaki/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors ${
                isSticky 
                  ? 'text-primary hover:text-primary/80' 
                  : 'text-wedding-khaki hover:text-wedding-khaki/80'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-center transition-colors duration-200 font-body font-medium py-2 text-primary hover:text-primary/80"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;