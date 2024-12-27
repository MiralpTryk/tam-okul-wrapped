import { stories } from '@/constants/stories'

export const createStoryItem = (index, prefix) => {
  const story = stories[index % stories.length]
  return {
    id: `${prefix}-${index + 1}`,
    title: story.title,
    subtitle: story.subtitle,
    content: story.content,
    image: story.image,
    studyTip: story.studyTip,
    type: 'story'
  }
} 