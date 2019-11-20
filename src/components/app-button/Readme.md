## AppButton 组件 
```vue
<template>
  <div>
    <app-button type="text" @click="clickHandler" :confirm="true"> click </app-button>
  </div>
</template>

<script>
  export default {
    methods: {
      clickHandler() {
        console.log('click handler');
      }
    }
  }
</script>
```
