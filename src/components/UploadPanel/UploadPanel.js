import { uploadImage as $uploadImage } from '../../service/netservice.js';

export default {
    data() {
        return {
            showDialog: false,
            file: null,
        };
    },
    methods: {
        triggerShowDialog() {
            this.showDialog = !this.showDialog;
        },
        openUploadFileDialog() {
            this.$el.querySelector('#upload-input').click();
        },
        getUploadFile(event) {
            this.file = event.srcElement.files[0];
        },
        uploadFile() {
            $uploadImage(this.file, { title: 'adsf', authors: ['asdf', '123'] }, response => {
                console.log(response);
            });
        },
    },
};
