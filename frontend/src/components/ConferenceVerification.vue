<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Verification">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Verification</h1>
            <p
              class="lead mb-0"
            >After submission, your application will be reviewed by an admin. Thank you for your patience.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">

              <el-card shadow="hover" class="box-card" style="margin-top: 1em"
              v-for ="conference in conferences.slice((currentPage- 1)*pageSize,currentPage*pageSize)" :key="conference.id">
                <div slot="header" class="clearfix">
                  <span>{{conference.fullName}}</span>
              
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text" @click = "verify(conference,'false')"
                  >Reject</el-button>
                  <el-button
                    style="float: right; padding: 3px 0"
                    type="text" @click = "verify(conference,'true')"
                  >Pass</el-button>

                </div>
                <div>
                  <div>Application by: {{conference.owner}}</div>
                  <div>Short name: {{conference.nameAbbreviation}}</div>
                  <div>Full name:{{conference.fullName}}</div>
                  <div>Location: {{conference.location}}</div>
                  <div>Starts at: {{conference.startTime}}</div>
                  <div>Ends at: {{conference.endTime}}</div>
                  <div>Submission deadline: {{conference.deadline}}</div>
                  <div>Result announcement at: {{conference.resultAnnounceDate}}</div>
                </div>
              </el-card>

            </div>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-xl-6 col-lg-12">
            <el-pagination
            layout="prev, pager, next"
            :page-size = "pageSize" 
            @current-change="pageChange" 
            :current-page.sync="currentPage"
            :total="conferences.length"> 
           >
           </el-pagination>

          </div>
        </div>
      </div>
    </section>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "./Nav";
import footerbar from "./Footer";

export default {
  name: "ConferenceVerification",
  components: { navbar, footerbar },
  inject:['reload'],
  data() {
    return{
      conferences:[],
      pageSize:6,
      currentPage:1,
    }
  },
  methods: {
    pageChange(){
      this.currentPage = currentPage
    },
    // 审核
    verify(conference,isAllowed){
      this.$axios.post('/Verify',{
        id:conference.id,
        isAllowed:isAllowed
      })
      .then(resp =>{
        if(resp.status === 200){
          //审核成功刷新页面
          this.reload();
        }
      })
      .catch(error=>{
        console.log(error);
      })
    }
  },
  created(){
    // 请求数据操作
    this.$axios
    .get('/Verification',{})
    .then(resp => {
      if (resp.status === 200) {
        this.conferences = resp.data;
      } else {
        this.$message.error("Request Error.")
      }
    })
    .catch(error => {
      console.log(error);
      this.$message.error("Request Error.")
    })
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
</style>
