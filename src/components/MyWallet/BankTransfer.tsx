"use client";
import { BankContactService } from "@/services/BankAccountService/bankTransfer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BankTransfer = () => {
  const hasFetched = useRef(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const fetchContactDetails = async () => {
    try {
      const response = await BankContactService.bankTransferContact();
      if (response.data.success) {
        setWhatsapp(response.data.whatsapp_url);
        setTelegram(response.data.telegram_url);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchContactDetails();
    }
  }, []);
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
        <Link href={`${whatsapp}`} target="_blank" className="btn btn-whatsapp">
          💬 Contact on WhatsApp
        </Link>

        <Link href={`${telegram}`} target="_blank" className="btn btn-telegram">
          ✈️ Contact on Telegram
        </Link>
      </div>
    </div>
  );
};

export default BankTransfer;
