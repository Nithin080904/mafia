export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Outerwear' | 'Shirts' | 'Pants' | 'Accessories';
  description: string;
  images: string[];
  sizes: string[];
  trending?: boolean;
  newArrival?: boolean;
}

export const SITE_INFO = {
  name: 'MAFIYA BOUTIQUE',
  tagline: 'LUXURY STREETWEAR REDEFINED',
  footerText: 'Born in the shadows, crafted for the spotlight.',
  address: 'Near Gajanan Temple, Athani, Belagavi, Karnataka 591304',
  email: 'concierge@mafiya.com',
  phone: '+91 96115 33264',
  hours: 'Mon - Sat: 10am - 9pm, Sun: 11am - 8pm',
  socials: {
    instagram: 'https://instagram.com/shri.dhar720',
    whatsapp: 'https://wa.me/919611533264',
    tiktok: '#',
  }
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'PREMIUM CHECKERED SHIRT',
    price: 1899,
    category: 'Shirts',
    description: 'High-quality cotton checkered shirt with a refined fit. Perfect for both casual and semi-formal wear.',
    images: [
      '/assets/images/checkered_shirt_beige_1779101242749.png',
      '/assets/images/checkered_shirt_back_1779101674707.png'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    trending: true,
    newArrival: true,
  },
  {
    id: 'p2',
    name: 'OLIVE STREET JOGGERS',
    price: 1,
    category: 'Pants',
    description: 'Comfortable streetwear jogger pants with contrast drawstrings and a modern tapered fit.',
    images: [
      '/assets/images/streetwear_pants_grey_1779101259530.png',
      '/assets/images/olive_joggers_side_1779101695180.png'
    ],
    sizes: ['30', '32', '34', '36'],
    trending: true,
  },
  {
    id: 'p3',
    name: 'ONYX UTILITY PANTS',
    price: 1699,
    category: 'Pants',
    description: 'Deep black utility pants designed for the urban environment. Durable fabric with adjustable waist.',
    images: ['/assets/images/streetwear_pants_black_1779101277963.png'],
    sizes: ['30', '32', '34', '36'],
    newArrival: true,
  },
  {
    id: 'p4',
    name: 'VARSITY NYC JACKET',
    price: 2999,
    category: 'Outerwear',
    description: 'Classic collegiate varsity jacket with premium leather-look sleeves and detailed embroidery.',
    images: [
      '/assets/images/varsity_jacket_black_1779101295165.png',
      '/assets/images/varsity_jacket_back_1779101712895.png'
    ],
    sizes: ['M', 'L', 'XL'],
    trending: true,
  },
  {
    id: 'p5',
    name: 'DARK FLORAL BOUTIQUE SHIRT',
    price: 1799,
    category: 'Shirts',
    description: 'A bold statement piece featuring large floral motifs on a premium dark cotton base.',
    images: ['/assets/images/floral_black_shirt_1779101313801.png'],
    sizes: ['S', 'M', 'L'],
    trending: true,
    newArrival: true,
  },
  {
    id: 'p6',
    name: 'RETRO W DENIM CAP',
    price: 799,
    category: 'Accessories',
    description: 'Vintage-washed denim cap with a heavy embroidered patch. Adjustable strap for a comfortable fit.',
    images: ['/assets/images/denim_cap_blue_1779101334401.png'],
    sizes: ['ONE SIZE'],
  },
  {
    id: 'p7',
    name: 'ROYAL RED POLO BUTTON-DOWN',
    price: 1999,
    category: 'Shirts',
    description: 'Signature red button-down shirt with a classic polo collar. Crafted from premium breathable cotton.',
    images: ['/assets/images/polo_shirt_red_luxury_1779101352146.png'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    newArrival: true,
  },
  {
    id: 'p8',
    name: 'ARTISTIC CHARACTER HOODIE',
    price: 2499,
    category: 'Outerwear',
    description: 'Heavyweight brown hoodie featuring a large vibrant graphic on the back. A true streetwear essential.',
    images: [
      '/assets/images/hoodie_back_graphic_1779101368585.png',
      '/assets/images/hoodie_front_view_1779101728496.png'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    trending: true,
  }
];

export const CATEGORIES = ['All', 'Shirts', 'Pants', 'Outerwear', 'Accessories'];
