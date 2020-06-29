<template>
  <svg :width="124 * scale"
       :height="124 * scale"
       viewBox="0 0 132 132"
       :style="inLineStyle"
       fill="none"
       class="bubble"
       xmlns="http://www.w3.org/2000/svg">
    <rect x="4"
          y="4"
          width="122"
          height="122"
          rx="30"
          fill="none"
          :stroke="color"
          :stroke-width="Math.ceil(4/scale)"></rect>
  </svg>
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
        default: "#000000"
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
      inLineStyle () {
        return `transform:translate(${this.x}px,${this.y}px) rotateZ(${this.alpha}deg)`;
      }
    }
  };
</script>
<style scoped
       lang="scss">
  .bubble {
    position: absolute;
    transition: all 3000ms ease-in-out
  }
</style>
