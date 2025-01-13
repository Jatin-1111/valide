"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  LogIn,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const navItems = [
    {
      href: "/designers",
      label: "Designers",
    },
    {
      href: "/new-arrivals",
      label: "New Arrivals",
    },
    {
      href: "/men",
      label: "Men",
    },
    {
      href: "/women",
      label: "Women",
    },
    {
      href: "/sale",
      label: "Sale",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-50 lg:hidden"
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-6 z-50 lg:hidden"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center justify-between mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-serif"
              >
                Menu
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-surface-dark rounded-md"
              >
                <X size={24} />
              </motion.button>
            </div>

            <nav className="space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`block text-lg transition-colors ${
                      pathname === item.href
                        ? "text-accent font-medium"
                        : "text-primary hover:text-accent"
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface MenuItem {
  icon: React.ReactElement;
  label: string;
  href?: string;
  onClick?: () => Promise<void>;
  className?: string;
}

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const response = await fetch(
          "https://validebackend.vercel.app/api/check-auth",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token"); // Clear invalid token
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://validebackend.vercel.app/api/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/"; // This will both redirect and reload
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const authenticatedMenuItems = [
    { icon: <User size={16} />, label: "My Profile", href: "/profile" },
    { icon: <Heart size={16} />, label: "Wishlist", href: "/wishlist" },
    { icon: <Package size={16} />, label: "Orders", href: "/orders" },
    { icon: <Settings size={16} />, label: "Settings", href: "/settings" },
    {
      icon: <LogOut size={16} />,
      label: "Logout",
      onClick: handleLogout,
      className: "text-red-600 hover:text-red-700",
    },
  ];

  const unauthenticatedMenuItems = [
    { icon: <LogIn size={16} />, label: "Login", href: "/login" },
  ];

  const menuItems = isLoggedIn
    ? authenticatedMenuItems
    : unauthenticatedMenuItems;

  const containerVariants = {
    closed: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return (
      <motion.div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-surface-dark rounded-md opacity-50"
        >
          <User size={20} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-surface-dark rounded-md"
      >
        <User size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full right-0 w-56 mt-2 z-50"
          >
            <div className="bg-background rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
              {menuItems.map((item: MenuItem) =>
                item.onClick ? (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex items-center px-4 py-2 text-sm text-primary hover:bg-surface-dark hover:text-accent transition-colors w-full ${
                      item.className || ""
                    }`}
                  >
                    <span className="mr-3 text-primary">{item.icon}</span>
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className={`flex items-center px-4 py-2 text-sm text-primary hover:bg-surface-dark hover:text-accent transition-colors ${
                      item.className || ""
                    }`}
                  >
                    <span className="mr-3 text-primary">{item.icon}</span>
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface DropdownProps {
  href: string;
  label: string;
  isActive: boolean;
  subItems?: string[];
}

const Dropdown = ({ href, label, isActive, subItems }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    closed: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const backgroundVariants = {
    closed: { opacity: 0, scale: 0.95 },
    open: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      animate={isOpen ? "open" : "closed"}
    >
      <Link
        href={href}
        className="relative py-2 text-primary transition-colors block"
      >
        <motion.span
          whileHover={{ color: "#C9AE7C" }}
          className={isActive ? "text-accent font-medium" : ""}
        >
          {label}
        </motion.span>
        {isActive && (
          <motion.span
            layoutId="underline"
            className="absolute bottom-0 left-0 w-full h-0.5 bg-accent"
          />
        )}
      </Link>

      <AnimatePresence>
        {isOpen && subItems && (
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full left-0 w-48 z-50 pt-2"
          >
            {/* Backdrop/Background */}
            <motion.div
              variants={backgroundVariants}
              className="absolute inset-0 bg-background shadow-lg rounded-md"
              style={{ originY: 0 }}
            />

            {/* Content Container */}
            <motion.div className="relative p-4 space-y-2">
              {subItems.map((subItem, index) => (
                <motion.div
                  key={subItem}
                  variants={itemVariants}
                  custom={index}
                  className="relative"
                >
                  <motion.div
                    whileHover={{
                      x: 6,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Link
                      href={`${href}/${subItem
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      className="block text-primary hover:text-accent transition-colors"
                    >
                      {subItem}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Example search suggestions
  const suggestions = [
    "New Arrivals",
    "Best Sellers",
    "Louis Vuitton Bags",
    "Gucci Shoes",
    "Dior Accessories",
  ];

  // Example popular searches
  const popularSearches = [
    "Designer Bags",
    "Summer Collection",
    "Luxury Watches",
    "Men's Sneakers",
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you would typically make an API call to get search results
    // For now, we'll just filter suggestions
    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={onClose}
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-x-0 top-0 bg-background z-50 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Search Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search for products, brands, and more..."
                    className="flex-1 ml-3 text-lg bg-transparent border-none outline-none placeholder:text-primary/50"
                    autoFocus
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-dark rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Content */}
              <div className="space-y-6">
                {searchQuery ? (
                  // Search Results
                  <div className="space-y-4">
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={`/search?q=${encodeURIComponent(result)}`}
                            className="flex items-center space-x-3 p-2 hover:bg-surface-dark rounded-md"
                            onClick={onClose}
                          >
                            <Search className="w-4 h-4 text-primary/50" />
                            <span>{result}</span>
                          </Link>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-primary/50">
                        No results found for &quot;{searchQuery}&quot;
                      </p>
                    )}
                  </div>
                ) : (
                  // Default Content
                  <>
                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-sm font-medium text-primary/50 mb-3">
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(search)}
                            className="px-3 py-1 bg-surface-dark rounded-full text-sm hover:bg-accent hover:text-white transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-sm font-medium text-primary/50 mb-3">
                        Quick Links
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {suggestions.map((suggestion, index) => (
                          <Link
                            key={index}
                            href={`/search?q=${encodeURIComponent(suggestion)}`}
                            className="text-sm hover:text-accent transition-colors"
                            onClick={onClose}
                          >
                            {suggestion}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation items to reflect product categories
  const navItems = [
    {
      href: "/designers",
      label: "Designers",
      subItems: [
        "Louis Vuitton",
        "Tiffany & Co.",
        "Cartier",
        "Prada",
        "Tom Ford",
      ],
    },
    {
      href: "/new-arrivals",
      label: "New Arrivals",
    },
    {
      href: "/men",
      label: "Men",
      subItems: [
        "Clothing",
        "Shoes",
        "Bags",
        "Accessories",
        "Watches",
        "Jewelry",
      ],
    },
    {
      href: "/women",
      label: "Women",
      subItems: [
        "Clothing",
        "Shoes",
        "Bags",
        "Accessories",
        "Watches",
        "Jewelry",
      ],
    },
    {
      href: "/sale",
      label: "Sale",
    },
  ];

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-background"
        }`}
      >
        {/* Designer Brand Banner */}
        {/* <div className="hidden md:block bg-primary text-background text-center py-2 text-sm">
          New Season Collections: Gucci, Louis Vuitton, Dior & More
        </div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 hover:bg-surface-dark rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </motion.button>

            {/* Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block">
                <motion.div
                  className="space-y-1"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="h-px bg-accent w-32" />
                  <h1 className="text-2xl font-serif tracking-wider">VALIDÉ</h1>
                  <div className="h-px bg-accent w-32" />
                </motion.div>
              </Link>
            </div>

            {/* Main Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center space-x-8">
              {navItems.map((item) => (
                <Dropdown
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={isActiveLink(item.href)}
                  subItems={item.subItems}
                />
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-surface-dark rounded-md"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-surface-dark rounded-md"
              >
                <Heart size={20} />
              </motion.button>

              <ProfileMenu />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-surface-dark rounded-md relative"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-accent text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  0
                </span>
              </motion.button>
            </div>
          </div>
        </div>
        <div className="h-[1px] relative bottom-0 bg-secondary" />
      </header>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
