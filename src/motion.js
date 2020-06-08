const Motion = (elements, positions) => {
    const maxDuration = 3000;
    const amplitude = 20;

    let start = 0;
    let elapsed = 0;
    let loopId;
    let x = 0, y = 0, alpha = 0;

    const update = () => {
        loopId = requestAnimationFrame(() => {
            elapsed = new Date().getTime() - start;
            if (elapsed >= maxDuration) {
                positions.forEach((item, idx) => {
                    x = item.x + 2 * amplitude * Math.random() - amplitude;
                    y = item.y + 2 * amplitude * Math.random() - amplitude;
                    alpha = item.alpha + 2 * amplitude * Math.random() - amplitude;
                    elements[idx].style.transform = `translate(${x}px,${y}px) rotateZ(${alpha}deg)`;
                });
                start = new Date().getTime();
            }
            update();
        });
    };
    const init = () => {
        positions.forEach((item, idx) => {
            elements[idx].style.transform = `translate(${item.x}px,${item.y}px) rotateZ(${item.alpha}deg)`;
        });
    };

    return {
        start () {
            //init();
            update();
        },
        stop () {
            cancelAnimationFrame(loopId);
        }
    };
};

export default Motion;
