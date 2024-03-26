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
									@click="selectItem(item)"
								>
									<el-row>
										<unicon
											name="estate"
											fill="#409EFF"
										></unicon>
										<span class="store-name">
											超级养殖场
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
									<span>111</span>
								</el-row>
								<el-row class="info-item">
									<span>年龄</span>
									<span>111</span>
								</el-row>
								<el-row class="info-item">
									<span>重量</span>
									<span>111</span>
								</el-row>
								<el-row class="info-item">
									<span>体格</span>
									<span>111</span>
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
								:md="6"
								:lg="6"
								:xl="6"
								v-if="item !== 0"
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
										<div class="card-header">
											<unicon
												name="pig"
												fill="#BF7182"
												height="20"
												width="20"
												style="margin-top: 5px"
											></unicon>
											<span class="id-tag">1</span>
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
											54公斤
										</el-tag>
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											3个月
										</el-tag>
										<el-tag
											type="info"
											effect="dark"
											size="mini"
										>
											好
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
				totalItems: 10,
				totalPigs: 10,
				list: [1, 2, 3, 4, 5, 6, 7, 8],
				pig_list: [10, 20, 30, 40, 50],
				pig_selected: [0, 0, 0, 0, 0, 0, 0, 0]
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
			handleCurrentPigChange(val) {
				this.pigPageForm.curPage = val;
			},
			selectItem(id) {
				id;
				this.next();
			},
			selectPig(index) {
				this.pig_selected[index] = (this.pig_selected[index] + 1) % 2;
				this.size = "success";
			},
			delPig(index) {
				this.pig_selected[index] = 0;
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
	.check-header {
		margin: 15px 0 15px 0;
	}
	.card-col {
		margin: 10px 0;
	}
</style>