<template>
	<div class="container">
		<div class="form-box">
			<el-row type="flex" justify="center">
				<el-col :span="18">
					<el-form
						ref="qiyeBeianForm"
						:model="qiyeBeianForm"
						:rules="rules"
						label-width="100px"
						:span="8"
					>
						<el-form-item label="企业名称" prop="qiye_name">
							<el-input
								v-model="qiyeBeianForm.qiye_name"
							></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input v-model="qiyeBeianForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="经营地址" prop="addr">
							<el-cascader
								v-model="selected_areas"
								size="large"
								:options="options"
								@change="handleChange(qiyeBeianForm)"
								@blur="addrBlur"
							></el-cascader>
						</el-form-item>
						<el-form-item label="注册基金" prop="reg_money">
							<el-input
								v-model="qiyeBeianForm.reg_money"
							></el-input>
						</el-form-item>
						<el-form-item label="法人代表" prop="legal_person">
							<el-input
								v-model="qiyeBeianForm.legal_person"
							></el-input>
						</el-form-item>
						<el-form-item
							label="工商注册码"
							prop="business_registration_num"
						>
							<el-input
								v-model="
									qiyeBeianForm.business_registration_num
								"
							></el-input>
						</el-form-item>
						<el-form-item class="btn-row">
							<el-button
								type="primary"
								@click="submitForm('qiyeBeianForm')"
							>
								提交备案
							</el-button>
							<el-button @click="resetForm('qiyeBeianForm')"
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
		name: "Form",
		data() {
			return {
				options: regionData,
				selected_areas: [],
				qiyeBeianForm: {
					qiye_name: "",
					business_registration_num: "",
					legal_person: "",
					addr: "",
					phone: "",
					reg_money: null
				},
				rules: {
					qiye_name: [
						{
							required: true,
							message: "请输入企业名称",
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
						{ required: true, message: "请填写法人", trigger: "blur" }
					],
					business_registration_num: [
						{
							required: true,
							message: "请填写工商注册码",
							trigger: "blur"
						},
						{ pattern: /^\d{6,}$/, message: "工商注册码格式不正确" }
					],
					reg_money: [
						{
							required: true,
							message: "请填写注册基金",
							trigger: "blur"
						},
						{ pattern: /^\d{3,}$/, message: "注册基金不正确" }
					]
				}
			};
		},
		methods: {
			addrBlur() {
				this.$refs.addOrder.validateField("addr");
			},
			handleChange(formName) {
				let loc = "";
				for (let i = 0; i < this.selected_areas.length; i++) {
					loc += CodeToText[this.selected_areas[i]];
				}
				formName.addr = loc;
			},
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						//alert('submit!')
						// this.$axios
						// 	.post("", this.qiyeBeianForm)
						// 	.then(function(resp) {
						// 		alert(resp);
						// 	});
						that.$message.success("备案成功");
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