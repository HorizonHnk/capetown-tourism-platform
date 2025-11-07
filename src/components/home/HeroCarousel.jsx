import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Calendar } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover the Magic of Cape Town",
      subtitle: "Your Ultimate Guide to South Africa's Mother City",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1920&q=80&fit=crop", // Table Mountain with city
      primaryButton: {
        text: "AI Travel Assistant",
        icon: <Sparkles className="mr-2 h-5 w-5" />,
        link: "/ai-assistant"
      },
      secondaryButton: {
        text: "Explore Attractions",
        icon: <MapPin className="mr-2 h-5 w-5" />,
        link: "/attractions"
      }
    },
    {
      title: "Plan Your Perfect Adventure",
      subtitle: "AI-Powered Itineraries Tailored Just for You",
      image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80&fit=crop&sat=1.2", // Kirstenbosch Gardens nature
      primaryButton: {
        text: "Start Planning",
        icon: <Calendar className="mr-2 h-5 w-5" />,
        link: "/planner"
      },
      secondaryButton: {
        text: "Chat with AI",
        icon: <Sparkles className="mr-2 h-5 w-5" />,
        link: "/ai-assistant"
      }
    },
    {
      title: "Experience World-Class Attractions",
      subtitle: "From Table Mountain to Cape Point and Beyond",
      image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1920&q=80&fit=crop", // Cape Point nature
      primaryButton: {
        text: "View All Attractions",
        icon: <MapPin className="mr-2 h-5 w-5" />,
        link: "/attractions"
      },
      secondaryButton: {
        text: "Create Itinerary",
        icon: <Calendar className="mr-2 h-5 w-5" />,
        link: "/planner"
      }
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[600px] md:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Light dark overlay to preserve text readability while showing nature */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="text-center w-full">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                  <Link
                    to={slide.primaryButton.link}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {slide.primaryButton.icon}
                    {slide.primaryButton.text}
                  </Link>
                  <Link
                    to={slide.secondaryButton.link}
                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors border-2 border-white"
                  >
                    {slide.secondaryButton.icon}
                    {slide.secondaryButton.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all z-10 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full transition-all z-10 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-75'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
