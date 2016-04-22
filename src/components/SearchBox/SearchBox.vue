<template src="./SearchBox.html"></template>
<script src="./SearchBox.js"></script>
<style scope>
    .search-box {
        margin-bottom: 48px;
    }
    
    .search-box .mdl-card {
        min-height: 0;
        max-width: 860px;
        margin: 0 auto;
    }
    
    .search-box .mdl-textfield {
        width: calc(100% - 40px);
        padding-bottom: 0;
    }
    
    .search-box .mdl-textfield__label::after {
        bottom: 0;
    }
</style>