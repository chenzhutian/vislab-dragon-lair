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
    
    .fade-transition {
        transition: opacity .3s ease;
    }
    
    .fade-enter,
    .fade-leave {
        opacity: 0;
    }
</style>