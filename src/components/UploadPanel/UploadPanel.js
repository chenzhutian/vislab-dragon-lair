export default {
    data() {
        return {
            showDialog: false,
        };
    },
    methods: {
        triggerShowDialog() {
            this.showDialog = !this.showDialog;
        },
    },
};
