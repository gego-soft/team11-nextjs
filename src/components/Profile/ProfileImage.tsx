"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { ProfileService } from "@/services/Profile/ProfileServices";


const ProfileImage = () => {
  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Handle avatar upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
      toast.error("Only JPG, PNG, or GIF files are allowed");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    try {
      const response = await ProfileService.updateProfileImage(file);
      console.log("image response : ", response);
      toast.success("Profile picture updated successfully");
    } catch (error) {
        console.log("image error : ", error);
      toast.error("Failed to update profile picture");
    }
  };
  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Profile Picture
      </h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt="Profile"
                fill
                className=" object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-5xl text-white">👤</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <label
            htmlFor="avatar-upload"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            📷 Choose Photo
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <p className="mt-2 text-sm text-gray-500">
            JPG, PNG or GIF. Max size 2MB
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileImage;
