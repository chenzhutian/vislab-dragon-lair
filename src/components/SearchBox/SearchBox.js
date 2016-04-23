import { searchResource as $searchResource } from '../../service/netservice.js';

export default {
    props: {
        resourceData: {
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
            $searchResource(this.searchText, responseData => {
                if (responseData.status === 200) {
                    console.log(responseData);
                    if (Array.isArray(responseData.data)) {
                        this.resourceData = responseData.data;
                    } else if (typeof responseData.data === 'object') {
                        const tempResourceData = [];
                        for (const p in responseData.data) {
                            if (responseData.data.hasOwnProperty(p)) {
                                responseData.data[p].forEach(d => {
                                    const tempD = d;
                                    tempD._type = p;
                                    tempResourceData.push(tempD);
                                });
                            }
                        }
                        this.resourceData = tempResourceData;
                    }
                }
            });
        },
    },
};
