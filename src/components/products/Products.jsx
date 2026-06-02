import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Products.css';

const productsList = [
  { 
    id: 1, 
    name: 'Bedsheets', 
    description: 'Premium cotton and silk blend bedsheets.',
    coverImage: '/cotton_bedsheets.jpg',
    varieties: [
      { name: 'Cotton Bedsheets', image: '/cotton_bedsheets.jpg' },
      { name: 'Silk Bedsheets', image: '/silk_bedsheets.jpg' },
      { name: 'Printed Bedsheets', image: '/printed_bedsheets.jpg' },
      { name: 'King Size Bedsheets', image: '/king_bedsheets.jpg' },
      { name: 'Queen Size Bedsheets', image: '/queen_bedsheets.jpg' }
    ]
  },
  { 
    id: 2, 
    name: 'Curtains', 
    description: 'Elegant curtains to enhance your room aesthetic.',
    coverImage: '/curtains_cover.jpg',
    varieties: [
      { name: 'Blackout Curtains', image: '/blackout_curtains.jpg' },
      { name: 'Sheer Curtains', image: '/sheer_curtains.jpg' },
      { name: 'Printed Curtains', image: '/printed_curtains.jpg' },
      { name: 'Linen Curtains', image: '/linen_curtains.jpg' }
    ]
  },
  { 
    id: 3, 
    name: 'Sofas', 
    description: 'Premium textiled sofas for elegant living spaces.',
    coverImage: '/sofas_cover.jpg',
    varieties: [
      { name: '2-Seater Sofa', image: '/sofa_2_seater.jpg' },
      { name: '3-Seater Sofa', image: '/sofa_3_seater.jpg' },
      { name: 'L-Shaped Sofa', image: '/sofa_l_shaped.jpg' },
      { name: 'Luxury Sofa', image: '/sofa_luxury.jpg' }
    ]
  },
  { 
    id: 4, 
    name: 'Blankets', 
    description: 'Soft, warm and luxurious blankets for cozy nights.',
    coverImage: '/blankets_cover.jpg',
    varieties: [
      { name: 'Fleece Blankets', image: '/fleece_blanket.jpg' },
      { name: 'Woolen Blankets', image: '/woolen_blanket.jpg' },
      { name: 'Weighted Blankets', image: '/weighted_blanket.jpg' },
      { name: 'Mink Blankets', image: '/mink_blanket.jpg' }
    ]
  },
  { 
    id: 5, 
    name: 'Towels', 
    description: 'Highly absorbent, plush towels for everyday use.',
    coverImage: '/towels_cover.jpg',
    varieties: [
      { name: 'Bath Towels', image: '/bath_towels.jpg' },
      { name: 'Hand Towels', image: '/hand_towels.jpg' },
      { name: 'Face Towels', image: '/face_towels.jpg' },
      { name: 'Beach Towels', image: '/beach_towels.jpg' }
    ]
  },
  { 
    id: 6, 
    name: 'Home Decor', 
    description: 'Unique home furnishing items to complete your space.',
    coverImage: '/home_decor_cover.jpg',
    varieties: [
      { name: 'Vases', image: '/luxury_vase.jpg' },
      { name: 'Wall Art', image: '/wall_art.jpg' },
      { name: 'Decorative Mirrors', image: '/mirror.jpg' },
      { name: 'Lamps', image: '/lamp.jpg' }
    ]
  }
];

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Prevent background scrolling and initialize Swiper
  useEffect(() => {
    let scrollTimer;
    let swiperTimer;

    if (selectedProduct) {
      // Scroll the window to the top of the products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Delay blocking the body scroll to let smooth scroll complete
      scrollTimer = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 500);

      swiperTimer = setTimeout(() => {
        if (window.Swiper) {
          new window.Swiper('.mySwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            speed: 800,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: true,
            },
          });
        }
      }, 50);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(swiperTimer);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  return (
    <section id="products" className="section">
      <div className="container">
        <h2>Products We Sell</h2>
        <div className="products-grid">
          {productsList.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="product-image">
                <div 
                  className="category-cover-blur"
                  style={{ backgroundImage: `url(${product.coverImage})` }}
                ></div>
                <img 
                  src={product.coverImage} 
                  alt={product.name} 
                  className="category-cover-img"
                  loading="lazy"
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal Popup */}
      {selectedProduct && createPortal(
        <div className="cinematic-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="cinematic-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="cinematic-close" 
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="cinematic-header">
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>
            </div>
            
            <div className="swiper mySwiper">
              <div className="swiper-wrapper">
                {selectedProduct.varieties.map((variety, index) => (
                  <div key={index} className="swiper-slide cinematic-slide">
                    <div 
                      className="cinematic-card-blur-bg" 
                      style={{ backgroundImage: `url(${variety.image})` }}
                    ></div>
                    <div 
                      className="cinematic-card-bg" 
                      style={{ backgroundImage: `url(${variety.image})` }}
                    ></div>
                    <div className="cinematic-card-content">
                      <h4 className="cinematic-variety-name">{variety.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-button-next cinematic-nav"></div>
              <div className="swiper-button-prev cinematic-nav"></div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Products;
