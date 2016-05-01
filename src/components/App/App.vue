<template src='./App.html'></template>

<script src="./App.js"></script>

<style>
    html {
        height: 100%;
    }
    
    body {
        height: 100%;
        background: #ebeff2;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    }
</style>

<style scoped>
    .app{
        background: url('./../../assets/background-image.jpg') center / cover;
    }

    .page-ribbon {
        width: 100%;
        height: 40vh;
        background-color: #3F51B5;
        flex-shrink: 0;
    }
    
    .page-main {
        /*margin-top: -35vh;*/
        flex-shrink: 0;
    }
    
    .page-content {
        width: calc(100% - 16px);
    }
    
    .fade-transition {
        transition: opacity .3s ease;
    }
    
    .fade-enter,
    .fade-leave {
        opacity: 0;
    }
</style>