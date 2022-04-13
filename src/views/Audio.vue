<template>
  <div id="audio">
    <el-table
      ref="multipleTable"
      :data="audioList"
      style="width: 100%"
      stripe
      height="350"
      :default-sort="{ prop: 'gmtModified', order: 'descending' }"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180" sortable>
      </el-table-column>
      <el-table-column
        prop="audioName"
        label="文件名"
        width="180"
      ></el-table-column>
      <el-table-column prop="audioSize" label="文件大小" width="180" sortable> </el-table-column>
      <el-table-column prop="transStatus" label="转写状态" sortable></el-table-column>
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
            @click="editAudioName(scope.$index, scope.row)"
            type="primary"
            >重命名</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button size="large" type="danger" @click="handleDelete"
      >删除选择的文件</el-button
    >
    <el-upload
  class="upload-audio"
  drag
  :action="postUrl"
  :data="postData">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传.mp3/.wav文件</div>
</el-upload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getDifferentArr from '../assets/js/util.js'
export default {
  name: "Audio",
  components: {},
  data() {
    return {
      audioList: [],
      multipleTable: [],
      postUrl:'http://localhost:8081/audio/saveAudio'
    };
  },
  computed:{
    ...mapGetters(["userId"]),
    postData(){
      return {'userId':this.userId};
    }
  },
  mounted() {
    this.getAudioList();
  },
  methods: {
    // editAudioName(index, row) {
    //   let ths = this;
    // },
    rowClick(row,col,event){
      console.log(row,col,event);
      let audioId=row.id;
      this.$router.push('/audioTrans/'+audioId);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getAudioList() {
      let ths = this;
      const path = "/audio/getAudioInfoByUserId/" + ths.userId;
      ths.axios
        .get(path)
        .then((res) => {
          console.log(res);
          if (res.data["status"] == 200) {
            const data = res.data.data;
            ths.audioList = data;
          } else {
            ths.$message({
              message: "获取音频文件失败",
              type: "error",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDelete() {
      let ths = this;
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
          "/audio/deleteAudioById",
          { params },
          { headers: { "content-type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          if (res.data["status"] == 200) {
            // 更新audioList
            ths.audioList = getDifferentArr(ths.audioList,ths.multipleSelection);
            ths.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            ths.$message({
              message: "删除失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>