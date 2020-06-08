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
                elements.forEach((el, idx) => {
                    let { x, y, alpha } = positions[idx];
                    x += +2 * amplitude * Math.random() - amplitude;
                    y += +2 * amplitude * Math.random() - amplitude;
                    alpha += alpha + 2 * amplitude * Math.random() - amplitude;
                    elements[idx].style.transform = `translate(${x}px,${y}px) rotateZ(${alpha}deg)`;
                });
                start = new Date().getTime();
            }
            update();
        });
    };
    const layout = () => {
        elements.forEach((el, idx) => {
            const { x, y, alpha } = positions[idx];
            el.style.transform = `translate(${x}px,${y}px) rotateZ(${alpha}deg)`;
        });
    };

    return {
        init (initialPositions) {
            positions = initialPositions;
            layout();
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
