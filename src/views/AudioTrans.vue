<template>
  <div id="audioTrans">
    <div id="audio-header">
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <span>{{ audioTrans.audioName }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="btn-bar">
      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <div class="">
            <el-select
              v-model="selectedSpeakers"
              placeholder="请选择说话人"
              multiple
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in speakers"
                :key="index"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="">
            <el-select
              v-model="selectedHotWord"
              placeholder="请选择热词"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in hotwords"
                :key="index"
                :label="item.title"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="">
            <el-select
              v-model="selectedKeyWord"
              placeholder="请选择关键词"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in keyWords"
                :key="index"
                :label="item.title"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="btns">
            <div v-if="disabled">
              <el-button type="primary" @click="editResult">编辑文字</el-button>
              <el-button
                v-if="audioTrans.transStatus == 0"
                type="primary"
                @click="transAudio"
                >转写</el-button
              >
              <el-button
                v-else-if="audioTrans.transStatus == 1"
                type="primary"
                disabled
                >转写中</el-button
              >
              <el-button
                v-else-if="audioTrans.transStatus == 2"
                type="primary"
                @click="transAudio"
                >重新转写</el-button
              >
            </div>
            <div v-else>
              <el-button type="primary" @click="saveEdit">保存</el-button>
              <el-button type="danger" @click="cancelEdit">不保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="hotWords-bar">
      <el-row>
        <el-col :span="3"><span>热词</span></el-col>
        <el-col :span="3"
          ><span>{{ hotWord.title }}:</span></el-col
        >
        <el-col :span="12">
          <el-tag
            type="info"
            v-for="(item, index) in hotWordContent"
            :key="index"
            >{{ item }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="sensitiveWords-bar">
      <el-row>
        <el-col :span="3"><span>敏感词</span></el-col>
        <el-col :span="3"
          ><span>{{ hotWord.title }}:</span></el-col
        >
        <el-col :span="12">
          <el-tag
            type="info"
            v-for="(item, index) in hotWordContent"
            :key="index"
            >{{ item }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
     <el-divider></el-divider>
    <div id="keywords-bar">
      <el-row>
        <el-col :span="3"><span>关键词</span></el-col>
        <el-col :span="15">
          <el-tag
            type="info"
            v-for="(item, index) in realKeywords"
            :key="index"
            >{{ item.Word }}</el-tag
          >
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="trans-content">
      <el-row v-for="(item, index) in audioResult" :key="index">
        <el-col :span="6">
          <span class="speaker">{{ item.speaker }} :</span>
        </el-col>
        <el-col :span="18" class="words">
          <div @click="clickText(item, index)" v-if="disabled" :id="index">
            <span>{{ item.onebest }}</span>
          </div>
          <div v-else>
            <el-input
              :disabled="disabled"
              type="textarea"
              autosize
              v-model="item.onebest"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <div id="audio-bar">
      <audio
        ref="audio"
        :src="audioUrl"
        controls
        @timeupdate="onTimeUpdate"
      ></audio>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AudioTrans",
  components: {},
  data() {
    return {
      realKeywords:[],
      audioTrans: {},
      transResult: {},
      audioResult: {},
      sensitiveResult: [],
      hotWord: {},
      keyWord: {},
      speakers: [],
      selectedSpeakers: [],
      disabled: true,
      hotwords: [],
      keyWords: [],
      selectedHotWord: {},
      selectedKeyWord: {},
      ALiOSSHost: this.$store.state.configure.ALiOSSHost,
      currClickedText: null, //当前被点击的文字代表的elment对象
    };
  },
  mounted() {
    this.getAudioTransInfo();
    this.getHotWords();
    this.init();
  },
  computed: {
    ...mapGetters(["userId"]),
    audioId() {
      return this.$route.params.audioId;
    },
    hotWordContent() {
      return this.hotWord.words.split(",");
    },
    keyWordContent() {
      return this.keyWord.words.split(",");
    },
    audioUrl() {
      return this.ALiOSSHost + this.audioTrans.audioPath;
    },
  },
  watch: {
    selectedSpeakers() {
      //
    },
  },
  methods: {
    clickText(item, index) {
      //音频跳到对应的时间
      let audio = this.$refs.audio;
      let begin = item.bg / 1000;
      // let end=item.ed/1000;
      audio.currentTime = begin;
      //修改上一次被点击的text的style
      if (this.currClickedText != null) {
        this.currClickedText.style.color = "black";
      }
      //同时被点击文字高亮显示
      let text = document.getElementById(index);
      text.style.color = "blue";
      this.currClickedText = event;
    },
    //用户拖动音频播放条，修改播放时间
    onTimeUpdate() {
      let audio = this.$refs.audio;
      let currTime = audio.currentTime * 1000; //单位 毫秒
      console.log(currTime);
      for (let i = 0; i < this.audioResult.length; i++) {
        let begin = this.audioResult[i].bg;
        let end = this.audioResult[i].ed;
        console.log(begin, end);
        if (begin <= currTime && currTime < end) {
          //修改上一次被点击的text的style
          if (this.currClickedText != null) {
            this.currClickedText.style.color = "black";
          }
          //修改对应时间处的text的样式
          let text = document.getElementById(i);
          text.style.color = "blue";
          this.currClickedText = text;
          console.log(text);
          break;
        }
      }
    },
    transAudio() {},
    editResult() {
      this.disabled = false;
    },
    cancelEdit() {
      this.audioResult = JSON.parse(
        JSON.stringify(this.transResult.audio_result)
      );
      this.disabled = true;
    },
    saveEdit() {
      const tmp = this.transResult;
      this.transResult.audio_result = JSON.parse(
        JSON.stringify(this.audioResult)
      );
      this.axios
        .put("/audio/updateAudioInfo", {
          audioId: this.audioId,
          transResult: JSON.stringify(this.transResult),
          audioName: this.audioTrans.audioName,
        })
        .then((res) => {
          if (res.data["status"] == 200) {
            this.disabled = true;
            this.$message({
              message: "保存成功",
              type: "success",
              center: true,
            });
          } else {
            this.$message({
              message: "保存失败",
              type: "error",
              center: true,
            });
            this.transResult = tmp;
          }
        })
        .catch((err) => {
          this.transResult = tmp;
          console.error(err);
        });
    },
    getAudioTransInfo() {
      this.axios
        .get("/audio/getAudioInfoById/" + this.audioId)
        .then((res) => {
          if (res.data["status"] == 200) {
            const data = res.data.data;
            this.audioTrans = data.audioTrans;
            this.hotWord = data.hotWord;
            this.keyWord = data.keyWord;
            //提取关键词
            let keywords=JSON.parse(this.audioTrans.keywords);
            this.realKeywords=keywords.Keywords;
            //解析transResult
            let transResult = this.audioTrans.transResult;
            let result = JSON.parse(transResult);
            this.transResult = result;
            //深克隆对象
            this.audioResult = JSON.parse(JSON.stringify(result.audio_result));
            this.sensitiveResult = JSON.parse(
              JSON.stringify(result.sensitive_result)
            );
          } else {
            this.$message({
              message: "获取音频转写信息失败",
              type: "error",
              center: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getHotWords() {
      const path = "/word/getAllHotWordInfoByUser/" + this.userId;
      this.axios
        .get(path)
        .then((res) => {
          if (res.data["status"] == 200) {
            const data = res.data.data;
            //根据type分成hotword和keyword
            for (let i = 0; i < data.length; i++) {
              if (data[i].type == 0) {
                this.hotwords.push(data[i]);
              } else {
                this.keyWords.push(data[i]);
              }
            }
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
    //初始化一些属性
    init() {
      // if(this.hotWord!=null){
      //   this.selectedHotWord=this.hotWord;
      //   console.log(this.selectedHotWord,this.hotWord.title)
      // }
    },
  },
};
</script>

<style lang="sass" scoped>
.speaker
  padding-right: 0px

.words
  padding-left: 1px
</style>