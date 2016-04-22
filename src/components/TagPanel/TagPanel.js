import mdl from 'material-design-lite/material.js';
import { commitTags } from '../../service/netservice.js';


export default {
    ready() {
        this.$nextTick(() => {
            mdl.upgradeDom();
        });
        this.snackbar = this.$el.querySelector('#tag-snackbar');
        // clone this.paperTags to this.selectedTags
        this.selectedTags = this.paperTags.slice(0);
    },
    props: {
        paperID: {
            type: String,
            coerce: value => {
                if (typeof value === 'number') return value.toString();
                return value;
            },
            validator: value => value && value.length,
        },
        paperTags: {
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
        };
    },
    watch: {
        paperTags(value) { this.selectedTags = value; },
    },
    methods: {
        commitSeletcedTags() {
            // clone this.selectedtags to this.papertags
            this.paperTags = this.selectedTags.slice(0);

            commitTags(this.paperID, this.paperTags, response => {
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
            const lastTag = this.paperTags.pop();
            this.selectedTags.splice(this.selectedTags.indexOf(lastTag), 1);
            this.canRemoveLastTag = false;
        },
        addTag() {
            if (this.newTag && this.newTag.length) {
                // TODO this can be optimized by using hashmap
                if (this.paperTags.indexOf(this.newTag) !== -1) return;

                this.paperTags.push(this.newTag);
                this.selectedTags.push(this.newTag);
                this.$nextTick(() => {
                    mdl.upgradeElement(this.$el
                        .querySelector(`#list-item-${(this.paperTags.length - 1)}
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
