<template>
  <div id="hotWord">
    <el-table
      ref="multipleTable"
      :data="hotwords"
      style="width: 100%"
      stripe
      height="250"
      :default-sort="{ prop: 'gmtModified', order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180" sortable>
      </el-table-column>
      <el-table-column
        prop="title"
        label="词组名"
        width="180"
      ></el-table-column>
      <el-table-column prop="words" label="内容" width="180"> </el-table-column>
      <el-table-column prop="wordNum" label="词语数量" sortable>
      </el-table-column>
      <el-table-column
        label="类型"
        :filters="[
          { text: '热词', value: 0 },
          { text: '敏感词', value: 1 },
        ]"
        :filter-method="filterType"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">热词</span>
          <span v-else>敏感词</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="180" sortable>
      </el-table-column>
      <el-table-column
        prop="gmtModified"
        label="上一次更新时间"
        width="180"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button size="large" @click="handleAdd" type="primary">新增</el-button>
    <el-button size="large" type="danger" @click="handleDelete"
      >删除选择的词组</el-button
    >
    <HotWordDialog
      :dialog-form-visible="dialogFormVisible"
      :form="form"
      :open-type="openType"
      @save="addOrEdit"
      @cancel="cancelDialog"
    ></HotWordDialog>
  </div>
</template>

<script>
import {getDifferentArr} from '../assets/js/util'
import { mapGetters } from "vuex";
import HotWordDialog from "@/components/HotWordDialog";
export default {
  name: "HotWord",
  components: { HotWordDialog },
  data() {
    return {
      hotwords: [],
      dialogFormVisible: false,
      openType: "",
      form: {},
      multipleSelection: [],
    };
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  mounted() {
    this.getHotWords();
  },
  methods: {
    getHotWords() {
      const path = "/word/getAllHotWordInfoByUser/" + this.userId;
      this.axios
        .get(path)
        .then((res) => {
          if (res.data["status"] == 200) {
            const data = res.data.data;
            this.hotwords = data;
          } else {
            this.$message({
              message: "获取热词信息失败",
              type: "error",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleEdit(index, row) {
      this.openType = "edit";
      this.form = row;
      this.dialogFormVisible = true;
    },
    handleDelete() {
      let ids = "";
      const len=this.multipleSelection.length;
      for (let i=0;i<len;i++) {
        console.log(this.multipleSelection[i]);
        ids += this.multipleSelection[i].id+',';
      }
      const params = new URLSearchParams();
      params.append('ids',ids);
      this.axios
        .delete(
          "/word/deleteHotWord",
          { params },
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (res.data["status"] == 200) {
            // 更新hotwords
            this.hotwords = getDifferentArr(this.hotwords,this.multipleSelection);
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleAdd() {
      this.openType = "add";
      this.dialogFormVisible = true;
    },
    addOrEdit(form) {
      this.dialogFormVisible = false;
      if (this.openType === "add") {
        form.userId = this.userId;
        this.axios
          .post("/word/saveHotWordGroup", form)
          .then((res) => {
            let msg = "新增失败";
            if (res.data["status"] == 200) {
              msg = "新增成功";
            }
            this.$message({
              message: msg,
              type: "success",
              center: true,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.axios
          .put("/word/updateHotWordInfo", form)
          .then((res) => {
            let msg = "编辑失败";
            if (res.data["status"] == 200) {
              msg = "编辑成功";
            }
            this.$message({
              message: msg,
              type: "success",
              center: true,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    cancelDialog() {
      this.dialogFormVisible = false;
    },
    filterType(value, row) {
      return row.type === value;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>