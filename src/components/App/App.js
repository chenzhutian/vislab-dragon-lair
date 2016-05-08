import mdl from 'material-design-lite/material.js';
import 'material-design-lite/src/material-design-lite.scss';

// components
import SearchBox from './../SearchBox/SearchBox.vue';
import ResourceCard from './../ResourceCard/ResourceCard.vue';
import UploadPanel from './../UploadPanel//UploadPanel.vue';

export default {
    ready() {
        mdl.upgradeDom();
    },
    components: {
        ResourceCard,
        SearchBox,
        UploadPanel,
    },
    data() {
        return {
            resourceData: [],
        };
    },
};
