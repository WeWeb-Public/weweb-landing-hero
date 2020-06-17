<!-- This is a Vue.js single file component. -->
<!-- Check the Vue.js doc here :  -->
<!-- https://vuejs.org/v2/guide/ -->

<!-- This is your HTML -->
<template>
  <wwSectionContainer :section-ctrl="sectionCtrl" :content="content">
      <div class="ww-landing-hero">
        <div class="bubbles-container" ref="bubblesContainer">
          <ww-bubble v-for="(bubble,index) in initialPositions"
                     :scale="bubble.scale"
                     :color="bubble.color"
                     :key="index"
                     data-animated
                     class="bubble">
          </ww-bubble>
        </div>
        <div class="content">
          <wwContentColumn :elements="content.elements"
                           :update="()=>sectionCtrl.update(content)">

            <wwObject tag="div"
                      ww-default="ww-text"
                      v-for="item in content.elements"
                      :key="item.uniqueId"
                      :ww-object="item"
            >
            </wwObject>
          </wwContentColumn>
        </div>

      </div>
  </wwSectionContainer>

</template>

<script>
    const wwo = window.wwLib.wwObject;
    const wwu = window.wwLib.wwUtils;

    import wwContentColumn from './shared/wwContentColumn.vue';
    import wwSectionContainer from './shared/wwSectionContainer.vue';

    import wwBubble from './bubble.vue';
    import positions from './positions';
    import Motion from './motion';

    export default {
        name: '__COMPONENT_NAME__',
        components: {
            wwSectionContainer,
            wwContentColumn,
            wwBubble
        },
        props: {
            sectionCtrl: Object
        },
        motion: {},
        data: () => ({
            content: {
                elements: []
            },
            screenSize: 'lg',
            elements: [],
            initialPositions: positions['lg']
        }),
        computed: {
            getScreenSize() {
                return this.$store.getters['front/getScreenSize'];
            }
        },
        mounted() {
            this.elements = [...this.$refs.bubblesContainer.querySelectorAll('[data-animated]')];
            this.motion = Motion(this.elements);
            this.layout();
            window.addEventListener('resize', this.layout);
        },
        destroyed() {
            this.motion && this.motion.stop();
            window.removeEventListener('resize', this.layout);
        },
        methods: {
            layout() {
                if (this.screenSize === this.getScreenSize && this.motion.started()) return;
                this.motion.stop();
                this.screenSize = this.getScreenSize;
                this.initialPositions = positions[this.screenSize];
                this.motion.init(this.initialPositions);
                this.motion.start();
            }
        }
    };
</script>


<style lang="scss" scope>
  .ww-landing-hero {
    position: relative;
    width: 100%;
    height: 100vh;

    .bubbles-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      .bubble {
        position: absolute;
        transition: all 3000ms ease-in-out
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      margin: auto;
      background: transparent;

      @media(min-width: 768px) {
        width: 100%;
        height: 838px;
      }

      @media (min-width: 1200px) {
        width: 1440px;
        height: 716px;
      }
    }
  }


</style>
