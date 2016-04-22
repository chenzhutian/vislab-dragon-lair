export default {
    data() {
        return {
            showDialog: false,
            uploadFile: null,
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
            console.log(event);
            console.log(event.srcElement.files);
            console.log(this.uploadFile);
        },
    },
};
