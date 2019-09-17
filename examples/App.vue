<template>
  <div>
    
        <select-el v-model="selectValue" :options="selectList" width="240px" @selectchange="changeHandler">
            <div slot="label">Select : </div>
        </select-el>

  </div>
</template>

<style lang="less">
</style>

<script>

import SelectEl from "../src/select.vue";

export default {
    data(){
        return {
            selectValue: '',
            selectList: [
                {
                    label: '选项一',
                    value: '13'
                },
                {
                    label: '选项二',
                    value: '15'
                },
                {
                    label: '选项三',
                    value: '24'
                },
                {
                    label: '选项四',
                    value: '31'
                },
                {
                    label: '选项一',
                    value: '0'
                },
                {
                    label: '选项二',
                    value: '1'
                },
                {
                    label: '选项三',
                    value: '2'
                },
                {
                    label: '选项四',
                    value: '3'
                },
                {
                    label: '选项一',
                    value: '5'
                },
                {
                    label: '选项二',
                    value: '6'
                },
                {
                    label: '选项三',
                    value: '7'
                },
                {
                    label: '选项四',
                    value: '8'
                },
                {
                    label: '选项一',
                    value: '9'
                },
                {
                    label: '选项二',
                    value: '10'
                },
                {
                    label: '选项三',
                    value: '11'
                },
                {
                    label: '选项四',
                    value: '12'
                },
            ]
        }
    },
    mounted(){
        
    },
    methods:{
        buttonClick(event) {
            console.log('点击按钮');
            alert('点击按钮');
        },
        changeHandler(val){
            console.log(val);
        }
    },
    components: {
        SelectEl
    }
}
</script>

