<template>
	<div class="right-router-view">
		<transition 
		name="custom-classes-transition"
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut">
			<router-view />
		</Transition>
	</div>
</template>

<script>
export default {

}
</script>

<style>
.right-router-view{
	flex:1;
	padding:20px;
	overflow: hidden;
	position:relative;
}
</style>