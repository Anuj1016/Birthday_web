// This file will be imported in the client components to show confetti animation

export function showConfetti() {
    // Check if confetti.js is already loaded
    if (typeof window !== "undefined" && !window.confetti) {
      // Load confetti.js script
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
      script.async = true
      script.onload = () => {
        triggerConfetti()
      }
      document.head.appendChild(script)
    } else {
      triggerConfetti()
    }
  }
  
  function triggerConfetti() {
    if (typeof window !== "undefined" && window.confetti) {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
  
      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }
  
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
  
        if (timeLeft <= 0) {
          return clearInterval(interval)
        }
  
        const particleCount = 50 * (timeLeft / duration)
  
        // since particles fall down, start a bit higher than random
        window.confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
        window.confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      }, 250)
    }
  }