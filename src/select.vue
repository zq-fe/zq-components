<template>
    <div class="pa-select" __vuec__ :style="style">
        <div class="container">
            <div class="select-label">
                <slot name="label"></slot>
            </div>
            <div class="select-value">
                <div class="select-value" v-if="multiple"></div>
                <div class="input-value" :class="{'show-sub': visible}">
                    <input type="text" readonly="readonly" :value="currentLabel" :placeholder="placeholder"  @click="handlerClick"/>
                </div>

                <transition name="fade">
                    <div class="option-list" v-show="visible">
                        <ul class="list-panel">
                            <li class="option" :class="{ selected: option.selected}" @click="handlerSelect(option)"  v-for="(option, index) in options" :value="option.value">{{option.label}}</li>
                        </ul>
                    </div>
                </transition>

            </div>
        </div>
        
    </div>
</template>
<style lang="less" scoped>
    @whiteColor: #ffffff;
    .pa-select[__vuec__] {

        ul {
            padding: 5px 0;
            li {
                list-style: none;
            }
        }
        

        .container {
            display: flex;
            .select-label {
                height: 36px;
                line-height: 36px;
            }

            .select-value {
                flex: 1;
                position: relative;
                .input-value {
                    position: relative;

                    input {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-color: #fff;
                        background-image: none;
                        border-radius: 4px;
                        border: 1px solid #bfcbd9;
                        box-sizing: border-box;
                        color: #1f2d3d;
                        display: block;
                        font-size: inherit;
                        height: 36px;
                        line-height: 1;
                        outline: none;
                        padding: 3px 10px;
                        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                        width: 100%;
                        cursor: pointer;

                        &:focus {
                            border-color: #20a0ff;
                        }
                    }

                    &::before {
                        content: '';
                        position: absolute;
                        border: solid 8px #bfcbd9;
                        transition: transform .3s;
                        border-bottom-color: transparent;
                        border-left-color: transparent;
                        border-right-color: transparent;
                        right: 20px;
                        transform-origin: 50% 25%;
                        top: 15px;
                    }

                    &.show-sub {
                        &::before {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }

        .option-list {
            margin-top: 5px;
            position: absolute;
            z-index: 9999;
            overflow: scroll;
            height: 150px;
            border-radius: 2px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
            box-sizing: border-box;
            width: 100%;

            .list-panel {
                padding: 0 10px;

                .option {
                    font-size: 14px;
                    padding: 8px 10px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #48576a;
                    height: 36px;
                    line-height: 1.5;
                    box-sizing: border-box;
                    cursor: pointer;

                    &:hover {
                        background-color: #e4e8f1;
                    }

                    &.selected {
                        color: #fff;
                        background-color: #20a0ff;
                    }

                    &.selected:hover {
                        background-color: #1c8de0;
                    }
                }
                
            }
        }

        .fade-enter-active, .fade-leave-active {
          transition: height .2s;
        }
        .fade-enter, .fade-leave-to {
          height: 0;
        }
    }
</style>
<script>
    export default{
        name: "select",
        props: {

            value: {
                type: [Number,String],
                default: ''
            },

            options: {
                type: Array,
                default: []
            },

            width: {
                type: [Number, String],
                default: 'auto'
            },

            placeholder: {
                type: String,
                default: '请选择'
            },

            multiple: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                currentValue: this.value,
                currentLabel: '',

                visible: false,
            }
        },
        watch: {
            value: function (n, o) {
                this.setCurrentValue(n);
            },

            currentValue: function(n,o){
                this.selectedValue(n);
                this.$emit('selectchange', n);
            }
        },
        computed:{
            style: function(){
                return {
                    width: this.width
                }
            }
        },
        mounted() {
            this.initSelectd();
        },

        methods:{
            initSelectd(){
                this.selectedValue(this.value);
            },

            selectedValue(value){
                let options = this.options || [];
                options.forEach((option) => {
                    if (option.value == value) {
                        this.currentLabel = option.label;
                        option.selected = true;
                    } else {
                        option.selected = false;
                    }
                });
            },

            setCurrentValue(val){
                this.currentValue = val;
            },

            handlerClick() {
                this.visible = !this.visible;
            },

            handlerSelect(option) {
                this.currentValue = option.value;
                this.visible = false;
            },

        }
    }
</script>
