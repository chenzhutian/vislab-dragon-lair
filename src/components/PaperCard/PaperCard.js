export default {
    props: {
        paperData: {
            coerce: value => {
                if (typeof value === 'string') return JSON.parse(value);
                return value;
            },
            validator: value => typeof value === 'object' && value.id,
            twoWay: true,
        },
    },
    data() {
        return {
            showPdf: false,
        };
    },
    methods: {
        triggerPdf() {
            this.showPdf = !this.showPdf;
        },
    },
};
