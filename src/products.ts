// ============ PRODUCTS DATABASE ============
export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: 'phone' | 'laptop' | 'pad' | 'accessory';
  condition: 'new' | 'used';
  price: number;
  originalPrice?: number;
  battery?: number;
  storage: number;
  color: string;
  emoji: string;
  specs: {
    ram?: number;
    camera?: string;
    display?: string;
    processor?: string;
  };
  rating: number; // 1-10 quality score
  valueScore: number; // price/quality ratio
  views: number;
  lastViewed?: Date;
}

// Generate 100 phones with 14 iPhone 17 Pro
export const products: Product[] = [
  // iPhone 17 Pro (14 units) - Premium flagship
  { id: 1, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1299, battery: 100, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 8.5, views: 245 },
  { id: 2, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1349, battery: 100, storage: 512, color: 'Desert Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 8.2, views: 189 },
  { id: 3, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 1099, battery: 95, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 9, valueScore: 9.2, views: 312 },
  { id: 4, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 1049, battery: 92, storage: 256, color: 'Blue Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 9, valueScore: 9.5, views: 278 },
  { id: 5, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 999, battery: 88, storage: 256, color: 'White Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 8, valueScore: 9.8, views: 401 },
  { id: 6, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1399, battery: 100, storage: 1024, color: 'Black Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 7.9, views: 156 },
  { id: 7, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 949, battery: 85, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 8, valueScore: 10, views: 523 },
  { id: 8, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1299, battery: 100, storage: 256, color: 'Desert Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 8.5, views: 198 },
  { id: 9, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 1079, battery: 93, storage: 512, color: 'Blue Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 9, valueScore: 9.0, views: 267 },
  { id: 10, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 1029, battery: 90, storage: 256, color: 'White Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 9, valueScore: 9.3, views: 345 },
  { id: 11, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1329, battery: 100, storage: 256, color: 'Black Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 8.3, views: 178 },
  { id: 12, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 979, battery: 87, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 8, valueScore: 9.9, views: 456 },
  { id: 13, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'used', price: 1149, battery: 96, storage: 512, color: 'Desert Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 9, valueScore: 8.8, views: 234 },
  { id: 14, name: 'iPhone 17 Pro', brand: 'Apple', model: '17 Pro', category: 'phone', condition: 'new', price: 1279, battery: 100, storage: 256, color: 'Blue Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A19 Pro' }, rating: 10, valueScore: 8.6, views: 212 },

  // iPhone 16 Pro (8 units)
  { id: 15, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'new', price: 1099, battery: 100, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 9.0, views: 189 },
  { id: 16, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'used', price: 899, battery: 92, storage: 256, color: 'Black Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 9.5, views: 267 },
  { id: 17, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'used', price: 849, battery: 88, storage: 256, color: 'White Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 8, valueScore: 9.8, views: 312 },
  { id: 18, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'new', price: 1149, battery: 100, storage: 512, color: 'Desert Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 8.7, views: 156 },
  { id: 19, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'used', price: 879, battery: 90, storage: 256, color: 'Blue Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 9.3, views: 234 },
  { id: 20, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'used', price: 929, battery: 94, storage: 512, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 9.1, views: 198 },
  { id: 21, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'new', price: 1099, battery: 100, storage: 256, color: 'Black Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 9, valueScore: 9.0, views: 178 },
  { id: 22, name: 'iPhone 16 Pro', brand: 'Apple', model: '16 Pro', category: 'phone', condition: 'used', price: 829, battery: 85, storage: 256, color: 'White Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.3"', processor: 'A18 Pro' }, rating: 8, valueScore: 9.9, views: 345 },

  // iPhone 15 Pro (6 units)
  { id: 23, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'used', price: 749, battery: 89, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 8, valueScore: 9.5, views: 289 },
  { id: 24, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'used', price: 699, battery: 85, storage: 256, color: 'Blue Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 8, valueScore: 9.8, views: 356 },
  { id: 25, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'new', price: 899, battery: 100, storage: 256, color: 'White Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 9, valueScore: 8.8, views: 167 },
  { id: 26, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'used', price: 729, battery: 87, storage: 512, color: 'Black Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 8, valueScore: 9.6, views: 234 },
  { id: 27, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'used', price: 679, battery: 82, storage: 256, color: 'Natural Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 7, valueScore: 9.9, views: 412 },
  { id: 28, name: 'iPhone 15 Pro', brand: 'Apple', model: '15 Pro', category: 'phone', condition: 'new', price: 949, battery: 100, storage: 512, color: 'Desert Titanium', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'A17 Pro' }, rating: 9, valueScore: 8.5, views: 145 },

  // Samsung Galaxy S24 Ultra (8 units)
  { id: 29, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'new', price: 1199, battery: 100, storage: 256, color: 'Titanium Black', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 8.8, views: 234 },
  { id: 30, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'used', price: 949, battery: 91, storage: 256, color: 'Titanium Gray', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.5, views: 312 },
  { id: 31, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'used', price: 899, battery: 87, storage: 256, color: 'Titanium Violet', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.8, views: 378 },
  { id: 32, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'new', price: 1299, battery: 100, storage: 512, color: 'Titanium Yellow', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 8.5, views: 189 },
  { id: 33, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'used', price: 929, battery: 89, storage: 512, color: 'Titanium Black', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.3, views: 267 },
  { id: 34, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'used', price: 879, battery: 85, storage: 256, color: 'Titanium Gray', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.9, views: 423 },
  { id: 35, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'new', price: 1199, battery: 100, storage: 256, color: 'Titanium Violet', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 8.8, views: 198 },
  { id: 36, name: 'Galaxy S24 Ultra', brand: 'Samsung', model: 'S24 Ultra', category: 'phone', condition: 'used', price: 969, battery: 93, storage: 512, color: 'Titanium Yellow', emoji: '📱', specs: { ram: 12, camera: '200MP', display: '6.8"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.2, views: 234 },

  // Samsung Galaxy S24 (6 units)
  { id: 37, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'new', price: 799, battery: 100, storage: 128, color: 'Onyx Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 8, valueScore: 9.2, views: 267 },
  { id: 38, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'used', price: 649, battery: 88, storage: 128, color: 'Amber Yellow', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 8, valueScore: 9.7, views: 345 },
  { id: 39, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'used', price: 629, battery: 85, storage: 128, color: 'Cobalt Violet', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 7, valueScore: 9.9, views: 398 },
  { id: 40, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'new', price: 849, battery: 100, storage: 256, color: 'Marble Gray', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 8, valueScore: 8.9, views: 189 },
  { id: 41, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'used', price: 669, battery: 90, storage: 256, color: 'Onyx Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 8, valueScore: 9.5, views: 278 },
  { id: 42, name: 'Galaxy S24', brand: 'Samsung', model: 'S24', category: 'phone', condition: 'new', price: 799, battery: 100, storage: 128, color: 'Amber Yellow', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Exynos 2400' }, rating: 8, valueScore: 9.2, views: 234 },

  // Samsung Galaxy S23 (5 units)
  { id: 43, name: 'Galaxy S23', brand: 'Samsung', model: 'S23', category: 'phone', condition: 'used', price: 549, battery: 86, storage: 128, color: 'Phantom Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 7, valueScore: 9.8, views: 312 },
  { id: 44, name: 'Galaxy S23', brand: 'Samsung', model: 'S23', category: 'phone', condition: 'used', price: 529, battery: 83, storage: 128, color: 'Cream', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 7, valueScore: 9.9, views: 378 },
  { id: 45, name: 'Galaxy S23', brand: 'Samsung', model: 'S23', category: 'phone', condition: 'new', price: 699, battery: 100, storage: 256, color: 'Green', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 8, valueScore: 9.0, views: 189 },
  { id: 46, name: 'Galaxy S23', brand: 'Samsung', model: 'S23', category: 'phone', condition: 'used', price: 569, battery: 88, storage: 256, color: 'Lavender', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 7, valueScore: 9.6, views: 267 },
  { id: 47, name: 'Galaxy S23', brand: 'Samsung', model: 'S23', category: 'phone', condition: 'used', price: 509, battery: 80, storage: 128, color: 'Phantom Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 7, valueScore: 10, views: 445 },

  // Google Pixel 8 Pro (4 units)
  { id: 48, name: 'Pixel 8 Pro', brand: 'Google', model: '8 Pro', category: 'phone', condition: 'new', price: 899, battery: 100, storage: 128, color: 'Obsidian', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.7"', processor: 'Tensor G3' }, rating: 9, valueScore: 9.0, views: 178 },
  { id: 49, name: 'Pixel 8 Pro', brand: 'Google', model: '8 Pro', category: 'phone', condition: 'used', price: 699, battery: 89, storage: 128, color: 'Bay', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.7"', processor: 'Tensor G3' }, rating: 8, valueScore: 9.7, views: 234 },
  { id: 50, name: 'Pixel 8 Pro', brand: 'Google', model: '8 Pro', category: 'phone', condition: 'used', price: 729, battery: 92, storage: 256, color: 'Porcelain', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.7"', processor: 'Tensor G3' }, rating: 9, valueScore: 9.3, views: 198 },
  { id: 51, name: 'Pixel 8 Pro', brand: 'Google', model: '8 Pro', category: 'phone', condition: 'used', price: 679, battery: 86, storage: 128, color: 'Obsidian', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.7"', processor: 'Tensor G3' }, rating: 8, valueScore: 9.8, views: 289 },

  // Google Pixel 8 (4 units)
  { id: 52, name: 'Pixel 8', brand: 'Google', model: '8', category: 'phone', condition: 'new', price: 699, battery: 100, storage: 128, color: 'Hazel', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Tensor G3' }, rating: 8, valueScore: 9.2, views: 212 },
  { id: 53, name: 'Pixel 8', brand: 'Google', model: '8', category: 'phone', condition: 'used', price: 549, battery: 87, storage: 128, color: 'Rose', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Tensor G3' }, rating: 7, valueScore: 9.8, views: 267 },
  { id: 54, name: 'Pixel 8', brand: 'Google', model: '8', category: 'phone', condition: 'used', price: 529, battery: 84, storage: 128, color: 'Obsidian', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Tensor G3' }, rating: 7, valueScore: 9.9, views: 312 },
  { id: 55, name: 'Pixel 8', brand: 'Google', model: '8', category: 'phone', condition: 'new', price: 749, battery: 100, storage: 256, color: 'Bay', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.2"', processor: 'Tensor G3' }, rating: 8, valueScore: 8.9, views: 178 },

  // OnePlus 12 (5 units)
  { id: 56, name: 'OnePlus 12', brand: 'OnePlus', model: '12', category: 'phone', condition: 'new', price: 799, battery: 100, storage: 256, color: 'Flowy Emerald', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.82"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.3, views: 234 },
  { id: 57, name: 'OnePlus 12', brand: 'OnePlus', model: '12', category: 'phone', condition: 'used', price: 649, battery: 90, storage: 256, color: 'Silky Black', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.82"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.7, views: 289 },
  { id: 58, name: 'OnePlus 12', brand: 'OnePlus', model: '12', category: 'phone', condition: 'used', price: 629, battery: 87, storage: 256, color: 'Rock Black', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.82"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.8, views: 345 },
  { id: 59, name: 'OnePlus 12', brand: 'OnePlus', model: '12', category: 'phone', condition: 'new', price: 849, battery: 100, storage: 512, color: 'White', emoji: '📱', specs: { ram: 16, camera: '50MP', display: '6.82"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 8.8, views: 178 },
  { id: 60, name: 'OnePlus 12', brand: 'OnePlus', model: '12', category: 'phone', condition: 'used', price: 669, battery: 92, storage: 512, color: 'Flowy Emerald', emoji: '📱', specs: { ram: 16, camera: '50MP', display: '6.82"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.5, views: 234 },

  // Xiaomi 14 Pro (5 units)
  { id: 61, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', model: '14 Pro', category: 'phone', condition: 'new', price: 699, battery: 100, storage: 256, color: 'Black', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.73"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.5, views: 267 },
  { id: 62, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', model: '14 Pro', category: 'phone', condition: 'used', price: 549, battery: 88, storage: 256, color: 'White', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.73"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.9, views: 312 },
  { id: 63, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', model: '14 Pro', category: 'phone', condition: 'used', price: 529, battery: 85, storage: 256, color: 'Green', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.73"', processor: 'Snapdragon 8 Gen 3' }, rating: 7, valueScore: 10, views: 378 },
  { id: 64, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', model: '14 Pro', category: 'phone', condition: 'new', price: 749, battery: 100, storage: 512, color: 'Blue', emoji: '📱', specs: { ram: 16, camera: '50MP', display: '6.73"', processor: 'Snapdragon 8 Gen 3' }, rating: 9, valueScore: 9.0, views: 189 },
  { id: 65, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', model: '14 Pro', category: 'phone', condition: 'used', price: 569, battery: 90, storage: 512, color: 'Black', emoji: '📱', specs: { ram: 16, camera: '50MP', display: '6.73"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.7, views: 234 },

  // Xiaomi 14 (5 units)
  { id: 66, name: 'Xiaomi 14', brand: 'Xiaomi', model: '14', category: 'phone', condition: 'new', price: 599, battery: 100, storage: 256, color: 'Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.36"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.4, views: 234 },
  { id: 67, name: 'Xiaomi 14', brand: 'Xiaomi', model: '14', category: 'phone', condition: 'used', price: 479, battery: 87, storage: 256, color: 'White', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.36"', processor: 'Snapdragon 8 Gen 3' }, rating: 7, valueScore: 9.9, views: 312 },
  { id: 68, name: 'Xiaomi 14', brand: 'Xiaomi', model: '14', category: 'phone', condition: 'used', price: 459, battery: 84, storage: 256, color: 'Green', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.36"', processor: 'Snapdragon 8 Gen 3' }, rating: 7, valueScore: 10, views: 378 },
  { id: 69, name: 'Xiaomi 14', brand: 'Xiaomi', model: '14', category: 'phone', condition: 'new', price: 649, battery: 100, storage: 512, color: 'Blue', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.36"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.1, views: 189 },
  { id: 70, name: 'Xiaomi 14', brand: 'Xiaomi', model: '14', category: 'phone', condition: 'used', price: 499, battery: 89, storage: 512, color: 'Black', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.36"', processor: 'Snapdragon 8 Gen 3' }, rating: 8, valueScore: 9.6, views: 267 },

  // Budget phones (30 units) - Various brands
  { id: 71, name: 'Redmi Note 13 Pro', brand: 'Xiaomi', model: 'Note 13 Pro', category: 'phone', condition: 'new', price: 299, battery: 100, storage: 128, color: 'Midnight Black', emoji: '📱', specs: { ram: 8, camera: '200MP', display: '6.67"', processor: 'Snapdragon 7s Gen 2' }, rating: 7, valueScore: 9.8, views: 456 },
  { id: 72, name: 'Redmi Note 13', brand: 'Xiaomi', model: 'Note 13', category: 'phone', condition: 'new', price: 199, battery: 100, storage: 128, color: 'Ocean Blue', emoji: '📱', specs: { ram: 6, camera: '108MP', display: '6.67"', processor: 'Snapdragon 685' }, rating: 6, valueScore: 10, views: 567 },
  { id: 73, name: 'POCO X6 Pro', brand: 'Xiaomi', model: 'X6 Pro', category: 'phone', condition: 'new', price: 349, battery: 100, storage: 256, color: 'Black', emoji: '📱', specs: { ram: 8, camera: '64MP', display: '6.67"', processor: 'Dimensity 8300' }, rating: 8, valueScore: 9.7, views: 389 },
  { id: 74, name: 'Realme 12 Pro', brand: 'Realme', model: '12 Pro', category: 'phone', condition: 'new', price: 329, battery: 100, storage: 256, color: 'Navigator Beige', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.7"', processor: 'Snapdragon 7s Gen 2' }, rating: 7, valueScore: 9.6, views: 345 },
  { id: 75, name: 'Realme GT 5', brand: 'Realme', model: 'GT 5', category: 'phone', condition: 'new', price: 449, battery: 100, storage: 256, color: 'Silver', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.74"', processor: 'Snapdragon 8 Gen 2' }, rating: 8, valueScore: 9.5, views: 278 },
  { id: 76, name: 'Oppo Reno 11', brand: 'Oppo', model: 'Reno 11', category: 'phone', condition: 'new', price: 379, battery: 100, storage: 256, color: 'Gem Green', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.7"', processor: 'Dimensity 7050' }, rating: 7, valueScore: 9.4, views: 234 },
  { id: 77, name: 'Vivo V30', brand: 'Vivo', model: 'V30', category: 'phone', condition: 'new', price: 399, battery: 100, storage: 256, color: 'Peacock Green', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.78"', processor: 'Snapdragon 7 Gen 3' }, rating: 7, valueScore: 9.3, views: 267 },
  { id: 78, name: 'Nothing Phone 2', brand: 'Nothing', model: 'Phone 2', category: 'phone', condition: 'new', price: 599, battery: 100, storage: 256, color: 'White', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.7"', processor: 'Snapdragon 8+ Gen 1' }, rating: 8, valueScore: 9.2, views: 312 },
  { id: 79, name: 'Motorola Edge 40', brand: 'Motorola', model: 'Edge 40', category: 'phone', condition: 'new', price: 449, battery: 100, storage: 256, color: 'Lunar Blue', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.55"', processor: 'Dimensity 8020' }, rating: 7, valueScore: 9.5, views: 189 },
  { id: 80, name: 'Sony Xperia 5 V', brand: 'Sony', model: 'Xperia 5 V', category: 'phone', condition: 'new', price: 799, battery: 100, storage: 128, color: 'Black', emoji: '📱', specs: { ram: 8, camera: '48MP', display: '6.1"', processor: 'Snapdragon 8 Gen 2' }, rating: 8, valueScore: 8.8, views: 145 },

  // More budget/used phones (20 units)
  { id: 81, name: 'iPhone 13', brand: 'Apple', model: '13', category: 'phone', condition: 'used', price: 549, battery: 85, storage: 128, color: 'Blue', emoji: '📱', specs: { ram: 4, camera: '12MP', display: '6.1"', processor: 'A15' }, rating: 7, valueScore: 9.6, views: 423 },
  { id: 82, name: 'iPhone 12', brand: 'Apple', model: '12', category: 'phone', condition: 'used', price: 449, battery: 82, storage: 64, color: 'Purple', emoji: '📱', specs: { ram: 4, camera: '12MP', display: '6.1"', processor: 'A14' }, rating: 6, valueScore: 9.8, views: 478 },
  { id: 83, name: 'Galaxy S22', brand: 'Samsung', model: 'S22', category: 'phone', condition: 'used', price: 399, battery: 80, storage: 128, color: 'Green', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.1"', processor: 'Snapdragon 8 Gen 1' }, rating: 6, valueScore: 9.9, views: 389 },
  { id: 84, name: 'Galaxy A54', brand: 'Samsung', model: 'A54', category: 'phone', condition: 'new', price: 349, battery: 100, storage: 128, color: 'Awesome Lime', emoji: '📱', specs: { ram: 6, camera: '50MP', display: '6.4"', processor: 'Exynos 1380' }, rating: 6, valueScore: 9.7, views: 312 },
  { id: 85, name: 'Pixel 7', brand: 'Google', model: '7', category: 'phone', condition: 'used', price: 429, battery: 86, storage: 128, color: 'Lemongrass', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.3"', processor: 'Tensor G2' }, rating: 7, valueScore: 9.5, views: 267 },
  { id: 86, name: 'Redmi Note 12', brand: 'Xiaomi', model: 'Note 12', category: 'phone', condition: 'used', price: 149, battery: 83, storage: 128, color: 'Onyx Gray', emoji: '📱', specs: { ram: 4, camera: '50MP', display: '6.67"', processor: 'Snapdragon 685' }, rating: 5, valueScore: 10, views: 534 },
  { id: 87, name: 'Realme 10', brand: 'Realme', model: '10', category: 'phone', condition: 'used', price: 169, battery: 85, storage: 128, color: 'Crush Blue', emoji: '📱', specs: { ram: 4, camera: '50MP', display: '6.4"', processor: 'Helio G99' }, rating: 5, valueScore: 10, views: 489 },
  { id: 88, name: 'Oppo A78', brand: 'Oppo', model: 'A78', category: 'phone', condition: 'used', price: 189, battery: 87, storage: 128, color: 'Aquatic Blue', emoji: '📱', specs: { ram: 6, camera: '50MP', display: '6.56"', processor: 'Snapdragon 680' }, rating: 5, valueScore: 9.9, views: 423 },
  { id: 89, name: 'Vivo Y36', brand: 'Vivo', model: 'Y36', category: 'phone', condition: 'used', price: 179, battery: 84, storage: 128, color: 'River Blue', emoji: '📱', specs: { ram: 6, camera: '50MP', display: '6.64"', processor: 'Snapdragon 680' }, rating: 5, valueScore: 10, views: 456 },
  { id: 90, name: 'Nokia G42', brand: 'Nokia', model: 'G42', category: 'phone', condition: 'new', price: 229, battery: 100, storage: 128, color: 'Purple', emoji: '📱', specs: { ram: 6, camera: '50MP', display: '6.56"', processor: 'Snapdragon 480+' }, rating: 6, valueScore: 9.8, views: 234 },

  // Remaining 10 phones
  { id: 91, name: 'iPhone SE', brand: 'Apple', model: 'SE 2022', category: 'phone', condition: 'used', price: 329, battery: 88, storage: 64, color: 'Midnight', emoji: '📱', specs: { ram: 4, camera: '12MP', display: '4.7"', processor: 'A15' }, rating: 6, valueScore: 9.7, views: 345 },
  { id: 92, name: 'Galaxy Z Flip 5', brand: 'Samsung', model: 'Z Flip 5', category: 'phone', condition: 'new', price: 999, battery: 100, storage: 256, color: 'Lavender', emoji: '📱', specs: { ram: 8, camera: '12MP', display: '6.7"', processor: 'Snapdragon 8 Gen 2' }, rating: 8, valueScore: 8.5, views: 267 },
  { id: 93, name: 'Galaxy Z Fold 5', brand: 'Samsung', model: 'Z Fold 5', category: 'phone', condition: 'new', price: 1799, battery: 100, storage: 512, color: 'Phantom Black', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '7.6"', processor: 'Snapdragon 8 Gen 2' }, rating: 9, valueScore: 7.8, views: 189 },
  { id: 94, name: 'OnePlus Nord 3', brand: 'OnePlus', model: 'Nord 3', category: 'phone', condition: 'new', price: 399, battery: 100, storage: 256, color: 'Tempest Gray', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.74"', processor: 'Dimensity 9000' }, rating: 7, valueScore: 9.6, views: 289 },
  { id: 95, name: 'Xiaomi 13T', brand: 'Xiaomi', model: '13T', category: 'phone', condition: 'used', price: 429, battery: 89, storage: 256, color: 'Black', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.67"', processor: 'Dimensity 8200' }, rating: 7, valueScore: 9.8, views: 312 },
  { id: 96, name: 'Pixel 7a', brand: 'Google', model: '7a', category: 'phone', condition: 'new', price: 499, battery: 100, storage: 128, color: 'Sea', emoji: '📱', specs: { ram: 8, camera: '64MP', display: '6.1"', processor: 'Tensor G2' }, rating: 7, valueScore: 9.4, views: 234 },
  { id: 97, name: 'Realme GT Neo 5', brand: 'Realme', model: 'GT Neo 5', category: 'phone', condition: 'new', price: 479, battery: 100, storage: 256, color: 'Purple', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.74"', processor: 'Snapdragon 8+ Gen 1' }, rating: 8, valueScore: 9.5, views: 267 },
  { id: 98, name: 'Oppo Find X6', brand: 'Oppo', model: 'Find X6', category: 'phone', condition: 'new', price: 899, battery: 100, storage: 256, color: 'Green', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.74"', processor: 'Dimensity 9200' }, rating: 8, valueScore: 8.7, views: 178 },
  { id: 99, name: 'Vivo X90', brand: 'Vivo', model: 'X90', category: 'phone', condition: 'new', price: 749, battery: 100, storage: 256, color: 'Red', emoji: '📱', specs: { ram: 12, camera: '50MP', display: '6.78"', processor: 'Dimensity 9200' }, rating: 8, valueScore: 8.9, views: 189 },
  { id: 100, name: 'Nothing Phone 1', brand: 'Nothing', model: 'Phone 1', category: 'phone', condition: 'used', price: 399, battery: 86, storage: 128, color: 'White', emoji: '📱', specs: { ram: 8, camera: '50MP', display: '6.55"', processor: 'Snapdragon 8+ Gen 1' }, rating: 7, valueScore: 9.6, views: 289 },
];

// Smart ranking function
export function rankProducts(
  products: Product[],
  sortBy: 'value' | 'price' | 'rating' | 'views' = 'value'
): Product[] {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'value':
        return b.valueScore - a.valueScore;
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      default:
        return 0;
    }
  });
}

// Get similar products
export function getSimilarProducts(product: Product, allProducts: Product[]): Product[] {
  return allProducts
    .filter(p => 
      p.id !== product.id &&
      p.brand === product.brand &&
      p.category === product.category
    )
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, 5);
}

// Get recommendations based on views
export function getRecommendations(viewedProducts: Product[], allProducts: Product[]): Product[] {
  if (viewedProducts.length === 0) {
    return rankProducts(allProducts, 'value').slice(0, 5);
  }

  const avgPrice = viewedProducts.reduce((sum, p) => sum + p.price, 0) / viewedProducts.length;
  const preferredBrands = viewedProducts.map(p => p.brand);

  return allProducts
    .filter(p => !viewedProducts.some(vp => vp.id === p.id))
    .sort((a, b) => {
      const aBrandBonus = preferredBrands.includes(a.brand) ? 2 : 0;
      const bBrandBonus = preferredBrands.includes(b.brand) ? 2 : 0;
      const aPriceDiff = Math.abs(a.price - avgPrice);
      const bPriceDiff = Math.abs(b.price - avgPrice);
      
      return (bBrandBonus - aBrandBonus) || (aPriceDiff - bPriceDiff);
    })
    .slice(0, 5);
}
