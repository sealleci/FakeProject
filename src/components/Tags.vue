<template>
	<div class="tags" v-if="showTags">
		<ul>
			<li class="tags-li" v-for="(item, index) in tagsList" :class="{ active: isActive(item.path) }" :key="index">
				<router-link :to="item.path" class="tags-li-title">{{
		item.title
	}}</router-link>
				<span class="tags-li-icon" @click="closeTags(index)" v-if="isOnlyOne">
					<unicon name="times" :fill="isActive(item.path) ? '#fff' : '#666'" width="20"></unicon>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	computed: {
		tagsList() {
			return this.$store.state.tagsList;
		},
		showTags() {
			return this.tagsList.length >= 0;
		},
		isOnlyOne() {
			return this.tagsList.length !== 1;
		}
	},
	methods: {
		isActive(path) {
			return path === this.$route.fullPath;
		},
		// 关闭单个标签
		closeTags(index) {
			const delItem = this.tagsList[index];
			this.$store.commit("delTagsItem", { index });
			const item = this.tagsList[index]
				? this.tagsList[index]
				: this.tagsList[index - 1];
			if (item) {
				delItem.path === this.$route.fullPath &&
					this.$router.push(item.path);
			} else {
				this.$router.push("/");
			}
		},
		// 关闭全部标签
		closeAll() {
			this.$store.commit("clearTags");
			this.$router.push("/");
		},
		// 关闭其他标签
		closeOther() {
			const curItem = this.tagsList.filter(item => {
				return item.path === this.$route.fullPath;
			});
			this.$store.commit("closeTagsOther", curItem);
		},
		// 设置标签
		setTags(route) {
			const isExist = this.tagsList.some(item => {
				return item.path === route.fullPath;
			});
			if (!isExist) {
				if (this.tagsList.length >= 8) {
					this.$store.commit("delTagsItem", { index: 0 });
				}
				this.$store.commit("setTagsItem", {
					name: route.name,
					title: route.meta.title,
					path: route.fullPath
				});
			}
		},
		handleTags(command) {
			command === "other" ? this.closeOther() : this.closeAll();
		}
	},
	watch: {
		$route(newValue) {
			this.setTags(newValue);
		}
	},
	created() {
		this.setTags(this.$route);
	}
};
</script>


<style>
.tags {
	position: relative;
	height: 32px;
	overflow: hidden;
	background: #fff;
	/* padding-right: 120px; */
	box-shadow: 0 5px 10px #ddd;
}

.tags ul {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.tags-li {
	float: left;
	margin: 3px 5px 2px 3px;
	border-radius: 3px;
	font-size: 12px;
	overflow: hidden;
	cursor: pointer;
	height: 23px;
	line-height: 23px;
	border: 1px solid #e9eaec;
	background: #fff;
	padding: 0 5px 0 12px;
	vertical-align: middle;
	color: #666;
	-webkit-transition: all 0.3s ease-in;
	-moz-transition: all 0.3s ease-in;
	transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
	background: #f8f8f8;
}

.tags-li.active {
	color: #fff;
}

.tags-li-title {
	float: left;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 5px;
	color: #666;
}

.tags-li.active .tags-li-title {
	color: #fff;
}

.tags-close-box {
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: border-box;
	padding-top: 2px;
	padding-bottom: 2px;
	text-align: center;
	width: 110px;
	height: 32px;
	background: #fff;
	box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
	z-index: 10;
}
</style>
