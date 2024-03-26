<template>
	<div class="jc-component__range">
		<div class="jc-range" :class="rangeStatus ? 'success' : ''">
			<span class="slide-block" @mousedown="rangeMove" ref="slideBlock">
				<unicon
					:name="rangeStatus ? successIcon : startIcon"
					:fill="rangeStatus ? '#3bc923' : 'gray'"
					width="35"
					height="35"
				></unicon>
			</span>
			{{ rangeStatus ? successText : startText }}
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			// 成功之后的函数
			successFun: {
				type: Function
			},
			//成功图标
			successIcon: {
				type: String,
				default: "check-circle"
			},
			//成功文字
			successText: {
				type: String,
				default: "验证成功"
			},
			//开始的图标
			startIcon: {
				type: String,
				default: "angle-double-right"
			},
			//开始的文字
			startText: {
				type: String,
				default: "请拖住滑块，划至最右"
			},
			//失败之后的函数
			errorFun: {
				type: Function
			},
			//或者用值来进行监听
			status: {
				type: String
			}
		},
		data() {
			return {
				disX: 0,
				rangeStatus: false
			};
		},
		methods: {
			//滑块移动
			rangeMove(e) {
				let ele = this.$refs.slideBlock;
				let startX = e.clientX;
				let eleWidth = ele.offsetWidth;
				let parentWidth = ele.parentElement.offsetWidth;
				let MaxX = parentWidth - eleWidth;
				if (this.rangeStatus) {
					//不运行
					return false;
				}
				document.onmousemove = e => {
					let endX = e.clientX;
					this.disX = endX - startX;
					if (this.disX <= 0) {
						this.disX = 0;
					}
					if (this.disX >= MaxX - eleWidth) {
						//减去滑块的宽度,体验效果更好
						this.disX = MaxX;
					}
					ele.style.transition = ".1s all";
					ele.style.transform = "translateX(" + this.disX + "px)";
					e.preventDefault();
				};
				document.onmouseup = () => {
					if (this.disX !== MaxX) {
						ele.style.transition = ".5s all";
						ele.style.transform = "translateX(0)";
						//执行成功的函数
						this.errorFun && this.errorFun();
					} else {
						this.rangeStatus = true;
						if (this.status) {
							this.$parent[this.status] = true;
						}
						//执行成功的函数
						this.successFun && this.successFun();
					}
					document.onmousemove = null;
					document.onmouseup = null;
				};
			}
		}
	};
</script>
<style lang="scss" scoped>
	@mixin jc-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.jc-component__range {
		.jc-range {
			background-color: #e9e9e9;
			position: relative;
			transition: 1s all;
			user-select: none;
			color: #585858;
			@include jc-flex;
			height: 40px; /*no*/
			// font-size: 18px;
			&.success {
				background-color: #3bc923;
				color: #fff;
				.slide-block {
					color: #3bc923;
				}
			}
			.slide-block {
				position: absolute;
				left: 0;
				width: 50px; /*no*/
				height: 100%;
				color: #3fcd26;
				padding-top: 5px;
				background-color: #fff;
				border: 2px solid #d8d8d8;
				border-radius: 3px;
				cursor: pointer;
				font-size: 26px;
				@include jc-flex;
			}
		}
	}
</style>