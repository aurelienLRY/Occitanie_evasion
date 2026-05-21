import { faqData } from '@/data/faq';

const BASE_URL = 'https://www.occitanie-evasion.com';

export function FaqSchema() {
  const mainEntity = faqData.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
    url: `${BASE_URL}/faq`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
