<template>
  <div style="min-height: 100px; max-height: 400px; overflow: hidden; overflow-y: auto;">
    <div v-if="isConnect">
      已连接
    </div>
    <div v-else>
      未连接服务
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isConnect } from './hook';
</script>

<style lang="scss">
</style>
