<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Home">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Conference Home</h1>
            <p
              class="lead mb-0"
            >Check out ongoing conferences here.</p>
          </div>
        </div>
      </div>
    </section>

    <p v-if = "noMeeting">No conference now！</p>
    
    <!-- Just for logic development -->
    <section v-else>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">

              <el-card shadow="hover" class="box-card" style="margin-top: 1em"
              v-for ="conference in conferences.slice((currentPage- 1)*pageSize,currentPage*pageSize)" :key="conference.id">

                <div slot="header" class="clearfix">
                  <span>{{conference.fullName}}</span>
                  <router-link :to="'conference-detail/'+conference.id" >View details.</router-link>
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
                  <div>Status: {{conference.status}}</div>
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
     <!--Just for logic development -->

    <!-- Oringin code -->
    <!--<section>
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8">
            <div v-for="o in 4" :key="o" class="text item">
              <el-card class="box-card" style="margin-top: 1em">
                {{'Conference ' + o }} -
                <router-link to = "/conference-detail/conference.id">View details.</router-link>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8"></div>
        </div>
      </div>
    </section>-->
    
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
  },
  created(){
    // 获取会议列表
    this.$axios
    .get('/ShowConferences',{})
    .then(resp => {
      if (resp.status === 200) {
        console.log(resp.data);
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
        /*//合并两个数组: 用大的去包含小的，减少运算量
        if(checked.length > submitAllowed.length){
          checked.push.apply(checked,submitAllowed);
          this.conferences = checked;
        }else{
          submitAllowed.push.apply(submitAllowed,checked);
          this.conferences = submitAllowed;
        }*/
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
</style>
