import { ref } from "vue";

export function useCountUp() {
  function countUp(target, duration = 1000) {
    const value = ref(0);
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      value.value = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    return value;
  }

  return { countUp };
}
