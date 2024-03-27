<template>
	<div class="container">
		<el-table :data="tuzai_import_list" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column prop="date" label="日期" sortable width="150">
			</el-table-column>
			<el-table-column prop="person_name" label="姓名" sortable width="100">
			</el-table-column>
			<el-table-column prop="tanwei_id" label="摊位号" sortable width="100">
			</el-table-column>
			<el-table-column prop="pig_num" label="头数" sortable width="100">
			</el-table-column>
			<el-table-column prop="is_jianyi" label="是否检疫" width="100" sortable :formatter="isJianyi"></el-table-column>
			<el-table-column prop="import_addr" label="地址"> </el-table-column>

			<el-table-column label="操作">
				<template #default="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tuzai_import_list: [
				{
					date: "2016-05-02",
					person_name: "王小虎",
					import_addr: "乙市迎宾大道101号",
					tanwei_id: 1,
					pig_num: 20,
					is_jianyi: true
				},
				{
					date: "2016-05-02",
					person_name: "王小虎",
					import_addr: "乙市迎宾大道101号",
					tanwei_id: 1,
					pig_num: 20,
					is_jianyi: true
				},
				{
					date: "2016-05-02",
					person_name: "王小虎",
					import_addr: "乙市迎宾大道101号",
					tanwei_id: 1,
					pig_num: 20,
					is_jianyi: true
				},
				{
					date: "2016-05-02",
					person_name: "王小虎",
					import_addr: "乙市迎宾大道101号",
					tanwei_id: 1,
					pig_num: 20,
					is_jianyi: false
				}
			]
		};
	},
	methods: {
		isJianyi(row, column) {
			column;
			return row.is_jianyi ? "是" : "否";
		}
	}
};
</script>
