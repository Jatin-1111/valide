"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Upload, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// Type definitions
interface FormData {
  brandName: string;
  productName: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  specifications: string;
  images: File[];
}

interface FormFieldProps {
  id: string;
  name: keyof FormData;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  className: string;
  required?: boolean;
  type?: string;
  min?: string;
  step?: string;
}

// Animation variants
const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const staggeredContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Styled components with motion
const FormField = motion(Input);
const FormTextArea = motion(Textarea);

const ProductForm: React.FC = () => {
  const initialFormState: FormData = {
    brandName: "",
    productName: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    specifications: "",
    images: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const brands = [
    "Louis Vuitton",
    "TomFord",
    "Tiffany & Co.",
    "Prada",
    "Cartier",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValid && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setError(
        "Some files were rejected. Please ensure all files are images under 5MB."
      );
    } else {
      setError("");
    }

    setImages(validFiles);
  };

  const validateForm = (): boolean => {
    if (
      !formData.brandName ||
      !formData.productName ||
      !formData.price ||
      !formData.category ||
      !formData.stock
    ) {
      setError("Please fill in all required fields");
      return false;
    }

    if (images.length === 0) {
      setError("Please upload at least one product image");
      return false;
    }

    return true;
  };

  // Define response type for better type safety
  interface ApiResponse {
    success: boolean;
    message?: string;
    data?: FormData;
  }

  const API_URL = "http://localhost:5000/api/productForm";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Reset states
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData object with a different name to avoid conflict
      const formDataToSend = new FormData();

      // Append form fields
      formDataToSend.append(
        "brandName",
        formData.brandName.toLowerCase().trim()
      );
      formDataToSend.append("productName", formData.productName.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category.trim());
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append(
        "specification",
        formData.specifications?.trim() || ""
      );

      // Append each image
      images.forEach((image) => {
        formDataToSend.append(`images`, image); // Keep the field name consistent
      });

      const response = await fetch(API_URL, {
        method: "POST",
        body: formDataToSend,
        // Let the browser set the Content-Type header for FormData
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit product");
      }

      // Success handling
      setSuccess(true);
      setFormData(initialFormState);
      setImages([]);
      toast?.success("Product added successfully!");
    } catch (error) {
      // Error handling
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit product. Please try again.";

      setError(errorMessage);
      console.error("Product submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormField = (props: FormFieldProps) => {
    const Component =
      props.name === "description" || props.name === "specifications"
        ? FormTextArea
        : FormField;

    return (
      <Component
        {...props}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-20"
    >
      <Card className="w-full max-w-2xl mx-auto bg-surface shadow-lg">
        <CardHeader className="border-b border-surface-dark">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardTitle className="font-playfair text-2xl text-primary tracking-wide">
              Add New Product
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.form
            variants={staggeredContainer}
            initial="initial"
            animate="animate"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Brand Name Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="brandName"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Brand Name *
              </Label>
              <select
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base"
              >
                <option value="">Select the Brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Product Name Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="productName"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Product Name *
              </Label>
              {renderFormField({
                id: "productName",
                name: "productName",
                value: formData.productName,
                onChange: handleInputChange,
                placeholder: "Enter product name",
                className:
                  "border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
                required: true,
              })}
            </motion.div>

            {/* Description Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="description"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Description
              </Label>
              {renderFormField({
                id: "description",
                name: "description",
                value: formData.description,
                onChange: handleInputChange,
                placeholder: "Enter product description",
                className:
                  "h-32 border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
              })}
            </motion.div>

            {/* Price and Stock Fields */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
                >
                  Price *
                </Label>
                {renderFormField({
                  id: "price",
                  name: "price",
                  type: "number",
                  value: formData.price,
                  onChange: handleInputChange,
                  placeholder: "Enter price",
                  className:
                    "border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
                  min: "0",
                  step: "0.01",
                  required: true,
                })}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="stock"
                  className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
                >
                  Stock *
                </Label>
                {renderFormField({
                  id: "stock",
                  name: "stock",
                  type: "number",
                  value: formData.stock,
                  onChange: handleInputChange,
                  placeholder: "Enter stock quantity",
                  className:
                    "border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
                  min: "0",
                  required: true,
                })}
              </div>
            </motion.div>

            {/* Category Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="category"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Category *
              </Label>
              {renderFormField({
                id: "category",
                name: "category",
                value: formData.category,
                onChange: handleInputChange,
                placeholder: "Enter product category",
                className:
                  "border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
                required: true,
              })}
            </motion.div>

            {/* Specifications Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="specifications"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Specifications
              </Label>
              {renderFormField({
                id: "specifications",
                name: "specifications",
                value: formData.specifications,
                onChange: handleInputChange,
                placeholder: "Enter product specifications",
                className:
                  "h-32 border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base",
              })}
            </motion.div>

            {/* Image Upload Field */}
            <motion.div variants={fadeInUp} className="space-y-2">
              <Label
                htmlFor="images"
                className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
              >
                Product Images *
              </Label>
              <motion.div
                className="flex items-center justify-center w-full"
                variants={{
                  hover: { scale: 1.02 },
                  initial: { scale: 1 },
                }}
                whileHover="hover"
                initial="initial"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-surface-light hover:bg-surface-dark border-surface-dark transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-text-secondary" />
                    <p className="mb-2 text-sm text-text-secondary font-montserrat">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-text-secondary font-lato">
                      Max 5 images (PNG, JPG, JPEG up to 5MB each)
                    </p>
                  </div>
                  <Input
                    id="images"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </motion.div>
              <AnimatePresence>
                {images.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-text-secondary font-lato"
                  >
                    {images.length} files selected
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Error and Success Messages */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert className="bg-surface-light border-state-error text-state-error">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="font-lato">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Alert className="bg-surface-light border-state-success text-state-success">
                    <Check className="h-4 w-4" />
                    <AlertDescription className="font-lato">
                      Product added successfully!
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.div variants={fadeInUp}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-accent hover:bg-accent-dark text-primary font-montserrat font-medium tracking-wide transition-all duration-300 rounded-md py-2 ${
                  isSubmitting ? "opacity-75" : ""
                }`}
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 },
                  initial: { scale: 1 },
                }}
                whileHover="hover"
                whileTap="tap"
                initial="initial"
              >
                {isSubmitting ? "Adding Product..." : "Add Product"}
              </motion.button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductForm;
