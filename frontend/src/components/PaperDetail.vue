<template>
  <div id="base_paperview" v-title data-title="ArkChair - Paper View">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{paper.title}}</h1>
            <p class="lead mb-0">Paper Author names here (optional)</p>
          </div>
        </div>
      </div>
    </section>

    <div class="contentContainer">
      <section>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-12">
              <div>
                <h2>
                  <i class="el-icon-info"></i> Paper Info
                </h2>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-opportunity"></i> Title:
                  </span>
                  {{paper.title}}
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-fold"></i> Summary:
                  </span>
                  {{paper.summary}}
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-flag"></i> Status:
                  </span>
                  {{paper.status}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="row">
            <div class="col-xl-8 col-lg-8">
              <h2>
                <i class="el-icon-magic-stick"></i> This Paper in PDF
              </h2>

              <div class="row">
                <div>
                  <preview :id="paper.id">Preview</preview>
                </div>

                <div>
                  <download :id="paper.id" :title="paper.title">Download</download>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="isPC_MEMBER">
        <div class="col-xl-6 col-lg-6" >
          <h2>
            <i class="el-icon-upload2"></i> Paper submission
          </h2>

          <el-form
            @submit.native.prevent
            status-icon
            :model="reviewForm"
            :rules="rules"
            label-position="top"
            ref="reviewForm"
          >
            <!-- score -->
            <el-form-item prop="score" label="Score">
              <el-rate 
                v-model="reviewForm.score" 
                show-text 
                id="score"
                :max="max"
                :texts="texts"
              ></el-rate>
            </el-form-item>

            <!-- comment -->
            <el-form-item prop="comment" label="Comment">
              <el-input
                type="textarea"
                autosize
                v-model="reviewForm.comment"
                auto-complete="off"
                id="comment"
                placeholder="Your comment on this paper"
              ></el-input>
            </el-form-item>

            <!-- confidence -->
            <el-form-item prop="confidence" label="Confidence">
              <el-radio-group v-model="reviewForm.confidence">
                <el-radio-button label="Very low"></el-radio-button>
                <el-radio-button label="Low"></el-radio-button>
                <el-radio-button label="High"></el-radio-button>
                <el-radio-button label="Very High"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <br />

            <!-- submit button -->
            <el-form-item>
              <el-button
                native-type="submit"
                type="primary"
                v-on:click="Submit('reviewForm')"
              >Submit Review Results</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>

      <section v-if = "isAUTHOR">
        <p>Your goal:</p>
      </section>
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";
import download from "./DownloadPaper";
import preview from "./PreviewPaper"

export default {
  name: "PaperDetail",
  components: { navbar, footerbar,download,preview },
  data() {
    return {
      // Authorities
      isAUTHOR:false,
      isPC_MEMBER:false,

      // paper
      paper:{
        id:12,
        title:"liu",
        summary:"laghalkh",
        status:"hi",
      },
      texts:[" -2 ( reject )"," -1 ( week reject )"," 1 ( weak accept )"," 2 ( accept )"],
      max:4,
      reviewForm:{
        value:"",
        comment:"",
        score:"",
        confident:"",

      },
      rules:{

      }
       }
  },
  created(){
    this.$axios.post('/PaperAuthority',{
      paperId:this.$route.params.paperID
    })
    .then(resp=>{
      console.log(resp.data);
      if(resp.status === 200 && !resp.data.hasOwnProperty("message")){
        this.paper = resp.data.paper;
        switch(this.paper.url){
          case 'AUTHOR':
            this.isAUTHOR = true;
            break;
          case 'PC_MEMBER':
            this.isPC_MEMBER = true;
            break;            
        }
      }else{
        this.$router.go(-1);
        this.$message({
          dangerouslyUseHTMLString: true,
          type: "error",
          message:'<strong style="color:teal">Sorry! Your don\'t have the authority!</strong>',
          center: true
        });
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
  
};
</script>

<style scoped>
section {
  padding: 2em;
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
.onPageBtn {
  margin-left: 12px;
}
el-form-item {
  margin-bottom: 0;
}
</style>
