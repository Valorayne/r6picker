import { onMounted, onUnmounted, ref } from "vue";
import type { PositionDto } from "shared/types";

export function useWindowSize() {
  const windowSize = ref<PositionDto>({ x: window.innerWidth, y: window.innerHeight })

  const onResize = () => windowSize.value = { x: window.innerWidth, y: window.innerHeight }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.addEventListener('resize', onResize))

  return windowSize
}