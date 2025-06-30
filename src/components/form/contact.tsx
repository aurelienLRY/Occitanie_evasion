"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

// Schéma de validation Yup
const contactSchema = yup.object({
  name: yup
    .string()
    .required('Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
  
  email: yup
    .string()
    .required('L\'email est requis')
    .email('Format d\'email invalide')
    .max(100, 'L\'email ne peut pas dépasser 100 caractères'),
  
  phone: yup
    .string()
    .required('Le téléphone est requis')
    .matches(
      /^(\+33|0)[1-9](\d{8})$/,
      'Format de téléphone invalide (ex: 0612345678 ou +33123456789)'
    )
    .transform((value) => value.replace(/\s/g, '')), // Supprime les espaces
  
  subject: yup
    .string()
    .required('Le sujet est requis')
    .min(3, 'Le sujet doit contenir au moins 3 caractères')
    .max(100, 'Le sujet ne peut pas dépasser 100 caractères'),
  
  message: yup
    .string()
    .required('Le message est requis')
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
});

const ContactForm = ({ className = "" }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Validation avec Yup
  const validateForm = async (): Promise<boolean> => {
    try {
      await contactSchema.validate(formData, { abortEarly: false });
      
      // Validation du captcha
      if (!captchaToken) {
        toast.error('Veuillez valider le captcha', {
          description: 'Cochez la case "Je ne suis pas un robot"',
          duration: 4000,
        });
        return false;
      }
      
      setErrors({});
      return true;
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const newErrors: Partial<ContactFormData> = {};
        validationError.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof ContactFormData] = error.message;
          }
        });
        setErrors(newErrors);
        
        // Toast d'erreur de validation
        toast.error('Veuillez corriger les erreurs dans le formulaire', {
          description: 'Certains champs contiennent des erreurs de validation',
          duration: 4000,
        });
      }
      return false;
    }
  };

  // Validation en temps réel d'un champ
  const validateField = async (field: keyof ContactFormData, value: string) => {
    try {
      await contactSchema.validateAt(field, { ...formData, [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: error.message }));
      }
    }
  };

  // Gestion des changements de champs avec validation en temps réel
  const handleInputChange = async (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validation en temps réel avec délai pour éviter trop de validations
    if (value.trim()) {
      setTimeout(() => validateField(field, value), 300);
    } else {
      // Effacer l'erreur si le champ est vide
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Gestion du captcha
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  // Reset du captcha
  const resetCaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
    setCaptchaToken(null);
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    // Toast de chargement
    const loadingToast = toast.loading('Envoi du message en cours...', {
      description: 'Veuillez patienter pendant l\'envoi',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });

      if (response.ok) {
        // Dismiss le toast de chargement
        toast.dismiss(loadingToast);
        
        // Toast de succès
        toast.success('Message envoyé avec succès !', {
          description: 'Je vous répondrai dans les plus brefs délais.',
          duration: 5000,
          icon: <CheckCircle className="w-4 h-4" />,
        });

        // Reset du formulaire et du captcha
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setErrors({});
        resetCaptcha();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur contact:', error);
      
      // Dismiss le toast de chargement
      toast.dismiss(loadingToast);
      
      // Toast d'erreur
      toast.error('Erreur lors de l\'envoi', {
        description: 'Veuillez réessayer ou me contacter directement.',
        duration: 6000,
        icon: <AlertCircle className="w-4 h-4" />,
        action: {
          label: 'Réessayer',
          onClick: () => handleSubmit(e),
        },
      });
      
      // Reset du captcha en cas d'erreur
      resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className={`w-full max-w-7xl mx-auto border border-gray-200 rounded-lg p-6 shadow-lg ${className}`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {/* Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={fieldVariants}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom"
              />
            </div>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Téléphone et Sujet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={fieldVariants}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="06 12 34 56 78"
              />
            </div>
            {errors.phone && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.phone}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fieldVariants}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Votre demande"
            />
            {errors.subject && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-600"
              >
                {errors.subject}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Message */}
        <motion.div variants={fieldVariants}>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={5}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Décrivez votre demande, vos questions ou vos besoins..."
            />
          </div>
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.message}
            </motion.p>
          )}
        </motion.div>

        {/* reCAPTCHA */}
        <motion.div variants={fieldVariants} className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} // Clé de test par défaut
              onChange={handleCaptchaChange}
              theme="light"
              size="normal"
            />
        </motion.div>

        {/* Bouton de soumission */}
        <motion.div variants={fieldVariants} className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting || !captchaToken}
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Envoi en cours...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Envoyer le message
              </div>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
