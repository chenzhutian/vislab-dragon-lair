// component
import TagPanel from '../TagPanel/TagPanel.vue';

export default {
    components: {
        TagPanel,
    },
    props: {
        resourceData: {
            coerce: value => {
                if (typeof value === 'string') return JSON.parse(value);
                return value;
            },
            validator: value => typeof value === 'object',
            twoWay: true,
        },
    },
    data() {
        return {
            showResource: false,
        };
    },
    methods: {
        triggerResource() {
            this.showResource = !this.showResource;
        },
    },
    computed: {
        _type() {
            if (!this.resourceData) return null;
            return this.resourceData._type;
        },
        title() {
            if (!this.resourceData) return '';
            return this.resourceData.title;
        },
        authors() {
            if (!this.resourceData) return '';
            if (Array.isArray(this.resourceData.authors)) {
                return this.resourceData.authors.join(';');
            }
            return this.resourceData.authors;
        },
        year() {
            if (!this.resourceData) return '';
            return this.resourceData.year;
        },
    },
};
