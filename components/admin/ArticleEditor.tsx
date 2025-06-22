'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const articleSchema = z.object({
  title: z.string().min(1, 'Název je povinný'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Obsah je povinný'),
  author: z.string().min(1, 'Autor je povinný'),
  imageUrl: z.string().url('Neplatná URL adresa obrázku').optional().or(z.literal('')),
  publishedAt: z.string().min(1, 'Datum publikace je povinné'),
  isPublished: z.boolean().default(true),
})

type ArticleFormData = z.infer<typeof articleSchema>

interface ArticleEditorProps {
  article?: {
    id: string
    title: string
    excerpt?: string | null
    content: string
    author: string
    imageUrl?: string | null
    publishedAt: string
    isPublished: boolean
  }
  onSuccess?: () => void
}

export function ArticleEditor({ article, onSuccess }: ArticleEditorProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || '',
      excerpt: article?.excerpt || '',
      content: article?.content || '',
      author: article?.author || 'Administrátor',
      imageUrl: article?.imageUrl || '',
      publishedAt: article?.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : '',
      isPublished: article?.isPublished ?? true,
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = async (data: ArticleFormData) => {
    try {
      setIsSubmitting(true)
      
      const url = article 
        ? `/api/admin/articles/${article.id}` 
        : '/api/admin/articles'
      
      const method = article ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          publishedAt: new Date(data.publishedAt).toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Chyba při ukládání článku')
      }

      toast({
        title: 'Úspěch',
        description: article ? 'Článek byl aktualizován' : 'Článek byl vytvořen',
        variant: 'default',
      })

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/admin/articles')
        router.refresh()
      }
    } catch (error) {
      console.error('Error saving article:', error)
      toast({
        title: 'Chyba',
        description: 'Nepodařilo se uložit článek',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isMounted) {
    return <div>Načítání editoru...</div>
  }

  const content = watch('content')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Název článku</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Zadejte název článku"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="excerpt">Krátký popis (nepovinný)</Label>
          <Input
            id="excerpt"
            {...register('excerpt')}
            placeholder="Krátký popis, který se zobrazí v přehledu"
          />
        </div>

        <div>
          <Label htmlFor="content">Obsah článku</Label>
          {isMounted && (
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <div className={errors.content ? 'border border-red-500 rounded' : ''}>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    className="h-64 mb-12"
                  />
                </div>
              )}
            />
          )}
          {errors.content && (
            <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            {...register('author')}
            placeholder="Jméno autora"
            className={errors.author ? 'border-red-500' : ''}
          />
          {errors.author && (
            <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="imageUrl">URL obrázku (nepovinné)</Label>
          <Input
            id="imageUrl"
            type="url"
            {...register('imageUrl')}
            placeholder="https://example.com/image.jpg"
            className={errors.imageUrl ? 'border-red-500' : ''}
          />
          {errors.imageUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="publishedAt">Datum a čas publikace</Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            {...register('publishedAt')}
            className={errors.publishedAt ? 'border-red-500' : ''}
          />
          {errors.publishedAt && (
            <p className="text-sm text-red-500 mt-1">{errors.publishedAt.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublished"
            {...register('isPublished')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <Label htmlFor="isPublished">Publikováno</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin')}
          disabled={isSubmitting}
        >
          Zrušit
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Ukládám...' : 'Uložit článek'}
        </Button>
      </div>
    </form>
  )
}
