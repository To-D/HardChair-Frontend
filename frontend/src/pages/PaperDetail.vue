<template>
  <div id="base_paperview" v-title data-title="ArkChair - Paper View">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{paper.title}}</h1>
          </div>
        </div>
      </div>
    </section>

    <div class="contentContainer">
      <div class="container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Paper Info" name="info">
            <section>
              <div class="row">
                <div class="col-xl-8 col-lg-12">
                  <div>
                    <h2>
                      <em class="el-icon-info"></em> Paper Info
                    </h2>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-opportunity"></em> Title:
                      </span>
                      {{paper.title}}
                    </div>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-fold"></em> Summary:
                      </span>
                      {{paper.summary}}
                    </div>
                    <div class="infoitem" v-if="paper.topics">
                      <span class="itemlabel">
                        <em class="el-icon-price-tag"></em> Topics:
                      </span>
                      <el-tag :key="index" v-for="(topic,index) in paper.topics">{{topic}}</el-tag>
                    </div>
                    <div class="infoitem">
                      <span class="itemlabel">
                        <em class="el-icon-s-flag"></em> Status:
                      </span>
                      <span
                        v-if="paper.reviewResults && paper.reviewResults.length"
                      >Scores announced</span>
                      <span v-else>Wating for reviewing</span>
                    </div>
                    <div class="infoitem" v-if="paper.createdTime">
                      <span class="itemlabel">
                        <em class="el-icon-s-flag"></em> Created Time:
                      </span>
                      {{paper.createdTime.substring(0,10)}}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane label="This Paper in PDF" name="pdf">
            <section>
              <div class="row">
                <div class="col-xl-8 col-lg-8">
                  <h2>
                    <em class="el-icon-document-copy"></em> This Paper in PDF
                  </h2>

                  <div class="row">
                    <preview class="onPageBtn" v-if="paper.id" :id="paper.id">Preview</preview>

                    <download
                      class="onPageBtn"
                      v-if="paper.id && paper.title"
                      :id="paper.id"
                      :title="paper.title"
                    >Download</download>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isPC_MEMBER" label="Paper Review" name="review">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-upload2"></em> Paper Review
                  </h2>
                  <el-card
                    v-if="reviewResult && (reviewResult.confirm == 2 || reviewResult.confirm == 1 && paper.rebuttal =='')"
                    shadow="hover"
                  >You have reviewed this paper!</el-card>
                  <review v-else-if="paper.id" :reviewResult="reviewResult" :id="paper.id"></review>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isCHAIR || isPC_MEMBER" label="Forum" name="forum">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-document-checked"></em>Forum
                  </h2>

                  <div ref="reply_area">
                    <p ref="quote">Reply Area</p>
                    <br />
                    <p v-if="quoteContent">{{quoteContent}}</p>
                    <el-input
                      type="textarea"
                      autosize
                      size="medium"
                      v-model="postContent"
                      auto-complete="off"
                      maxlength="500"
                      show-word-limit
                      placeholder="Enter what you want to say"
                    ></el-input>
                    <el-button :disabled="submitDisable" @click="submitPost">Submit</el-button>
                  </div>

                  <br>

                  <div v-if="paper.posts">
                    <el-card
                      shadow="hover"
                      class="box-card"
                      style="margin-top: 1em;"
                      v-for="(post,index) in paper.posts.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
                      :key="index"
                    >
                      <!-- header -->
                      <div slot="header" class="clearfix">
                        <span>{{post.username}}</span>
                        <span style="float: right; padding: 3px 0">{{post.createdTime}}</span>
                      </div>

                      <div>{{post.postContent}}</div>

                      <el-button @click="reply(post)">Reply</el-button>
                    </el-card>
                  </div>

                  <br>

                  <el-pagination
                    hide-on-
                    single-page
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :current-page.sync="currentPage"
                    :total="paper.posts.length"
                  ></el-pagination>

                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isAUTHOR" label="My Results" name="result">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-document-checked"></em> My Results
                  </h2>
                  <div v-if="conferenceStatus !== 'OPEN_RESULT' && conferenceStatus !== 'OPEN_FINAL_RESULT'">
                    <el-card shadow="hover">Result hasn't been announced!</el-card>
                  </div>
                  <el-card
                    v-else
                    shadow="hover"
                    class="box-card"
                    style="margin-top: 1em;"
                    v-for="(result,index) in paper.reviewResults"
                    :key="index"
                  >
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-s-opportunity"></em> Comment:
                      </span>
                      {{result.comment}}
                    </p>
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-s-fold"></em> Confidence:
                      </span>
                      {{result.confidence}}
                    </p>
                    <p>
                      <span class="itemlabel">
                        <em class="el-icon-date"></em> Score：
                      </span>
                      {{result.score}}
                    </p>
                  </el-card>

                  <!-- rebuttal-->
                  <div v-if="displayRebuttal">
                    <el-input v-model="rebuttal"></el-input>
                    <el-button :disabled="rebuttalSubmitDisable" @click= "submitRebuttal"></el-button>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>

          <el-tab-pane v-if="isAUTHOR && conferenceStatus == 'SUBMIT_ALLOWED'" label="Edit paper" name="submission">
            <section>
              <div class="row">
                <div class="col-xl-6 col-lg-6">
                  <h2>
                    <em class="el-icon-upload2"></em> Edit paper
                  </h2>                  
                  <div>
                    <contribution
                      v-if="paper.conferenceId"
                      :paper="paper"
                      :topics="paper.nTopics"
                      :conferenceId="paper.conferenceId"
                    ></contribution>
                  </div>
                </div>
              </div>
            </section>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "../components/Nav";
