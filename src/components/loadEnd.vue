<template>
  <div class="load-end"> 完 </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoadEnd extends Vue {}
</script>
<style scoped>
.load-end {
  text-align: center;
  padding: 30px;
}
</style>

