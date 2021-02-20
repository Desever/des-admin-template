<template>
	<div>
		<transition 
		name="custom-classes-transition"
		enter-active-class="animated fadeInRight"
    	leave-active-class="animated fadeOutRight">
			<list v-if="step=='list'" @addHandler="addHandler" @modifyHandler="modifyHandler"></list>
			<modify v-if="step=='modify'" @goList="goList"></modify>
			<add v-if="step=='add'" @goList="goList"></add>
		</transition>
	</div>
</template>

<script>
//列表
import list from "./list";
import add from "./add";
import modify from "./modify";
export default {
	components:{
		add,
		list,
		modify
	},
	data(){
		return {
			step:"list"
		}
	},
	methods:{
		addHandler(){
			this.step="add";
		},
		modifyHandler(){
			this.step="modify"
		},
		goList(){
			this.step="list";
		}
	}
}
</script>

<style>

</style>