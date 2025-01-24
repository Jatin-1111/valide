"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, User, Phone, Loader2, Shield } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

// Separate types for better maintainability
interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface Notifications {
  email: {
    marketing: boolean;
    orderUpdates: boolean;
    security: boolean;
  };
  sms: {
    marketing: boolean;
    orderUpdates: boolean;
  };
}

interface Preferences {
  language: string;
  currency: string;
  notifications: Notifications;
}

interface FormData {
  email: string;
  password: string;
  username: string;
  phone: string;
  language: "en" | "es" | "fr";
  currency: "USD" | "EUR" | "GBP" | "INR";
  address: Address;
  preferences: Preferences;
}

// Updated FormErrors type to match form fields
type AddressErrors = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
};

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  language?: string;
  currency?: string;
  preferences?: string;
  address?: AddressErrors;
  submit?: string;
}

// Constants to avoid recreation
const API_URL = "https://validebackend.onrender.com/api";
const PHONE_REGEX = /^[\d\s+-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Enhanced animations with more sophisticated effects
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  },
  page: {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.98,
      filter: "blur(8px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.98,
      filter: "blur(8px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  field: {
    initial: {
      opacity: 0,
      x: -20,
      filter: "blur(4px)",
    },
    animate: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      filter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  decorativeLine: {
    initial: {
      scaleX: 0,
      opacity: 0,
    },
    animate: (i: number) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.7 + i * 0.1,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },
};

