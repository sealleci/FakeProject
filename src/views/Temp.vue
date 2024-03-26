<template>
	<div>跳转中</div>
</template>

<script>
	export default {
		mounted() {
			this.redirectHome();
		},
		methods: {
			redirectHome() {
				console.log("type:" + localStorage.getItem("account_type"));
				if (localStorage.getItem("account_type") <= 3) {
					this.$router.push("/person/home");
				} else {
					this.$router.push("/qiye/home");
				}
			}
		}
	};
</script>
