"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

const GridPattern = () => {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-surface-dark/30 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={cn(
                "w-10 h-10 flex flex-shrink-0 rounded-[2px]",
                index % 2 === 0
                  ? "bg-surface"
                  : "bg-surface shadow-[0px_0px_1px_3px_rgba(243,237,231,1)_inset]"
              )}
            />
          );
        })
      )}
    </div>
  );
};

// Type definitions
interface FormData {
  brandName: string;
  productName: string;
  description: string;
  price: string;
  category: string;
  gender: string;
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
const FormField = motion.create(Input);
const FormTextArea = motion.create(Textarea);

const ProductForm: React.FC = () => {
  const initialFormState: FormData = {
    brandName: "",
    productName: "",
    description: "",
    price: "",
    category: "",
    gender: "",
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

  // const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
  //   if (!e.target.files) return;

  //   const files = Array.from(e.target.files);
  //   if (files.length > 5) {
  //     setError("Maximum 5 images allowed");
  //     return;
  //   }

  //   const validFiles = files.filter((file) => {
  //     const isValid = file.type.startsWith("image/");
  //     const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
  //     return isValid && isValidSize;
  //   });

  //   if (validFiles.length !== files.length) {
  //     setError(
  //       "Some files were rejected. Please ensure all files are images under 5MB."
  //     );
  //   } else {
  //     setError("");
  //   }

  //   setImages(validFiles);
  // };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    maxFiles: 5,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 5) {
        setError("Maximum 5 images allowed");
        return;
      }

      const validFiles = acceptedFiles.filter(
        (file) => file.size <= 5 * 1024 * 1024
      );

      if (validFiles.length !== acceptedFiles.length) {
        setError(
          "Some files were rejected. Please ensure all files are under 5MB."
        );
        return;
      }

      setImages(validFiles);
      setError("");
    },
    onDropRejected: () => {
      setError("Please upload only image files under 5MB");
    },
  });

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

  const API_URL = "https://validebackend.onrender.com/api/productForm";

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
      formDataToSend.append("gender", formData.gender.toLowerCase().trim());
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

  const renderFileUpload = () => (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={() => fileInputRef.current?.click()}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden border border-surface-dark"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 5) {
              setError("Maximum 5 images allowed");
              return;
            }
            setImages(files);
          }}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-montserrat font-bold text-primary text-base">
            Upload Images
          </p>
          <p className="relative z-20 font-lato text-text-secondary text-base mt-2">
            Drag and drop up to 5 images or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {images.length > 0 ? (
              images.map((file, idx) => (
                <motion.div
                  key={`file-${idx}`}
                  layoutId={`file-upload-${idx}`}
                  className="relative overflow-hidden z-40 bg-surface flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md border border-surface-dark"
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-primary truncate max-w-xs font-lato"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-text-secondary bg-surface-dark font-lato"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-text-secondary">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-surface-dark font-lato"
                    >
                      {file.type}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="font-lato"
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  "relative z-40 bg-surface flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md border border-surface-dark",
                  "group-hover/file:border-accent transition-colors duration-300"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-text-secondary flex flex-col items-center font-lato"
                  >
                    Drop files here
                  </motion.p>
                ) : (
                  <svg
                    className="h-6 w-6 text-text-secondary group-hover/file:text-accent transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-40"
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
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
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
              <motion.div variants={fadeInUp} className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-text-primary font-montserrat font-medium tracking-wide text-sm"
                >
                  Gender Category *
                </Label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded border-surface-dark focus:border-accent focus:ring-accent bg-surface-light font-lato text-base"
                >
                  <option value="">Select the Gender</option>
                  {["Men", "Women"].map((gender, index) => (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </motion.div>
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
              {renderFileUpload()}
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
