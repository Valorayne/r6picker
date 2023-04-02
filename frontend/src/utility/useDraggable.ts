import { ref } from "vue";
import { useWindowSize } from "@/utility/windowSize";
import { clamp } from "@/utility/numbers";
import type { DimensionsDto, PositionDto } from "shared/types";

export type UseDraggableProps = {
  dimensions: DimensionsDto,
  maxHorizontalOffset?: number
  maxVerticalOffset?: number
}

export function useDraggable({
  dimensions: { width, height },
  maxHorizontalOffset = 500,
  maxVerticalOffset = 300
}: UseDraggableProps) {
  const position = ref<PositionDto>({ x: 0, y: 0 })
  const isDragging = ref(false)
  const windowSize = useWindowSize()

  const startDrag = () => isDragging.value = true
  const endDrag = () => isDragging.value = false

  const limits = {
    minX: -maxHorizontalOffset,
    maxX: width + maxHorizontalOffset - windowSize.value.x,
    minY: -maxVerticalOffset,
    maxY: height + maxVerticalOffset - windowSize.value.y
  }

  const moveMouse = (e: MouseEvent) => {
    if (!isDragging.value) return
    position.value = {
      x: clamp(limits.minX, limits.maxX, position.value.x - e.movementX),
      y: clamp(limits.minY, limits.maxY, position.value.y - e.movementY)
    }
  }

  return {
    position,
    isDragging,
    startDrag,
    endDrag,
    moveMouse,
  }
}