import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'assam-tea',
    name: 'VELAR',
    price: 205,
    description: "Experience the bold, malty richness of real Assam Tea, grown in the lush valleys of India's Northeast. This tea is strong in flavor, aromatic, and deeply rooted in India's tea-drinking heritage. Our 200g box comes in a royal red-and-gold design that reflects its powerful taste and cultural legacy.",
    shortDescription: "Bold, malty richness from India's Northeast valleys. Strong flavor with aromatic notes.",
    highlights: [
      '100% natural, full-leaf tea',
      'Handpicked for strength and aroma',
      'Rich in antioxidants',
      'Perfect morning brew'
    ],
    ingredients: [
      'Organic Assam tea leaves',
      'Natural flavors'
    ],
    image: '/uploads/assam-tea-aura-velar.png',
    themeColor: '#8B0000', // Deep crimson red
    accentColor: '#D4AF37', // Gold
  },
  {
    id: 'ooty-tea',
    name: 'ELIX',
    price: 199,
    description: "A refreshing escape in every sip, our Ooty Tea brings the misty Nilgiris to your cup. With a smooth, floral character and a light golden hue, it's a tea that soothes and uplifts. Packaged in a cool green box with silver detailing, this tea is an ode to South India's mountain gardens.",
    shortDescription: "Refreshing, smooth tea with floral notes from the misty Nilgiri mountains.",
    highlights: [
      'High-elevation tea',
      'Delicate yet rich flavor',
      'Best for afternoon refreshment',
      'Sustainably sourced'
    ],
    ingredients: [
      'Nilgiri tea leaves',
      'Natural mountain herbs'
    ],
    image: '/uploads/ooty-tea-aura-elix.png',
    themeColor: '#006400', // Emerald green
    accentColor: '#C0C0C0', // Silver
  },
  {
    id: 'premium-combo',
    name: 'Premium Combo',
    price: 749,
    description: "Indulge in the ultimate tea ritual with our Premium Combo. Combining the robust flavor of Assam, the fragrant charm of Ooty, and a handcrafted glass tea cup with a golden handle, this combo is crafted for those who savor culture and comfort. Encased in a royal blue box, it makes a perfect gift or personal treat.",
    shortDescription: "The ultimate tea gift set with Assam tea, Ooty tea, and an elegant glass teacup.",
    highlights: [
      'Complete tea experience',
      'Handcrafted glass teacup with gold handle',
      'Perfect gift option',
      'Luxurious packaging'
    ],
    ingredients: [
      'Assam tea (200g)',
      'Ooty tea (200g)',
      'Handcrafted glass teacup'
    ],
    image: '/uploads/premium-combo-aura.png',
    themeColor: '#191970', // Sapphire blue
    accentColor: '#D4AF37', // Gold
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};