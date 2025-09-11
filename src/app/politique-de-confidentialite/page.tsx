import { businessInformation } from "@/config/business-information";

const PolitiqueDeConfidentialite = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Politique de confidentialité</h1>
            
            <div className="space-y-8">
                {/* Introduction */}
                <section>
                    <p className="text-lg text-gray-700 mb-6">
                        La présente politique de confidentialité décrit comment {businessInformation.name} collecte, 
                        utilise et protège vos informations personnelles lorsque vous utilisez notre site web.
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                        <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </section>

                {/* Responsable du traitement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement des données</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="font-semibold text-lg mb-2">{businessInformation.name}</p>
                        <p className="mb-1">SIRET : {businessInformation.legal.siret}</p>
                        <p className="mb-1">Adresse : {businessInformation.legal.adresse}</p>
                        <p className="mb-1">Téléphone : {businessInformation.contact.phone}</p>
                        <p className="mb-1">Email : {businessInformation.contact.email}</p>
                    </div>
                </section>

                {/* Données collectées */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Données personnelles collectées</h2>
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium mb-3">2.1 Données collectées directement</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Données d&apos;identité :</strong> nom, prénom</li>
                            <li><strong>Données de contact :</strong> adresse email, numéro de téléphone</li>
                            <li><strong>Données de réservation :</strong> dates, nombre de participants, type d&apos;activité</li>
                            <li><strong>Données de communication :</strong> messages, demandes de renseignements</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3">2.2 Données collectées automatiquement</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Données de navigation :</strong> pages visitées, durée de visite, source de trafic</li>
                            <li><strong>Données techniques :</strong> adresse IP, type de navigateur, système d&apos;exploitation</li>
                            <li><strong>Cookies :</strong> cookies de session, cookies analytiques, cookies de préférences</li>
                        </ul>
                    </div>
                </section>

                {/* Finalités du traitement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement des données</h2>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">3.1 Traitement des réservations</h3>
                            <p>Vos données sont utilisées pour :</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Traiter vos demandes de réservation</li>
                                <li>Confirmer vos créneaux d&apos;activité</li>
                                <li>Vous contacter en cas de modification</li>
                                <li>Gérer les annulations et remboursements</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">3.2 Communication commerciale</h3>
                            <p>Vos données sont utilisées pour :</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Répondre à vos demandes de renseignements</li>
                                <li>Vous envoyer des informations sur nos activités (avec votre consentement)</li>
                                <li>Améliorer la qualité de nos services</li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">3.3 Analyse et amélioration du site</h3>
                            <p>Vos données sont utilisées pour :</p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Analyser le trafic et l&apos;utilisation du site</li>
                                <li>Améliorer l&apos;expérience utilisateur</li>
                                <li>Optimiser les performances du site</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Base légale */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Base légale du traitement</h2>
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Exécution du contrat</h3>
                                <p className="text-sm">Traitement des réservations et prestations d&apos;activités</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Intérêt légitime</h3>
                                <p className="text-sm">Amélioration des services et analyse du site</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Consentement</h3>
                                <p className="text-sm">Cookies non essentiels et marketing</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Obligation légale</h3>
                                <p className="text-sm">Conservation des données comptables</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Google Analytics */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Google Analytics et outils d&apos;analyse</h2>
                    <div className="space-y-4">
                        <p>
                            Notre site utilise Google Analytics, un service d&apos;analyse web fourni par Google Inc. 
                            Google Analytics utilise des cookies pour analyser l&apos;utilisation du site.
                        </p>
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Données collectées par Google Analytics :</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Pages visitées et durée de visite</li>
                                <li>Source de trafic (moteur de recherche, site référent, etc.)</li>
                                <li>Données démographiques générales (âge, sexe, intérêts)</li>
                                <li>Données géographiques (pays, ville)</li>
                                <li>Type d&apos;appareil et navigateur utilisé</li>
                            </ul>
                        </div>
                        <p>
                            <strong>Anonymisation :</strong> Nous avons activé l&apos;anonymisation des adresses IP. 
                            Vos données sont transmises à Google et peuvent être stockées sur des serveurs aux États-Unis.
                        </p>
                        <p>
                            <strong>Désactivation :</strong> Vous pouvez désactiver Google Analytics en installant 
                            le module complémentaire de désactivation de Google Analytics ou en configurant votre navigateur.
                        </p>
                    </div>
                </section>

                {/* Google reCAPTCHA */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Google reCAPTCHA</h2>
                    <div className="space-y-4">
                        <p>
                            Nous utilisons Google reCAPTCHA pour protéger notre site contre les spams et les abus. 
                            Ce service analyse le comportement des visiteurs pour distinguer les humains des robots.
                        </p>
                        <div className="bg-red-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2">Données collectées par reCAPTCHA :</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Adresse IP</li>
                                <li>Informations sur le navigateur et l&apos;appareil</li>
                                <li>Comportement de navigation (mouvements de souris, clics, etc.)</li>
                                <li>Cookies et données de session</li>
                            </ul>
                        </div>
                        <p>
                            Ces données sont transmises à Google et traitées conformément à la 
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                politique de confidentialité de Google
                            </a>.
                        </p>
                    </div>
                </section>

                {/* Conservation des données */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Durée de conservation des données</h2>
                    <div className="space-y-4">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">Type de données</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">Durée de conservation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Données de réservation</td>
                                        <td className="border border-gray-300 px-4 py-2">3 ans après la dernière activité</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Données de contact</td>
                                        <td className="border border-gray-300 px-4 py-2">3 ans après le dernier contact</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Données comptables</td>
                                        <td className="border border-gray-300 px-4 py-2">10 ans (obligation légale)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Données analytiques</td>
                                        <td className="border border-gray-300 px-4 py-2">26 mois maximum</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Cookies</td>
                                        <td className="border border-gray-300 px-4 py-2">13 mois maximum</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Destinataires */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Destinataires des données</h2>
                    <div className="space-y-4">
                        <p>Vos données personnelles peuvent être partagées avec :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Personnel autorisé de {businessInformation.name}</strong> - pour traiter vos demandes</li>
                            <li><strong>Google Analytics</strong> - pour l&apos;analyse du trafic (données anonymisées)</li>
                            <li><strong>Google reCAPTCHA</strong> - pour la sécurité du site</li>
                            <li><strong>Prestataires techniques</strong> - pour l&apos;hébergement et la maintenance</li>
                            <li><strong>Autorités compétentes</strong> - en cas d&apos;obligation légale</li>
                        </ul>
                        <p className="text-sm text-gray-600">
                            Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales.
                        </p>
                    </div>
                </section>

                {/* Droits des utilisateurs */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Vos droits</h2>
                    <div className="space-y-4">
                        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit d&apos;accès</h3>
                                <p className="text-sm">Obtenir une copie de vos données personnelles</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit de rectification</h3>
                                <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit d&apos;effacement</h3>
                                <p className="text-sm">Demander la suppression de vos données</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit à la limitation</h3>
                                <p className="text-sm">Limiter le traitement de vos données</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit à la portabilité</h3>
                                <p className="text-sm">Récupérer vos données dans un format structuré</p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Droit d&apos;opposition</h3>
                                <p className="text-sm">Vous opposer au traitement de vos données</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-semibold mb-2">Comment exercer vos droits :</p>
                            <p>Contactez-nous à : <strong>{businessInformation.contact.email}</strong></p>
                            <p className="text-sm mt-2">
                                Nous vous répondrons dans un délai d&apos;un mois. Vous pouvez également introduire 
                                une réclamation auprès de la CNIL si vous estimez que vos droits ne sont pas respectés.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sécurité */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Sécurité des données</h2>
                    <div className="space-y-4">
                        <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Chiffrement des données sensibles</li>
                            <li>Accès restreint aux données personnelles</li>
                            <li>Formation du personnel à la protection des données</li>
                            <li>Surveillance régulière des accès</li>
                            <li>Sauvegardes sécurisées</li>
                            <li>Mise à jour régulière des systèmes de sécurité</li>
                        </ul>
                    </div>
                </section>

                {/* Cookies */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Gestion des cookies</h2>
                    <div className="space-y-4">
                        <p>Notre site utilise différents types de cookies :</p>
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Cookies strictement nécessaires</h3>
                                <p className="text-sm">Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés.</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Cookies analytiques</h3>
                                <p className="text-sm">Ces cookies nous aident à comprendre comment vous utilisez notre site (Google Analytics).</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Cookies de préférences</h3>
                                <p className="text-sm">Ces cookies mémorisent vos choix et préférences.</p>
                            </div>
                        </div>
                        <p>
                            Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur 
                            ou en nous contactant à {businessInformation.contact.email}.
                        </p>
                    </div>
                </section>

                {/* Modifications */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">12. Modifications de la politique</h2>
                    <div className="space-y-4">
                        <p>
                            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                            Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
                        </p>
                        <p>
                            En cas de modification substantielle, nous vous en informerons par email ou par un avis 
                            visible sur notre site.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="mb-4">Pour toute question concernant cette politique de confidentialité :</p>
                        <div className="space-y-2">
                            <p><strong>Email :</strong> {businessInformation.contact.email}</p>
                            <p><strong>Téléphone :</strong> {businessInformation.contact.phone}</p>
                            <p><strong>Adresse :</strong> {businessInformation.legal.adresse}</p>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm">
                                <strong>Autorité de contrôle :</strong> Vous pouvez également introduire une réclamation 
                                auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) : 
                                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                    www.cnil.fr
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PolitiqueDeConfidentialite;
PolitiqueDeConfidentialite.displayName = "PolitiqueDeConfidentialite";
