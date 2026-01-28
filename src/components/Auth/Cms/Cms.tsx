"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import DOMPurify from "dompurify";
import { CmsPageProps } from "@/types/Auth/cmsDetails";
import { cmsDetails } from "@/services/Auth/cmsService";
import BallLoader from "@/components/Common/BallLoader";

const Cms: React.FC<CmsPageProps> = ({ type }) => {
  const hasFetched = useRef(false);

  const [cmsTitle, setCmsTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const decodeHtml = (html: string) => {
    if (typeof window === "undefined") return html;
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchCms = useCallback(async () => {
    try {
      const response = await cmsDetails(type);

      if (response.success) {
        const decoded = decodeHtml(response.description || "");
        const cleanHtml = DOMPurify.sanitize(decoded);
        setCmsTitle(response.title);
        setContent(cleanHtml);
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCms();
    }
  }, [fetchCms]);

  if (loading) {
    return (
      <div className="h-125 flex justify-center items-center">
        <BallLoader />
      </div>
    );
  }

  return (
    <div className="static-page">
      <div className="static-page-container">
        <h1>{cmsTitle}</h1>

        <div
          className="static-page-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default Cms;
