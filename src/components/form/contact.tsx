"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Textarea } from "@/components/input";
import { Button } from "@/components/ui/button";
import { ContactFormData } from "@/types";
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  className?: string;
}

const contactSchema = yup.object({
  name: yup.string().required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  phone: yup.string().required("Le téléphone est requis"),
  message: yup.string().required("Le message est requis"),
});

export const ContactForm = ({ className = "" }: ContactFormProps) => {
  const methods = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const onSubmit = async (data: ContactFormData) => {
      if (!captchaToken) {
        toast.error('Veuillez valider le captcha', {
          description: 'Cochez la case "Je ne suis pas un robot"',
          duration: 4000,
        });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          captchaToken
        }),
      });

      if (response.ok) {
        toast.success('Message envoyé avec succès !', {
          description: 'Je vous répondrai dans les plus brefs délais.',
          duration: 5000,
          icon: <CheckCircle className="w-4 h-4" />,
        });
        methods.reset();
        setIsSubmitting(false);
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error('Erreur lors de l\'envoi du message', {
        description: 'Veuillez réessayer ou me contacter directement.',
        duration: 6000,
        icon: <AlertCircle className="w-4 h-4" />,
      });
      setIsSubmitting(false);
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    recaptchaRef.current?.reset();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className={`bg-white rounded-xl shadow-lg p-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-labelledby="contact-form-title"
      role="region"
    >
      <FormProvider {...methods}>
        <form 
          onSubmit={methods.handleSubmit(onSubmit)} 
          className="space-y-4 max-w-3xl mx-auto"
          aria-label="Formulaire de contact"
          noValidate
        >
          <h2 id="contact-form-title" className="sr-only">
            Formulaire de contact
          </h2>

          <motion.div variants={fieldVariants}>
            <Input
              name="name"
              label="Nom complet *"
              placeholder="Votre nom complet"
              errorsName="name"
              aria-required="true"
              aria-describedby="name-error"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Input
              name="email"
              type="email"
              label="Email *"
              placeholder="votre@email.com"
              errorsName="email"
              aria-required="true"
              aria-describedby="email-error"
              autoComplete="email"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Input
              name="phone"
              type="tel"
              label="Téléphone *"
              placeholder="Votre numéro de téléphone"
              errorsName="phone"
              aria-required="true"
              aria-describedby="phone-error"
              autoComplete="tel"
            />
          </motion.div>

          <motion.div variants={fieldVariants}>
            <Textarea
              name="message"
              label="Message *"
              placeholder="Votre message..."
              rows={6}
              errorsName="message"
              aria-required="true"
              aria-describedby="message-error"
            />
          </motion.div>

          {/* reCAPTCHA */}
          <motion.div 
            variants={fieldVariants} 
            className="flex justify-center"
            aria-describedby="captcha-description"
          >
            <div role="group" aria-labelledby="captcha-label">
              <div id="captcha-label" className="sr-only">
                Vérification de sécurité
              </div>
              <div id="captcha-description" className="sr-only">
                Cochez cette case pour prouver que vous n&apos;êtes pas un robot
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={setCaptchaToken}
                onExpired={resetCaptcha}
                onError={resetCaptcha}
                aria-label="Vérification reCAPTCHA"
              />
            </div>
          </motion.div>

          {/* Bouton d'envoi */}
          <motion.div variants={fieldVariants} className="flex justify-center">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-describedby={isSubmitting ? "submitting-status" : undefined}
            >
              {isSubmitting ? (
                <>
                  <div 
                    className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" 
                    aria-hidden="true"
                  />
                  <span>Envoi en cours...</span>
                  <span id="submitting-status" className="sr-only">
                    Le formulaire est en cours d&apos;envoi, veuillez patienter
                  </span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span>Envoyer le message</span>
                </>
              )}
            </Button>
          </motion.div>

          {/* Messages d'erreur globaux */}
          {methods.formState.errors && Object.keys(methods.formState.errors).length > 0 && (
            <div 
              role="alert" 
              aria-live="polite"
              className="sr-only"
            >
              Le formulaire contient des erreurs. Veuillez les corriger avant de soumettre.
            </div>
          )}
        </form>
      </FormProvider>
    </motion.section>
  );
};

export default ContactForm;
