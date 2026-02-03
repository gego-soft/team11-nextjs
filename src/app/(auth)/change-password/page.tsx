import ChangePassword from "@/components/Profile/ChangePassword";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
