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
    computed: {
        // test: function () { console.log(this); return this.paperData; },
        // paperID: () => this.paperData.id,
        // paperTitle: () => this.paperData.title,
        // paperTags: () => this.paperData.tags,
        // paperAuthors: () => this.paperData.authors,
    },
};
