import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { IAddCustomerBooking, IBooking } from '@/types';

// Configuration du transporteur email avec Hostinger (même que contact)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true', // true pour le port 465
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const booking: IBooking = await request.json();

    // Validation des données
    if (!booking.customer || !booking.session) {
      return NextResponse.json(
        { message: 'Données de réservation invalides' },
        { status: 400 }
      );
    }

    // Utiliser les noms fournis par le formulaire
    const activityName = booking.session.activityName || booking.session.activity;
    const spotName = booking.session.spotName || booking.session.spot;

    // Préparer le contenu HTML de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          NOUVELLE RÉSERVATION - Occitanie Évasion
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Informations Client</h3>
          <p><strong>Nom :</strong> ${booking.customer.last_name}</p>
          <p><strong>Prénom :</strong> ${booking.customer.first_names}</p>
          <p><strong>Email :</strong> ${booking.customer.email}</p>
          <p><strong>Téléphone :</strong> ${booking.customer.phone}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Détails de la Session</h3>
          <p><strong>Activité :</strong> ${activityName}</p>
          <p><strong>Lieu :</strong> ${spotName}</p>
          <p><strong>Date :</strong> ${new Date(booking.session.date).toLocaleDateString('fr-FR')}</p>
          <p><strong>Heure de début :</strong> ${booking.session.startTime}</p>
          <p><strong>Heure de fin :</strong> ${booking.session.endTime}</p>
          <p><strong>Type de session :</strong> ${booking.session.type_formule === 'half_day' ? 'Demi-journée' : 'Journée complète'}</p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Participants (${booking.customer.number_of_people})</h3>
          ${booking.customer.people_list.map((person, index) => `
            <div style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
              <h4 style="color: #333; margin: 0 0 10px 0;">Participant ${index + 1}</h4>
              <p><strong>Taille :</strong> ${person.size} cm</p>
              <p><strong>Poids :</strong> ${person.weight} kg</p>
              <p><strong>Prix :</strong> ${person.price_applicable}€</p>
            </div>
          `).join('')}
        </div>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Tarification</h3>
          <p><strong>Prix par personne :</strong> ${booking.customer.price_applicable}€</p>
          <p><strong>Prix total :</strong> ${booking.customer.price_total}€</p>
          <p><strong>Tarification :</strong> ${booking.customer.tarification}</p>
        </div>
        
        ${booking.message ? `
          <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Demandes Spéciales</h3>
            <p style="line-height: 1.6; color: #555;">${booking.message.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #666;">
          <p><strong>Statut :</strong> ${booking.customer.status}</p>
          <p><strong>Type de réservation :</strong> ${booking.customer.typeOfReservation}</p>
          <p><strong>Date de création :</strong> ${new Date(booking.customer.date).toLocaleString('fr-FR')}</p>
          <p>Ce message a été envoyé automatiquement depuis le formulaire de réservation du site Occitanie Évasion.</p>
        </div>
      </div>
    `;

    // Configuration de l'email de notification à l'administrateur
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.NODE_ENV === 'development' ? 'leroyaurelien11@gmail.com' : process.env.SMTP_EMAIL, // Email de l'administrateur (même que l'expéditeur)
      subject: `Nouvelle réservation - ${booking.customer.last_name} ${booking.customer.first_names}`,
      html: emailHtml,
    };

    // Envoi de l'email de notification à l'administrateur uniquement
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Réservation reçue avec succès',
        bookingId: `RES-${Date.now()}` // ID temporaire
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors du traitement de la réservation:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 





/**
 * 
 * @param request 
 * @returns 
 */
export async function PATCH(request: NextRequest) {
  try {
    const booking: IAddCustomerBooking = await request.json();

    // Validation des données
    if (!booking.customer || !booking.session) {
      return NextResponse.json(
        { message: 'Données de réservation invalides' },
        { status: 400 }
      );
    }

    // Utiliser les noms fournis par le formulaire
    const activityName =  booking.session.activity.name || "Unknown";
    const spotName =  booking.session.spot.name || "Unknown";

    // Préparer le contenu HTML de l'email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; text-align: center;">
          NOUVELLE RÉSERVATION - Occitanie Évasion
        </h2>

        <div style="text-align: center; padding: 20px;">
        <h3>
          ${booking.customer.last_name} ${booking.customer.first_names} vient de rejoindre la session ${activityName} du ${new Date(booking.session.date).toLocaleDateString('fr-FR')} à ${booking.session.startTime}
        </h3>
        <h3>
          Pour voir les détails de la session, connecte-toi <a href="${process.env.BACKOFFICE_URL}" style="color: #007bff;">ici</a> .
        </h3>
        </div>
        
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Informations Client</h3>
          <p><strong>Nom :</strong> ${booking.customer.last_name}</p>
          <p><strong>Prénom :</strong> ${booking.customer.first_names}</p>
          <p><strong>Email :</strong> ${booking.customer.email}</p>
          <p><strong>Téléphone :</strong> ${booking.customer.phone}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Rappel de la Session</h3>
          <p><strong>Activité :</strong> ${activityName}</p>
          <p><strong>Lieu :</strong> ${spotName}</p>
          <p><strong>Date :</strong> ${new Date(booking.session.date).toLocaleDateString('fr-FR')}</p>
          <p><strong>Heure de début :</strong> ${booking.session.startTime}</p>
          <p><strong>Heure de fin :</strong> ${booking.session.endTime}</p>
          <p><strong>Type de session :</strong> ${booking.session.type_formule === 'half_day' ? 'Demi-journée' : 'Journée complète'}</p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Participants (${booking.customer.number_of_people})</h3>
          ${booking.customer.people_list.map((person, index) => `
            <div style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-radius: 5px;">
              <h4 style="color: #333; margin: 0 0 10px 0;">Participant ${index + 1}</h4>
              <p><strong>Taille :</strong> ${person.size} cm</p>
              <p><strong>Poids :</strong> ${person.weight} kg</p>
              <p><strong>Prix :</strong> ${person.price_applicable}€</p>
            </div>
          `).join('')}
        </div>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">Tarification</h3>
          <p><strong>Prix par personne :</strong> ${booking.customer.price_applicable}€</p>
          <p><strong>Prix total :</strong> ${booking.customer.price_total}€</p>
          <p><strong>Tarification :</strong> ${booking.customer.tarification}</p>
        </div>
        
        ${booking.message ? `
          <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Demandes Spéciales</h3>
            <p style="line-height: 1.6; color: #555;">${booking.message.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #666;">
          <p><strong>Statut :</strong> ${booking.customer.status}</p>
          <p><strong>Type de réservation :</strong> ${booking.customer.typeOfReservation}</p>
          <p><strong>Date de création :</strong> ${new Date(booking.customer.date).toLocaleString('fr-FR')}</p>
          <p>Ce message a été envoyé automatiquement depuis le formulaire de réservation du site Occitanie Évasion.</p>
        </div>
      </div>
    `;

    // Configuration de l'email de notification à l'administrateur
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.NODE_ENV === 'development' ? 'leroyaurelien11@gmail.com' : process.env.SMTP_EMAIL, // Email de l'administrateur (même que l'expéditeur)
      subject: `Nouvelle réservation - ${booking.customer.last_name} ${booking.customer.first_names}`,
      html: emailHtml,
    };

    // Envoi de l'email de notification à l'administrateur uniquement
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Réservation reçue avec succès',
        bookingId: `RES-${Date.now()}` // ID temporaire
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors du traitement de la réservation:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 