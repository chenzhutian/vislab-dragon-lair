import Vue from 'vue';
import App from '../../../../src/components/App/App.vue';

describe('App.vue', function () {
    describe('#render component in parent component', function () {
        let vm;
        before('init component in parent component', function () {
            document.body.insertAdjacentHTML('afterbegin', '<app></app>');
            vm = new Vue(App).$mount('app');
        });
        it('Should have two children initially ', function () {
            expect(vm.$children.length).to.equal(2);
        });
    });
});
