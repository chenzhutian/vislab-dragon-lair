import Vue from 'vue';
import UploadPanelInjector from
'!!vue?inject!../../../../src/components/UploadPanel/UploadPanel.vue';

const UploadPanelWithMocks = new UploadPanelInjector({
    '../../service/netservice.js': {
        uploadImage: (fileToBeUploaded, resourceInfo, response) => null,
    },
});

describe('UploadPanel.vue', function () {
    describe('#render component in parent component', function () {
        let vm;
        before('init component in parent component', function () {
            vm = new Vue({
                template: '<div><upload-panel></upload-panel></div>',
                components: { UploadPanel: UploadPanelWithMocks },
            }).$mount();
        });
        it('should render correct contents', function () {
            expect(vm.$el.querySelector('.mdl-card__title').textContent.trim())
                .to.equal('Upload Resource');
        });
    });

    describe('component logic', function () {
        let vm;
        before('init componet', function () {
            document.body.insertAdjacentHTML('afterbegin', '<app></app>');
            vm = new Vue(UploadPanelWithMocks).$mount('app');
            // vm.$mount('app');
        });

        describe('#ready()', function () {
            it('set this.toast when ready()', function () {
                expect(vm.toast).to.be.an.instanceOf(HTMLElement);
            });
        });

        // computed
        describe('#cantComit', function () {
            beforeEach('default can commit', function () {
                vm.fileToBeUploaded = {};
                vm.resourceTags = [1, 2];
            });
            it('cannot commit if no file', function () {
                vm.fileToBeUploaded = null;
                expect(vm.cantCommit).to.equal(true);
            });
            it('cannot commit if no tags', function () {
                vm.resourceTags = null;
                expect(vm.cantCommit).to.equal(true);
            });
            it('cannot commit if tags is not array', function () {
                vm.resourceTags = {};
                expect(vm.cantCommit).to.equal(true);
            });
            it('can commit under default setting of test', function () {
                expect(vm.cantCommit).to.equal(false);
            });
        });

        // methods
        describe('#cleanUploadData()', function () {
            before('set some data', function () {
                vm.showDialog = true;
                vm.fileToBeUploaded = {};
                vm.resourceTitle = 'for test';
                vm.resourceTags = 'test;test';
                vm.resourceAuthors = 'zhutian';
                vm.resourceUrl = '//vis.cse.ust.hk';
                vm.resourceDescription = 'it\'s just a test case';
            });

            it('should clean all data', function () {
                // clean data
                vm.cleanUploadData();
                expect(vm.showDialog).to.eql(false);
                expect(vm.fileToBeUploaded).to.equal(null);
                expect(vm.resourceTitle).to.equal(null);
                expect(vm.resourceTags).to.equal(null);
                expect(vm.resourceAuthors).to.equal(null);
                expect(vm.resourceUrl).to.equal(null);
                expect(vm.resourceDescription).to.equal(null);
            });
        });
    });
});
