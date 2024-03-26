<template>
	<div class="container">
		<div class="form-box">
			<el-row type="flex" justify="center">
				<el-col :span="18">
					<el-form
						ref="personBeianForm"
						:rules="rules"
						:model="personBeianForm"
						label-width="100px"
						:span="8"
					>
						<el-form-item label="经营者姓名" prop="person_name">
							<el-input
								v-model="personBeianForm.person_name"
							></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input
								v-model="personBeianForm.phone"
							></el-input>
						</el-form-item>
						<el-form-item label="经营地址" prop="addr">
							<el-cascader
								v-model="selected_areas"
								size="large"
								:options="options"
								@change="handleChange(personBeianForm)"
							></el-cascader>
						</el-form-item>
						<el-form-item label="摊位号" prop="tanwei_id">
							<el-input
								v-model="personBeianForm.tanwei_id"
							></el-input>
						</el-form-item>
						<el-form-item label="法人代表" prop="legal_person">
							<el-input
								v-model="personBeianForm.legal_person"
							></el-input>
						</el-form-item>
						<el-form-item
							label="工商注册码"
							prop="business_registration_num"
						>
							<el-input
								v-model="
									personBeianForm.business_registration_num
								"
							></el-input>
						</el-form-item>
						<el-form-item class="btn-row">
							<el-button
								type="primary"
								@click="submitForm('personBeianForm')"
							>
								提交备案
							</el-button>
							<el-button @click="resetForm('personBeianForm')"
								>重置</el-button
							>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import { regionData, CodeToText } from "element-china-area-data";
	export default {
		data() {
			return {
				options: regionData,
				selected_areas: [],
				personBeianForm: {
					person_name: "",
					business_registration_num: "",
					legal_person: "",
					addr: "",
					tanwei_id: null,
					phone: ""
				},
				rules: {
					person_name: [
						{
							required: true,
							message: "请输入活动名称",
							trigger: "blur"
						},
						{
							min: 3,
							max: 30,
							message: "姓名长度应为3到30",
							trigger: "blur"
						}
					],
					addr: [
						{
							required: true,
							message: "请选择地址",
							trigger: "change"
						}
					],
					phone: [
						{ required: true, message: "请填写电话", trigger: "blur" },
						{ pattern: /^\d{6,11}$/, message: "电话格式不正确" }
					],
					legal_person: [
						{ required: true, message: "请填写法人", trigger: "blur" },
						{
							min: 3,
							max: 30,
							message: "姓名长度应为3到30",
							trigger: "blur"
						}
					],
					business_registration_num: [
						{
							required: true,
							message: "请填写工商注册码",
							trigger: "blur"
						},
						{ pattern: /^\d{6,}$/, message: "工商注册码格式不正确" }
					]
				}
			};
		},
		methods: {
			handleChange(thisForm) {
				let loc = "";
				for (let i = 0; i < this.selected_areas.length; i++) {
					loc += CodeToText[this.selected_areas[i]];
				}
				thisForm.addr = loc;
				// alert(thisForm.addr);
			},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.$axios
							.post("/api/person/tuzai_buy", this.personBeianForm)
							.then(function(resp) {
								this.$message.success(resp["data"]["message"]);
							});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.selected_areas = [];
			}
		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
	}
</style>