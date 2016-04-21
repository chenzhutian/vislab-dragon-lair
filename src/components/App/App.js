import mdl from 'material-design-lite/material.js';
import 'material-design-lite/src/material-design-lite.scss';

// components
import PaperCard from './../PaperCard/PaperCard.vue';

export default {
    ready() {
        this.$nextTick(() => {
            mdl.upgradeDom();
        });
    },
    components: {
        PaperCard,
    },
    data() {
        return {

        };
    },
    methods: {

    },
};
