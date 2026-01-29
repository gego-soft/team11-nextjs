"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaMapMarkerAlt,
  FaTransgender,
  FaLink,
} from "react-icons/fa";
import { getCurrentUserCall } from "@/services/Profile/ProfileServices";
import EditProfile from "./EditProfile";
import { formatAddress } from "@/utils/helpter";

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  referral_id: string | null;
  firstname: string | null;
  lastname: string | null;
  gender: string | null;
  dob: string | null;
  address:
    | string
    | {
        address_1?: string;
        address_2?: string;
        locality?: string;
        city?: string;
        state?: string;
        pincode?: string;
        country?: string;
      }
    | null;
  profile_img: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  referral_name: string | null;
  referral_link: string;
  profile_img_url: string;
}

interface ProfilePreviewProps {
  className?: string;
  showEditButton?: boolean;
  onEditClick?: () => void;
}

export default function ProfilePreview({
  className = "",
  showEditButton = true,
  onEditClick,
}: ProfilePreviewProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserCall();

      if (response.status === 200) {
        setUserData(response.data.data);
        setError(null);
      } else {
        setError("Failed to load profile data");
        toast.error("Failed to load profile");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || "Failed to load profile");
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatGender = (gender: string | null) => {
    if (!gender) return "Not set";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdateSuccess = () => {
    setIsEditing(false);
    // Refresh user data
    fetchUserData();
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl shadow-md p-6 animate-pulse ${className}`}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <FaUser className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Unable to load profile
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
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
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
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
        <div className="p-6">
          {/* Profile Picture & Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                {userData.profile_img_url &&
                userData.profile_img_url !== "http://team11.test/storage" ? (
                  <Image
                    src={userData.profile_img_url}
                    alt={userData.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {getInitials(userData.name)}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Active
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
                {userData.name}
              </h1>
              {userData.firstname && userData.lastname && (
                <p className="text-gray-600 mb-1 capitalize">
                  {userData.firstname} {userData.lastname}
                </p>
              )}
              <p className="text-gray-500 text-sm mb-3">
                Member since {formatDate(userData.created_at)}
              </p>
              {/* <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
              <FaIdCard className="w-4 h-4 mr-2" />
              ID: {userData.id}
            </div> */}
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <FaEnvelope className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900 font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {userData.email_verified_at ? (
                  <span className="text-green-600">✓ Verified</span>
                ) : (
                  <span className="text-yellow-600">⚠ Not verified</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <FaPhone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {userData.mobile_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <FaCalendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {formatDate(userData.dob)}
                  </p>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <FaTransgender className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="text-gray-900 font-medium">
                    {formatGender(userData.gender)}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
              <div className="flex items-start mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-1">
                  <FaMapMarkerAlt className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-gray-900 font-medium">
                    {formatAddress(userData.address)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Information */}
          {userData.referral_link && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Referral Information
              </h3>
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-800">Referral Name</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">
                      {userData.referral_name || userData.name}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <FaLink className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        Referral Link
                      </span>
                    </div>
                    <div className="flex items-center">
                      <code className="bg-white px-3 py-2 rounded border text-sm text-gray-800 font-mono break-all">
                        {window.location.origin}
                        {userData.referral_link}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}${userData.referral_link}`,
                          );
                          toast.success("Referral link copied!");
                        }}
                        className="ml-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Status */}
          {/* <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Account Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2FA</div>
              <div className="text-sm text-gray-600 mt-1">
                {userData.two_factor_confirmed_at ? "Enabled" : "Disabled"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {userData.status === 1 ? "Active" : "Inactive"}
              </div>
              <div className="text-sm text-gray-600 mt-1">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatDate(userData.created_at).split(" ")[0]}
              </div>
              <div className="text-sm text-gray-600 mt-1">Joined Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {userData.email_verified_at ? "✓" : "⚠"}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Email {userData.email_verified_at ? "Verified" : "Pending"}
              </div>
            </div>
          </div>
        </div> */}
        </div>
      )}
    </div>
  );
}
