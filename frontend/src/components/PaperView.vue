<template>
  <div id="base_verification" v-title data-title="ArkChair - Paper View">
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
          <pdf :src="pdfUrl"></pdf>
          <!-- <div class="pdfTitle">
            <el-button size="small" @click="changePdfPage(0)">上一页</el-button> -->
            <!--currentPage当前页数 pageCount总页数-->

            <!-- <span>{{currentPage}}/{{pageCount}}</span>
            <el-button size="small" @click="changePdfPage(1)">下一页</el-button>
          </div>
          <pdf
            :src="pdfUrl"
            ref="ref"
            class="pdf"
            :page="currentPage"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler"
          ></pdf> -->
        </div>
      </section>
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";
import pdf from "vue-pdf";

export default {
  name: "PaperView",
  components: { navbar, footerbar, pdf },
  data() {
    return {
      // pdfUrl: "../assets/test.pdf",
      // currentPage: 1,
      // pageCount: 0

      //   user: {},
      //   conferences: [],
      //   pageSize: 6,
      //   currentPage: 1,
      //   noMeeting: false
    };
  },
  methods: {
    // preview(row) {
    //   //createLoadingTask方法，参数为pdf的文件地址，此方法可返回pdf文件的一些参数，例如页码总数，等；会返回一个promise对象；
    //   this.pdfUrl = pdf.createLoadingTask(this.fileUrl + row.magazinePdfPath);

    //   this.pdfUrl
    //     .then(pdf => {
    //       //拿到pdf的总页码数
    //       this.pageCount = pdf.numPages;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   this.pdfDialog = true; //弹框开关
    // },
    // //加载第一页，参数event必传，不然会报错
    // loadPdfHandler(e) {
    //   this.currentPage = 1;
    // },
    // changePdfPage(val) {
    //   if (val == 0 && this.currentPage > 1) {
    //     this.currentPage--;
    //   }
    //   if (val == 1 && this.currentPage < this.pageCount) {
    //     this.currentPage++;
    //   }
    // }

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
    this.pdfUrl = pdf.createLoadingTask("www.fdsm.fudan.edu.cn/En/en.pdf");
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
