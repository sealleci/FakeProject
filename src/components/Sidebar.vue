<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
			text-color="#bfcbd9" active-text-color="#bfcbd9" unique-opened router>
			<template v-for="item in getRouteList()">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template #title>
							<unicon :name="item.icon" fill="#bfcbd9" style="margin-right: 20px">
							</unicon>
							<span>{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template #title>{{ subItem.title }}</template>
								<el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i"
									:index="threeItem.index">{{ threeItem.title
									}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title
								}}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<unicon :name="item.icon" fill="#bfcbd9" style="margin-right: 20px"></unicon>
						<template #title>
							<span>{{ item.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			account_type: localStorage.getItem("account_type"),
			items: [
			]
		};
	},
	methods: {
		getRouteList() {
			switch (this.account_type) {
				case "1":
					return [
						{
							icon: "house-user",
							index: "/person/home",
							title: "个人首页"
						},
						{
							icon: "notes",
							index: "/person/beian",
							title: "个人备案"
						},
						{
							icon: "shopping-cart",
							index: "/person/tuzai_buy",
							title: "购买页面"
						}
					];
				case "2":
					return [
						{
							icon: "house-user",
							index: "/person/beian",
							title: "个人首页"
						},
						{
							icon: "notes",
							index: "/person/beian",
							title: "个人备案"
						},
						{
							icon: "shopping-cart",
							index: "/person/pifa_buy",
							title: "购买页面"
						},
						{
							icon: "data-sharing",
							index: "/person/pifa_trace",
							title: "溯源信息"
						}
					];
				case "3":
					return [
						{
							icon: "house-user",
							index: "/person/home",
							title: "个人首页"
						},
						{
							icon: "notes",
							index: "/person/beian",
							title: "个人备案"
						},
						{
							icon: "shopping-cart",
							index: "/person/lingshou_buy",
							title: "购买页面"
						},
						{
							icon: "data-sharing",
							index: "/person/lingshou_trace",
							title: "溯源信息"
						}
					];
				case "4":
					return [
						{
							icon: "house-user",
							index: "/qiye/home",
							title: "企业首页"
						},
						{
							icon: "notes",
							index: "/qiye/beian",
							title: "企业备案"
						},
						{
							icon: "grid",
							index: "/qiye/tuzai_import_list",
							title: "屠宰进场"
						},
						{
							icon: "yen-circle",
							index: "/qiye/tuzai_deal",
							title: "交易页面"
						}
					];
				case "5":
					return [
						{
							icon: "house-user",
							index: "/qiye/home",
							title: "企业首页"
						},
						{
							icon: "notes",
							index: "/qiye/beian",
							title: "企业备案"
						},
						{
							icon: "grid",
							index: "/qiye/pifa_import_list",
							title: "批发进场"
						},
						{
							icon: "yen-circle",
							index: "/qiye/pifa_deal",
							title: "交易页面"
						}
					];
				case "6":
					return [
						{
							icon: "house-user",
							index: "/qiye/home",
							title: "企业首页"
						},
						{
							icon: "notes",
							index: "/qiye/beian",
							title: "企业备案"
						},
						{
							icon: "grid",
							index: "/qiye/lingshou_import_list",
							title: "零售进场"
						}
					];
				default:
					return [];
			}
		}
	},
	computed: {
		onRoutes() {
			return this.$route.path.replace("/", "");
		},
		collapse() {
			return this.$store.state.collapse;
		}
	}
};
</script>

<style scoped>
* {
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}

.sidebar>ul {
	height: 100%;
}
</style>
