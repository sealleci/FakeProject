<template>
	<div class="container">
		<el-row>
			<el-col class="shop-page-body">
				<el-steps :active="active" finish-status="success" align-center>
					<el-step title="查看买家"></el-step>
					<el-step title="查看卖家"></el-step>
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
								<div class="card-body" style="cursor: default">
									<el-row type="flex" justify="space-between">
										<div>
											<unicon
												name="user"
												fill="#409EFF"
											></unicon>
											<span class="store-name">
												张三
											</span>
										</div>
										<el-button
											type="primary"
											size="mini"
											round
											@click="selectItem(item)"
											>选择</el-button
										>
									</el-row>
									<el-row class="info-item">
										<span>地址</span>
										<span>零售市场</span>
									</el-row>
									<el-row class="info-item">
										<span>电话</span>
										<span>123</span>
									</el-row>
									<el-row class="info-item">
										<span>是否备案</span>
										<span>是</span>
									</el-row>
								</div>
								<el-collapse>
									<el-collapse-item title="订单" name="1">
										<el-table
											:data="tableData"
											:show-header="false"
										>
											<el-table-column
												prop="date"
												label="商品"
												style="width: 50%"
											>
											</el-table-column>
											<el-table-column
												prop="name"
												label="数量/公斤"
												style="width: 50%"
											>
											</el-table-column>
										</el-table>
									</el-collapse-item>
								</el-collapse>
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
							张三
						</el-tag>
					</el-row>
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
								<div class="card-body" style="cursor: default">
									<el-row type="flex" justify="space-between">
										<div>
											<unicon
												name="user"
												fill="#409EFF"
											></unicon>
											<span class="store-name">
												张三
											</span>
										</div>
										<el-button
											type="primary"
											size="mini"
											round
											@click="selectItem(item)"
											>选择</el-button
										>
									</el-row>
									<el-row class="info-item">
										<span>地址</span>
										<span>零售市场</span>
									</el-row>
									<el-row class="info-item">
										<span>电话</span>
										<span>123</span>
									</el-row>
									<el-row class="info-item">
										<span>是否备案</span>
										<span>是</span>
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
				<div id="step3" class="step-body" v-if="active === 2">
					<el-row>
						<el-tag
							type="success"
							effect="dark"
							class="check-header"
							size="medium"
						>
							买方 张三
						</el-tag>
						<unicon
							name="link-alt"
							width="30"
							height="30"
							style="margin: 13px 10px 0 10px"
						></unicon>
						<el-tag
							type="success"
							effect="dark"
							class="check-header"
							size="medium"
						>
							卖方 李四
						</el-tag>
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
				tableData: [
					{
						name: "11",
						date: "猪排"
					},
					{
						name: "22",
						date: "猪排牌"
					}
				],
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