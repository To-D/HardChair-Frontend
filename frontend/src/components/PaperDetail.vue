<template>
  <div id="base_paperview" v-title data-title="ArkChair - Paper View">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Paper Title here</h1>
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
                  This is the title of the paper
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-fold"></i> Summary:
                  </span>
                  This is the summary of the paper. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-flag"></i> Status:
                  </span>
                  STATUS
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
                  <el-button class="onPageBtn" type="primary">View PDF</el-button>
                </div>

                <div>
                  <el-button class="onPageBtn" type="primary">Download PDF</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
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
                max=4
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
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";

export default {
  name: "PaperDetail",
  components: { navbar, footerbar },
  data() {
    return {
      // user: {},
      // conferences: [],
      // pageSize: 6,
      // currentPage: 1,
      // noMeeting: false
      
      // 2. Paper review submit form
      paperForm: {
        score: null,
        comment: "",
        confidence: "",
        texts: ['-2: Reject', '-1: Weak reject', '1: Weak accept', '2: Accept']
      },
      rules: {
        score: [
          {
            required: true,
            message: "Your score of this paper is required",
            trigger: "blur"
          }
        ],
        comment: [
          {
            required: true,
            message: "Your comment on paper is required",
            trigger: "blur"
          },
          {
            max: 800,
            message: "Your comment can't be more than 800 characters",
            trigger: "change"
          }
        ],
        confidence: [
          {
            required: true,
            message: "Your confidence of this paper is required",
            trigger: "blur"
          }
        ],
      },
      loading: false
    };
  },
  methods: {
    // pageChange() {
    //   this.currentPage = currentPage;
    // },
    // parseStatus(status) {
    //   switch (status) {
    //     case "UNCHECKED":
    //       return "Waiting for verification";
    //       break;
    //     case "CHECKED":
    //       return "Approved by admin";
    //       break;
    //     case "SUBMIT_ALLOWED":
    //       return "Accepting papers";
    //       break;
    //     default:
    //       return "Currently unknown";
    //       break;
    //   }
    // }
  },
  created() {
    // Get information of conferences that relate to the present user
    // this.$axios
    //   .get("/Profile", {})
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       if (resp.data[1].length == 0) {
    //         this.noMeeting = true;
    //       } else {
    //         this.conferences = resp.data[1];
    //       }
    //       this.user = resp.data[0];
    //     } else {
    //       this.$message.error("Request Error.");
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
