<template>
  <wwLayoutColumn tag="div"
                  ww-default="ww-text"
                  :ww-list="elements"
                  @ww-add="add(elements, $event)"
                  @ww-remove="remove(elements, $event)">
  </wwLayoutColumn>
</template>

<script>

    export default {
        name: 'wwContentColumn',
        props: {
            update: {
                type: Function,
                default: () => {
                }
            },
            elements: {
                type: Array,
                default: []
            }
        },
        methods: {
            // --------- EDITOR FUNCTIONS ---------
            // All the codes between /* wwManager:start */ and /* wwManager:end */ are only for editor purposes
            // So It won't in the published website!
            /* wwManager:start */
            add(list, options) {
                try {
                    list.splice(options.index, 0, options.wwObject);
                    this.update();
                } catch (error) {
                    wwLib.wwLog.error('ERROR : ', error);
                }
            },
            remove(list, options) {
                try {
                    list.splice(options.index, 1);
                    this.update();
                } catch (error) {
                    wwLib.wwLog.error('ERROR : ', error);
                }
            }
            /* wwManager:end */
        }
    };
</script>

<style scoped>

</style>