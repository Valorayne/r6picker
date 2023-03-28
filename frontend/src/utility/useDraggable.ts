import { computed, ref } from "vue";
import { useWindowSize } from "@/utility/windowSize";
import { clamp } from "@/utility/numbers";
import type { Dimensions, Position } from "@/utility/types";

export type UseDraggableProps = {
  dimensions: Dimensions,
  maxHorizontalOffset?: number
  maxVerticalOffset?: number
}

export function useDraggable({
  dimensions: { width, height },
  maxHorizontalOffset = 500,
  maxVerticalOffset = 300
}: UseDraggableProps) {
  const position = ref<Position>({ x: 0, y: 0 })
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

  const moveMouse = (e: MouseEvent) => {
    if (!isDragging.value) return
    position.value = {
      x: clamp(limits.value.minX, limits.value.maxX, position.value.x - e.movementX),
      y: clamp(limits.value.minY, limits.value.maxY, position.value.y - e.movementY)
    }
  }

  return {
    position,
    isDragging,
    startDrag,
    endDrag,
    moveMouse
  }
}