import footerbar from "../components/Footer";
import download from "../components/DownloadPaper";
import preview from "../components/PreviewPaper";
import contribution from "../components/SubmitPaper";
import review from "../components/ReviewPaper";

export default {
  name: "PaperDetail",
  components: { navbar, footerbar, download, preview, contribution, review },  

  data() {
    return {
      // Authorities
      isAUTHOR: false,
      isPC_MEMBER: false,
      isCHAIR:false,

      // paper
      paper: {},
      activeName: "info",
      conferenceStatus: "",

      reviewResult: null,

      // paging
      pageSize: 6,
      currentPage: 1,

      postContent:"",
      quoteId:-1,
      quoteContent:"",

      rebuttal:"",
      displayRebuttal:false

    };
  },
  methods: {
    reply(post) {
      this.quoteId = post.id;
      this.quoteContent = post.username + " : " + post.postContent;
      this.$refs.reply_area.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
    },
    submitPost() {
      this.$axios
        .post("/SubmitPost", {
          postContent: this.postContent,
          paperId: this.paper.id,
          quoteId: this.quoteId
        })
        .then(resp => {
          if (resp.status === 200) {
            switch (resp.data.message) {
              case "success":
                this.notify("Reply successfully!","success");
                break;
              case "No Authority":
                this.notify("You don\'t hava the authority!","error");
                break;
              case "fail: conference status":
                this.notify("You cannot submit at this conference stage!","error");
                break;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.postContent = "";
      this.quoteContent = "";
      this.quoteId=-1;
    },
    submitRebuttal(){
      this.$confirm("Your hava only one chance. Your rebuttal is: \n"+this.rebuttal, "Confirm", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel"
      })
        .then(() => {
          this.$axios.post('/SubmitRebuttal',{
            rebuttalContent:this.rebuttal,
            paperId:this.paper.id
          })
          .then(resp=>{
            if(resp.status === 200){
              switch(resp.data.message){
                case "success":
                  this.notify("Your rebuttal has been submitted!","success");
                  break;
                case "No Authority":
                  this.notify("Sorry! Your don\'t have the authority!","error");
                  break;
                case "you have already submitted the rebuttal!":
                  this.notify("You have already submitted the rebuttal!","error");
                  break;
              }
            }
          })
        })
        .catch(error => {console.log(error)});
    },
    notify(content,format){
      this.$message({
        dangerouslyUseHTMLString: true,
        type: format,
        message:'<strong style="color:teal">'+content+'</strong>',
        center: true
      });      
    }
  },
  computed: {
    submitDisable() {
      return this.postContent == "";
    },
    rebuttalSubmitDisable(){
      return this.rebuttal == "";
    }
  },
  created() {    
    this.$axios
      .post("/PaperAuthority", {
        paperId: this.$route.params.paperID
      })
      .then(resp => {
        if (resp.status === 200 && !resp.data.hasOwnProperty("message")) {
          this.paper = resp.data;
          this.conferenceStatus = this.paper.nTopics[0].tag;
          this.paper.topics = this.paper.topics.split(",");
          // Get present pc's review result
          let len = this.paper.reviewResults.length;
          for (let i = 0; i < len; i++) {
            if (this.paper.reviewResults[i].pcMember) {
              this.reviewResult = this.paper.reviewResults[i];
            }
            if (this.paper.reviewResults[i].score < 0){
              this.displayRebuttal = this.paper.type=="OPEN_RESULT" && this.paper.rebuttal == "";
            }
          }

          switch (this.paper.url) {
            case "AUTHOR":
              this.isAUTHOR = true;
              break;
            case "PC_MEMBER":
              this.isPC_MEMBER = true;
              break;
            case "CHAIR":
              this.isCHAIR = true;
              break;
            case "CP":
              this.isCHAIR = true;
              this.isPC_MEMBER = true;
              break;
          }
        } else {
          this.$router.go(-1);
          this.$message({
            dangerouslyUseHTMLString: true,
            type: "error",
            message:
              '<strong style="color:teal">Sorry! Your don\'t have the authority!</strong>',
            center: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });      
  },
};
</script>

<style scoped>
section {
  padding: 0.5em;
}
.itemlabel,
h2 {
  color: #3755be;
  font-weight: bold;
}
.infoitem {
  margin-top: 1em;
  margin-bottom: 1em;
}
.contentContainer {
  padding: 2em;
}
.onPageBtn {
  margin-left: 12px;
}
.el-tag {
  margin-right: 5px;
}
.input-new-tag {
  width: 103px;
  margin-right: 5px;
  vertical-align: bottom;
}
.checkboxes {
  margin-right: 0;
}
</style>
