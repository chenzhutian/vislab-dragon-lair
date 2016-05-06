import Vue from 'vue';
import UploadPanel from '../../../../src/components/UploadPanel/UploadPanel.vue';
import UploadPanelInjector from
'!!vue?inject!../../../../src/components/UploadPanel/UploadPanel.vue';

describe('UploadPanel.vue', function () {
    describe('#render component in parent component', function () {
        let vm;
        before('init component in parent component', function () {
            vm = new Vue({
                template: '<div><upload-panel></upload-panel></div>',
                components: { UploadPanel },
            }).$mount();
        });
        it('Should render correct contents', function () {
            expect(vm.$el.querySelector('.mdl-card__title').textContent.trim())
                .to.equal('Upload Resource');
        });
    });

    describe('component logic without mock', function () {
        let vm;
        before('init componet', function () {
            document.body.insertAdjacentHTML('afterbegin', '<app></app>');
            vm = new Vue(UploadPanel).$mount('app');
        });

        after('remove component', function () {
            document.body.innerHTML = '';
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

            it('Should clean all data', function () {
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

        describe('#triggerShowDialog()', function () {
            before('set showDialog to true', function () {
                vm.showDialog = true;
            });

            it('showDialog Should be false', function () {
                vm.triggerShowDialog();
                expect(vm.showDialog).to.equal(false);
            });
        });

        describe('#openUploadFileDialog()', function () {
            it('Should return true if get a input element', function () {
                expect(vm.openUploadFileDialog()).to.equal(true);
            });

            it('Should return false if get nothing', function () {
                vm.$el.querySelector('#upload-input').id = 'temp-upload-input';
                expect(vm.openUploadFileDialog()).to.equal(false);
                vm.$el.querySelector('#temp-upload-input').id = 'upload-input';
            });

            it('Should return false if get a non-input element', function () {
                vm.$el.querySelector('#upload-input').id = 'temp-upload-input';
                vm.$el.insertAdjacentHTML('afterbegin', '<div id="upload-input"></div>');
                expect(vm.openUploadFileDialog()).to.equal(false);
                vm.$el.querySelector('#upload-input').remove();
                vm.$el.querySelector('#temp-upload-input').id = 'upload-input';
            });
        });

        describe('#getUploadFile(event)', function () {
            it('Should return false if no file upload', function () {
                const event = { srcElement: { files: [null] } };
                expect(vm.getUploadFile(event)).to.equal(false);
            });
            it('Should clear some var if no file upload', function () {
                const event = { srcElement: { files: [null] } };
                vm.resourceTitle = 'something';
                vm.$el.querySelector('#resource-title').classList.add('is-dirty');
                vm.getUploadFile(event);
                expect(vm.resourceTitle).to.equal(null);
                expect(vm.$el.querySelector('#resource-title').classList.contains('is-dirty'))
                    .to.equal(false);
            });
            it('Should return true if file uploaded', function () {
                const event = { srcElement: { files: [{ name: 'fakeFile' }] } };
                expect(vm.getUploadFile(event)).to.equal(true);
            });
            it('Should set some var if file uploaded', function () {
                const event = { srcElement: { files: [{ name: 'fakeFile' }] } };
                vm.resourceTitle = null;
                vm.$el.querySelector('#resource-title').classList.remove('is-dirty');
                vm.getUploadFile(event);
                expect(vm.resourceTitle).to.equal('fakeFile');
                expect(vm.$el.querySelector('#resource-title').classList.contains('is-dirty'))
                    .to.equal(true);
            });
        });
    });

    describe('component logic with mock', function () {
        let vm;
        before('mock service', function () {
            const UploadPanelWithMocks = new UploadPanelInjector({
                '../../service/netservice.js': {
                    uploadImage: (fileToBeUploaded, resourceInfo, callback) => {
                        if (fileToBeUploaded === 'fake file' && resourceInfo) {
                            callback(null, { data: resourceInfo, file: fileToBeUploaded });
                        }
                        callback({ file: fileToBeUploaded, data: resourceInfo }, null);
                    },
                },
            });
            document.body.insertAdjacentHTML('afterbegin', '<app></app>');
            vm = new Vue(UploadPanelWithMocks).$mount('app');
        });

        describe('#uploadFile()', function () {
            beforeEach('set var so that it will not return null', function () {
                vm.resourceTitle = 'fake title';
                vm.resourceTags = 'zhutian;test;';
                vm.fileToBeUploaded = 'fake file';
                vm.resourceAuthors = 'zhutian';
                vm.resourceUrl = '//vis.cse.ust.hk';
                vm.resourceDescription = 'it\'s just a test case';
            });
            it('Should return undefined if no title', function () {
                vm.resourceTitle = null;
                expect(vm.uploadFile()).to.equal(undefined);
                vm.resourceTitle = '';
                expect(vm.uploadFile()).to.equal(undefined);
            });
            it('Should return undefined if no tags', function () {
                vm.resourceTags = null;
                expect(vm.uploadFile()).to.equal(undefined);
                vm.resourceTags = '';
                expect(vm.uploadFile()).to.equal(undefined);
            });
            it('Should return undefined if no file', function () {
                vm.fileToBeUploaded = null;
                expect(vm.uploadFile()).to.equal(undefined);
            });
            it('Should call cleanUploadData', function (done) {
                vm.uploadFile((err, result) => {
                    expect(vm.showDialog).to.eql(false);
                    expect(vm.fileToBeUploaded).to.equal(null);
                    expect(vm.resourceTitle).to.equal(null);
                    expect(vm.resourceTags).to.equal(null);
                    expect(vm.resourceAuthors).to.equal(null);
                    expect(vm.resourceUrl).to.equal(null);
                    expect(vm.resourceDescription).to.equal(null);
                    done();
                });
            });
            it('Should pass right params to uploadImage', function (done) {
                vm.uploadFile((err, result) => {
                    const resourceInfo = result.data;
                    expect(resourceInfo.title).to.equal('fake title');
                    expect(resourceInfo.tags).to.eql(['zhutian', 'test', '']);
                    expect(resourceInfo.authors).to.equal('zhutian');
                    expect(resourceInfo.src).to.equal('//vis.cse.ust.hk');
                    expect(resourceInfo.description).to.equal('it\'s just a test case');
                    done();
                });
            });
            it('Should raise toast and return err', function (done) {
                vm.fileToBeUploaded = 'not a fake file';
                vm.uploadFile((err, result) => {
                    expect(vm.toast.MaterialSnackbar.active).to.equal(true);
                    expect(err.file).to.equal('not a fake file');
                    done();
                });
            });
        });
    });
});
