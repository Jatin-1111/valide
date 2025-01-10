"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebookF,
  faTwitter,
  faYoutube,
  faPinterestP,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  const socialLinks = [
    { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: faFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: faTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: faYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: faPinterestP, href: "https://pinterest.com", label: "Pinterest" },
    { icon: faTiktok, href: "https://tiktok.com", label: "TikTok" },
  ];

  return (
    <footer className="bg-primary text-surface-light">
      {/* Newsletter Section */}
      <div className="border-b border-surface-light/10">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-playfair text-3xl mb-4">
                Join the VALIDÉ Community
              </h3>
              <p className="font-lato text-surface-light/80">
                Subscribe to receive exclusive offers, early access, and luxury
                insights.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-transparent border border-surface-light/20 rounded-lg focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent hover:bg-accent-dark transition-colors rounded-lg font-montserrat"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-surface-light/60">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/">
              <div className="space-y-1">
                <div className="h-px bg-accent w-32" />
                <h1 className="text-2xl font-serif tracking-wider">VALIDÉ</h1>
                <div className="h-px bg-accent w-32" />
              </div>
            </Link>
            <p className="font-lato text-surface-light/80">
              Curated luxury fashion and accessories for the discerning
              collector.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
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
          <div>
            <h4 className="font-montserrat text-lg mb-6">Customer Service</h4>
            <ul className="space-y-4">
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
          <div>
            <h4 className="font-montserrat text-lg mb-6">Company</h4>
            <ul className="space-y-4">
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
        <div className="mt-16 pt-8 border-t border-surface-light/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Payment Methods */}
            <div className="flex flex-wrap gap-4">
              {[
                { name: "visa", alt: "Visa" },
                { name: "mastercard", alt: "Mastercard" },
                { name: "amex", alt: "American Express" },
                { name: "paypal", alt: "PayPal" },
              ].map((payment) => (
                <div
                  key={payment.name}
                  className="bg-surface-light/5 p-2 rounded-lg w-16 h-8 flex items-center justify-center relative"
                >
                  <Image
                    src={`/${payment.name}.svg`}
                    alt={payment.alt}
                    width={40}
                    height={24}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-surface-light/60 md:text-right">
              © {new Date().getFullYear()} VALIDÉ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
