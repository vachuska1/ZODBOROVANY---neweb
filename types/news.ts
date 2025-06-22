export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  slug: string;
}

export const sampleNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Nové pracovní příležitosti',
    excerpt: 'Hledáme nové kolegy do našeho týmu. Přidejte se k nám!',
    content: 'Hledáme nové kolegy do našeho týmu. Nabízíme stabilní zázemí, příjemné pracovní prostředí a možnost profesního růstu. Přidejte se k nám!',
    imageUrl: '/images/news/pozice.jpg',
    author: 'Personální oddělení',
    date: '2025-06-22',
    slug: 'nove-pracovni-prilezitosti'
  },
  // Add more sample articles as needed
];
