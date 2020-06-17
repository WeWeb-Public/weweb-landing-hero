const Motion = (elements) => {
  const maxDuration = 3000;
  const amplitude = 20;

  let start = 0;
  let elapsed = 0;
  let loopId;
  let positions = [];

  const update = () => {
    loopId = requestAnimationFrame(() => {
      elapsed = new Date().getTime() - start;
      if (elapsed >= maxDuration) {
        positions.forEach((pos, idx) => {
          pos.x += +2 * amplitude * Math.random() - amplitude;
          pos.y += +2 * amplitude * Math.random() - amplitude;
          pos.alpha += 2 * amplitude * Math.random() - amplitude;
          elements[
            idx
          ].style.transform = `translate(${pos.x}px,${pos.y}px) rotateZ(${pos.alpha}deg)`;
        });
        start = new Date().getTime();
      }
      update();
    });
  };
  const layout = () => {
    if (positions.length !== elements.length) return;
    elements.forEach((el, idx) => {
      const { x, y, alpha } = positions[idx];
      el.style.transform = `translate(${x}px,${y}px) rotateZ(${alpha}deg)`;
    });
  };

  return {
    init(initialPositions) {
      positions = initialPositions;
    },
    start() {
      layout();
      update();
    },
    stop() {
      cancelAnimationFrame(loopId);
    },
  };
};

export default Motion;
