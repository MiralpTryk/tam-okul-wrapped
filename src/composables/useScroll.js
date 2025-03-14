import { ref } from 'vue'

export function useScroll() {
  const touchStartX = ref(0)
  const touchStartY = ref(0)
  const scrollContainers = ref([])
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)
  const isDragged = ref(false)
  const scrollLeft = ref(0)
  const momentum = ref({ velocity: 0, timestamp: 0 })
  const animationFrame = ref(null)

  const scroll = (index, direction) => {
    const container = scrollContainers.value[index]
    if (container) {
      const card = container.querySelector('div > div')
      if (!card) {
        console.error('No card element found')
        return
      }

      const cardWidth = card.offsetWidth
      const gap = 8
      const cardsToScroll = 5
      const scrollAmount = direction === "left" 
        ? -(cardWidth + gap) * cardsToScroll 
        : (cardWidth + gap) * cardsToScroll
      
      container.scrollBy({ 
        left: scrollAmount, 
        behavior: "smooth" 
      })
    } else {
      console.error('No container found for index:', index)
    }
  }

  const startDrag = (e) => {
    if (e.type.includes("mouse")) {
      return
    }
    
    touchStartX.value = e.touches[0].clientX
    touchStartY.value = e.touches[0].clientY
    const container = e.currentTarget
    scrollLeft.value = container.scrollLeft
    momentum.value = { velocity: 0, timestamp: 0 }
  }

  const handleTouchDrag = (e, container) => {
    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchStartX.value - touchX
    const deltaY = touchStartY.value - touchY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault()
      container.scrollLeft += deltaX * 2
    }

    touchStartX.value = touchX
    touchStartY.value = touchY
    updateMomentum(container)
  }

  const updateMomentum = (container) => {
    const currentTimestamp = Date.now()
    const dt = currentTimestamp - momentum.value.timestamp
    const velocity = (container.scrollLeft - scrollLeft.value) / dt
    momentum.value = { velocity, timestamp: currentTimestamp }
  }

  const drag = (e) => {
    if (e.type.includes('mouse')) {
      return
    }
    
    const container = e.currentTarget
    handleTouchDrag(e, container)
  }

  const applyMomentum = (container) => {
    const decay = 0.95
    return () => {
      momentum.value.velocity *= decay
      container.scrollLeft += momentum.value.velocity

      if (Math.abs(momentum.value.velocity) > 0.5) {
        animationFrame.value = requestAnimationFrame(applyMomentum(container))
      }
    }
  }

  const endDrag = (e) => {
    if (e.type.includes('mouse')) {
      return
    }
    
    isDragging.value = false
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = requestAnimationFrame(applyMomentum(e.currentTarget))
  }

  const cleanup = () => {
    cancelAnimationFrame(animationFrame.value)
  }

  return {
    touchStartX,
    touchStartY,
    scrollContainers,
    isDragging,
    startX,
    startY,
    isDragged,
    scrollLeft,
    momentum,
    scroll,
    startDrag,
    drag,
    endDrag,
    cleanup
  }
} 