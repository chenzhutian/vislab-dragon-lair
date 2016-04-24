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
        resourceType() {
            if (!this.resourceData) return null;
            return this.resourceData._type;
        },
        resourceTitle() {
            if (!this.resourceData) return '';
            return this.resourceData.title;
        },
        resourceAuthors() {
            if (!this.resourceData) return '';
            if (Array.isArray(this.resourceData.authors)) {
                return this.resourceData.authors.join(';');
            }
            return this.resourceData.authors;
        },
        resourceYear() {
            if (!this.resourceData) return '';
            return this.resourceData.year;
        },
        resourceTags() {
            if (!this.resourceData) return [];
            return this.resourceData.tags;
        },
        resourceId() {
            if (!this.resourceData) return null;
            return this.resourceData._id;
        },
        resourceLocalSrc() {
            if (!this.resourceData) return '';
            return this.resourceData.vislabSrc;
        },
    },
};
