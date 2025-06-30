import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  captchaToken: string;
}

// Configuration du transporteur email avec Hostinger
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true pour le port 465
  auth: {
    user: process.env.SMTP_EMAIL ,
    pass: process.env.SMTP_PASSWORD ,
  },
});

// Fonction pour valider le reCAPTCHA
async function validateRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '',
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Erreur validation reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, subject, message, captchaToken } = body;

    // Validation du captcha en premier
    if (!captchaToken) {
      return NextResponse.json(
        { message: 'Token reCAPTCHA manquant' },
        { status: 400 }
      );
    }

    const isCaptchaValid = await validateRecaptcha(captchaToken);
    if (!isCaptchaValid) {
      return NextResponse.json(
        { message: 'Validation reCAPTCHA échouée' },
        { status: 400 }
      );
    }

    // Validation côté serveur
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Validation téléphone français
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { message: 'Format de téléphone invalide' },
        { status: 400 }
      );
    }

    // Configuration de l'email de notification
    const mailOptions = {
      from: process.env.SMTP_EMAIL ,
      to: process.env.SMTP_EMAIL ,
      subject: ` Nouveau message de contact - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #666;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site Occitanie Évasion.</p>
            <p>Date d'envoi : ${new Date().toLocaleString('fr-FR')}</p>
            <p>✅ reCAPTCHA validé</p>
          </div>
        </div>
      `,
    };

    // Envoi de l'email de notification
    await transporter.sendMail(mailOptions);

    // Email de confirmation au client
    const confirmationMailOptions = {
      from: process.env.SMTP_EMAIL || 'contact@occitanie-evasion.com',
      to: email,
      subject: 'Confirmation de votre message - Occitanie Évasion',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Merci pour votre message !
          </h2>
          
          <p>Bonjour ${name},</p>
          
          <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contacté.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Récapitulatif de votre message</h3>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <p style="font-style: italic; color: #666;">${message}</p>
          </div>
          
          <p>Nous vous répondrons dans les plus brefs délais.</p>
          
          <p>Cordialement,<br>
          <strong>Florent - Occitanie Évasion</strong></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #666;">
            <p>Ceci est un email automatique, merci de ne pas y répondre.</p>
          </div>
        </div>
      `,
    };

    // Envoi de l'email de confirmation
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Message envoyé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
} 