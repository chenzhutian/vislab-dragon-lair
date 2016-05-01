import Vue from 'vue';
import VueResource from 'vue-resource';
import globalConfig from '../../config';
Vue.use(VueResource);

const devMainUrl = globalConfig.env === 'production'
    ? '//vis.cse.ust.hk/dragon-lair' : '//localhost:7797';
const $http = Vue.http;

function searchResource(searchText, callback) {
    const url = `${devMainUrl}/search?search=${searchText}`;
    $http.get(url).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

function searchPaper(searchText, callback) {
    const url = `${devMainUrl}/search/paper?search=${searchText}`;
    $http.get(url).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

// add by zhp
function searchRecentAct(searchCount, callback) {
    const url = `${devMainUrl}/activity/paper?count=${searchCount}`;
    $http.get(url).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

function commitTags(resourceId, resourceType, tags, callback) {
    const url = `${devMainUrl}/modify/tags`;
    const postData = { id: resourceId, type: resourceType, tags };
    $http.post(url, postData, {
        header: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

function commitPaperTags(paperId, tags, callback) {
    const url = `${devMainUrl}/modify/paper/tags`;
    const postData = { paperId, tags };
    $http.post(url, postData, {
        header: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

function uploadImage(file, fileInfo, callback) {
    const url = `${devMainUrl}/upload/image`;
    const formData = new FormData();
    formData.append('imageFile', file);
    Object.keys(fileInfo).forEach(p => formData.append(p, fileInfo[p]));
    $http.post(url, formData, {
        'Content-Type': 'multipart/form-data',
    }).then(response => {
        callback(response);
    }, errResponse => {
        console.log(errResponse);
    });
}

export {
searchResource,
searchPaper,
searchRecentAct,
commitTags,
commitPaperTags,
uploadImage,
};
