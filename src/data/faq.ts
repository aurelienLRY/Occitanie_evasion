export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    id: "reservations",
    title: "Réservations & Tarifs",
    description: "Tout ce que vous devez savoir sur les réservations et les tarifs",
    items: [
      {
        id: "reservation-1",
        question: "Comment réserver une activité ?",
        answer: "Vous pouvez réserver par téléphone au 06 20 56 25 07 (appel ou SMS) ou par email à occitanie-evasion@gmail.com. Je vous recommande de réserver à l'avance, surtout en haute saison (mai à septembre)."
      },
      {
        id: "reservation-2",
        question: "Quels sont les moyens de paiement acceptés ?",
        answer: "J'accepte les espèces et les chèques. Le paiement se fait le jour de l'activité. Pour les groupes et ACM, un acompte peut être demandé."
      },
      {
        id: "reservation-3",
        question: "Y a-t-il des tarifs de groupe ?",
        answer: "Oui, je propose des tarifs réduits pour les groupes de minimum 7 personnes. Pour les ACM (Accueil Collectif de Mineurs), j'ai des tarifs spéciaux : 8 enfants + 1 animateur pour le canyoning (280€), 5 enfants + 1 accompagnateur pour la spéléologie (220€)."
      },
      {
        id: "reservation-4",
        question: "Puis-je annuler ma réservation ?",
        answer: "Les annulations sont possibles jusqu'à 24h avant l'activité. En cas de météo défavorable, je propose un report gratuit. Contactez-moi directement pour toute modification."
      },
      {
        id: "reservation-5",
        question: "Proposez-vous des forfaits ou des séjours ?",
        answer: "Je propose des formules demi-journée et journée pour chaque activité. J'organise également des événements spéciaux comme les EVG/EVJF et des spéléoniversaires pour les enfants. Contactez-moi pour des demandes personnalisées."
      }
    ]
  },
  {
    id: "activites",
    title: "Activités & Niveaux",
    description: "Informations sur mes activités et les niveaux requis",
    items: [
      {
        id: "activites-1",
        question: "Quel niveau faut-il pour faire du canyoning ?",
        answer: "Le canyoning est accessible à partir de 10 ans. La nage est obligatoire (savoir nager 25 mètres et s'immerger). Les sauts sont optionnels, vous pouvez contourner les obstacles. Il faut être en bonne forme physique et capable de marcher sur sentiers pentus et rochers."
      },
      {
        id: "activites-2",
        question: "À partir de quel âge peut-on participer ?",
        answer: "Mes activités sont accessibles à partir de 6 ans pour l'escalade et la spéléologie, 10 ans pour le canyoning. Les mineurs doivent être accompagnés d'un adulte responsable. Poids maximum : 115kg pour toutes les activités."
      },
      {
        id: "activites-3",
        question: "Combien de temps durent les activités ?",
        answer: "La durée varie selon l'activité : 3h pour l'escalade et la spéléologie, 3-3h30 pour le canyoning demi-journée, 5h pour le canyoning journée. Ces durées incluent l'équipement, les marches d'approche et de retour, et un temps de débrief convivial."
      },
      {
        id: "activites-4",
        question: "Quel équipement est fourni ?",
        answer: "Je fournis tout l'équipement technique : combinaisons néoprène, casques, baudriers, cordes, système d'assurage, chaussons (escalade), sacs de canyoning, bidons étanches, éclairage (spéléo). Vous devez prévoir vos vêtements de sport et chaussures."
      },
      {
        id: "activites-5",
        question: "Y a-t-il des activités spéciales pour les enfants ?",
        answer: "Oui ! Je propose des spéléoniversaires pour les enfants à partir de 6 ans. C'est une aventure de 2h30-3h avec exploration souterraine, défis, énigmes et goûter d'anniversaire à l'entrée de la grotte. Maximum 6 enfants, tarif : 200€."
      }
    ]
  },
  {
    id: "securite",
    title: "Sécurité & Encadrement",
    description: "Mes engagements en matière de sécurité",
    items: [
      {
        id: "securite-1",
        question: "Quelles sont vos qualifications d'encadrement ?",
        answer: "Je suis Florent Soum, diplômé BPJEPS CKDA, CS Escalade, BAPAAT Spéléologie et CQP OPAH. J'encadre des activités de pleine nature depuis plus de 15 ans avec passion. Tous mes équipements sont aux normes et assurés professionnellement."
      },
      {
        id: "securite-2",
        question: "Y a-t-il des risques particuliers ?",
        answer: "Comme toute activité de plein air, il existe des risques inhérents. Cependant, mes protocoles de sécurité stricts, mon matériel aux normes et mes ratios d'encadrement (4-10 personnes pour canyoning/escalade, 3-6 pour spéléologie) garantissent un maximum de sécurité."
      },
      {
        id: "securite-3",
        question: "Que se passe-t-il en cas de météo défavorable ?",
        answer: "La sécurité est ma priorité. En cas de conditions météorologiques dangereuses, je reporte l'activité gratuitement. Je surveille les conditions météo et vous contacte si nécessaire. Les activités se pratiquent selon la météo du moment."
      },
      {
        id: "securite-4",
        question: "Avez-vous une assurance ?",
        answer: "Oui, je suis entièrement assuré professionnellement. Je vous recommande également de posséder une assurance responsabilité civile pour la pratique d'activités sportives."
      },
      {
        id: "securite-5",
        question: "Y a-t-il des contre-indications médicales ?",
        answer: "Il ne faut pas avoir de contre-indication médicale à la pratique des activités. Poids maximum : 115kg. Pour le canyoning, il ne faut pas avoir de douleurs pouvant empêcher d'évoluer dans le canyon et de remonter en fin d'activité."
      }
    ]
  },
  {
    id: "pratique",
    title: "Informations Pratiques",
    description: "Tout ce qu'il faut savoir pour bien préparer votre sortie",
    items: [
      {
        id: "pratique-1",
        question: "Où se déroulent les activités ?",
        answer: "Mes activités se déroulent dans l'Aude, le Tarn, les Pyrénées Orientales et l'Hérault : canyoning dans les gorges sauvages du Banquet (10 min de Mazamet), escalade dans le Minervois (Notre Dame du Cross), sur les falaises de La Clape, dans la haute vallée de l'Aude et les gorges d'Héric, spéléologie dans les grottes du secteur."
      },
      {
        id: "pratique-2",
        question: "Que faut-il apporter ?",
        answer: "Prévoyez maillot de bain, serviette, affaires de rechange, crème solaire, eau et encas, pique-nique (formule journée), chaussures de marche ou baskets en bon état, tenue sport adaptée. Pour la spéléologie : pantalon et haut manche longue style polaire."
      },
      {
        id: "pratique-3",
        question: "Quels sont les horaires de départ ?",
        answer: "Canyoning : 10h00 le matin, 14h30 l'après-midi (demi-journée) ou 10h30 (journée). Escalade : 09h30 le matin, 14h00 l'après-midi. Spéléologie : 09h30 le matin, 14h00 l'après-midi."
      },
      {
        id: "pratique-4",
        question: "Comment s'y rendre ?",
        answer: "Le point de rendez-vous vous sera communiqué par mail et/ou SMS. Pour le canyoning, le lieu de RDV est au Banquet 81240 Saint-Amans-Valtoret. Je vous donne toutes les informations nécessaires pour vous rendre sur place."
      },
      {
        id: "pratique-5",
        question: "Y a-t-il des vestiaires sur place ?",
        answer: "J'organise les changements de manière pratique. Pour le canyoning, je fournis des sacs de canyoning et bidons étanches pour protéger vos affaires. Je transporte vos affaires de rechange jusqu'au point de fin d'activité."
      }
    ]
  },
  {
    id: "saison",
    title: "Saisonnalité & Conditions",
    description: "Informations sur les périodes d'ouverture et les conditions",
    items: [
      {
        id: "saison-1",
        question: "Quelles sont vos périodes d'ouverture ?",
        answer: "Le canyoning se pratique de mai à septembre selon les conditions météo. L'escalade et la spéléologie se pratiquent toute l'année suivant la météo du moment. Les activités sont adaptées aux conditions météorologiques pour votre sécurité."
      },
      {
        id: "saison-2",
        question: "Quelle est la meilleure période pour venir ?",
        answer: "Chaque saison a ses avantages : printemps et automne pour des températures agréables, été pour se rafraîchir dans l'eau du canyon. Je recommande de réserver à l'avance en juillet-août pour le canyoning."
      },
      {
        id: "saison-3",
        question: "Les activités sont-elles maintenues par tous les temps ?",
        answer: "Non, j'adapte mes activités aux conditions météo. La pluie légère n'empêche pas les activités, mais j'annule en cas de conditions dangereuses. Je propose toujours un report gratuit."
      },
      {
        id: "saison-4",
        question: "Y a-t-il des restrictions particulières ?",
        answer: "Je respecte les conditions météorologiques et les arrêtés préfectoraux. Certaines zones peuvent être temporairement fermées pour des raisons de sécurité. Je vous tiens informés des conditions en vigueur."
      }
    ]
  },
  {
    id: "tarifs",
    title: "Tarifs Détaillés",
    description: "Mes tarifs par activité et formule",
    items: [
      {
        id: "tarifs-1",
        question: "Quels sont les tarifs du canyoning ?",
        answer: "Canyoning demi-journée : 45€ (tarif normal) / 40€ (tarif réduit*). Canyoning journée : 70€ (tarif normal) / 65€ (tarif réduit*). ACM : 280€ (8 enfants + 1 animateur). *Enfants jusqu'à 17 ans inclus / groupes de minimum 7 personnes."
      },
      {
        id: "tarifs-2",
        question: "Quels sont les tarifs de l'escalade ?",
        answer: "Escalade demi-journée : 39€ (standard) / 35€ (réduit*). Escalade journée : 62€ (standard) / 60€ (réduit*). ACM : 280€ (8 enfants + 1 accompagnateur). *Enfants jusqu'à 17 ans inclus / groupes de minimum 7 personnes."
      },
      {
        id: "tarifs-3",
        question: "Quels sont les tarifs de la spéléologie ?",
        answer: "Spéléologie demi-journée : 42€ (standard) / 39€ (réduit*). Spéléologie journée : 60€ (standard) / 56€ (réduit*). ACM : 220€ (5 enfants + 1 accompagnateur). Spéléoniversaire : 200€. *Enfants jusqu'à 17 ans inclus."
      },
      {
        id: "tarifs-4",
        question: "Y a-t-il des réductions spéciales ?",
        answer: "Oui, je propose des tarifs réduits pour les enfants jusqu'à 17 ans inclus et les groupes de minimum 7 personnes. Des tarifs spéciaux ACM sont disponibles pour les accueils collectifs de mineurs."
      }
    ]
  }
]; 