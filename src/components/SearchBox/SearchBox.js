import { searchResource as $searchResource } from '../../service/netservice.js';
// import { searchRecentAct as $searchRecentAct } from '../../service/netservice.js';

export default {
    ready() {
        // searchRecentAct()
    },
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
            searchCount: 10,
        };
    },
    methods: {
        // async function should always has callback param
        searchResource(callback = (err, result) => {
            if (err) throw (err);
            return result;
        }) {
            if (!this.searchText || !this.searchText.length) return;
            $searchResource(this.searchText, (err, response) => {
                if (response.status === 200) {
                    if (Array.isArray(response.data)) {
                        this.resourceData = response.data;
                    } else if (typeof response.data === 'object') {
                        const tempResourceData = [];
                        Object.keys(response.data).forEach(p => {
                            response.data[p].forEach(d => {
                                const tempD = d;
                                tempD.type = p;
                                tempResourceData.push(tempD);
                            });
                        });
                        this.resourceData = tempResourceData;
                    }
                }
                callback(err, response);
            });
        },
        //add by zhp
        // searchRecentAct() {
        //     $searchRecentAct(this.searchCount, responseData => {
        //         if (responseData.status === 200) {
        //             if (Array.isArray(responseData.data)) {
        //                 this.resourceData = responseData.data;
        //             } else if (typeof responseData.data === 'object') {
        //                 const tempResourceData = [];
        //                 for (const p in responseData.data) {
        //                     if (responseData.data.hasOwnProperty(p)) {
        //                         responseData.data[p].forEach(d => {
        //                             const tempD = d;
        //                             tempD._type = p;
        //                             tempResourceData.push(tempD);
        //                         });
        //                     }
        //                 }
        //                 this.resourceData = tempResourceData;
        //             }
        //         }
        //     });
        // },
    },
};