const loadingVariants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const router = useRouter();
  const { checkAuthStatus } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    phone: "",
    language: "en",
    currency: "USD",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    preferences: {
      language: "en",
      currency: "USD",
      notifications: {
        email: {
          marketing: true,
          orderUpdates: true,
          security: true,
        },
        sms: {
          marketing: false,
          orderUpdates: true,
        },
      },
    },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Memoized validation functions
  const validateForm = useCallback(
    (data: FormData, isLoginMode: boolean): FormErrors => {
      const errors: FormErrors = {};

      if (!isLoginMode) {
        if (!data.username?.trim() || data.username.trim().length < 3) {
          errors.username = "Username must be at least 3 characters";
        }
        if (!data.phone || !PHONE_REGEX.test(data.phone)) {
          errors.phone = "Please enter a valid phone number";
        }
        if (!PASSWORD_REGEX.test(data.password)) {
          errors.password =
            "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }

        if (showAddress) {
          const addressErrors: AddressErrors = {};
          if (!data.address?.street)
            addressErrors.street = "Street is required";
          if (!data.address?.city) addressErrors.city = "City is required";
          if (!data.address?.state) addressErrors.state = "State is required";
          if (!data.address?.country)
            addressErrors.country = "Country is required";
          if (!data.address?.postalCode)
            addressErrors.postalCode = "Postal code is required";

          if (Object.keys(addressErrors).length > 0) {
            errors.address = addressErrors;
          }
        }
      }

      if (!data.email || !EMAIL_REGEX.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
      if (!data.password || data.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      return errors;
    },
    [showAddress]
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
            username: formData.username?.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone,
            ...(!isLogin && showAddress && { addresses: [formData.address] }),
            ...(!isLogin &&
              showPreferences && {
                preferences: {
                  language: formData.language,
                  currency: formData.currency,
                  notifications: formData.preferences.notifications,
                },
              }),
          }),
        });

        const responseData = await response.json();

        if (!response.ok || !responseData.success) {
          throw new Error(responseData.message || "Authentication failed");
        }

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.data));

        // Call checkAuthStatus after successful login/registration
        await checkAuthStatus();

        toast.success(
          isLogin ? "Welcome back!" : "Account created successfully!"
        );
        router.push("/");
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
    [
      formData,
      isLogin,
      router,
      validateForm,
      showAddress,
      showPreferences,
      checkAuthStatus,
    ]
  );

  // Memoized input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      if (name.startsWith("address.")) {
        const addressField = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address!,
            [addressField]: value,
          },
        }));
      } else if (name === "phone") {
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

  const isString = (value: unknown): value is string =>
    typeof value === "string";

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
            value={formData[name].toString()}
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
          {formErrors[name] && isString(formErrors[name]) && (
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

  const renderPreferences = useCallback(
    () => (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              name="language"
              value={formData.preferences?.language}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences!,
                    language: e.target.value,
                  },
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary/80">
              Currency
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  currency: e.target.value as "USD" | "EUR" | "GBP" | "INR",
                }))
              }
              className="w-full bg-white border-2 border-accent/20 rounded-lg px-4 py-2 
             text-primary
             focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-300 outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary/80">
            Notification Preferences
          </label>
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-medium">Email Notifications</h4>
              {Object.entries(formData.preferences?.notifications?.email).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notifications: {
                            ...prev.preferences!.notifications!,
                            email: {
                              ...prev.preferences!.notifications!.email,
                              [key]: e.target.checked,
                            },
                          },
                        }))
                      }
                      className="w-4 h-4 rounded border-2 border-accent/20 
             text-accent focus:ring-2 focus:ring-accent/20 
             transition-colors duration-300"
                    />
                    <label className="text-sm">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>
    ),
    [formData]
  );

  const renderAddress = useCallback(
    () => (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={formData.address?.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address!, street: e.target.value },
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary/80">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.address?.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address!, city: e.target.value },
                }))
              }
              className="w-full bg-white border-2 border-accent/20 rounded-lg px-4 py-2 
             text-primary placeholder-primary/50
             focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-300 outline-none"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary/80">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.address?.state}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address!, state: e.target.value },
                }))
              }
              className="w-full bg-white border-2 border-accent/20 rounded-lg px-4 py-2 
             text-primary placeholder-primary/50
             focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-300 outline-none"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary/80">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.address?.country}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address!, country: e.target.value },
                }))
              }
              className="w-full bg-white border-2 border-accent/20 rounded-lg px-4 py-2 
              text-primary placeholder-primary/50
              focus:border-accent focus:ring-2 focus:ring-accent/20
              transition-all duration-300 outline-none"
              placeholder="Enter country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary/80">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.address?.postalCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address!, postalCode: e.target.value },
                }))
              }
              className="w-full bg-white border-2 border-accent/20 rounded-lg px-4 py-2 
             text-primary placeholder-primary/50
             focus:border-accent focus:ring-2 focus:ring-accent/20
             transition-all duration-300 outline-none"
              placeholder="Enter postal code"
            />
          </div>
        </div>
      </motion.div>
    ),
    [formData.address]
  );

  useEffect(() => {
    if (showAddress || showPreferences) {
      const formElement = document.getElementById("auth-form");
      if (formElement) {
        setTimeout(() => {
          formElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    }
  }, [showAddress, showPreferences]);

  return (
    <div className="min-h-screen pt-32 pb-10 bg-gradient-to-br from-[#F5EBE0] to-[#E8DAD0] overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center px-3 md:px-6">
        <motion.div
          className="w-full max-w-4xl"
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

                <div className="grid grid-cols-1 md:grid-cols-5 relative">
                  {/* Enhanced Side Pattern */}
                  <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-accent/10 to-accent/5 p-4 md:p-8 relative overflow-hidden">
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.h2 className="font-playfair text-3xl md:text-5xl text-primary mb-4 relative">
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

                  <div className="md:hidden text-center py-6">
                    <motion.h2
                      className="font-playfair text-4xl text-primary mb-2 relative inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      VALIDÉ
                      <span className="absolute -top-1 -right-1 w-full h-full bg-accent/10 blur-sm z-[-1]" />
                    </motion.h2>
                    <motion.p
                      className="font-montserrat text-primary/80 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {isLogin
                        ? "Welcome back to luxury redefined"
                        : "Join the exclusive world of luxury"}
                    </motion.p>
                  </div>

                  {/* Enhanced Form Section */}
                  <div className="col-span-1 md:col-span-3 p-4 md:p-8">
                    <form
                      id="auth-form"
                      onSubmit={handleSubmit}
                      className="space-y-6 transition-all duration-300 relative"
                    >
                      <AnimatePresence mode="wait">
                        {!isLogin && (
                          <>
                            {renderInput(
                              "username",
                              "text",
                              "Full Name",
                              "Enter your full name",
                              <User
                                size={18}
                                className="group-hover:rotate-12 transition-transform duration-300"
                              />
                            )}
                            {renderInput(
                              "phone",
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

                      {!isLogin && (
                        <div className="space-y-4">
                          {/* Toggle buttons */}
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddress(!showAddress);
                                if (showPreferences) setShowPreferences(false);
                              }}
                              className={`px-4 py-2 rounded-md transition-all ${
                                showAddress
                                  ? "bg-accent text-white"
                                  : "bg-white border border-accent text-accent"
                              }`}
                            >
                              {showAddress ? "Hide Address" : "Add Address"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPreferences(!showPreferences);
                                if (showAddress) setShowAddress(false);
                              }}
                              className={`px-4 py-2 rounded-md transition-all ${
                                showPreferences
                                  ? "bg-accent text-white"
                                  : "bg-white border border-accent text-accent"
                              }`}
                            >
                              {showPreferences
                                ? "Hide Preferences"
                                : "Set Preferences"}
                            </button>
                          </div>

                          {/* Render sections */}
                          <AnimatePresence mode="wait">
                            {showAddress && renderAddress()}
                            {showPreferences && renderPreferences()}
                          </AnimatePresence>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className={`
    w-full bg-gradient-to-r from-accent to-accent-dark
    text-white font-montserrat py-3 sm:py-4 rounded-lg
    transition-all duration-300 relative overflow-hidden
    active:transform active:scale-95
    ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}
  `}
                      >
                        <span className="relative z-10">
                          {isLoading ? (
                            <motion.div
                              className="flex items-center justify-center gap-2"
                              variants={loadingVariants}
                              animate="animate"
                            >
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {isLogin
                                ? "Signing In..."
                                : "Creating Account..."}
                            </motion.div>
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
    </div>
  );
};

export default AuthPage;
