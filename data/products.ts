export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "real-madrid-home-25",
    name: "Real Madrid Home Jersey 25/26",
    category: "Jerseys",
    price: 35000,
    image: "/images/products/real-madrid-home.jpg",
    featured: true,
  },
  {
    id: "barcelona-away-25",
    name: "Barcelona Away Jersey 25/26",
    category: "Jerseys",
    price: 35000,
    image: "/images/products/barcelona-away.jpg",
    featured: true,
  },
  {
    id: "nike-mercurial",
    name: "Nike Mercurial Football Boots",
    category: "Football Boots",
    price: 95000,
    image: "/images/products/nike-mercurial.jpg",
    featured: true,
  },
  {
    id: "adidas-predator",
    name: "Adidas Predator Elite",
    category: "Football Boots",
    price: 110000,
    image: "/images/products/adidas-predator.jpg",
    featured: true,
  },
  {
    id: "black-hoodie",
    name: "Premium Black Hoodie",
    category: "Clothing",
    price: 28000,
    image: "/images/products/black-hoodie.jpg",
    featured: true,
  },
  {
    id: "gold-watch",
    name: "Luxury Gold Wrist Watch",
    category: "Watches",
    price: 65000,
    image: "/images/products/gold-watch.jpg",
    featured: true,
  },
  {
    id: "cross-bag",
    name: "Premium Cross Bag",
    category: "Bags",
    price: 25000,
    image: "/images/products/cross-bag.jpg",
    featured: true,
  },
  {
    id: "white-sneakers",
    name: "Premium White Sneakers",
    category: "Shoes",
    price: 55000,
    image: "/images/products/white-sneakers.jpg",
    featured: true,
  },
];