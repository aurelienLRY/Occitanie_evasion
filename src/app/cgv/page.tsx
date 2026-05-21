import Link from 'next/link';
import CustomSection from '@/components/layout/Section';
import { businessInformation } from '@/config/business-information';

const toc = [
  { id: 'cgv', label: 'CGV' },
  { id: 'annulation', label: 'Annulation et remboursement' },
  { id: 'horaires', label: 'Horaires et retards' },
  { id: 'diplomes', label: 'Diplomes et statuts legaux' },
  { id: 'assurance-responsabilite', label: 'Assurance et responsabilite' },
  { id: 'assurances', label: 'Assurances' },
  { id: 'risques', label: 'Gestion des risques' },
  { id: 'contre-indications', label: 'Contre-indications' },
] as const;

const CgvPage = () => {
  const { name } = businessInformation;
  const siteUrl = 'https://www.occitanie-evasion.com';

  return (
    <>
      <CustomSection className="pt-32 pb-14 bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4">
            Conditions g{'\u00e9'}n{'\u00e9'}rales de vente
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Conditions g{'\u00e9'}n{'\u00e9'}rales de vente, d&apos;assurance et de responsabilit
            {'\u00e9'} {'\u2014'} {name}
          </p>
        </div>
      </CustomSection>

      <CustomSection className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav
            aria-label="Sommaire des conditions generales"
            className="mb-10 p-6 bg-secondary rounded-xl shadow-lg"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Sommaire</h2>
            <ol className="grid sm:grid-cols-2 gap-2 list-decimal list-inside text-white marker:text-white/80">
              {toc.map((item) => (
                <li key={item.id} className="text-white">
                  <a
                    href={`#${item.id}`}
                    className="text-white hover:text-white/90 hover:underline font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section id="cgv" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                CGV
              </h2>
              <p>
                Le souscripteur r{'\u00e9'}servant pour d&apos;autres participants certifie que tous les
                participants, ou responsables l{'\u00e9'}gaux pour les mineurs, ont pris connaissance des
                conditions g{'\u00e9'}n{'\u00e9'}rales de vente suivantes de {name} et que chacun les accepte
                individuellement.
              </p>
            </section>

            <section id="annulation" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Annulation et remboursement
              </h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  Pour toute annulation partielle ou totale du client signal{'\u00e9'}e dans les{' '}
                  <strong>48 heures</strong> pr{'\u00e9'}c{'\u00e9'}dant l&apos;heure du d{'\u00e9'}but de la prestation, le
                  montant total de la prestation sera d{'\u00fb'}. Aucun remboursement ne sera possible.
                </li>
                <li>
                  Dans le cas d&apos;une r{'\u00e9'}servation en ligne, et si le nombre de participants ou
                  le choix de la sortie posent un probl{'\u00e8'}me d&apos;organisation {'\u00e0'} {name},{' '}
                  l&apos;entreprise {name} se r{'\u00e9'}serve le droit de contacter le client pour lui
                  proposer une alternative et, le cas {'\u00e9'}ch{'\u00e9'}ant, d&apos;annuler la r{'\u00e9'}servation et de
                  proc{'\u00e9'}der {'\u00e0'} son remboursement.
                </li>
                <li>
                  Toute annulation partielle ou totale d&apos;un client, due {'\u00e0'} un cas de force
                  majeure et sur justificatif (maladie, blessure, deuil{'\u2026'}), donnera lieu au
                  remboursement de la personne impact{'\u00e9'}e par la circonstance emp{'\u00ea'}chant
                  l&apos;activit{'\u00e9'}. Pour une personne mineure, {name} remboursera le montant
                  correspondant {'\u00e0'} l&apos;inscription de l&apos;enfant et d&apos;un adulte. Le
                  client devra alors fournir {'\u00e0'} {name} un justificatif : certificat m{'\u00e9'}dical ou acte
                  officiel.
                </li>
                <li>
                  {name} se r{'\u00e9'}serve le droit d&apos;annuler une prestation si le nombre minimum de
                  participants {'\u00e0'} la sortie n&apos;est pas atteint pour le canyoning. Une solution
                  sera propos{'\u00e9'}e au client pour d{'\u00e9'}caler la sortie.
                </li>
                <li>
                  La d{'\u00e9'}cision d&apos;annuler une prestation en raison d&apos;un danger d{'\u00fb'} aux
                  conditions m{'\u00e9'}t{'\u00e9'}orologiques ou aux niveaux d&apos;eau appartient au(x) guide(s) ou
                  moniteur(s) en charge de l&apos;encadrement et de la s{'\u00e9'}curit{'\u00e9'} du groupe, et {'\u00e0'} lui
                  seul. Cette d{'\u00e9'}cision ne peut {'\u00ea'}tre contest{'\u00e9'}e.
                </li>
                <li>
                  En cas d&apos;annulation d{'\u00e9'}cid{'\u00e9'}e par {name}, toute somme pr{'\u00e9'}alablement vers{'\u00e9'}e
                  serait int{'\u00e9'}gralement rembours{'\u00e9'}e au client.
                </li>
              </ol>
            </section>

            <section id="horaires" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Horaires et retards
              </h2>
              <p>
                Suite {'\u00e0'} la r{'\u00e9'}servation, les participants recevront des informations pr{'\u00e9'}cises de lieu
                et d&apos;heure de rendez-vous. Pour le confort des autres participants, un retard
                de <strong>10 minutes</strong> sera tol{'\u00e9'}r{'\u00e9'}, suite {'\u00e0'} quoi le groupe partira en
                activit{'\u00e9'} et aucun remboursement ne sera possible.
              </p>
            </section>

            <section id="diplomes" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Dipl{'\u00f4'}mes et statuts l{'\u00e9'}gaux
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p>
                  {name} est repr{'\u00e9'}sent{'\u00e9'}e par <strong>Florent Soum</strong>, moniteur dipl{'\u00f4'}m{'\u00e9'} BPJEPS
                  CKDA, CS Escalade, BAPAAT Sp{'\u00e9'}l{'\u00e9'}ologie et CQP OPAH, d{'\u00e9'}clar{'\u00e9'} {'\u00e0'} l&apos;URSSAF
                  (entreprise individuelle) et titulaire de la carte professionnelle
                  d&apos;{'\u00e9'}ducateur sportif.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  SIRET : {businessInformation.legal.siret} {'\u2014'} {businessInformation.legal.adresse}
                </p>
              </div>
            </section>

            <section id="assurance-responsabilite" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Conditions d&apos;assurance et de responsabilit{'\u00e9'}
              </h2>
              <p>
                Le souscripteur r{'\u00e9'}servant pour d&apos;autres participants certifie que tous les
                participants, ou responsables l{'\u00e9'}gaux pour les mineurs, ont pris connaissance des
                conditions d&apos;assurance et de responsabilit{'\u00e9'} suivantes et que chacun les accepte
                individuellement.
              </p>
            </section>

            <section id="assurances" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Assurances
              </h2>
              <div className="space-y-4">
                <p>
                  {name} est couvert par une assurance de Responsabilit{'\u00e9'} Civile Professionnelle.
                  Cette assurance couvre efficacement l&apos;ensemble des soins m{'\u00e9'}dicaux ou
                  hospitaliers et d&apos;indemnit{'\u00e9'}s pour les risques dont le professionnel est
                  responsable.
                </p>
                <p>
                  Cependant, une assurance en responsabilit{'\u00e9'} civile individuelle couvrant les
                  activit{'\u00e9'}s de canyoning est <strong>obligatoire</strong> pour chaque participant.
                </p>
                <p>
                  En cas de r{'\u00e9'}servation avec un autre moniteur partenaire, c&apos;est
                  l&apos;assurance de celui-ci qui sera alors sollicit{'\u00e9'}e.
                </p>
              </div>
            </section>

            <section id="risques" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Gestion des risques
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  Les activit{'\u00e9'}s propos{'\u00e9'}es par {name} sont des aventures sportives de pleine nature.
                  Chaque participant est conscient de s&apos;engager sur des terrains glissants et
                  escarp{'\u00e9'}s et reconna{'\u00ee'}t le caract{'\u00e8'}re al{'\u00e9'}atoire, changeant et difficilement pr{'\u00e9'}visible
                  du terrain de pratique et des conditions m{'\u00e9'}t{'\u00e9'}orologiques.
                </li>
                <li>
                  Les participants ont acc{'\u00e8'}s sur le site{' '}
                  <a
                    href={siteUrl}
                    className="text-secondary hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {siteUrl.replace('https://', '')}
                  </a>{' '}
                  {'\u00e0'} tous les d{'\u00e9'}tails de l&apos;activit{'\u00e9'} dans laquelle ils s&apos;engagent. Ils
                  doivent se renseigner attentivement et ne doivent pas sur-estimer leurs capacit{'\u00e9'}s
                  physiques ou psychologiques ni celles de leurs enfants.
                </li>
                <li>
                  Pendant l&apos;activit{'\u00e9'}, lors du briefing de s{'\u00e9'}curit{'\u00e9'} et de chaque passage de
                  consigne, les participants doivent {'\u00ea'}tre tr{'\u00e8'}s attentifs et ne s&apos;engager que
                  s&apos;ils ont bien compris les instructions de leur guide.
                </li>
                <li>
                  {name} d{'\u00e9'}cline toute responsabilit{'\u00e9'} en cas de perte ou d{'\u00e9'}gradation d&apos;objets
                  appartenant au client pendant l&apos;activit{'\u00e9'} : appareils photos, smartphones,
                  cam{'\u00e9'}ras, lunettes, verres de contact, bijoux{'\u2026'} (liste non exhaustive).
                </li>
              </ul>
            </section>

            <section id="contre-indications" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary/30">
                Contre-indications
              </h2>
              <div className="space-y-4">
                <p>
                  Pour r{'\u00e9'}aliser les activit{'\u00e9'}s sportives propos{'\u00e9'}es par {name}, les participants ne
                  doivent avoir aucune contre-indication m{'\u00e9'}dicale {'\u00e0'} la pratique de ces activit{'\u00e9'}s ni
                  aucun ant{'\u00e9'}c{'\u00e9'}dent de sant{'\u00e9'} ou op{'\u00e9'}ration qui pourraient la rendre dangereuse.
                </p>
                <p>
                  Les douleurs pouvant emp{'\u00ea'}cher la progression dans le canyon et sa remont{'\u00e9'}e sont
                  consid{'\u00e9'}r{'\u00e9'}es comme contre-indications m{'\u00e9'}dicales.
                </p>
                <p>
                  Un participant ayant une sp{'\u00e9'}cificit{'\u00e9'} de sant{'\u00e9'}, un handicap physique ou mental ou un
                  traitement m{'\u00e9'}dical doit en informer {name} lors de la prise de r{'\u00e9'}servation afin
                  que le guide puisse organiser sa prestation et offrir les meilleures conditions de
                  confort et de s{'\u00e9'}curit{'\u00e9'}, sous r{'\u00e9'}serve que la r{'\u00e9'}servation soit accept{'\u00e9'}e par le
                  moniteur.
                </p>
                <p>Il est impossible d&apos;{'\u00ea'}tre sous l&apos;effet de l&apos;alcool ou de drogue.</p>
                <p>
                  Les femmes enceintes sont conscientes d&apos;un risque de l{'\u00e9'}sion f{'\u0153'}tale grave ou
                  mortelle en cas de chute ou de glissade.
                </p>
                <p>
                  Pour la pratique du canyoning, les participants doivent, pour les sorties famille,
                  {'\u00ea'}tre {'\u00e0'} l&apos;aise dans l&apos;eau et d{'\u00e9'}signer aupr{'\u00e8'}s du guide les enfants les
                  moins {'\u00e0'} l&apos;aise.
                </p>
              </div>
            </section>

            <section className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-600">
                Derni{'\u00e8'}re mise {'\u00e0'} jour :{' '}
                {new Date().toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <Link
                href="/faq"
                className="text-secondary hover:underline font-medium text-sm"
              >
                Retour {'\u00e0'} la FAQ {'\u2192'}
              </Link>
            </section>
          </div>
        </div>
      </CustomSection>
    </>
  );
};

export default CgvPage;
CgvPage.displayName = 'CgvPage';
