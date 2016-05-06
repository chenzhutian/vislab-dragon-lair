import mdl from 'material-design-lite/material.js';
import { uploadImage as $uploadImage } from '../../service/netservice.js';

export default {
    ready() {
        this.toast = this.$el.querySelector('#toast-snackbar');
        mdl.upgradeElement(this.toast);
    },
    // complex object
    toast: null,
    data() {
        return {
            showDialog: false,
            fileToBeUploaded: null,
            resourceTitle: null,
            resourceTags: null,
            resourceAuthors: null,
            resourceUrl: null,
            resourceDescription: null,
        };
    },
    computed: {
        cantCommit() {
            return !this.fileToBeUploaded || !this.resourceTags || !this.resourceTags.length;
        },
    },
    methods: {
        cleanUploadData() {
            this.showDialog = false;
            this.fileToBeUploaded = null;
            this.resourceTitle = null;
            this.resourceTags = null;
            this.resourceAuthors = null;
            this.resourceUrl = null;
            this.resourceDescription = null;
        },
        triggerShowDialog() {
            this.showDialog = !this.showDialog;
        },
        openUploadFileDialog() {
            const inputElement = this.$el.querySelector('#upload-input');
            if (inputElement instanceof HTMLInputElement) {
                inputElement.click();
                return true;
            }
            // TODO warning
            return false;
        },
        getUploadFile(event) {
            this.fileToBeUploaded = event.srcElement.files[0];
            if (!this.fileToBeUploaded) {
                this.resourceTitle = null;
                this.$el.querySelector('#resource-title').classList.remove('is-dirty');
                return false;
            }
            this.resourceTitle = this.fileToBeUploaded.name;
            this.$el.querySelector('#resource-title').classList.add('is-dirty');
            return true;
        },
        // async function should always has a callback param
        uploadFile(callback = (err, result) => {
            if (err) throw err;
            return result;
        }) {
            if (!this.resourceTitle || !this.resourceTitle.length) {
                // TODO snackbar
                return;
            }
            if (!this.resourceTags || !this.resourceTags.length) {
                // TODO snackbar
                return;
            }
            if (!this.fileToBeUploaded) {
                // TODO snackbar
                return;
            }
            const resourceInfo = {
                title: this.resourceTitle,
                tags: this.resourceTags.split(';'),
                authors: this.resourceAuthors,
                src: this.resourceUrl,
                description: this.resourceDescription,
            };
            $uploadImage(this.fileToBeUploaded, resourceInfo, (err, response) => {
                if (response && response.data) {
                    this.cleanUploadData();
                } else {
                    this.toast.MaterialSnackbar.showSnackbar({ message: 'Upload Failed' });
                }
                callback(err, response);
            });
        },
    },
};
