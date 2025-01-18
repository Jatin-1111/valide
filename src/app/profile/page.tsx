"use client";
import React, { useEffect, useState } from "react";
import { Settings, ShoppingBag, Heart, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  phone: string;
  email?: string;
  _id?: string;
};

const ProfilePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = () => {
    try {
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!token || !userData) {
        setIsLoggedIn(false);
        setIsLoading(false);
        router.push("/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(userData) as User;
        setUser(parsedUser);
        setIsLoggedIn(true);
        setError(null);
      } catch (parseError) {
        console.error("Error parsing user data:", parseError);
        setError("Invalid user data format");
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      setError("Failed to connect to the server");
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5EBE0] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9AE7C]" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Router will handle redirect
  }

  return (
    <div className="min-h-screen bg-[#F5EBE0]">
      {/* Header Section */}
      <div className="bg-[#463F3A] text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="font-['Playfair_Display'] text-3xl">My Profile</h1>
        </div>
      </div>

      {error && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-[#8B4A4A] text-white px-4 py-2 rounded-md">
            {error}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[#C9AE7C] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="font-['Playfair_Display'] text-2xl text-white">
                    {user?.username?.charAt(0)}
                  </span>
                </div>
                <h2 className="font-['Montserrat'] text-lg font-medium text-[#463F3A]">
                  {user?.username}
                </h2>
                <p className="font-['Lato'] text-sm text-[#8A817C]">
                  {user?.phone}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 font-['Lato'] ${
                    activeTab === "orders"
                      ? "bg-[#F5EBE0] text-[#463F3A]"
                      : "text-[#8A817C] hover:bg-[#F8F5F1]"
                  }`}
                >
                  <ShoppingBag size={18} />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 font-['Lato'] ${
                    activeTab === "wishlist"
                      ? "bg-[#F5EBE0] text-[#463F3A]"
                      : "text-[#8A817C] hover:bg-[#F8F5F1]"
                  }`}
                >
                  <Heart size={18} />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-3 font-['Lato'] ${
                    activeTab === "settings"
                      ? "bg-[#F5EBE0] text-[#463F3A]"
                      : "text-[#8A817C] hover:bg-[#F8F5F1]"
                  }`}
                >
                  <Settings size={18} />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md flex items-center gap-3 font-['Lato'] text-[#8B4A4A] hover:bg-[#F8F5F1]"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm min-h-[600px]">
              {activeTab === "settings" && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl mb-6 text-[#463F3A]">
                    Account Settings
                  </h3>
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div>
                      <label className="block font-['Montserrat'] text-sm font-medium text-[#463F3A] mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md font-['Lato']"
                        value={user?.username || ""}
                        onChange={(e) =>
                          setUser((prev) =>
                            prev ? { ...prev, username: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-['Montserrat'] text-sm font-medium text-[#463F3A] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md font-['Lato']"
                        value={user?.email || ""}
                        onChange={(e) =>
                          setUser((prev) =>
                            prev ? { ...prev, email: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className="block font-['Montserrat'] text-sm font-medium text-[#463F3A] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border rounded-md font-['Lato']"
                        value={user?.phone || ""}
                        onChange={(e) =>
                          setUser((prev) =>
                            prev ? { ...prev, phone: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-[#C9AE7C] text-white px-6 py-2 rounded-md hover:bg-[#B89B69] transition-colors font-['Montserrat'] disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              )}

              {/* Other tabs remain the same */}
              {activeTab === "orders" && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl mb-6 text-[#463F3A]">
                    Order History
                  </h3>
                  <div className="space-y-4">
                    {/* Add order fetching logic here */}
                    <p className="text-[#8A817C] font-['Lato']">
                      No orders found.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl mb-6 text-[#463F3A]">
                    My Wishlist
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Add wishlist fetching logic here */}
                    <p className="text-[#8A817C] font-['Lato']">
                      Your wishlist is empty.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
