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
      <ww-bubble v-for="(bubble, index) in section.data.initialPositions" :scale="bubble.scale" :color="bubble.color" :key="index">
      </ww-bubble>
    </div>
    <div class="content">
      <wwLayoutColumn
        tag="div"
        ww-default="ww-text"
        :ww-list="section.data.contentList"
        @ww-add="add(section.data.contentList, $event)"
        @ww-remove="remove(section.data.contentList, $event)"
      >
        <wwObject tag="div" ww-default="ww-text" v-for="item in section.data.contentList" :key="item.uniqueId" :ww-object="item">
        </wwObject>
      </wwLayoutColumn>
    </div>
  </div>
</template>

<script>
import wwBubble from './bubble.vue';
import positions from './positions';
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
    screenSize: undefined,
    elements: []
  }),
  computed: {
    section() {
      return this.sectionCtrl.get();
    },
    getScreenSize() {
      return this.$store.getters['front/getScreenSize'];
    }
  },
  created() {
    window.wwLib = undefined;
    this.init();
  },
  mounted() {
    this.elements = [...this.$el.querySelectorAll('.bubble')];
    this.motion = Motion(this.elements);
    this.layout();
    window.addEventListener('resize', this.layout);
  },
  destroyed() {
    this.motion && this.motion.stop();
    window.removeEventListener('resize', this.layout);
  },
  methods: {
    init() {
      let needUpdate = false;
      this.section.data = this.section.data || {};

      if (!this.section.data.initialPositions) {
        this.section.data.initialPositions = positions[this.getScreenSize];
        needUpdate = true;
      }

      if (!this.section.data.contentList) {
        this.section.data.contentList = [];
        needUpdate = true;
      }
      if (needUpdate) {
        this.sectionCtrl.update(this.section);
      }
    },
    layout() {
      if (this.screenSize == this.getScreenSize) return;
      this.motion && this.motion.stop();
      this.screenSize = this.getScreenSize;
      this.section.data.initialPositions = positions[this.screenSize];
      this.sectionCtrl.update(this.section);
      this.motion.init(this.section.data.initialPositions);
      this.motion.start();
    },
    // --------- EDITOR FUNCTIONS ---------
    // All the codes between /* wwManager:start */ and /* wwManager:end */ are only for editor purposes
    // So It won't in the published website!

    add(list, options) {
      try {
        list.splice(options.index, 0, options.wwObject);
        this.sectionCtrl.update(this.section);
      } catch (error) {
        wwLib.wwLog.error('ERROR : ', error);
      }
    },
    remove(list, options) {
      try {
        list.splice(options.index, 1);
        this.sectionCtrl.update(this.section);
      } catch (error) {
        wwLib.wwLog.error('ERROR : ', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  }

  .content {
    display: flex;
    flex-direction: column;
    margin: auto;
    background: transparent;

    @media (min-width: 768px) {
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
