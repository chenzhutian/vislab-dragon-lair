<template src="./SearchBox.html"></template>
<script src="./SearchBox.js"></script>
<style scope>
    .search-box {
        max-width: 860px;
        margin-bottom: 48px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .search-box .mdl-card {
        min-height: 0;
    }
    
    .search-box .mdl-textfield {
        width: calc(100% - 40px);
        padding-bottom: 0;
    }
    
    .search-box .mdl-textfield__label::after {
        bottom: 0;
    }
</style>