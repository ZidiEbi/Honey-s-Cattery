import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Ensure correct relative paths based on your components/styles folder structure
import Header from '../styles/Header'; // Header.tsx is in src/styles/
import Footer from '../styles/Footer'; // Footer.tsx is in src/styles/
import '../styles/homepage.css'; // homepage.css is in src/styles/

interface HomePageProps {
  toggleDark: () => void;
  isDark: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ toggleDark, isDark }) => {
  // Data for the Swiper carousel
  const carouselData = [
    {
      id: 1,
      image: "/images/IMG-20250224-WA0034.jpg",
      title: "Our Family",
      description: "Meet our beloved adult cats who are part of our cattery family.",
    },
    {
      id: 2,
      image: "/images/IMG-20250224-WA0038.jpg",
      title: "Healthy & Happy",
      description: "Our kittens are raised in a loving environment, ensuring their health and happiness.",
    },
    {
      id: 3,
      image: "/images/white&brown-fur.jpg",
      title: "Future Champions",
      description: "Promising lineage for beauty and temperament. Ready for their forever homes.",
    },
    // Add more slides here if you want to utilize multiple slidesPerView at larger breakpoints.
    // For slidesPerView:2 or 3, you'd typically need 6+ slides for smooth looping.
    {
      id: 4,
      image: "/images/IMG-20250224-WA0036.jpg",
      title: "Playful Paws",
      description: "Watch our kittens explore and play in their spacious environment.",
    },
    {
      id: 5,
      image: "/images/chocolate-shorthair.jpg",
      title: "Purrfect Companions",
      description: "Each kitten is unique, ready to bring joy and companionship to your home.",
    },
  ];

  return (
    <div className={`page-wrapper ${isDark ? 'dark-mode' : ''}`}>
      <Header toggleDark={toggleDark} isDark={isDark} />
      <main className="main">
        <div className="container py-5">
          <h1 className="text-center mb-4">Honey's Cattery</h1>
          <p className="text-center lead mb-5">
            Welcome to Honey's Cattery, where we raise exquisite and healthy kittens
            with love and care. Find your purrfect companion today!
          </p>

          {/* Swiper Carousel Integration */}
          <div className="swiper-container-wrapper">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30} // Space between slides
              slidesPerView={1} // Keep at 1 for smooth looping with limited slides
              loop={true} // Infinite loop
              autoplay={{
                delay: 3000, // Autoplay delay in milliseconds
                disableOnInteraction: false, // Continue autoplay after user interaction
              }}
              pagination={{
                clickable: true, // Enable clickable pagination
              }}
              navigation={true} // Enable navigation arrows
              // Responsive breakpoints: Removed for simplicity with 3 slides
              // If you add more slides (e.g., 6+), you can reintroduce:
              // breakpoints={{
              //   768: { slidesPerView: 2 },
              //   1024: { slidesPerView: 3 },
              // }}
            >
              {carouselData.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div
                    className="swiper-slide-content" // Use a class for styling
                    style={{ backgroundImage: `url(${slide.image})` }} // Keep background image inline for dynamic path
                  >
                    <h2 className="swiper-slide-title">
                      {slide.title}
                    </h2>
                    <p className="swiper-slide-description">{slide.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
