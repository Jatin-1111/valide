"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
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
    { href: "/watches", label: "Watches" },
    { href: "/clothes", label: "Clothes" },
    { href: "/shoes", label: "Shoes" },
    { href: "/accessories", label: "Accessories" },
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        "Gucci",
        "Dior",
        "Prada",
        "Hermès",
        "Balenciaga",
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
        <div className="hidden md:block bg-primary text-background text-center py-2 text-sm">
          New Season Collections: Gucci, Louis Vuitton, Dior & More
        </div>

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
                  whileHover={{ scale: 1.05 }}
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

            {/* Right side icons stay the same */}
            <div className="flex items-center space-x-4">
              {[
                { icon: <Search size={20} />, label: "Search" },
                { icon: <User size={20} />, label: "Account" },
                { icon: <ShoppingBag size={20} />, label: "Cart", badge: "0" },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-surface-dark rounded-md relative"
                >
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
