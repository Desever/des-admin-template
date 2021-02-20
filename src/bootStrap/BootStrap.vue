<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
*{
	margin:0px;
	padding:0px;
}
html,body{
	width:100%;
	height:100%;
	overflow: hidden;
	background: #f4f4f4;
}
#app{
	width:100%;
	height:100%;
	overflow: hidden;
}
.public-page{
	position:absolute;
	left:0px;
	top:0px;
	right:0px;
	bottom:0px;
	overflow: hidden;
	overflow-y: auto;
	padding:30px;
}
</style>
