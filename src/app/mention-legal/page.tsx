import { businessInformation } from "@/config/business-information";

const MentionLegal = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl mt-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Mentions légales</h1>
            
            <div className="space-y-8">
                {/* Éditeur du site */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="font-semibold text-lg mb-2">{businessInformation.name}</p>
                        <p className="mb-1">SIRET : {businessInformation.legal.siret}</p>
                        <p className="mb-1">Adresse : {businessInformation.legal.adresse}</p>
                        <p className="mb-1">Téléphone : {businessInformation.contact.phone}</p>
                        <p className="mb-1">Email : {businessInformation.contact.email}</p>
                        <p className="mb-1">Directeur de la publication : Florent (Gérant)</p>
                    </div>
                </section>

                {/* Hébergement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="mb-1">Le site est hébergé par :</p>
                        <p className="mb-1 font-semibold">OVH SAS</p>
                        <p className="mb-1">Au capital de 50 000 000 €</p>
                        <p className="mb-1">RCS Lille Métropole 424 761 419 00045</p>
                        <p className="mb-1">Code APE 2620Z</p>
                        <p className="mb-1">N° TVA : FR 22 424 761 419</p>
                        <p className="mb-1">Siège social : 2 rue Kellermann - 59100 Roubaix - France</p>
                        <p className="mb-1">Site web : https://www.ovh.com</p>
                        <p className="mb-1 text-sm text-gray-600 mt-2">
                            OVH SAS est une filiale de la société OVH Groupe SA, société immatriculée au RCS de Lille 
                            sous le numéro 537 407 926 sise 2, rue Kellermann, 59100 Roubaix.
                        </p>
                    </div>
                </section>

                {/* Propriété intellectuelle */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
                    <div className="space-y-4">
                        <p>
                            L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. 
                            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                        </p>
                        <p>
                            La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                        </p>
                        <p>
                            La marque et le logo de {businessInformation.name} sont des marques déposées. Toute reproduction non autorisée de ces marques, dessins et modèles constitue une contrefaçon passible de sanctions pénales.
                        </p>
                    </div>
                </section>

                {/* Collecte et traitement des données */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Collecte et traitement des données personnelles</h2>
                    <div className="space-y-4">
                        <p>
                            Conformément à la loi n° 78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés, 
                            et au Règlement Général sur la Protection des Données (RGPD), nous vous informons que :
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Les données personnelles collectées sur ce site sont destinées à {businessInformation.name}</li>
                            <li>Elles sont utilisées pour traiter vos demandes de contact et de réservation</li>
                            <li>Elles ne sont pas transmises à des tiers sans votre accord</li>
                            <li>Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données</li>
                            <li>Pour exercer ces droits, contactez-nous à : {businessInformation.contact.email}</li>
                        </ul>
                    </div>
                </section>

                {/* Cookies */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
                    <div className="space-y-4">
                        <p>
                            Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser le trafic du site. 
                            En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.
                        </p>
                        <p>
                            Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.
                        </p>
                    </div>
                </section>

                {/* Responsabilité */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
                    <div className="space-y-4">
                        <p>
                            Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l&apos;année, 
                            mais peut toutefois contenir des inexactitudes ou des omissions.
                        </p>
                        <p>
                            Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, 
                            à l&apos;adresse {businessInformation.contact.email}, en décrivant le problème de la manière la plus précise possible.
                        </p>
                        <p>
                            Tout contenu téléchargé se fait aux risques et périls de l&apos;utilisateur et sous sa seule responsabilité. 
                            En conséquence, ne saurait être tenu responsable d&apos;un quelconque dommage subi par l&apos;ordinateur de l&apos;utilisateur ou d&apos;une quelconque perte de données consécutives au téléchargement.
                        </p>
                    </div>
                </section>

                {/* Liens hypertextes */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Liens hypertextes</h2>
                    <div className="space-y-4">
                        <p>
                            Des liens hypertextes peuvent être présents sur le site. L&apos;utilisateur est informé qu&apos;en cliquant sur ces liens, 
                            il sortira du site {businessInformation.name}. Ce dernier n&apos;a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens 
                            et ne saurait en aucun cas être responsable de leur contenu.
                        </p>
                    </div>
                </section>

                {/* Droit applicable */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Droit applicable</h2>
                    <div className="space-y-4">
                        <p>
                            Tout litige en relation avec l&apos;utilisation du site {businessInformation.name} est soumis au droit français. 
                            Il est fait attribution exclusive de juridiction aux tribunaux compétents de Carcassonne.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="mb-2">Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                        <p className="mb-1">Email : {businessInformation.contact.email}</p>
                        <p className="mb-1">Téléphone : {businessInformation.contact.phone}</p>
                        <p className="mb-1">Adresse : {businessInformation.legal.adresse}</p>
                    </div>
                </section>

                {/* Dernière mise à jour */}
                <section className="border-t pt-6">
                    <p className="text-sm text-gray-600">
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </p>
                </section>
            </div>
        </div>
    )
}

export default MentionLegal;
MentionLegal.displayName = "MentionLegal";