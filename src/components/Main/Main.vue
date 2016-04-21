<template src='./Main.html'></template>

<script src="./Main.js"></script>

<style scoped>
    .page-ribbon {
        width: 100%;
        height: 40vh;
        background-color: #3F51B5;
        flex-shrink: 0;
    }
    
    .page-main {
        margin-top: -35vh;
        flex-shrink: 0;
    }
    
    .page-content {
        max-width: 1600px;
        width: calc(100% - 16px);
        margin: 0 auto;
    }
    
    .paper-content {
        border-radius: 2px;
        padding: 80px 56px 50px 56px;
        /*margin-bottom: 80px;*/
    }
    
    .pdf-viewer {
        width: 100%;
        height: 95vh
    }
    
    .tag-form {
        margin: 20px 20px 20px 20px;
        text-align: center;
    }
    
    .tag-form .commit-button {
        max-width: 200px;
        width: 100%;
    }
    
    .tag-form .mdl-snackbar {
        left: initial;
        transform: translate(-25%, 80px)
    }
    
    .tag-form .mdl-snackbar--active {
        transform: translate(-25%, 0);
    }
    
    .tag-transition {
        transition: all .3s ease;
    }
    
    .tag-enter,
    .tag-leave {
        min-height: 0;
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
</style>