import Vue from 'vue';
import App from './components/App/App.vue';

// filters
import tagCheckBoxIcon from './filters/tagCheckboxIcon';
Vue.filter('tagCheckBoxIcon', tagCheckBoxIcon);

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
});
