import confetti from 'canvas-confetti';

const PASTEL_COLORS = ['#88B3A2', '#F2B8B5', '#D9776C', '#F4D58D', '#9BA8C7', '#FAF6F0'];

export function firePastelConfetti(): void {
  confetti({
    particleCount: 75,
    spread: 68,
    origin: { y: 0.65 },
    colors: PASTEL_COLORS,
    ticks: 220,
    scalar: 1.05,
  });

  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0.08, y: 0.68 },
      colors: PASTEL_COLORS,
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 0.92, y: 0.68 },
      colors: PASTEL_COLORS,
    });
  }, 220);
}
