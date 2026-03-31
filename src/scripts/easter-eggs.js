/**
 * Easter eggs for Zero Fluff website
 */
export function initEasterEggs() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // === KONAMI CODE ===
  const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        triggerConfetti();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerConfetti() {
    const colors = ['#FF3B30', '#00F0FF', '#FFFFFF', '#FF5147', '#A1A1AA'];
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
      const piece = document.createElement('div');
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * window.innerWidth;
      const endX = startX + (Math.random() - 0.5) * 400;
      const rotation = Math.random() * 720 - 360;

      piece.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        background:${color};
        left:${startX}px;top:50%;
        border-radius:${Math.random() > 0.5 ? '50%' : '0'};
        animation:confetti-fall ${1.5 + Math.random()}s ease-out forwards;
        animation-delay:${Math.random() * 0.3}s;
        --end-x:${endX - startX}px;
        --rotation:${rotation}deg;
      `;
      container.appendChild(piece);
    }

    // Toast notification
    const toast = document.createElement('div');
    toast.textContent = 'You found it! Zero Fluff, maximum fun.';
    toast.style.cssText = `
      position:fixed;bottom:40px;left:50%;transform:translateX(-50%);
      background:#1A1A1A;color:#fff;padding:16px 32px;
      font-family:'Inter Variable',sans-serif;font-size:14px;font-weight:600;
      border:1px solid #333;z-index:10001;
      animation:toast-in 0.3s ease forwards;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);

    setTimeout(() => container.remove(), 3000);
  }

  // Add confetti keyframes
  if (!document.querySelector('#easter-egg-styles')) {
    const style = document.createElement('style');
    style.id = 'easter-egg-styles';
    style.textContent = `
      @keyframes confetti-fall {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-${window.innerHeight}px) translateX(var(--end-x)) rotate(var(--rotation)); opacity: 0; }
      }
      @keyframes toast-in {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes toast-out {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
      }
      @keyframes matrix-fall {
        0% { transform: translateY(-100%); opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // === LOGO RAPID CLICK (5x) ===
  const logo = document.querySelector('.logo');
  if (logo) {
    let clickCount = 0;
    let clickTimer;

    logo.addEventListener('click', (e) => {
      clickCount++;
      clearTimeout(clickTimer);

      if (clickCount >= 5) {
        e.preventDefault();
        clickCount = 0;
        triggerMatrixRain();
      }

      clickTimer = setTimeout(() => { clickCount = 0; }, 500);
    });
  }

  function triggerMatrixRain() {
    const taglines = [
      'No fluff.', 'Just results.', 'No jargon.', 'No buzzwords.',
      'Save time.', 'Cut costs.', 'Work smarter.', 'AI that works.',
      'Zero fluff.', 'Practical AI.', 'Hands-on help.', '30+ years.',
    ];

    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10000;overflow:hidden;';
    document.body.appendChild(container);

    const columns = Math.floor(window.innerWidth / 120);
    for (let i = 0; i < columns; i++) {
      const col = document.createElement('div');
      const text = taglines[Math.floor(Math.random() * taglines.length)];
      col.textContent = text;
      col.style.cssText = `
        position:absolute;
        left:${(i / columns) * 100}%;
        top:0;
        color:#00F0FF;
        font-family:'Space Grotesk Variable',monospace;
        font-size:14px;
        font-weight:600;
        white-space:nowrap;
        opacity:0.7;
        animation:matrix-fall ${2 + Math.random() * 3}s linear forwards;
        animation-delay:${Math.random() * 2}s;
      `;
      container.appendChild(col);
    }

    setTimeout(() => container.remove(), 5000);
  }
}
