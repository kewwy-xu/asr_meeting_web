<template>
  <div class="HotWordDialog">
    <el-dialog :visible.sync="visible" :before-close="beforeClose">
      <el-form :model="form">
        <el-form-item
          label="ID"
          v-if="openType == 'edit'"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="词组名" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.words"
            autocomplete="off"
            type="textarea"
            autosize
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="0">热词</el-radio>
          <el-radio v-model="form.type" :label="1">关键词</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HotWordDialog",
  props: ["dialogFormVisible", "form", "openType"],
  data() {
    return {
      formLabelWidth: "80px",
      visible: this.dialogFormVisible,
    };
  },
  watch: {
    dialogFormVisible() {
      this.visible = this.dialogFormVisible;
    },
  },
  methods: {
    submitEdit() {
      this.visible = false;
      this.$emit("save", this.form);
    },
    cancel() {
      this.visible = false;
      this.$emit("cancel");
    },
    beforeClose(){
      this.visible=false;
      this.$emit("cancel");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>