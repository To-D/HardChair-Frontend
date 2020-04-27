<template>
  <div id="base_verification" v-title data-title="ArkChair - Paper View">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Paper Title here</h1>
            <p
              class="lead mb-0"
            >Paper Author names here (optional)</p>
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
                    <i class="el-icon-user"></i> Title:
                  </span>
                  This is the title of the paper
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-s-custom"></i> Summary:
                  </span>
                  This is the summary of the paper
                </div>
              </div>
            </div>
          </div>
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
  name: "PaperView",
  components: { navbar, footerbar },
  data() {
    return {
    //   user: {},
    //   conferences: [],
    //   pageSize: 6,
    //   currentPage: 1,
    //   noMeeting: false
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
