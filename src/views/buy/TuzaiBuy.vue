<template>
	<div class="container">
		<el-row>
			<el-col class="shop-page-body">
				<el-steps :active="active" finish-status="success" align-center>
					<el-step title="查看养殖场"></el-step>
					<el-step title="查看生猪"></el-step>
					<el-step title="确认交易"></el-step>
				</el-steps>
				<div id="step1" class="step-body" v-if="active === 0">
					<el-row :gutter="20">
						<el-col
							v-for="(item, index) in list"
							:key="index"
							:xs="12"
							:sm="12"
							:md="8"
							:lg="6"
							:xl="6"
							class="card-col"
						>
							<el-card
								:body-style="{
									padding: '10px',
								}"
								shadow="hover"
							>
								<div
									class="card-body"
									@click="selectItem(item.yangzhi_id)"
								>
									<el-row>
										<unicon
											name="estate"
											fill="#409EFF"
										></unicon>
										<span class="store-name">
											{{ item.yangzhi_name }}
										</span>
									</el-row>
									<el-row class="info-item">
										<span>地址</span>
										<span>{{ item.addr }}</span>
									</el-row>
									<el-row class="info-item">
										<span>电话</span>
										<span>{{ item.phone }}</span>
									</el-row>
									<el-row class="info-item">
										<span>头数</span>
										<span>{{ item.pig_num }}</span>
									</el-row>
								</div>
							</el-card>
						</el-col>
					</el-row>
					<el-pagination
						background
						layout="prev, pager, next"
						:current-page="pageForm.curPage"
						:page-size="pageForm.pageSize"
						:total="totalItems"
						@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
				<div id="step2" class="step-body" v-if="active === 1">
					<el-row :gutter="20">
						<el-col
							v-for="(item, index) in pig_list"
							:key="index"
							:xs="12"
							:sm="12"
							:md="8"
							:lg="6"
							:xl="6"
							class="card-col"
							style="min-width: 200px"
						>
							<el-card
								:body-style="{
									padding: '10px',
								}"
								shadow="hover"
							>
								<template #header>
									<div class="card-header">
										<unicon
											name="pig"
											fill="#BF7182"
											height="30"
											width="30"
										></unicon>
										<el-button
											class="button"
											:type="
												pig_selected[index] === 0
													? 'primary'
													: 'success'
											"
											size="small"
											@click="selectPig(index)"
										>
											{{
												pig_selected[index] === 0
													? "添加"
													: "移除"
											}}
										</el-button>
									</div>
								</template>
								<el-row class="info-item">
									<span>编号</span>
									<span>{{ item.pig_id }}</span>
								</el-row>
								<el-row class="info-item">
									<span>年龄</span>
									<span
										>{{ item.pig_old }}
										<el-tag
											size="mini"
											type="info"
											effect="plain"
											>个月</el-tag
										>
									</span>
								</el-row>
								<el-row class="info-item">
									<span>重量</span>
									<span
										>{{ item.pig_weight }}
										<el-tag
											size="mini"
											type="info"
											effect="plain"
											>公斤</el-tag
										>
									</span>
								</el-row>
								<el-row class="info-item">
									<span>价格</span>
									<span
										>{{ item.pig_price }}
										<el-tag
											size="mini"
											type="info"
											effect="plain"
											>元</el-tag
										>
									</span>
								</el-row>
							</el-card>
						</el-col>
					</el-row>
					<el-pagination
						background
						layout="prev, pager, next"
						:current-page="pigPageForm.curPage"
						:page-size="pigPageForm.pageSize"
						:total="totalPigs"
						@current-change="handleCurrentPigChange"
					>
					</el-pagination>
				</div>
				<div id="step3" class="step-body" v-if="active === 2">
					<el-row>
						<el-tag
							type="info"
							effect="plain"
							class="check-header"
							size="medium"
						>
							检查订单
						</el-tag>
					</el-row>
					<el-row :gutter="20">
						<template
							v-for="(item, index) in pig_selected"
							:key="index"
						>
							<el-col
								:xs="12"
								:sm="12"
								:md="8"
								:lg="6"
								:xl="6"
								v-if="item !== 0"
								class="card-col"
								style="min-width: 250px"
							>
								<el-card
									:body-style="{
										padding: '4px',
									}"
									shadow="hover"
								>
									<template #header>
										<div class="card-header">
											<unicon
												name="pig"
												fill="#BF7182"
												height="20"
												width="20"
												style="margin-top: 5px"
											></unicon>
											<span class="id-tag">{{
												pig_list[index].pig_id
											}}</span>
											<el-button
												class="button"
												type="success"
												size="small"
												@click="delPig(index)"
												>移除</el-button
											>
										</div>
									</template>

									<el-row class="pig-cart-info">
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											{{ pig_list[index].pig_weight }}公斤
										</el-tag>
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											{{ pig_list[index].pig_price }}元
										</el-tag>
									</el-row>
								</el-card>
							</el-col>
						</template>
					</el-row>
				</div>
				<el-row type="flex" justify="end">
					<el-button-group>
						<el-button
							@click="prev"
							v-if="active > 0 && active <= 2"
						>
							<unicon
								name="angle-left-b"
								fill="gray"
								height="13"
								width="15"
							></unicon>
							上一步
						</el-button>
						<el-button @click="next" v-if="active > 0 && active < 2"
							>下一步
							<unicon
								name="angle-right-b"
								fill="gray"
								height="13"
								width="15"
							></unicon>
						</el-button>
					</el-button-group>
					<el-button
						type="primary"
						@click="submitDeal"
						v-if="active == 2"
						style="margin-left: 15px"
					>
						确认购买
					</el-button>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				pageForm: {
					curPage: 1,
					pageSize: 8
				},
				pigPageForm: {
					curPage: 1,
					pageSize: 8
				},
				pig_quality_map: {
					0: "良",
					1: "好",
					2: "优"
				},
				sel_yz_id: null,
				totalItems: 10,
				totalPigs: 10,
				list: [],
				pig_list: [],
				pig_selected: []
			};
		},
		mounted() {
			this.getFarmList();
		},
		methods: {
			setTotalItems() {
				this.totalItems = this.list.length;
				console.log(this.totalItems);
			},
			setTotalPigs() {
				this.totalPigs = this.pig_list.length;
			},
			getFarmList() {
				let that = this;
				this.$axios
					.post("/api/person/tuzai_buy", { qiye_type: 0 })
					.then(function(resp) {
						console.log(resp["data"]);
						if (resp["data"]["status"] === 1) {
							that.list = resp["data"]["data"];
							that.setTotalItems();
						}
					})
					.catch(() => {});
			},
			prev() {
				if (this.active-- <= 0) this.active = 0;
			},
			next() {
				if (this.active++ >= 2) this.active = 2;
			},
			handleCurrentChange(val) {
				this.pageForm.curPage = val;
			},
			handleCurrentPigChange(val) {
				this.pigPageForm.curPage = val;
			},
			setPigSelected() {
				this.pig_selected = [];
				for (let i in this.pig_list) {
					this.pig_selected[i] = 0;
				}
			},
			selectItem(id) {
				this.sel_yz_id = id;
				let that = this;
				this.$axios
					.post("/api/person/tuzai_buy/pig_info", { yangzhi_id: id })
					.then(function(resp) {
						console.log(resp["data"]);
						if (resp["data"]["status"] === 1) {
							that.pig_list = resp["data"]["data"];
							that.setTotalPigs();
							that.setPigSelected();
						}
					})
					.catch(() => {});
				this.next();
			},
			selectPig(index) {
				this.pig_selected[index] = (this.pig_selected[index] + 1) % 2;
				this.size = "success";
			},
			delPig(index) {
				this.pig_selected[index] = 0;
			},
			submitDeal() {
				let pg = [];
				for (let i in this.pig_selected) {
					if (this.pig_selected[i] != 0) {
						pg.push(this.pig_list[i].pig_id);
					}
				}
				let that = this;
				this.$axios
					.post("/api/person/tuzai_order", {
						yangzhi_id: that.sel_yz_id,
						tuzai_person_id: localStorage.getItem("account_id"),
						pig_list: pg
					})
					.then(function(resp) {
						if (resp["data"]["status"] === 1) {
							that.$message.success("购买成功");
						}
					});
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
	}
	.shop-page-body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.el-steps {
		width: 500px;
	}
	.step-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}
	.card-body {
		white-space: nowrap;
		cursor: pointer;
	}

	.store-name {
		margin-left: 5px;
		line-height: 26px;
	}
	.info-item {
		margin: 5px 0;
	}
	.info-item > span:first-child {
		background-color: #ffc947;
		border-radius: 5px;
		padding: 2px 5px;
		margin-right: 5px;
	}
	.info-item > span:last-child {
		line-height: 25px;
	}
	.card-header {
		display: flex;
		justify-content: space-between;
		height: 25px;
		padding: 0px;
	}
	.id-tag {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #409eff;
		color: white;
		text-align: center;
		margin: 3px 0px 0 0px;
	}
	.pig-cart-info {
		display: flex;
		justify-content: space-around;
	}
	.check-header {
		margin: 15px 0 15px 0;
	}
	.card-col {
		margin: 10px 0;
	}
</style>