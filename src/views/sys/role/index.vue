<template>
	<div>
		<transition 
		name="custom-classes-transition"
		enter-active-class="animated fadeInRight"
    	leave-active-class="animated fadeOutRight">
			<list v-if="step=='list'" @removePowerHandler="removePowerHandler" @addPowerHandler="addPowerHandler" @addHandler="addHandler" @modifyHandler="modifyHandler"></list>
			<modify v-if="step=='modify'" @goList="goList"></modify>
			<add v-if="step=='add'" @goList="goList"></add>
			<addPower v-if="step=='power'" @goList="goList"></addPower>
			<removePower v-if="step=='removePower'" @goList="goList"></removePower>
			
		</transition>
	</div>
</template>

<script>
//列表
import list from "./list";
import add from "./add";
import modify from "./modify";
import addPower from "./addPower";
import removePower from "./removePower";
export default {
	components:{
		add,
		list,
		modify,
		removePower,
		addPower
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
		},
		addPowerHandler(){
			this.step="power";
		},
		removePowerHandler(){
			this.step="removePower";
		}
	}
}
</script>

<style>

</style>