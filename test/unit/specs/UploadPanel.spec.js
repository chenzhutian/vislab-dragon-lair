import Vue from 'vue';
import UploadPanel from '../../../src/components/UploadPanel/UploadPanel.vue';

describe('UploadPanel.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            template: '<div><upload-panel></upload-panel></div>',
            components: { UploadPanel },
        }).$mount();
        expect(vm.$el.querySelector('.mdl-card__title').textContent).to.equal('Upload Resource');
    });
});
