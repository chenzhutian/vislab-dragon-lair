import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const devMainUrl = '//localhost:3000';
const $http = Vue.http;

function searchPapers(searchText, callback) {
    const url = `${devMainUrl}/papers?search=${searchText}`;
    $http.get(url).then(response => {
        callback(response);
    });
}

export {
searchPapers,
};
