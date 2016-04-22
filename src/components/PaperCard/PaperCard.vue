<template src="./PaperCard.html"></template>
<script src="./PaperCard.js"></script>
<style scope>
    .paper {
        position: relative;
        width: 100%;
        margin-bottom: 48px;
    }
    
    .paper-card {
        margin: 0;
        width: 100%;
    }
    
    .paper-card .mdl-card {
        min-height: 100px;
        max-width: 860px;
    }
    
    .paper-content {
        padding: 20px 16px 40px 16px;
    }
    
    .pdf-viewer {
        width: 100%;
        height: 95vh
    }
    
    .vertical-expand-transition {
        transition: all .5s ease;
        max-height: 95vh;
    }
    
    .vertical-expand-enter,
    .vertical-expand-leave {
        padding-top: 0;
        padding-bottom: 0;
        max-height: 0;
    }
</style>