import mdl from 'material-design-lite/material.js';
import { uploadImage as $uploadImage } from '../../service/netservice.js';

export default {
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
            this.$el.querySelector('#upload-input').click();
        },
        getUploadFile(event) {
            this.fileToBeUploaded = event.srcElement.files[0];
            this.resourceTitle = this.fileToBeUploaded.name;
            this.$el.querySelector('#resource-title').classList.add('is-dirty');
        },
        uploadFile() {
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
                tags: this.resourceTags,
                authors: this.resourceAuthors,
                src: this.resourceUrl,
                description: this.resourceDescription,
            };
            $uploadImage(this.fileToBeUploaded, resourceInfo, response => {
                console.log(response);
                this.cleanUploadData();
            });
        },
    },
};
