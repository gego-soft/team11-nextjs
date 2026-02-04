"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getContactInfo } from "@/store/slices/contact/contactThunks";
import Link from "next/link";
import { useEffect } from "react";

const BankTransfer = () => {
  const dispatch = useAppDispatch();
  const { data: contact, loading } = useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);
  return (
    <div className="bank-transfer-section">
      <div className="bank-info">
        <h3>💰 Bank Transfer Instructions</h3>

        <p className="lead-text">
          To add funds via bank transfer, please contact our support team
          through WhatsApp or Telegram.
        </p>

        <div className="info-note">
          <span className="note-icon">ℹ️</span>
          <p>
            Funds will be credited within 15–30 minutes after payment
            confirmation.
          </p>
        </div>
      </div>

      <div className="contact-buttons">
        <Link
          href={`${contact?.whatsapp_url}`}
          target="_blank"
          className="btn btn-whatsapp"
        >
          💬 Contact on WhatsApp
        </Link>

        <Link
          href={`${contact?.telegram_url}`}
          target="_blank"
          className="btn btn-telegram"
        >
          ✈️ Contact on Telegram
        </Link>
      </div>
    </div>
  );
};

export default BankTransfer;
