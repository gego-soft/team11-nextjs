"use client";
import Button from "@/components/Button";
import FormInputField from "@/components/Common/Forms/FormInputField";
import { ContactService } from "@/services/Auth/contactService";
import { ContactUsValues } from "@/types/Auth/contactDetails";
import { mapServerErrors } from "@/utils/mapServerErrors";
import { ContactUsSchema } from "@/validations/Auth/ContactUsSchema";
import { AxiosError } from "axios";
import { FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

function ContactUs() {
  const formik = useFormik<ContactUsValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: ContactUsSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const payload = {
          ...values,
          name: values.name.trim(),
        };
        const response = await ContactService.createContact(payload);
        resetForm();
        toast.success(
          response.data.message || "Contact submitted Successfully",
        );
      } catch (error) {
        const err = error as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;
        const mappedErrors = mapServerErrors<ContactUsValues>(
          err.response?.data?.errors,
        );

        setErrors(mappedErrors);
        toast.error(err.response?.data.message || "Contact submission Failed");
      }
    },
  });

  return (
    <div className="static-page">
      <div className="static-page-container">
        <h1>Contact Us</h1>
        <div className="static-page-content">
          <p>
            We'd love to hear from you! Fill out the form below and our team
            will get back to you as soon as possible.
          </p>
        </div>
        <div className="contact-layout">
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <FormikProvider value={formik}>
              <div className="contact-form">
                <div className="form-group">
                  <FormInputField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <FormInputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <FormInputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <FormInputField
                    name="subject"
                    label="Subject"
                    type="text"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="form-group">
                  <FormInputField
                    name="message"
                    label="Message"
                    type="textarea"
                    placeholder="Enter your message"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="submitviolet"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {formik.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </FormikProvider>
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
  );
}

export default ContactUs;
