<template>
  <div style="min-height: 100px; max-height: 399px; overflow: hidden; overflow-y: auto;">
    <div v-if="status == 200">
      已连接
    </div>
    <div v-else-if="status == 503" class="status-error">
      <el-text type="danger">
        未连接服务
      </el-text>
      <el-button type="primary" size="small">
        配置
      </el-button>
    </div>
    <div v-else-if="status == 401" style="text-align: center;">
      <div><img src="../assets/wxqrcode.jpg" width="260"></div>
      <div style="margin-top: 5px; margin-bottom: 15px;">
        <el-text type="primary" size="large">
          微信扫码使用
        </el-text>
      </div>
    </div>
    <div v-else class="status-error">
      <el-text type="danger">
        未知错误
      </el-text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { status } from './hook';
</script>

<style lang="scss">
</style>
