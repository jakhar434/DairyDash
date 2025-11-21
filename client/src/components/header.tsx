import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

interface HeaderProps {
  cartItemCount?: number;
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md -ml-3" data-testid="link-home">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                The Golden Spoon
              </div>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/">
              <a data-testid="link-shop">
                <Button
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  Shop
                </Button>
              </a>
            </Link>
            <Link href="/admin">
              <a data-testid="link-admin">
                <Button
                  variant={isActive("/admin") || location.startsWith("/admin") ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  Admin
                </Button>
              </a>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              data-testid="button-theme-toggle"
              className="hidden sm:flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Link href="/cart">
              <a data-testid="link-cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-xs bg-primary text-primary-foreground"
                      data-testid="badge-cart-count"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </a>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            <Link href="/">
              <a onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-shop">
                <Button
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  Shop
                </Button>
              </a>
            </Link>
            <Link href="/admin">
              <a onClick={() => setMobileMenuOpen(false)} data-testid="link-mobile-admin">
                <Button
                  variant={isActive("/admin") || location.startsWith("/admin") ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                >
                  Admin
                </Button>
              </a>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start font-medium sm:hidden"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setMobileMenuOpen(false);
              }}
              data-testid="button-mobile-theme-toggle"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-5 w-5 mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-2" />
                  Dark Mode
                </>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
