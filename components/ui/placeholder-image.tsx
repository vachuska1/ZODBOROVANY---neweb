import { cn } from "@/lib/utils"
import { ImageOff } from "lucide-react"
import Image, { ImageProps } from "next/image"
import { useState } from "react"

type Props = ImageProps & {
  fallbackClassName?: string
}

export function PlaceholderImage({
  src,
  alt,
  className,
  fallbackClassName = "",
  ...props
}: Props) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          className,
          fallbackClassName
        )}
      >
        <ImageOff className="h-8 w-8" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}
