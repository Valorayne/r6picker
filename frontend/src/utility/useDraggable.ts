import { computed, ref } from "vue";
import { useWindowSize } from "@/utility/windowSize";
import { clamp } from "@/utility/numbers";

export type UseDraggableProps = {
  width: number
  height: number
  maxHorizontalOffset?: number
  maxVerticalOffset?: number
}

export function useDraggable({
  width, height,
  maxHorizontalOffset = 500,
  maxVerticalOffset = 300
}: UseDraggableProps) {
  type Position = { x: number; y: number }

  const mapPosition = ref<Position>({ x: 0, y: 0 })
  const isDragging = ref(false)
  const windowSize = useWindowSize()

  const startDrag = () => isDragging.value = true
  const endDrag = () => isDragging.value = false

  const limits = computed(() => ({
    minX: -maxHorizontalOffset,
    maxX: width + maxHorizontalOffset - windowSize.value.x,
    minY: -maxVerticalOffset,
    maxY: height + maxVerticalOffset - windowSize.value.y
  }))

  const moveMouse = (e) => {
    if (!isDragging.value) return
    mapPosition.value = {
      x: clamp(limits.value.minX, limits.value.maxX, mapPosition.value.x - e.movementX),
      y: clamp(limits.value.minY, limits.value.maxY, mapPosition.value.y - e.movementY)
    }
  }

  return {
    position: mapPosition,
    startDrag,
    endDrag,
    moveMouse
  }
}