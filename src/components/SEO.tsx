import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  image?: string
  structuredData?: Record<string, unknown>
}

export default function SEO({ title, description, image = '/og-image.svg', structuredData }: SEOProps) {
  useEffect(() => {
    document.title = title
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) descriptionTag.setAttribute('content', description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    const twitterImage = document.querySelector('meta[name="twitter:image"]')
    ;[ogTitle, twitterTitle].forEach((tag) => tag?.setAttribute('content', title))
    ;[ogDescription, twitterDescription].forEach((tag) => tag?.setAttribute('content', description))
    ;[ogImage, twitterImage].forEach((tag) => tag?.setAttribute('content', image))

    let script = document.getElementById('structured-data') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'structured-data'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData ?? {}, null, 2)
  }, [description, image, structuredData, title])

  return null
}
