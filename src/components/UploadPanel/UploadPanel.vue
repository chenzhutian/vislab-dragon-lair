<template src="./UploadPanel.html"></template>
<script src="./UploadPanel.js"></script>
<style scoped>
    .upload-panel {
        position: fixed;
        bottom: 2vh;
        right: 1vw;
        z-index: 999;
    }
    
    .upload-dialog {}
    
    .upload-dialog.expand-transition {
        transition: .6s ease all;
        max-height: 50vh;
    }
    
    .upload-dialog.expand-enter,
    .upload-dialog.expand-leave {
        width: 0;
        max-height: 0;
        min-height: 0;
        margin-left: 80%;
    }
    
    .upload-header {
        width: 100%;
        min-height: 48px;
    }
    
    .upload-form {
        margin: 0 auto;
        padding-bottom: 48px;
        padding-top: 28px;
    }
    
    .upload-form .mdl-textfield {
        width: 100%;
        max-width: 580px;
    }
    
    .upload-button-group {
        width: 100%;
        text-align: right;
    }
    
    #upload-input {
        display: none;
    }
    
    .animated-fab {
        margin-left: 80%;
        transition: .2s ease all;
    }
    
    .animated-fab-enter {
        transform: rotate(225deg);
        box-shadow: -3px -3px 10px rgba(0, 0, 0, .25);
    }
</style>