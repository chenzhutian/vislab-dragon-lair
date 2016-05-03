import Vue from 'vue';
import UploadPanelInjector from
'!!vue?inject!../../../../src/components/UploadPanel/UploadPanel.vue';


const UploadPanelWithMocks = new UploadPanelInjector({
    '../../service/netservice.js': {
        uploadImage: (fileToBeUploaded, resourceInfo, response) => null,
    },
});

describe('UploadPanel.vue', function () {
    it('should render correct contents', function () {
        const vm = new Vue({
            template: '<div><upload-panel></upload-panel></div>',
            components: { UploadPanel: UploadPanelWithMocks },
        }).$mount();
        expect(vm.$el.querySelector('.mdl-card__title').textContent.trim())
            .to.equal('Upload Resource');
    });
});
