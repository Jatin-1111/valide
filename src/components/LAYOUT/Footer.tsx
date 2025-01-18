'use client'
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  const socialLinks = [
    { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: faFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: faTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: faYoutube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-surface-light">
      {/* Newsletter Section */}
      <div className="border-b border-surface-light/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h3 className="font-playfair text-2xl sm:text-3xl mb-2 sm:mb-4">
                Join the VALIDÉ Community
              </h3>
              <p className="font-lato text-surface-light/80 text-sm sm:text-base">
                Subscribe to receive exclusive offers, early access, and luxury
                insights.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 sm:py-3 bg-transparent border border-surface-light/20 rounded-lg focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-accent hover:bg-accent-dark transition-colors rounded-lg font-montserrat whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs sm:text-sm text-surface-light/60 text-center sm:text-left">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4 sm:space-y-6">
            <Link href="/">
              <div className="space-y-1 inline-block">
                <div className="h-px bg-accent w-24 sm:w-32" />
                <h1 className="text-xl sm:text-2xl font-serif tracking-wider">
                  VALIDÉ
                </h1>
                <div className="h-px bg-accent w-24 sm:w-32" />
              </div>
            </Link>
            <p className="font-lato text-sm sm:text-base text-surface-light/80">
              Curated luxury fashion and accessories for the discerning
              collector.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="w-4 sm:w-5 h-4 sm:h-5"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-base sm:text-lg font-medium">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              {["New Arrivals", "Designers", "Men", "Women", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-surface-light/80 hover:text-accent transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-base sm:text-lg font-medium">
              Customer Service
            </h4>
            <ul className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              {[
                "Contact Us",
                "Shipping & Returns",
                "Size Guide",
                "FAQs",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-surface-light/80 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-montserrat text-base sm:text-lg font-medium">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-surface-light/80 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-surface-light/10">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-between">
            {/* Payment Methods */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {["visa", "mastercard", "amex", "paypal"].map((payment) => (
                <div
                  key={payment}
                  className="bg-surface-light/5 p-2 rounded-lg w-14 sm:w-16 h-8 flex items-center justify-center"
                >
                  <Image
                    src={`/${payment}.svg`}
                    alt={payment}
                    width={36}
                    height={24}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs sm:text-sm text-surface-light/60 text-center sm:text-right">
              © {new Date().getFullYear()} VALIDÉ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
