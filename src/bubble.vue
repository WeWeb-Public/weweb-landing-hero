<template>
    <div class="bubble" :style="bubbleStyle">
        <div class="bubble-border" :style="bubbleBorderStyle"></div>
    </div>
    <!-- <svg :width="`${scale * 15}%`" :height="`${scale * 15}%`" viewBox="0 0 132 132" :style="inLineStyle" fill="none" class="bubble" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="122" height="122" rx="30" fill="none" :stroke="color" :stroke-width="Math.ceil(30 / (scale * 15))"></rect>
    </svg> -->
</template>
<script>
export default {
    props: {
        scale: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: '#000000'
        },
        xp: {
            type: Number,
            default: 0
        },
        yp: {
            type: Number,
            default: 0
        },
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        alpha: {
            type: Number,
            default: 0
        }
    },
    computed: {
        bubbleStyle() {
            return {
                left: `${this.xp}%`,
                top: `${this.yp}%`,
                transform: `translate(${this.x}px,${this.y}px) rotateZ(${this.alpha}deg)`,
                width: `${this.scale * 150}px`
            };
        },
        bubbleBorderStyle() {
            return {
                borderColor: `${this.color}`
            };
        }
    }
};
</script>
<style scoped lang="scss">
.bubble {
    position: absolute;
    transition: all 3000ms ease-in-out;

    .bubble-border {
        border-radius: 30%;
        border-width: 4px;
        border-style: solid;
        padding-bottom: calc(100% - 8px);
        width: 100%;
    }
}
</style>
