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
      const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const startDrag = (e) => {
    if (e.type.includes("mouse")) {
      isDragging.value = true
      startX.value = e.clientX
      startY.value = e.clientY
      isDragged.value = false
    } else {
      touchStartX.value = e.touches[0].clientX
      touchStartY.value = e.touches[0].clientY
    }
    const container = e.currentTarget
    scrollLeft.value = container.scrollLeft
    momentum.value = { velocity: 0, timestamp: 0 }
  }

  const drag = (e) => {
    if (e.type.includes("mouse")) {
      if (!isDragging.value) return
      e.preventDefault()
      const x = e.clientX
      const y = e.clientY

      if (Math.abs(x - startX.value) > 5 || Math.abs(y - startY.value) > 5) {
        isDragged.value = true
      }

      const walk = (x - startX.value) * 2
      e.currentTarget.scrollLeft = scrollLeft.value - walk
    } else {
      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY
      const deltaX = touchStartX.value - touchX
      const deltaY = touchStartY.value - touchY

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault()
        e.currentTarget.scrollLeft += deltaX * 2
      }

      touchStartX.value = touchX
      touchStartY.value = touchY
    }

    const currentTimestamp = Date.now()
    const dt = currentTimestamp - momentum.value.timestamp
    const velocity = (e.currentTarget.scrollLeft - scrollLeft.value) / dt

    momentum.value = { velocity, timestamp: currentTimestamp }
  }

  const endDrag = (e) => {
    isDragging.value = false
    const container = e.currentTarget

    const applyMomentum = () => {
      momentum.value.velocity *= 0.98
      container.scrollLeft += momentum.value.velocity

      if (Math.abs(momentum.value.velocity) > 0.5) {
        animationFrame.value = requestAnimationFrame(applyMomentum)
      }
    }

    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = requestAnimationFrame(applyMomentum)
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