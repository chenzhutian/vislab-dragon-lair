<template src="./ResourceCard.html"></template>
<script src="./ResourceCard.js"></script>
<style lang="sass">
    $chip-bg-color: #e4e4e4 !default;
    $chip-border-color: #9e9e9e !default;
    $chip-selected-color: #26a69a !default;
    $chip-margin: 5px !default;
    .chip {
        display: inline-block;
        height: 32px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(0, 0, 0, .6);
        line-height: 32px;
        padding: 0 12px;
        border-radius: 16px;
        background-color: $chip-bg-color;
        margin-bottom: $chip-margin;
        margin-right: $chip-margin;
        img {
            float: left;
            margin: 0 8px 0 -12px;
            height: 32px;
            width: 32px;
            border-radius: 50%;
        }
        .close {
            cursor: pointer;
            float: right;
            font-size: 16px;
            line-height: 32px;
            padding-left: 8px;
        }
    }
    
    .chips {
        border: none;
        border-bottom: 1px solid $chip-border-color;
        box-shadow: none;
        margin-bottom: 30px;
        min-height: 45px;
        outline: none;
        padding-bottom: $chip-margin;
        transition: all .3s;
        &.focus {
            border-bottom: 1px solid $chip-selected-color;
            box-shadow: 0 1px 0 0 $chip-selected-color;
        }
        &:hover {
            cursor: text;
        }
        .chip.selected {
            background-color: $chip-selected-color;
            color: #fff;
        }
        .input {
            background: none;
            border: 0;
            color: rgba(0, 0, 0, .6);
            display: inline-block;
            font-size: 13px;
            font-weight: 500;
            height: 32px;
            margin-right: 20px;
            line-height: 32px;
            outline: 0;
            padding: 0 !important;
            width: 120px !important;
        }
        .input:focus {
            border: 0 !important;
            box-shadow: none !important;
        }
    }
</style>
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
    
    .img-viewer {
        width: 100%;
        height: auto;
        max-height: 95vh;
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
    
    .right-in-transition {
        transition: all .5s ease;
        margin-left: 82.3%;
    }
    
    .right-in-enter,
    .right-in-leave {
        margin-left: 100%;
    }
    
    .recent-activity-info {
        margin-left: 70%;
    }
</style>