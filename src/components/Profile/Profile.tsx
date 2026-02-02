"use client";

import ChangePassword from "./ChangePassword";
import BankAccountDetails from "./BankAccountDetails";
import ProfileImage from "./ProfileImage";

export default function Profile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Profile Settings
          </h1>

          <div className="space-y-6">
            {/* Profile Picture Section */}
            <ProfileImage />

            {/* Change Password Section */}
            <ChangePassword />

            {/* Bank Account Details Section */}
            <BankAccountDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
