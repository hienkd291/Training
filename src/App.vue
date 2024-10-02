<template>
  <router-view></router-view>
</template>

<script>
import router from './router';

export default {
  created() {
    router.push({name: "Bai1"});
  }
}
</script>