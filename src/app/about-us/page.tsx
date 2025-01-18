"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  Gem,
  Crown,
  Award,
  Globe2,
  Scale,
  Star,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stats = [
    { value: "25+", label: "Luxury Brands" },
    { value: "10K+", label: "Premium Products" },
    { value: "15+", label: "Countries" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const expertise = [
    {
      icon: <Crown className="w-8 h-8 text-accent" />,
      title: "Heritage Authentication",
      description:
        "Expert verification of brand heritage and authenticity through established protocols.",
    },
    {
      icon: <Scale className="w-8 h-8 text-accent" />,
      title: "Quality Standards",
      description:
        "Rigorous assessment of craftsmanship and material excellence.",
    },
    {
      icon: <Star className="w-8 h-8 text-accent" />,
      title: "Prestige Curation",
      description: "Meticulous selection of distinguished luxury offerings.",
    },
  ];

  const values = [
    {
      icon: <BadgeCheck className="w-8 h-8 text-accent" />,
      title: "Authenticity Assurance",
      description:
        "Stringent verification processes ensure every endorsed brand meets luxury standards.",
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Legacy Protection",
      description:
        "Safeguarding the heritage and reputation of prestigious fashion houses.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-accent" />,
      title: "Global Excellence",
      description:
        "International network of verified luxury partnerships and authentication.",
    },
    {
      icon: <Gem className="w-8 h-8 text-accent" />,
      title: "Curated Distinction",
      description:
        "Selective endorsement of exceptional luxury experiences and products.",
    },
  ];

  return (
    <div className="bg-background pt-20">
      {/* Sophisticated Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/40 z-10" />
          <Image
            src="/about-hero.webp"
            alt="Luxury fashion showcase"
            fill
            className="object-cover"
            priority={true}
            sizes="100vw"
            quality={90}
          />
        </div>

        <div className="relative z-20 text-center text-surface-light max-w-4xl mx-auto px-4">
          <motion.div className="mb-6 inline-block" {...fadeInUp}>
            <Award className="w-16 h-16 mb-4 mx-auto text-accent" />
          </motion.div>
          <motion.h1
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            {...fadeInUp}
          >
            The Art of Luxury
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-light max-w-3xl mx-auto font-montserrat"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Elevating the world&apos;s finest luxury brands through
            distinguished endorsement and authentication
          </motion.p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative -mt-16 z-30 max-w-6xl mx-auto px-4">
        <motion.div
          className="bg-surface shadow-2xl rounded-xl grid grid-cols-2 md:grid-cols-4 gap-8 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-playfair font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-secondary font-montserrat">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Heritage & Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-primary mb-6">
                Heritage of Excellence
              </h2>
              <div className="h-1 w-24 bg-accent mb-8" />
            </div>
            <p className="text-secondary text-lg leading-relaxed">
              Since our inception, VALIDÉ has stood as the premier authority in
              luxury brand authentication and endorsement. Our platform bridges
              the gap between prestigious fashion houses and discerning
              consumers, ensuring the highest standards of authenticity and
              excellence.
            </p>
            <p className="text-secondary text-lg leading-relaxed">
              Through meticulous verification processes and unparalleled
              expertise, we uphold the legacy of luxury while fostering
              meaningful connections between iconic brands and their admirers.
            </p>
          </motion.div>
          <motion.div
            className="relative h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src="/about-heritage.webp"
              alt="Heritage of luxury craftsmanship"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Expertise Section */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Our Expertise
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative p-8 bg-surface rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="absolute -top-6 left-8 bg-background p-4 rounded-lg shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-montserrat text-xl font-bold text-primary mt-6 mb-4">
                  {item.title}
                </h3>
                <p className="text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner Brands */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Distinguished Partners
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-8" />
            <p className="text-secondary text-lg max-w-3xl mx-auto">
              Collaborating with the world&apos;s most prestigious luxury houses
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              "Louis Vuitton",
              "Cartier",
              "Prada",
              "Tiffany & Co.",
              "Tom Ford",
            ].map((brand, index) => (
              <motion.div
                key={brand}
                className="flex flex-col items-center justify-center p-8 bg-surface rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-primary font-playfair text-xl text-center">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Our Principles
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mb-8" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="p-8 bg-surface rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="font-montserrat text-xl font-bold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Elegant Call to Action */}
        <motion.div
          className="text-center bg-surface p-16 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
            Experience True Luxury
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto mb-8">
            Discover our curated selection of endorsed luxury brands and
            experience unparalleled excellence.
          </p>
          <Link href="/designers" className="inline-block">
            <span className="inline-flex items-center gap-3 px-12 py-5 bg-accent text-surface-light text-lg font-semibold rounded-lg hover:bg-accent-dark transition-all duration-300 shadow-lg">
              Explore Our Collection
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
