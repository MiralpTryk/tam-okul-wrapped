import { computed } from 'vue'
import { 
  generateMusicItems, 
  generateQuoteItems, 
  generateStoryItems, 
  generateBookItems, 
  generateCourseItems 
} from '@/utils/contentGenerators'

export function useContent() {
  const generateItems = (count, prefix, type = "course") => {
    switch (type) {
      case "music":
        return generateMusicItems(count, prefix)
      case "quote":
        return generateQuoteItems(count, prefix)
      case "story":
        return generateStoryItems(count, prefix)
      case "book":
        return generateBookItems(count, prefix)
      default:
        return generateCourseItems(count, prefix)
    }
  }

  const otherSections = computed(() => [
    {
      title: "Çalışırken Dinle 🎧",
      type: "music",
      items: generateItems(10, "Music", "music")
    },
    {
      title: "Motivasyon Sözleri 💭",
      type: "quote",
      items: generateItems(10, "Quote", "quote")
    },
    {
      title: "İlham Veren Hikayeler 📝",
      type: "story",
      items: generateItems(5, "Story", "story")
    },
    {
      title: "Kitap Önerileri 📚",
      type: "book",
      items: generateItems(10, "Book", "book")
    }
  ])

  return {
    generateItems,
    otherSections
  }
} 