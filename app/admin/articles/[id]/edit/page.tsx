'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArticleEditor } from '@/components/admin/ArticleEditor'
import { Article } from '@/types/article'
import { toast } from '@/components/ui/use-toast'

export default function EditArticlePage() {
  const { id } = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/admin/articles/${id}`)
        if (!response.ok) throw new Error('Failed to fetch article')
        const data = await response.json()
        setArticle(data)
      } catch (error) {
        console.error('Error fetching article:', error)
        toast({
          title: 'Chyba',
          description: 'Nepodařilo se načíst článek',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  const handleSuccess = () => {
    toast({
      title: 'Úspěch',
      description: 'Článek byl úspěšně aktualizován',
    })
    router.push('/admin/articles')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Článek nebyl nalezen</h1>
          <p className="text-gray-600 mb-6">Požadovaný článek neexistuje nebo nemáte potřebná oprávnění.</p>
          <button
            onClick={() => router.push('/admin/articles')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Zpět na seznam článků
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Upravit článek</h1>
        <p className="text-gray-600">Upravte vybraný článek</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <ArticleEditor article={article} onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
