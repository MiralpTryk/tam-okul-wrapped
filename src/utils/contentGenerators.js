import { motivationalQuotes } from '@/constants/quotes'
import { movieImages } from '@/constants/images'
import { playlists, playlistImages } from '@/constants/playlists'
import { createQuoteItem } from '@/utils/quoteHelpers'
import { createStoryItem } from '@/utils/storyHelpers'
import { createBookItem } from '@/utils/bookHelpers'

export const generateMusicItems = (count, prefix) => {
  return Array.from({ length: count }, (_, i) => {
    const playlist = playlists[i % playlists.length]
    return {
      id: `${prefix}-${i + 1}`,
      title: playlist.title,
      subtitle: playlist.artist,
      image: playlistImages[i % playlistImages.length],
      spotifyEmbed: playlist.spotifyEmbed,
      studyTip: playlist.studyTip,
      type: "music",
    }
  })
}

export const generateQuoteItems = (count, prefix) => {
  return motivationalQuotes
    .slice(0, count)
    .map((quote, index) => createQuoteItem(quote, index, prefix))
}

export const generateCourseItems = (count, prefix) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `${prefix} Dersi ${i + 1}`,
    subtitle: `${prefix} Öğretmeni ${Math.floor(i / 5) + 1}`,
    image: movieImages[Math.floor(Math.random() * movieImages.length)],
    videoUrl: "https://www.youtube.com/watch?v=Bm1NtTAtBAA",
    content: generateCourseContent(prefix, i),
    type: "course"
  }))
}

const generateCourseContent = (prefix, index) => {
  return `
    <h2>${prefix} Dersi - Konu ${index + 1}</h2>
    <h3>Konu Özeti</h3>
    <ul>
      <li>Bu derste ${prefix} konusunun temel prensiplerini öğreneceksiniz.</li>
      <li>Pratik uygulamalar ve örneklerle konuyu pekiştireceksiniz.</li>
      <li>Sınav hazırlığı için önemli ipuçları alacaksınız.</li>
    </ul>
    <h3>Önemli Noktalar</h3>
    <ul>
      <li>Konunun ana hatları ve temel kavramlar</li>
      <li>Sık karşılaşılan soru tipleri ve çözüm yöntemleri</li>
      <li>Pratik yapılması gereken alt başlıklar</li>
    </ul>
    <h3>Çalışma Önerileri</h3>
    <ul>
      <li>Videoyu not alarak izleyin</li>
      <li>Verilen örnekleri çözmeye çalışın</li>
      <li>Anlamadığınız yerleri not alıp tekrar izleyin</li>
    </ul>
  `
}

export const generateStoryItems = (count, prefix) => {
  return Array.from({ length: count }, (_, i) => createStoryItem(i, prefix))
}

export const generateBookItems = (count, prefix) => {
  return Array.from({ length: count }, (_, i) => createBookItem(i, prefix))
} 