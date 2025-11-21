import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SHIRO
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Premium quality dairy products and artisanal condiments. Pure white excellence delivered fresh to your table. Pure taste, pure quality.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shop">
                    Shop
                  </a>
                </Link>
              </li>
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">hello@shiro.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">123 Farm Road, Fresh Valley</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SHIRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
