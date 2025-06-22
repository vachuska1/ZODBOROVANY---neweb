import Image from 'next/image';
import Link from 'next/link';
import { NewsArticle } from '@/types/news';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>{article.author}</span>
          <span>{new Date(article.date).toLocaleDateString('cs-CZ')}</span>
        </div>
        <Link 
          href={`/aktuality/${article.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
        >
          Číst více
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
