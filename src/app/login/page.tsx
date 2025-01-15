"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, User, Phone, Loader2, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Separate types for better maintainability
interface FormData {
  email: string;
  password: string;
  name: string;
  mobile: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  submit?: string;
}

// Constants to avoid recreation
const API_URL = "https://validebackend.onrender.com/api";
const PHONE_REGEX = /^\d{5}-\d{5}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Enhanced animations
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  },
  page: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  },
  field: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  wave: {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  },
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Use reducer pattern for form state management
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Memoized validation functions
  const validateForm = useCallback(
    (data: FormData, isLoginMode: boolean): FormErrors => {
      const errors: FormErrors = {};

      if (!isLoginMode) {
        if (!data.name?.trim() || data.name.trim().length < 3) {
          errors.name = "Name must be at least 3 characters";
        }
        if (!data.mobile || !PHONE_REGEX.test(data.mobile.replace(/\D/g, ""))) {
          errors.mobile = "Please enter a valid 10-digit phone number";
        }
      }

      if (!data.email || !EMAIL_REGEX.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!data.password || data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return errors;
    },
    []
  );

  // Memoized form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setFormErrors({});

      const errors = validateForm(formData, isLogin);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        setIsLoading(false);
        return;
      }

      try {
        const endpoint = isLogin ? "login" : "register";
        const response = await fetch(`${API_URL}/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: formData.name?.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.mobile?.replace(/\D/g, ""),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        if (data.token) {
          localStorage.setItem("token", data.token);
          toast.success(
            isLogin ? "Welcome back!" : "Account created successfully!"
          );
          router.push("/");
          setTimeout(() => window.location.reload(), 100);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        toast.error(errorMessage);
        setFormErrors({ submit: errorMessage });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, isLogin, router]
  );

  // Memoized input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name === "mobile") {
        const digits = value.replace(/\D/g, "").slice(0, 10);
        const formattedValue =
          digits.length > 0
            ? digits.length <= 5
              ? digits
              : `${digits.slice(0, 5)}-${digits.slice(5)}`
            : "";

        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  // Enhanced input field renderer with animations
  const renderInput = useCallback(
    (
      name: keyof FormData,
      type: string,
      label: string,
      placeholder: string,
      icon: React.ReactNode
    ) => (
      <motion.div
        variants={animations.field}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-2"
      >
        <label className="block font-montserrat text-sm text-primary/80 font-medium">
          {label}
        </label>
        <div className="relative group">
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className={`
            w-full bg-white/80 border-2 ${
              formErrors[name] ? "border-red-500" : "border-accent/20"
            } rounded-lg px-4 py-3 text-primary placeholder-primary/30
            focus:border-accent/50 focus:ring-2 focus:ring-accent/20
            transition-all duration-300 outline-none
            group-hover:border-accent/40
          `}
            placeholder={placeholder}
            required
          />
          <div
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent/50
                      group-hover:text-accent transition-colors duration-300"
          >
            {icon}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {formErrors[name] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm flex items-center gap-2"
            >
              <Shield size={14} className="inline" />
              {formErrors[name]}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    ),
    [formData, formErrors, handleInputChange]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EBE0] to-[#E8DAD0] flex items-center justify-center p-3 md:p-6">
      <motion.div
        className="w-full max-w-xl"
        variants={animations.container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            variants={animations.page}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative"
          >
            <div
              className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden
                          border border-white/20 relative"
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

              <div className="grid grid-cols-5 relative">
                {/* Enhanced Side Pattern */}
                <div className="col-span-2 bg-gradient-to-br from-accent/10 to-accent/5 p-8 relative overflow-hidden">
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h2 className="font-playfair text-4xl md:text-5xl text-primary mb-4 relative">
                      VALIDÉ
                      <span className="absolute -top-1 -right-1 w-full h-full bg-accent/10 blur-sm z-[-1]" />
                    </motion.h2>
                    <p className="font-montserrat text-primary/80 text-sm">
                      {isLogin
                        ? "Welcome back to luxury redefined"
                        : "Join the exclusive world of luxury"}
                    </p>
                  </motion.div>

                  {/* Enhanced decorative lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1/2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-accent/30 via-accent/20 to-transparent"
                        style={{
                          bottom: `${i * 20}%`,
                          left: 0,
                          right: 0,
                        }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{
                          scaleX: 1,
                          opacity: 1,
                          transition: {
                            delay: 0.5 + i * 0.1,
                            duration: 1,
                            ease: "easeOut",
                          },
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Enhanced Form Section */}
                <div className="col-span-3 p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <>
                          {renderInput(
                            "name",
                            "text",
                            "Full Name",
                            "Enter your full name",
                            <User
                              size={18}
                              className="group-hover:rotate-12 transition-transform duration-300"
                            />
                          )}
                          {renderInput(
                            "mobile",
                            "tel",
                            "Mobile Number",
                            "XXXXX-XXXXX",
                            <Phone
                              size={18}
                              className="group-hover:rotate-12 transition-transform duration-300"
                            />
                          )}
                        </>
                      )}
                    </AnimatePresence>

                    {renderInput(
                      "email",
                      "email",
                      "Email Address",
                      "Enter your email",
                      <Mail
                        size={18}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                    )}
                    {renderInput(
                      "password",
                      showPassword ? "text" : "password",
                      "Password",
                      "Enter your password",
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:text-accent transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOff
                            size={18}
                            className="group-hover:rotate-12 transition-transform duration-300"
                          />
                        ) : (
                          <Eye
                            size={18}
                            className="group-hover:rotate-12 transition-transform duration-300"
                          />
                        )}
                      </button>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={`
                        w-full bg-gradient-to-r from-accent to-accent-dark
                        text-white font-montserrat py-3 rounded-lg
                        transition-all duration-300 relative overflow-hidden
                        ${
                          isLoading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:shadow-lg"
                        }
                      `}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      <span className="relative z-10">
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {isLogin ? "Signing In..." : "Creating Account..."}
                          </div>
                        ) : isLogin ? (
                          "Sign In"
                        ) : (
                          "Create Account"
                        )}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-accent hover:text-accent-dark font-medium 
                                 transition-colors duration-300 relative group"
                      >
                        <span>
                          {isLogin
                            ? "Need an account? Sign Up"
                            : "Already have an account? Sign In"}
                        </span>
                        <span
                          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-dark 
                                     group-hover:w-full transition-all duration-300"
                        />
                      </button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
