"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-8xl sm:text-9xl font-bold text-primary mb-4">
            404
          </h1>
          <div className="h-px w-32 mx-auto bg-accent mb-8" />
          <h2 className="font-montserrat text-2xl sm:text-3xl text-primary/80 mb-4">
            Page Not Found
          </h2>
          <p className="font-lato text-lg text-secondary/70 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <span className="inline-flex items-center px-6 py-3 bg-primary text-surface-light rounded-lg font-montserrat font-medium hover:bg-primary-dark transition-colors group">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Return Home
            </span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-montserrat font-medium hover:bg-primary hover:text-surface-light transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-secondary/40 font-montserrat text-sm"
        >
          VALIDÉ
        </motion.div>
      </div>
    </div>
  );
}