import mdl from 'material-design-lite/material.js';
import 'material-design-lite/src/material-design-lite.scss';

// components
import SearchBox from './../SearchBox/SearchBox.vue';
import PaperCard from './../PaperCard/PaperCard.vue';
import UploadPanel from './../UploadPanel//UploadPanel.vue';

export default {
    ready() {
        this.$nextTick(() => {
            mdl.upgradeDom();
        });
    },
    components: {
        PaperCard,
        SearchBox,
        UploadPanel,
    },
    data() {
        return {
            resourceData: [],
        };
    },
    methods: {

    },
};
