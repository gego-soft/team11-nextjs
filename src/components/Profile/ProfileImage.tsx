// "use client";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import Image from "next/image";
// import { ProfileService } from "@/services/Profile/ProfileServices";

// const ProfileImage = () => {
//   // Avatar state
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

//   // Handle avatar upload
//   const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file size (2MB)
//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("File size must be less than 2MB");
//       return;
//     }

//     // Validate file type
//     if (!file.type.match(/^image\/(jpeg|jpg|png|gif)$/)) {
//       toast.error("Only JPG, PNG, or GIF files are allowed");
//       return;
//     }

//     // Create preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setAvatarPreview(reader.result as string);
//     };
//     reader.readAsDataURL(file);

//     // Upload to server
//     try {
//       const response = await ProfileService.updateProfileImage(file);
//       console.log("image response : ", response);
//       toast.success("Profile picture updated successfully");
//     } catch (error) {
//         console.log("image error : ", error);
//       toast.error("Failed to update profile picture");
//     }
//   };
//   return (
//     <section className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">
//         Profile Picture
//       </h2>
//       <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//         <div className="relative">
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
//             {avatarPreview ? (
//               <Image
//                 src={avatarPreview}
//                 alt="Profile"
//                 fill
//                 className=" object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                 <span className="text-5xl text-white">👤</span>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="flex-1">
//           <label
//             htmlFor="avatar-upload"
//             className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
//           >
//             📷 Choose Photo
//             <input
//               type="file"
//               id="avatar-upload"
//               accept="image/*"
//               onChange={handleAvatarChange}
//               className="hidden"
//             />
//           </label>
//           <p className="mt-2 text-sm text-gray-500">
//             JPG, PNG or GIF. Max size 2MB
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfileImage;

"use client";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { ProfileService } from "@/services/Profile/ProfileServices";
import { UserData } from "@/types/Auth/authTypes";
import { FaEdit } from "react-icons/fa";
import { updateUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface ProfileImageProps {
  userData: UserData;
  onUpdate?: (updatedData: Partial<UserData>) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ userData, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  // Get initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

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
    if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
      toast.error("Only JPG, PNG, GIF, or WebP files are allowed");
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const response = await ProfileService.updateProfileImage(file);

      // Call parent callback if needed to update userData
      if (onUpdate && response.data) {
        onUpdate(response.data);
      }
      if (response.status === 200) {
        console.log("image response : ", response);
        toast.success(
          response.data.message || "Profile picture updated successfully",
        );
        dispatch(
          updateUser({ profile_img_url: response.data.data.profile_img_url }),
        );
      }
    } catch (error) {
      console.log("image error : ", error);
      toast.error("Failed to update profile picture");
      // Revert preview on error
      setAvatarPreview(null);
    } finally {
      setIsUploading(false);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Determine which image to show
  const showImage = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    if (
      userData.profile_img_url &&
      userData.profile_img_url !== "http://team11.test/storage"
    ) {
      return `${userData.profile_img_url}`;
    }
    return null;
  };

  const imageUrl = showImage();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
      {/* Profile Image Container */}
      <div className="relative">
        {/* Clickable Profile Image */}
        <button
          className="absolute -top-1 right-2 z-10 p-1.5 rounded-full cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Edit profile picture"
        >
          <FaEdit className="w-3 h-4 text-orange-500" />
        </button>
        <div
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg cursor-pointer 
                     relative overflow-hidden group
                     hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={() => !isUploading && fileInputRef.current?.click()}
          style={{ cursor: isUploading ? "wait" : "pointer" }}
        >
          {isUploading ? (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : imageUrl ? (
            <Image
              src={`${imageUrl}`}
              alt={userData.name || "Profile"}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {getInitials(userData.name)}
              </span>
            </div>
          )}

          {/* Edit overlay on hover - Only show when not uploading */}
          {!isUploading && (
            <div className="absolute inset-0 bg-black/80 bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-center">
                <div className="text-lg">📷</div>
                <span className="text-sm font-medium">Edit</span>
              </div>
            </div>
          )}
        </div>

        {/* Active badge */}
        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Active
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* User Info */}
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

        {/* Upload instructions */}
        {!isUploading && (
          <div className="mt-4 inline-block bg-blue-50 px-3 py-2 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Click on photo</span> to upload a
              new profile picture
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, GIF, WebP • Max size: 2MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
