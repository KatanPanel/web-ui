<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
</style>
