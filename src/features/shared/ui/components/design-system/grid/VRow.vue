<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<style lang="scss" module>
.root:after {
	content: "";
	display: table;
	clear: both;
}
</style>
