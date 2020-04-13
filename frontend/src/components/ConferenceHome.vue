<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Home">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Home</h1>
            <p class="lead mb-0">Check out ongoing conferences here.</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">
              <div v-if = "noMeeting"><el-card shadow="hover">No conference now!</el-card></div>
              <el-card v-else
                shadow="hover"
                class="box-card"
                style="margin-top: 1em;"
                v-for="conference in conferences.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
                :key="conference.id"
              >
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold">{{conference.nameAbbreviation}}</span>
                  <router-link :to="'conference-detail/'+conference.id" style="float: right; padding: 3px 0" >View details</router-link>
                </div>
                <div>
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-chat-line-round"></i> Full name:
                    </span>
                    {{conference.fullName}}
                  </div>
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-s-flag"></i> Status:
                    </span>
                    {{parseStatus(conference.status)}}
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-xl-6 col-lg-12">
            <el-pagination
            hide-on-single-page
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
  name: "ConferenceHome",
  components: { navbar, footerbar },
  data() {
    return{
      conferences:[],
      pageSize:6,
      currentPage:1,
      noMeeting: false
    }
  },
  methods: {
    pageChange(){
      this.currentPage = currentPage
    },
    parseStatus(status){
      switch (status) {
        case "CHECKED":
          return "Approved by admin"
          break;
        case "SUBMIT_ALLOWED":
          return "Accepting papers"
          break;
        default:
          return "Currently unknown"
          break;
      }
    }
  },
  created(){
    // 获取会议列表
    this.$axios
    .get('/ShowConferences',{})
    .then(resp => {
      if (resp.status === 200) {
        let checked = resp.data.CHECKED;
        let submitAllowed = resp.data.SUBMIT_ALLOWED;
        //返回数据为空，提示无会议进行中
        if(checked.length == 0 && submitAllowed == 0){
          this.noMeeting = true;
        }else if(checked ==0 && submitAllowed !== 0){
          this.conferences = submitAllowed
        }else if(checked !== 0 && submitAllowed == 0){
          this.conferences = checked;
        }else{
          submitAllowed.push.apply(submitAllowed,checked);
          this.conferences = submitAllowed;
        }      
      } else {
        this.$message.error("Request Error.")
      }
    })
    .catch(error =>{
      console.log(error);
    })
  }
};
</script>

<style scoped>
section {
  padding: 2em;
}
.itemlabel {
  color: #3755be;
  font-weight: bold;
}
</style>
