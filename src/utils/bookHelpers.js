import { books } from '@/constants/books'

export const createBookItem = (index, prefix) => {
  const book = books[index % books.length]
  return {
    id: `${prefix}-${index + 1}`,
    title: book.title,
    subtitle: book.subtitle,
    image: book.image,
    description: book.description,
    category: book.category,
    readingTime: book.readingTime,
    pages: book.pages,
    type: 'book'
  }
} 