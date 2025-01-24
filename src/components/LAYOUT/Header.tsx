"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Gift,
  Heart,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Tag,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../AuthProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShopCategory {
  label: string;
  href: string;
  subcategories?: string[];
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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

  const shopCategories: ShopCategory[] = [
    {
      label: "Designers",
      href: "/designers",
      subcategories: [
        "Louis Vuitton",
        "Prada",
        "Gucci",
        "Cartier",
        "Tiffany & Co.",
      ],
    },
    {
      label: "Men",
      href: "/men",
    },
    {
      label: "Women",
      href: "/women",
    },
  ];

  const quickLinks = [
    { href: "/new-arrivals", label: "New Arrivals", icon: Sparkles },
    { href: "/sale", label: "Sale", icon: Tag },
    { href: "/gifts", label: "Gift Cards", icon: Gift },
  ];

  const accountLinks = [
    { href: "/account", label: "My Account", icon: User },
    { href: "/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-50 lg:hidden backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-background z-50 lg:hidden overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background p-4 border-b border-surface-dark">
              <div className="flex items-center justify-between">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-playfair text-primary"
                >
                  Menu
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 hover:bg-surface-dark rounded-md text-primary"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-surface px-4 py-2 pr-10 rounded-md border border-surface-dark focus:border-accent focus:outline-none text-primary"
                  />
                  <Search
                    className="absolute right-3 top-2.5 text-text-secondary"
                    size={20}
                  />
                </div>
              </motion.div>
            </div>

            {/* Main Navigation */}
            <div className="p-4 space-y-6">
              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {quickLinks.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-surface-dark"
                      onClick={onClose}
                    >
                      <item.icon size={20} className="text-accent" />
                      <span className="text-primary font-medium">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Shop Categories */}
              <div className="space-y-4">
                <h3 className="text-text-secondary font-medium px-2">
                  Shop Categories
                </h3>
                {shopCategories.map((category, i) => (
                  <motion.div
                    key={category.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 3) * 0.1 }}
                    className="space-y-2"
                  >
                    <Link
                      href={category.href}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-surface-dark"
                      onClick={onClose}
                    >
                      <span className="text-primary">{category.label}</span>
                      <ChevronRight size={20} className="text-text-secondary" />
                    </Link>
                    {category.subcategories && (
                      <div className="pl-4 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            href={`${
                              category.href
                            }/${subcategory.toLowerCase()}`}
                            className="block p-2 text-text-secondary hover:text-accent text-sm"
                            onClick={onClose}
                          >
                            {subcategory}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Account Section */}
              <div className="space-y-4">
                <h3 className="text-text-secondary font-medium px-2">
                  Account
                </h3>
                {accountLinks.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 6) * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-surface-dark"
                      onClick={onClose}
                    >
                      <item.icon size={20} className="text-accent" />
                      <span className="text-primary">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="space-y-4 border-t border-surface-dark pt-4">
                <h3 className="text-text-secondary font-medium px-2">
                  Contact Us
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 text-text-secondary">
                    <Phone size={20} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 text-text-secondary">
                    <Mail size={20} />
                    <span>support@store.com</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 text-text-secondary">
                    <MapPin size={20} />
                    <span>123 Fashion Street, NY</span>
                  </div>
                </div>
              </div>
            </div>
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
  const { isLoggedIn, isLoading, handleLogout } = useAuth();

  const authenticatedMenuItems = [
    { icon: <User size={16} />, label: "My Profile", href: "/profile" },
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
                        .replace(" ", "-")
                        .replace(" ", "-")
                        .replace(".", " ")}`}
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

  const isDevelopment = process.env.NEXT_PUBLIC_ENV === "development";

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

  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isDevelopment
            ? "bg-slate-950"
            : isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-background"
        }`}
      >
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
            <nav className="hidden md:flex md:justify-end lg:justify-center lg:flex-1 space-x-4 lg:space-x-8">
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
            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4">
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
