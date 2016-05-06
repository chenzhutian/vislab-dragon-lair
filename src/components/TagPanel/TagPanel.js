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
        resourceId: {
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
        resourceType: {
            type: String,
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
            hasModifiedTags: false,
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
        selectedTags(value) {
            if (this.selectedTags.length !== this.resourceTags.length) {
                this.hasModifiedTags = true;
                return;
            }
            this.selectedTags.forEach(t => {
                if (this.resourceTags.indexOf(t) === -1) {
                    this.hasModifiedTags = true;
                    return;
                }
            });
            return;
        },
    },
    methods: {
        // async function should always has callback param
        commitSeletcedTags(callback = undefined) {
            this.isCommiting = true;
            // clone this.selectedTags to this.resourceTags
            this.resourceTags = this.selectedTags.slice(0);

            $commitTags(this.resourceId, this.resourceType, this.resourceTags, (err, response) => {
                if (response.status === 200 && response.data) {
                    // TODO trigger a snackbar here
                    this.snackbar.MaterialSnackbar.showSnackbar({
                        message: 'commit sucess',
                    });
                }
                if (callback) callback(err, response);
            });

            // TODO this can be optimized by controlling the upgrade dom
            this.$nextTick(() => {
                mdl.upgradeDom();
            });
            this.hasModifiedTags = false;
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
                this.hasModifiedTags = true;
            }
        },
    },
};
