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
            <ww-bubble v-for="(bubble, index) in positions" :scale="bubble.scale" :color="bubble.color" :xp="bubble.xp" :yp="bubble.yp" :x="bubble.x" :y="bubble.y" :alpha="bubble.alpha" :key="index" data-ww-hero-bubble> </ww-bubble>
        </div>
        <div class="content">
            <wwLayoutColumn tag="div" ww-default="ww-text" :ww-list="section.data.contentList" @ww-add="add(section.data.contentList, $event)" @ww-remove="remove(section.data.contentList, $event)">
                <wwObject tag="div" ww-default="ww-text" style="width: 100%;" v-for="item in section.data.contentList" :key="item.uniqueId" :ww-object="item"> </wwObject>
            </wwLayoutColumn>
        </div>
    </div>
</template>

<script>
const wwo = window.wwLib.wwObject;
const wwu = window.wwLib.wwUtils;

import wwBubble from './bubble.vue';
import initialPositions from './positions';
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
        screenSize: void 0,
        positions: []
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
        this.init();
    },
    mounted() {
        this.motion = Motion(this.positions);
        this.layout();
        window.addEventListener('resize', this.layout);
    },
    destroyed() {
        window.removeEventListener('resize', this.layout);
        this.motion && this.motion.stop();
    },
    methods: {
        init() {
            let needUpdate = false;
            this.section.data = this.section.data || {};

            if (!this.section.data.contentList) {
                this.section.data.contentList = [];
                needUpdate = true;
            }
            if (needUpdate) {
                this.sectionCtrl.update(this.section);
            }

            initialPositions.forEach(pos => {
                pos.x = 0;
                pos.y = 0;
            });
            this.positions = initialPositions;
        },
        layout() {
            if (this.screenSize === this.getScreenSize) return;

            this.motion && this.motion.stop();
            this.screenSize = this.getScreenSize;
            this.positions = initialPositions;
            this.motion = Motion(this.positions);
            this.motion.start();
        },
        // --------- EDITOR FUNCTIONS ---------
        // All the codes between /* wwManager:start */ and /* wwManager:end */ are only for editor purposes
        // So It won't in the published website!
        /* wwManager:start */
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
        /* wwManager:end */
    }
};
</script>

<style lang="scss" scoped>
.ww-landing-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;

    .ww-layout-column {
        width: 100%;
    }

    .bubbles-container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        bottom: 0;
        z-index: -1;
        width: 100%;
        min-width: 700px;
        overflow: hidden;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        background: transparent;

        @media (min-width: 768px) {
            width: 100%;
            min-height: 838px;
        }

        @media (min-width: 1200px) {
            width: 1440px;
            min-height: 716px;
        }
    }
}
</style>
