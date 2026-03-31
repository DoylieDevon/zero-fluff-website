/**
 * Scramble text effect — characters cycle through random chars before revealing the real text.
 * @param {HTMLElement} element - The element whose textContent to scramble
 * @param {Object} options
 * @param {number} options.duration - Total duration in ms (default: 2000)
 * @param {number} options.delay - Delay before starting in ms (default: 0)
 * @returns {Promise} Resolves when animation complete
 */
export function scrambleText(element, { duration = 2000, delay = 0 } = {}) {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const chars = '!@#$%^&*()_+{}|:<>?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const originalText = element.textContent;
      const length = originalText.length;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Number of characters that should be revealed
        const revealedCount = Math.floor(progress * length);

        let result = '';
        for (let i = 0; i < length; i++) {
          if (originalText[i] === ' ' || originalText[i] === '\n') {
            result += originalText[i];
          } else if (i < revealedCount) {
            result += originalText[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        element.textContent = result;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = originalText;
          resolve();
        }
      }

      requestAnimationFrame(update);
    }, delay);
  });
}
