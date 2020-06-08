<!-- This is a Vue.js single file component. -->
<!-- Check the Vue.js doc here :  -->
<!-- https://vuejs.org/v2/guide/ -->

<!-- This is your HTML -->
<template>
  <div class="ww-landing-hero">
    <!-- wwManager:start -->
    <wwSectionEditMenu :sectionCtrl="sectionCtrl"></wwSectionEditMenu>
    <!-- wwManager:end -->
    <div class="bubbles-container">
      <ww-bubble v-for="(bubble,index) in section.data.positions"
                 class="bubbles-wrapper"
                 :scale="bubble.scale"
                 :color="bubble.color"
                 :key="index">
      </ww-bubble>
    </div>
  </div>

</template>

<script>
    const wwo = window.wwLib.wwObject;
    const wwu = window.wwLib.wwUtils;

    import wwBubble from './bubble.vue';
    import positions from './constants';
    import Motion from './motion';

    export default {
        name: '__COMPONENT_NAME__',
        components: {
            wwBubble
        },
        motion: {},
        props: {
            sectionCtrl: Object
        },
        data: () => ({
            x: 0,
            y: 0,
            alpha: 0
        }),
        computed: {
            section () {
                return this.sectionCtrl.get();
            },
            editMode () {
                return this.sectionCtrl.getEditMode() === 'CONTENT';
            },
            getScreenSize () {
                return this.$store.getters['front/getScreenSize'];
            }

        },
        created () {
            this.init();
        },
        mounted () {
            this.motion = Motion(this.$el.querySelectorAll('.bubbles-wrapper > .bubble'), this.section.data.positions);
            this.motion.start();
        },
        destroyed () {
            this.motion.stop();
        },
        methods: {
            init () {
                let needUpdate = false;
                this.section.data = this.section.data || {};

                if (!this.section.data.positions) {
                    this.section.data.positions = positions.lg;
                    needUpdate = true;
                }
                if (needUpdate) {
                    this.sectionCtrl.update(this.section);
                }
            }
        }
    };
</script>


<style lang="scss"
       scoped>
  .ww-landing-hero {
    position: relative;
    width: 100%;

    .bubbles {
      &-container {
        position: relative;
        height: 716px;
        width: 1440px;
        margin: auto;
        z-index: -1,
      }

      &-wrapper {
        position: absolute;
      }
    }
  }

</style>
