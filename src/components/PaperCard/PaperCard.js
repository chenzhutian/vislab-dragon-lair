export default {
    ready() {
        const testData = {
            year: '2012',
            title: 'Whisper Tracing the Spatiotemporal Process of Information Diffusion in Real' +
            'Time',
            id: '6327271',
            tags: ['fsd', '1231'],
            authors: ['N.Cao', 'Y.R.Lin', 'X.Sun', 'D.Lazer', 'S.Liu', 'H.Qu'],
        };
        this.unpackPaperData(testData);
    },
    data() {
        return {
            paperID: '',
            paperTitle: '',
            authors: [],
            paperTags: [],
        };
    },
    methods: {
        unpackPaperData(jsonData) {
            this.paperID = jsonData.paperID;
            this.paperTitle = jsonData.title;
            this.authors = jsonData.authors;
            this.paperTags = jsonData.paperTags;
        },
    },
};
