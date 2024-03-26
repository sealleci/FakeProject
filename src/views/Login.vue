<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">食品信息溯源系统</div>
			<el-form
				:model="loginForm"
				:rules="rules"
				ref="login"
				label-width="0px"
				class="ms-content"
			>
				<el-form-item prop="login_name">
					<el-input
						v-model="loginForm.login_name"
						placeholder="请输入电话或邮箱"
					>
						<template #prepend>
							<el-button class="icon-button">
								<unicon name="user" fill="gray"></unicon>
							</el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="login_pwd">
					<el-input
						:key="pwdType"
						:type="pwdType"
						placeholder="请输入密码"
						v-model="loginForm.login_pwd"
						@keyup.enter="submitForm()"
					>
						<template #prepend>
							<el-button class="icon-button">
								<unicon name="lock" fill="gray"></unicon>
							</el-button>
						</template>
						<template #append>
							<el-button class="icon-button" @click="togglePwd">
								<unicon
									name="eye"
									fill="gray"
									v-if="pwdType === ''"
								></unicon>
								<unicon
									name="eye-slash"
									fill="gray"
									v-if="pwdType === 'password'"
								></unicon>
							</el-button>
						</template>
					</el-input>
				</el-form-item>
				<SlideVerify
					status="slide_status"
					:successFun="slideSuccess"
					:errorFun="slideError"
				></SlideVerify>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm()"
						>登录</el-button
					>
				</div>
				<!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
			</el-form>
		</div>
	</div>
</template>

<script>
	import SlideVerify from "@/components/SlideVerify.vue";
	export default {
		components: { SlideVerify },
		data() {
			return {
				pwdType: "password",
				slide_status: false,
				loginForm: {
					login_name: "101",
					login_pwd: "123",
					name_type: 0
				},
				rules: {
					login_name: [
						{
							required: true,
							message: "请输入用户名",
							trigger: "blur"
						},
						{
							pattern: /^admin|\d{3,12}|[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
							message: "请输入电话和邮箱",
							trigger: "blur"
						}
					],
					login_pwd: [
						{ required: true, message: "请输入密码", trigger: "blur" }
					]
				}
			};
		},
		created() {
			this.$store.commit("clearTags");
		},
		methods: {
			togglePwd() {
				this.pwdType === "password"
					? (this.pwdType = "")
					: (this.pwdType = "password");
			},
			slideSuccess() {
				this.slide_status = true;
			},
			slideError() {
				this.slide_status = false;
			},
			submitForm() {
				let that = this;

				if (!this.slide_status) {
					this.$message.error("请划动认证");
					return false;
				}

				this.$refs.login.validate(valid => {
					if (valid) {
						this.loginForm.name_type = /^\d{3,20}$/.test(
							this.loginForm.login_name
						)
							? 0
							: 1;
						this.$axios
							.post("/api/login", this.loginForm)
							.then(function(resp) {
								let resp_data = resp["data"];
								console.log(resp_data);
								if (resp_data["status"] === 1) {
									console.log(resp_data["data"]);
									localStorage.setItem(
										"ms_username",
										resp_data["data"]["account_name"]
									);
									localStorage.setItem(
										"account_type",
										resp_data["data"]["account_type"]
									);
									localStorage.setItem(
										"account_id",
										resp_data["data"]["account_id"]
									);
									that.$message.success("登录成功");
									that.$router.push("/");
								} else {
									that.$message.error("登录失败");
								}
							})
							.catch(() => {});
					} else {
						this.$message.error("请输入账号和密码");
						return false;
					}
				});
			}
		}
	};
</script>

<style scoped>
	.icon-button {
		padding: 15px 10px;
	}
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../assets/img/login-bg.png);
		background-size: 100%;
	}
	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: black;
		border-bottom: 1px solid #ddd;
	}
	.ms-login {
		position: absolute;
		left: 45%;
		top: 45%;
		width: 450px;
		height: 340px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.6);
		overflow: hidden;
		box-shadow: 0 0 6px grey;
	}
	.ms-content {
		padding: 30px 30px;
	}
	.login-btn {
		text-align: center;
	}
	.login-btn button {
		width: 100%;
		height: 40px;
		margin-bottom: 10px;
		font-size: 18px;
	}
	.login-tips {
		font-size: 12px;
		line-height: 30px;
		color: #fff;
	}
	.jc-component__range {
		margin-bottom: 20px;
	}
</style>