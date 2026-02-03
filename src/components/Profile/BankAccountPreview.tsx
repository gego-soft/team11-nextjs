import React from "react";
import { AiOutlineBank } from "react-icons/ai";
import { FaCreditCard, FaUser, FaHashtag } from "react-icons/fa";

interface BankAccountPreviewProps {
  accountData: {
    account_number: string;
    account_holder_name: string;
    bank_name: string;
    branch: string;
    ifsc_code: string;
  };
}

const BankAccountPreview: React.FC<BankAccountPreviewProps> = ({
  accountData,
}) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Bank Account Details
      </h3>

      <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
        {/* Bank Name */}
        <div className="flex items-center mb-6 pb-4 border-b border-blue-100">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <AiOutlineBank className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">
              {accountData.bank_name}
            </h4>
            <p className="text-sm text-gray-600">{accountData.branch} Branch</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Account Holder */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <FaUser className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Holder</p>
              <p className="font-medium text-gray-900">
                {accountData.account_holder_name}
              </p>
            </div>
          </div>

          {/* Account Number */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <FaCreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-mono font-medium text-gray-900 tracking-wider">
                {accountData.account_number}
              </p>
            </div>
          </div>

          {/* IFSC Code */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <FaHashtag className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">IFSC Code</p>
              <p className="font-mono font-medium text-gray-900">
                {accountData.ifsc_code}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6 pt-4 border-t border-blue-100">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium">Active Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountPreview;
