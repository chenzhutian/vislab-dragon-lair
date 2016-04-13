import mdl from 'material-design-lite/material.js';
import 'material-design-lite/src/material-design-lite.scss';

export default {
    ready() {
        for (let i = 0, len = this.paperTags.length; i < len; ++i) {
            this.paperTagsHash[this.paperTags[i]] = true;
            this.selectedTags.push(this.paperTags[i]);
        }
        this.$nextTick(() => {
            mdl.upgradeDom();
        });
        this.snackbar = this.$el.querySelector("#tag-snackbar");
    },
    snackbar: null,
    data() {
        return {
            paperID: 0,
            newTag: null,
            paperTags: ['info vis', 'narrative', 'urban'],
            paperTagsHash: {},
            selectedTags: [],

            canRemoveLastTag: false
        };
    },
    methods: {
        commitSeletcedTags() {
            this.paperTags = this.selectedTags.slice(0);
            this.paperTagsHash = {};
            for (let i = 0, len = this.paperTags.length; i < len; ++i) {
                this.paperTagsHash[this.paperTags[i]] = true;
            }
            // TODO this can be optimized
            this.$nextTick(() => {
                mdl.upgradeDom();
            });
        },
        removeLastTag() {
            if (!this.canRemoveLastTag) return;
            let lastTag = this.paperTags.pop();
            delete this.paperTagsHash[lastTag];
            this.selectedTags.splice(this.selectedTags.indexOf(lastTag), 1);
            this.canRemoveLastTag = false;
        },
        addTag() {
            if (typeof this.newTag === 'string' && this.newTag.length > 0) {
                if (typeof this.paperTagsHash[this.newTag] !== 'undefined') return;
                this.paperTagsHash[this.newTag] = true;
                this.paperTags.push(this.newTag);
                this.selectedTags.push(this.newTag);
                this.$nextTick(() => {
                    mdl.upgradeElement(this.$el.querySelector('#list-item-' + (this.paperTags.length - 1) + ' .mdl-js-checkbox'));
                    this.newTag = null;
                    this.canRemoveLastTag = true;
                    this.snackbar.MaterialSnackbar.showSnackbar({
                        message: 'Tag added.',
                        // timeout: 200000,
                        actionHandler: this.removeLastTag,
                        actionText: 'Undo'
                    });
                });
            }
        }
    }
};
