<template>
	<div class="container">
		<el-row :gutter="20" type="flex" justify="space-between">
			<el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
				<el-timeline>
					<el-timeline-item timestamp="2021/1/1" placement="top" color="#0bbd87">
						<el-card>
							<h4>养殖场</h4>
							<p>甲县</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2021/2/2" placement="top" color="#0bbd87">
						<el-card>
							<h4>屠宰场</h4>
							<p>甲县</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2021/3/3" placement="top" color="#0bbd87">
						<el-card>
							<h4>批发场</h4>
							<p>甲县</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
			</el-col>
			<el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9" class="qr-side">
				<el-card class="qr-body" :body-style="{ padding: '15px 15px 5px 15px' }">
					<div id="qrCode" ref="qrCode"></div>
					<div style="text-align: center; padding-top: 15px">
						<span>二维码</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import QRCode from "qrcodejs2";

export default {
	data() {
		return {};
	},
	methods: {
		qrcode(w, h, url) {
			this.$nextTick(() => {
				this.$refs.qrCode = new QRCode("qrCode", {
					text: url,
					width: w,
					height: h,
					colorDark: "#0bbd87"
				});
			});
		}
	},
	mounted() {
		this.qrcode(150, 150, "114514");
	}
};
</script>

<style scoped>
.qr-side {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>