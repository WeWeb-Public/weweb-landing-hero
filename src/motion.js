const Motion = (positions) => {
  const maxDuration = 3000;
  const amplitude = 20;

  let start = 0;
  let elapsed = 0;
  let loopId;

  const update = () => {
    loopId = requestAnimationFrame(() => {
      elapsed = new Date().getTime() - start;
      if (elapsed >= maxDuration) {
        positions.forEach(pos => {
          pos.x += +2 * amplitude * Math.random() - amplitude;
          pos.y += +2 * amplitude * Math.random() - amplitude;
          pos.alpha += 2 * amplitude * Math.random() - amplitude;
        });
        start = new Date().getTime();
      }
      update();
    });
  };

  return {
    init (initialPositions) {
      positions = initialPositions;
    },
    start () {
      update();
    },
    stop () {
      cancelAnimationFrame(loopId);
    }
  };
};

export default Motion;
