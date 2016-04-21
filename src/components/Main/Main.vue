<template src='./Main.html'></template>

<script src="./Main.js"></script>

<style scoped>
    
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