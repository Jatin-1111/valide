"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, User, Phone } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "mobile") {
      value = value.replace(/\D/g, "");
      if (value.length > 0) {
        if (value.length <= 3) {
          value = value;
        } else if (value.length <= 6) {
          value = value.slice(0, 3) + "-" + value.slice(3);
        } else {
          value =
            value.slice(0, 3) +
            "-" +
            value.slice(3, 6) +
            "-" +
            value.slice(6, 10);
        }
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#F5EBE0] relative overflow-hidden">
      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center p-3 md:p-6">
        <motion.div
          className="w-full max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              className="relative"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Split Design Container */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-5">
                  {/* Side Pattern */}
                  <div className="col-span-2 bg-accent/10 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5" />
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="font-playfair text-3xl md:text-4xl text-primary mb-4">
                        VALIDÉ
                      </h2>
                      <p className="font-montserrat text-primary/80 text-sm">
                        {isLogin
                          ? "Welcome back to luxury redefined"
                          : "Join the exclusive world of luxury"}
                      </p>
                    </motion.div>
                    {/* Decorative lines */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-px bg-accent/20"
                          style={{
                            bottom: `${i * 20}%`,
                            left: 0,
                            right: 0,
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            delay: 0.5 + i * 0.1,
                            duration: 1,
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Form Section */}
                  <div className="col-span-3 p-8">
                    <motion.form onSubmit={handleSubmit} className="space-y-6">
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block font-montserrat text-sm text-primary/80 mb-2">
                                Full Name
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  className="w-full bg-white/80 border border-accent/20 rounded-lg px-4 py-3 text-primary placeholder-primary/30 focus:border-accent/50 transition-all duration-300"
                                  placeholder="Enter your full name"
                                  required
                                />
                                <User
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50"
                                  size={18}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-montserrat text-sm text-primary/80 mb-2">
                                Mobile Number
                              </label>
                              <div className="relative">
                                <input
                                  type="tel"
                                  name="mobile"
                                  value={formData.mobile}
                                  onChange={handleInputChange}
                                  className="w-full bg-white/80 border border-accent/20 rounded-lg px-4 py-3 text-primary placeholder-primary/30 focus:border-accent/50 transition-all duration-300"
                                  placeholder="XXX-XXX-XXXX"
                                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                  required
                                />
                                <Phone
                                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50"
                                  size={18}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block font-montserrat text-sm text-primary/80 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white/80 border border-accent/20 rounded-lg px-4 py-3 text-primary placeholder-primary/30 focus:border-accent/50 transition-all duration-300"
                            placeholder="Enter your email"
                            required
                          />
                          <Mail
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50"
                            size={18}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block font-montserrat text-sm text-primary/80 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full bg-white/80 border border-accent/20 rounded-lg px-4 py-3 text-primary placeholder-primary/30 focus:border-accent/50 transition-all duration-300"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50 hover:text-accent transition-colors duration-300"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </motion.div>

                      {isLogin && (
                        <motion.div
                          className="text-right"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <button
                            type="button"
                            className="font-montserrat text-sm text-accent hover:text-accent-light transition-colors duration-300"
                          >
                            Forgot Password?
                          </button>
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent-dark text-white font-montserrat py-3 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLogin ? "Sign In" : "Create Account"}
                      </motion.button>

                      <motion.div
                        className="text-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <p className="font-lato text-primary/60">
                          {isLogin
                            ? "Don't have an account? "
                            : "Already have an account? "}
                          <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-accent hover:text-accent-dark font-medium transition-colors duration-300"
                          >
                            {isLogin ? "Sign Up" : "Sign In"}
                          </button>
                        </p>
                      </motion.div>
                    </motion.form>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
