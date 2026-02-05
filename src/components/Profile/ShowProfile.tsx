import { UserData } from "@/types/Auth/authTypes";
import React from "react";
import { formatDate } from "@/utils/formatDate";
import {
  FaCalendar,
  FaEnvelope,
  FaLink,
  FaMapMarkerAlt,
  FaPhone,
  FaTransgender,
} from "react-icons/fa";
import { formatGender } from "@/utils/formatGender";
import { formatAddress } from "@/utils/helpter";
import { toast } from "react-toastify";
import ProfileImage from "./ProfileImage";
interface ShowProfileProps {
  userData: UserData;
}

const ShowProfile: React.FC<ShowProfileProps> = ({ userData }) => {
  return (
    <div className="p-6">
      {/* Profile Picture & Basic Info */}
      {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
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
        </div>
      </div> */}
      <ProfileImage userData={userData} />

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
        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Referral Information
          </h3>
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-800">Referral Name</p>
                <p className="text-lg font-bold text-gray-900 ">
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
                    className="ml-3 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProfile;
