import { searchPapers as $searchPapers } from '../../service/netservice.js';

export default {
    props: {
        papersData: {
            type: Array,
            validator: value => Array.isArray(value),
            twoWay: true,
        },
    },
    data() {
        return {
            searchText: '',
        };
    },
    methods: {
        searchPapers() {
            if (!this.searchText || !this.searchText.length) return;
            $searchPapers(this.searchText, responseData => {
                if (responseData.status === 200) {
                    if (Array.isArray(responseData.data)) {
                        this.papersData = responseData.data;
                    }
                }
            });
        },
    },
};
