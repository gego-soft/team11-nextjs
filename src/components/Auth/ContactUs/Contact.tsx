"use client";
import { contactus } from "@/services/Auth/contactService";
import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission here
    const res = await contactus(formData);
    console.log("Form submitted:", res);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="static-page">
      <div className="static-page-container">
        <h1>Contact Us</h1>
        <div className="static-page-content">
          <p>
            We'd love to hear from you! Fill out the form below and our team
            will get back to you as soon as possible.
          </p>

          <div className="contact-layout">
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <h2>Get in Touch</h2>

              <div className="contact-info-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>support@team11fantasy.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+91 1234567890</p>
                  <p className="timing">Mon-Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Office Address</h3>
                  <p>Team 11 Fantasy Cricket</p>
                  <p>123 Business Park, Tech City</p>
                  <p>Bangalore, Karnataka 560001</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">⏰</div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
