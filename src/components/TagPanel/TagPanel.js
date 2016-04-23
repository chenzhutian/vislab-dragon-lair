import mdl from 'material-design-lite/material.js';
import { commitTags as $commitTags } from '../../service/netservice.js';


export default {
    ready() {
        this.$nextTick(() => {
            mdl.upgradeDom();
        });
        this.snackbar = this.$el.querySelector('#tag-snackbar');
        // clone this.resourceTags to this.selectedTags
        this.selectedTags = this.resourceTags.slice(0);
    },
    props: {
        resourceID: {
            type: String,
            coerce: value => {
                if (typeof value === 'number') return value.toString();
                return value;
            },
            validator: value => value && value.length,
        },
        resourceTags: {
            type: Array,
            validator: value => Array.isArray(value),
            twoWay: true,
        },
    },
    // complex object data
    snackbar: null,
    data() {
        return {
            newTag: null,
            selectedTags: [],
            canRemoveLastTag: false,
            isCommiting: false,
        };
    },
    watch: {
        resourceTags(value) {
            if (!this.isCommiting) {
                this.selectedTags = value.slice(0);
            } else {
                this.isCommiting = false;
            }
        },
    },
    methods: {
        commitSeletcedTags() {
            this.isCommiting = true;
            // clone this.selectedtags to this.resourceTags
            this.resourceTags = this.selectedTags.slice(0);

            $commitTags(this.resourceID, this.resourceTags, response => {
                if (response.status === 200 && response.data) {
                    // TODO trigger a snackbar here
                    console.log('commit sucess');
                }
            });

            // TODO this can be optimized by controlling the upgrade dom
            this.$nextTick(() => {
                mdl.upgradeDom();
            });
        },
        removeLastTag() {
            if (!this.canRemoveLastTag) return;
            const lastTag = this.resourceTags.pop();
            this.selectedTags.splice(this.selectedTags.indexOf(lastTag), 1);
            this.canRemoveLastTag = false;
        },
        addTag() {
            if (this.newTag && this.newTag.length) {
                // TODO this can be optimized by using hashmap
                if (this.resourceTags.indexOf(this.newTag) !== -1) return;

                this.resourceTags.push(this.newTag);
                this.selectedTags.push(this.newTag);
                this.$nextTick(() => {
                    mdl.upgradeElement(this.$el
                        .querySelector(`#list-item-${(this.resourceTags.length - 1)}
                         .mdl-js-checkbox`));
                    this.newTag = null;
                    this.canRemoveLastTag = true;
                    this.snackbar.MaterialSnackbar.showSnackbar({
                        message: 'Tag added.',
                        // timeout: 200000,
                        actionHandler: this.removeLastTag,
                        actionText: 'Undo',
                    });
                });
            }
        },
    },
};
