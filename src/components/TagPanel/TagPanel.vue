<template src="./TagPanel.html"></template>
<script src="./TagPanel.js"></script>
<style scoped>
    .tag-panel {
        position: absolute;
        top: 0;
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
    
    .vertical-expand-transition {
        transition: all .5s ease;
        max-height: 10vh;
    }
    
    .vertical-expand-enter,
    .vertical-expand-leave {
        min-height: 0;
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
    }
</style>