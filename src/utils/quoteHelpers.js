import { backgroundImages } from '@/constants/images'

export const getQuoteBackground = (index) => {
  return `${backgroundImages[index % backgroundImages.length]}?auto=format&fit=crop&w=800&q=80`
}

export const createQuoteItem = (quote, index, prefix) => {
  return {
    id: `${prefix}-${index + 1}`,
    quote: quote.text,
    author: quote.author,
    type: 'quote',
    thumbnail: getQuoteBackground(index)
  }
} 