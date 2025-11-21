import {
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Orders
  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "Premium Ghee (घी)",
        description: "Frosteva Premium Ghee - Pure, golden ghee made from grass-fed cow's milk. Bilingual packaging with complete nutritional information (Calories, Protein, Fat, Carbs). Rich in flavor and nutrients.",
        price: "450",
        category: "Dairy",
        imageUrl: "/images/frosteva_ghee_250g_bilingual_packaging.png",
        stock: "50",
        variants: JSON.stringify([
          { id: "ghee-250g", name: "250g", price: "450", size: "250g" },
          { id: "ghee-500g", name: "500g", price: "900", size: "500g" },
          { id: "ghee-1kg", name: "1kg", price: "1800", size: "1kg" },
        ]),
      },
      {
        name: "Fresh Curd (दही)",
        description: "Frosteva Fresh Curd - Creamy, smooth yogurt curd made fresh daily. Bilingual packaging, nutrition facts showing protein, fat, carbs. Rich in probiotics and calcium.",
        price: "50",
        category: "Dairy",
        imageUrl: "/images/frosteva_curd_bilingual_nutrition_label.png",
        stock: "75",
        variants: JSON.stringify([
          { id: "curd-400g", name: "400g (1 serving)", price: "50", size: "400g" },
          { id: "curd-800g", name: "800g (2 servings)", price: "100", size: "800g" },
          { id: "curd-1kg", name: "1kg (2.5 servings)", price: "125", size: "1kg" },
        ]),
      },
      {
        name: "Farm Fresh Milk (दूध)",
        description: "Frosteva Farm Fresh Milk - Pure, fresh milk from local dairy farms. Bilingual packaging with complete nutrition label. No hormones or artificial additives.",
        price: "60",
        category: "Dairy",
        imageUrl: "/images/frosteva_milk_1l_bilingual_label.png",
        stock: "100",
        variants: JSON.stringify([
          { id: "milk-500ml", name: "500ml", price: "30", size: "500ml" },
          { id: "milk-1l", name: "1 Litre", price: "60", size: "1L" },
          { id: "milk-1.5l", name: "1.5 Litre", price: "90", size: "1.5L" },
        ]),
      },
      {
        name: "Cold-Pressed Mustard Oil (सरसों का तेल)",
        description: "Frosteva Cold-Pressed Mustard Oil - Premium quality 100% cold-pressed. Bilingual packaging with nutrition facts and benefits. Perfect for cooking and traditional recipes.",
        price: "290",
        category: "Oils",
        imageUrl: "/images/frosteva_mustard_oil_1l_bilingual.png",
        stock: "60",
        variants: JSON.stringify([
          { id: "oil-500ml", name: "500ml", price: "145", size: "500ml" },
          { id: "oil-1l", name: "1 Litre", price: "290", size: "1L" },
          { id: "oil-2l", name: "2 Litre", price: "550", size: "2L" },
        ]),
      },
      {
        name: "Crunchy Peanut Butter (मूंगफली का मक्खन)",
        description: "Frosteva Crunchy Peanut Butter - All-natural with real peanut chunks. Bilingual packaging with complete nutrition label (protein, fat, carbs, sodium). No added sugar.",
        price: "320",
        category: "Spreads",
        imageUrl: "/images/frosteva_peanut_butter_500g_bilingual.png",
        stock: "80",
        variants: JSON.stringify([
          { id: "peanut-crunchy-250g", name: "250g", price: "160", size: "250g" },
          { id: "peanut-crunchy-500g", name: "500g", price: "320", size: "500g" },
          { id: "peanut-crunchy-1kg", name: "1kg", price: "640", size: "1kg" },
        ]),
      },
      {
        name: "Smooth Peanut Butter (मूंगफली का मक्खन)",
        description: "Frosteva Smooth Peanut Butter - Silky smooth made from premium roasted peanuts. Bilingual packaging with nutritional information (calories, protein, fat, carbs). Perfect texture.",
        price: "320",
        category: "Spreads",
        imageUrl: "/images/frosteva_peanut_butter_500g_bilingual.png",
        stock: "85",
        variants: JSON.stringify([
          { id: "peanut-smooth-250g", name: "250g", price: "160", size: "250g" },
          { id: "peanut-smooth-500g", name: "500g", price: "320", size: "500g" },
          { id: "peanut-smooth-1kg", name: "1kg", price: "640", size: "1kg" },
        ]),
      },
      {
        name: "Chocolate Peanut Butter (चॉकलेट मूंगफली मक्खन)",
        description: "Frosteva Chocolate Peanut Butter - Indulgent chocolate blend. Bilingual packaging with full nutrition facts. Rich cocoa flavor blended with creamy peanuts for a decadent treat.",
        price: "360",
        category: "Spreads",
        imageUrl: "/images/frosteva_peanut_butter_500g_bilingual.png",
        stock: "70",
        variants: JSON.stringify([
          { id: "peanut-choco-250g", name: "250g", price: "180", size: "250g" },
          { id: "peanut-choco-500g", name: "500g", price: "360", size: "500g" },
          { id: "peanut-choco-1kg", name: "1kg", price: "720", size: "1kg" },
        ]),
      },
    ];

    initialProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(
    id: string,
    updates: Partial<InsertProduct>
  ): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Orders
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
}

export const storage = new MemStorage();
