import { computed } from 'vue'
import { 
  generateMusicItems, 
  generateQuoteItems, 
  generateStoryItems, 
  generateBookItems, 
  generateCourseItems 
} from '@/utils/contentGenerators'

export function useContent() {
  // Shuffle array helper function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateItems = (count, prefix, type = "course") => {
    let items;
    switch (type) {
      case "music":
        items = generateMusicItems(count, prefix)
        break;
      case "quote":
        items = generateQuoteItems(count, prefix)
        break;
      case "story":
        items = generateStoryItems(count, prefix)
        break;
      case "book":
        items = generateBookItems(count, prefix)
        break;
      default:
        items = generateCourseItems(count, prefix)
    }
    return shuffleArray(items);
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
      items: generateItems(100, "Quote", "quote")
    },
    {
      title: "Kitap Önerileri 📚",
      type: "book",
      items: generateItems(100, "Book", "book")
    }
  ]);

  return {
    generateItems,
    otherSections
  }
} 