import type { Metadata } from "next";
import CustomSection from "@/components/layout/Section";
import RememberPhotosClient from "@/components/remember/RememberPhotosClient";

export const metadata: Metadata = {
  title: "Photos de votre session",
  description: "Galerie photos de votre sortie avec Occitanie Évasion.",
  robots: { index: false, follow: false },
};

function sessionIdFromPhotoSlug(slug: string): string | null {
  const trimmed = slug.trim();
  if (/^[a-f0-9]{24}$/i.test(trimmed)) return trimmed;
  const m = trimmed.match(/-([a-f0-9]{24})$/i);
  return m ? m[1] : null;
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

const RememberPhotosPage = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params;
  const { token } = await searchParams;

  const sessionId = sessionIdFromPhotoSlug(slug);

  if (!sessionId || !token?.trim()) {
    return (
      <CustomSection className="min-h-[70vh] w-full mx-auto max-w-4xl mt-24 px-4 py-12">
        <h1 className="!text-3xl md:!text-5xl font-bold mb-4 text-center">
          Lien incomplet
        </h1>
        <p className="font-paragraphe text-center text-lg opacity-85 max-w-xl mx-auto">
          Ouvrez le lien reçu par e-mail pour accéder à vos photos. Si le
          problème persiste, contactez-nous.
        </p>
      </CustomSection>
    );
  }

  return (
    <section className="min-h-screen ">
      <RememberPhotosClient sessionId={sessionId} token={token.trim()} />
    </section>
  );
};

export default RememberPhotosPage;
RememberPhotosPage.displayName = "RememberPhotosPage";
