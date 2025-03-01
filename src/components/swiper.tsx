import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Sample data for the carousel
const carouselData = [
  {
    id: 1,
    image: '../src/assets/IMG-20250224-WA0034.jpg',
    title: 'Slide 1',
    description: 'This is the first slide.',
  },
  {
    id: 2,
    image: '../src/assets/IMG-20250224-WA0038.jpg',
    title: 'Slide 2',
    description: 'This is the second slide.',
  },
  {
    id: 3,
    image: '../src/assets/white&brown-fur.jpg',
    title: 'Slide 3',
    description: 'This is the third slide.',
  },
];

function SwiperComponent() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Swiper
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Number of slides per view
        loop={true} // Infinite loop
        autoplay={{
          delay: 3000, // Autoplay delay in milliseconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        pagination={{
          clickable: true, // Enable clickable pagination
        }}
        navigation={true} // Enable navigation arrows
        modules={[Autoplay, Pagination, Navigation]} // Add modules
        breakpoints={{
          // Responsive breakpoints
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>{slide.title}</h2>
              <p style={{ fontSize: '1.2rem' }}>{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperComponent;