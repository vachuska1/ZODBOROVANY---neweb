'use client'

import { useRouter } from 'next/navigation'
import { ArticleEditor } from '@/components/admin/ArticleEditor'
import { toast } from '@/components/ui/use-toast'

export default function NewArticlePage() {
  const router = useRouter()

  const handleSuccess = () => {
    toast({
      title: 'Úspěch',
      description: 'Článek byl úspěšně vytvořen',
    })
    router.push('/admin/articles')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Nový článek</h1>
        <p className="text-gray-600">Vytvořte nový článek pro sekci aktuality</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <ArticleEditor onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
