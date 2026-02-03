"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { ProfileService } from "@/services/Profile/ProfileServices";
import EditProfile from "./EditProfile";
import { UserData } from "@/types/Auth/authTypes";
import BallLoader from "../Common/BallLoader";
import ShowProfile from "./ShowProfile";
import BankAccountDetails from "./BankAccountDetails";
import BankAccountPreview from "./BankAccountPreview";

interface ProfilePreviewProps {
  className?: string;
  showEditButton?: boolean;
}

export default function ProfilePreview({
  className = "",
  showEditButton = true,
}: ProfilePreviewProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await ProfileService.getProfile();

      if (response.status === 200) {
        setUserData(response.data.data);
      } else {
        toast.error("Failed to load profile");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    fetchUserData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallLoader />
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className={`bg-white  shadow-md overflow-hidden ${className}`}>
      {/* Header with Gradient Background */}
      {!isEditing && (
        <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Profile Preview</h2>
              <p className="text-blue-100 mt-1">Your account information</p>
            </div>
            {showEditButton && (
              <button
                onClick={handleEditClick}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}

      {/* Profile Content */}
      {isEditing ? (
        <EditProfile
          // Update the initialData prop to handle address properly
          initialData={
            userData
              ? {
                  firstname: userData.firstname || "",
                  lastname: userData.lastname || "",
                  gender: userData.gender || "male",
                  dob: userData.dob || "",
                  address: (() => {
                    // Parse address from API response
                    if (!userData.address) {
                      return {
                        address_1: "",
                        address_2: "",
                        locality: "",
                        city: "",
                        state: "",
                        pincode: "",
                        country: "India",
                      };
                    }

                    if (typeof userData.address === "string") {
                      try {
                        return JSON.parse(userData.address);
                      } catch {
                        // If it's not valid JSON, return default
                        return {
                          address_1: userData.address,
                          address_2: "",
                          locality: "",
                          city: "",
                          state: "",
                          pincode: "",
                          country: "India",
                        };
                      }
                    }

                    // If it's already an object
                    return {
                      address_1: userData.address.address_1 || "",
                      address_2: userData.address.address_2 || "",
                      locality: userData.address.locality || "",
                      city: userData.address.city || "",
                      state: userData.address.state || "",
                      pincode: userData.address.pincode || "",
                      country: userData.address.country || "India",
                    };
                  })(),
                }
              : null
          }
          onCancel={handleCancel}
          onSuccess={handleUpdateSuccess}
        />
      ) : (
        <ShowProfile userData={userData} />
      )}
      <div className="border-t border-gray-300">
        {userData.is_bank ? (
          <BankAccountPreview accountData={userData.bank_accounts} />
        ) : (
          <BankAccountDetails />
        )}
      </div>
    </div>
  );
}
