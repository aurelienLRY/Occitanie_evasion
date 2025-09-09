import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center relative overflow-hidden mt-24 p-8">
      {/* Animation de fond avec des éléments flottants */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-secondary/20 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/20 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-secondary/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-60 left-1/2 w-2 h-2 bg-accent/20 rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-60 right-1/3 w-4 h-4 bg-primary/20 rounded-full animate-bounce delay-600"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center max-w-4xl">
        {/* Logo avec animation */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 ">
          <Image 
            src="/logo.svg" 
            alt="Occitanie Évasion" 
            fill 
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Code d'erreur 404 avec style */}
        <div className="space-y-4">
          <h1 className="font-title text-8xl sm:text-9xl lg:text-[12rem] text-primary/20 font-bold">
            404
          </h1>
          
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl text-primary">
            Oups !<br /> Cette page s&apos;est échappée! 🏃‍♂️
          </h2>
        </div>


        {/* Suggestions d'activités */}
        <div className="space-y-4"> 
          <p className="font-paragraphe text-base text-dark/70 mb-4">
              😅 <strong>Pas de panique !</strong> Même les meilleurs guides se perdent parfois !
            </p>
          <p className="font-paragraphe text-sm text-dark/70">
            En attendant qu&apos;elle revienne, découvrez nos vraies aventures :
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/activites/canyoning" 
              className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full font-paragraphe text-sm transition-all duration-300 hover:scale-105"
            >
              🏔️ Canyoning
            </Link>
            <Link 
              href="/activites/escalade" 
              className="bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-2 rounded-full font-paragraphe text-sm transition-all duration-300 hover:scale-105"
            >
              🧗 Escalade
            </Link>
            <Link 
              href="/activites/speleologie" 
              className="bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2 rounded-full font-paragraphe text-sm transition-all duration-300 hover:scale-105"
            >
              🕳️ Spéléologie
            </Link>
          </div>
        </div>

        {/* Bouton retour à l'accueil */}
        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-paragraphe font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            🏠 Retour à l&apos;accueil
            <span className="text-xl">→</span>
          </Link>
        </div>

        {/* Message d'encouragement */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
          <p className="font-paragraphe text-sm text-dark/60">
            💡 <strong>Conseil de guide :</strong> Si vous cherchez quelque chose de spécifique, 
            n&apos;hésitez pas à nous <Link href="/contact" className="text-primary hover:underline">contacter</Link> ! 
            On vous aidera à trouver votre chemin ! 🗺️
          </p>
        </div>

      </div>
    </div>
  );
}