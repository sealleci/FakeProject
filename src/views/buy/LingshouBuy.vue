<template>
	<div class="container">
		<el-row>
			<el-col class="shop-page-body">
				<el-steps :active="active" finish-status="success" align-center>
					<el-step title="查看屠宰场"></el-step>
					<el-step title="查看猪肉"></el-step>
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
									@click="selectItem(item)"
								>
									<el-row>
										<unicon
											name="estate"
											fill="#409EFF"
										></unicon>
										<span class="store-name">
											超级屠宰场
										</span>
									</el-row>
									<el-row class="info-item">
										<span>地址</span>
										<span>111</span>
									</el-row>
									<el-row class="info-item">
										<span>电话</span>
										<span>111</span>
									</el-row>
									<el-row class="info-item">
										<span>头数</span>
										<span>111</span>
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
					<el-row>
						<el-tag
							type="info"
							size="medium"
							effect="plain"
							style="margin: 15px 0 15px 0; font-size: 16px"
						>
							xxx屠宰场
						</el-tag>
					</el-row>

					<el-row :gutter="40">
						<el-col
							v-for="(meat, index) in meat_list"
							:key="index"
							:xs="12"
							:sm="12"
							:md="8"
							:lg="6"
							:xl="6"
							class="card-col"
							style="min-width: 250px"
						>
							<el-card
								:body-style="{
									padding: '10px',
								}"
								shadow="hover"
							>
								<div class="card-body" style="cursor: default">
									<el-row>
										<unicon
											name="estate"
											fill="#409EFF"
										></unicon>
										<span class="store-name">{{
											meat_type_map[meat.meat_type]
										}}</span>
									</el-row>
									<el-row class="info-item">
										<span>价格</span>
										<span>
											{{ meat.meat_price }}
											<el-tag
												size="small"
												type="info"
												effect="plain"
											>
												元/公斤
											</el-tag>
										</span>
									</el-row>
									<el-row class="info-item">
										<span>库存</span>
										<span
											>111
											<el-tag
												size="small"
												type="info"
												effect="plain"
											>
												公斤
											</el-tag>
										</span>
									</el-row>

									<el-collapse>
										<el-collapse-item :name="index">
											<template #title>
												<el-tag
													:type="
														!meat_selected[index]
															? 'primary'
															: 'success'
													"
													size="small"
													>{{
														!meat_selected[index]
															? "添加"
															: "已添加"
													}}</el-tag
												>
											</template>
											<el-row>
												<el-col :span="6">
													<span class="count-label"
														>数量</span
													>
												</el-col>
												<el-col :span="18">
													<el-input
														v-model="
															meat_count[index]
														"
													></el-input>
												</el-col>
											</el-row>
											<el-row
												v-if="meat_msg[index]"
												type="flex"
												justify="center"
											>
												<span style="color: #ff5c5e"
													>请输入有效数字</span
												>
											</el-row>
											<el-row
												type="flex"
												justify="center"
												style="margin-top: 20px"
											>
												<el-button
													type="success"
													size="mini"
													@click="addMeat(index)"
													class="add-meat-btn"
												>
													{{
														!meat_selected[index]
															? "确认"
															: "修改"
													}}
												</el-button>
												<el-button
													type="info"
													size="mini"
													@click="cancelMeat(index)"
													>取消</el-button
												>
											</el-row>
										</el-collapse-item>
									</el-collapse>
								</div>
							</el-card>
						</el-col>
					</el-row>
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
							v-for="(meat, index) in meat_selected"
							:key="index"
						>
							<el-col
								:xs="12"
								:sm="12"
								:md="6"
								:lg="6"
								:xl="6"
								v-if="meat"
								class="card-col"
								style="min-width: 180px"
							>
								<el-card
									:body-style="{
										padding: '4px',
									}"
									shadow="hover"
								>
									<template #header>
										<el-row
											type="flex"
											justify="space-around"
										>
											<unicon
												name="pig"
												fill="#BF7182"
												height="20"
												width="20"
												style="margin-top: 5px"
											></unicon>
											<span style="line-height: 30px">{{
												meat_type_map[
													meat_list[index].meat_type
												]
											}}</span>
										</el-row>
									</template>

									<el-row class="pig-cart-info">
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											{{ meat_count[index] }}公斤
										</el-tag>
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											{{
												(
													meat_true_count[index] *
													meat_list[index].meat_price
												).toFixed(2)
											}}元
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
				gala: "",
				active: 0,
				pageForm: {
					curPage: 1,
					pageSize: 8
				},
				shopForm: {},
				totalItems: 10,
				list: [1, 2, 3, 4, 5, 6, 7, 8],
				meat_list: [
					{
						pig_id: [1, 2, 3],
						meat_type: 0,
						meat_price: 5.6
					},
					{
						pig_id: [1, 2, 3],
						meat_type: 1,
						meat_price: 5.6
					},
					{
						pig_id: [1, 2, 3],
						meat_type: 2,
						meat_price: 5.6
					},
					{
						pig_id: [1, 2, 3],
						meat_type: 3,
						meat_price: 5.6
					}
				],
				meat_count: [null, null, null, null],
				meat_true_count: [0, 0, 0, 0],
				meat_selected: [false, false, false, false],
				meat_msg: [false, false, false, false],
				meat_type_map: {
					0: "五花肉",
					1: "猪蹄",
					2: "猪里脊",
					3: "猪排骨",
					4: "猪下水",
					5: "猪大腿"
				}
			};
		},

		methods: {
			prev() {
				if (this.active-- <= 0) this.active = 0;
			},
			next() {
				if (this.active++ >= 2) this.active = 2;
			},
			handleCurrentChange(val) {
				this.pageForm.curPage = val;
			},
			selectItem(id) {
				id;
				this.next();
			},
			selectMeat(index) {
				index;
			},
			addMeat(index) {
				let reg = /^\d*\.?\d+$/g;
				if (reg.test(this.meat_count[index])) {
					this.meat_selected[index] = true;
					this.meat_true_count[index] = this.meat_count[index];
					this.meat_msg[index] = false;
				} else {
					this.meat_selected[index] = false;
					this.meat_msg[index] = true;
				}
			},
			cancelMeat(index) {
				this.meat_count[index] = null;
				this.meat_true_count[index] = 0;
				this.meat_selected[index] = false;
				this.meat_msg[index] = false;
			},
			submitDeal() {}
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

	.card-col {
		margin: 10px 0;
		/* min-width: 200px; */
	}
	.check-header {
		margin: 15px 0 15px 0;
	}
	.count-label {
		line-height: 38px;
		padding: 0px 5px;
		font-size: 13px;
		color: gray;
	}
	.add-meat-btn {
		transition: transform 0.25s;
	}
	.add-meat-btn:active {
		transform: translateY(5px) !important;
	}
</style>