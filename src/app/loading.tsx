import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col items-center justify-center relative overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 p-8">
        {/* Logo avec animation */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 animate-pulse">
          <Image 
            src="/logo.svg" 
            alt="Occitanie Évasion" 
            fill 
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Titre principal avec animation */}
        <div className="text-center space-y-4">
          <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl text-primary animate-pulse">
            Occitanie Évasion
          </h1>
          
          {/* Messages d'humour qui changent */}
          <div className="space-y-2">
            <p className="font-paragraphe text-lg sm:text-xl text-dark/80 animate-fade-in">
              🏔️ On prépare votre aventure...
            </p>
            <p className="font-paragraphe text-sm sm:text-base text-dark/60 animate-fade-in-delay">
              (On vérifie que les cordes sont bien attachées ! 😉)
            </p>
          </div>
        </div>

        {/* Barre de progression animée */}
        <div className="w-64 sm:w-80 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-progress-bar"></div>
        </div>

        {/* Messages d'encouragement */}
        <div className="text-center space-y-2">
          <p className="font-paragraphe text-sm text-dark/70 animate-fade-in-slow">
            💪 On charge les meilleures activités pour vous !
          </p>
          <p className="font-paragraphe text-xs text-dark/50 animate-fade-in-slower">
            Canyoning, Escalade, Spéléologie... Tout arrive ! 🚀
          </p>
        </div>

        {/* Icônes d'activités qui apparaissent */}
        <div className="flex space-x-4 opacity-60">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-bounce delay-100">
            🏔️
          </div>
          <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center animate-bounce delay-200">
            🧗
          </div>
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center animate-bounce delay-300">
            🕳️
          </div>
        </div>
      </div>

      {/* Pied de page avec humour */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="font-paragraphe text-xs text-dark/40 text-center animate-pulse">
          ⏱️ Patience... Les aventures les plus folles se méritent ! 
        </p>
      </div>
    </div>
  );
}