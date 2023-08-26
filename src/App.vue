<template>
  <router-view />
  <ModalsContainer />
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal"
</script>
<style lang="scss">
#app {
	display: flex;
	display: -ms-flexbox;
	flex-direction: column;
	height: 100%;
}
</style>