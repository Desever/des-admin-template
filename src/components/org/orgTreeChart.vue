<template>
	<div class="org-tree-chart" id="org-tree-chart"></div>
</template>

<script>
var myChart=null;
export default {
	computed:{
		tableList(){
			return this.$store.state.org.tableList;
		}
	},
	watch:{
		tableList(value){
			if(value.length>0){
				this.init();
			}
		}
	},
	methods:{
		init(){
			if(myChart){
				myChart.dispose();
			}
			myChart = echarts.init(document.getElementById('org-tree-chart'));
			var option = {
				tooltip: {
					show:false
				},
				series:[
					{
						type: 'tree',
						name: '机构',
						data:this.tableList,
						symbolSize:10,
						edgeShape: 'polyline',
						edgeForkPosition: '63%',
						initialTreeDepth: 3,
						lineStyle: {
							width: 2
						},
						label: {
							position: 'left',
							verticalAlign: 'middle',
							align: 'right'
						},
						leaves: {
							label: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							}
						},
						emphasis: {
							focus: 'descendant'
						},
						expandAndCollapse: true
					}
				]
			};
			myChart.setOption(option);
			myChart.on('click',(params)=>{
				this.$store.dispatch("org/setActiveItem",params.data);
			});
		}
	}
}
</script>

<style lang='scss' scope>
.org-tree-chart{
	width:100%;
	height:500px;
}
</style>