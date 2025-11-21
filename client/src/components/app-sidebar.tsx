import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    testId: "link-admin-dashboard",
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingBag,
    testId: "link-admin-orders",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
    testId: "link-admin-products",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "/admin";
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold mb-2">
            <span className="bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 bg-clip-text text-transparent">
              SHIRO
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={item.testId}
                  >
                    <Link href={item.url}>
                      <a className="flex items-center gap-2 w-full">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
