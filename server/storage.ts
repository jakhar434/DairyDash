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
        name: "Premium Ghee",
        description: "SHIRO Premium ghee - Pure, golden ghee made from grass-fed cow's milk. Rich in flavor and nutrients, perfect for cooking and traditional recipes.",
        price: "999",
        category: "Dairy",
        imageUrl: "/images/shiro_premium_ghee_in_branded_jar.png",
        stock: "50",
      },
      {
        name: "Fresh Curd",
        description: "SHIRO Fresh Curd - Creamy, smooth yogurt curd made fresh daily. Rich in probiotics and calcium for a healthy digestive system.",
        price: "449",
        category: "Dairy",
        imageUrl: "/images/shiro_fresh_curd_in_branded_packaging.png",
        stock: "75",
      },
      {
        name: "Farm Fresh Milk",
        description: "SHIRO Farm Fresh Milk - Pure, fresh milk from local dairy farms. No hormones or artificial additives. Delivered fresh to your door.",
        price: "399",
        category: "Dairy",
        imageUrl: "/images/shiro_farm_fresh_milk_in_bottle.png",
        stock: "100",
      },
      {
        name: "Cold-Pressed Mustard Oil",
        description: "SHIRO Cold-Pressed Mustard Oil - Premium quality mustard oil, cold-pressed to retain all natural nutrients. Perfect for cooking and traditional recipes.",
        price: "849",
        category: "Oils",
        imageUrl: "/images/shiro_mustard_oil_in_branded_bottle.png",
        stock: "60",
      },
      {
        name: "Crunchy Peanut Butter",
        description: "SHIRO Crunchy Peanut Butter - All-natural peanut butter with real peanut chunks. No added sugar or preservatives. Perfect for sandwiches and snacks.",
        price: "699",
        category: "Spreads",
        imageUrl: "/images/shiro_crunchy_peanut_butter_jar.png",
        stock: "80",
      },
      {
        name: "Smooth Peanut Butter",
        description: "SHIRO Smooth Peanut Butter - Silky smooth peanut butter made from premium roasted peanuts. Rich, creamy texture that spreads perfectly.",
        price: "699",
        category: "Spreads",
        imageUrl: "/images/shiro_smooth_peanut_butter_jar.png",
        stock: "85",
      },
      {
        name: "Chocolate Peanut Butter",
        description: "SHIRO Chocolate Peanut Butter - Indulgent chocolate peanut butter spread. Rich cocoa flavor blended with creamy peanuts for a decadent treat.",
        price: "749",
        category: "Spreads",
        imageUrl: "/images/shiro_chocolate_peanut_butter_jar.png",
        stock: "70",
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
