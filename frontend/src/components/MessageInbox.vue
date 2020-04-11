<template>
  <div id="base_verification" v-title data-title="ArkChair - Message Inbox">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Message Inbox</h1>
            <!-- <p
              class="lead mb-0"
            ></p> -->
          </div>
        </div>
      </div>
    </section>

    <div v-if = "noMessage"><el-card shadow="hover">No conference now!</el-card></div>
    <section v-else>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">
              <el-card
                shadow="hover"
                class="box-card"
                style="margin-top: 1em;"
                v-for="message in messages.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
                :key="message.messageId"
              >
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold">{{message.type}}</span>

                  <el-button
                  v-if = "isInvitation(message.type)"
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="verify(message.id,'false')"
                  >REJECT</el-button>
                  <span style="float: right; padding: 3px 0">&nbsp;&nbsp;</span>
                  <el-button
                  v-if= "isInvitation(message.type)"
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="verify(message.id,'true')"
                  >AGREE</el-button>
                  <span style="float: right; padding: 3px 0">&nbsp;&nbsp;</span>
                </div>
                <div>
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-user-solid"></i> Content：
                    </span>
                    {{message.content}}
                  </div> 
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-chat-dot-round"></i> Sent Time:
                    </span>
                    {{message.sentTime.substring(0,10)}}
                  </div>
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-chat-line-round"></i> Status:
                    </span>
                    {{parseStatus(message.status)}}
                  </div>
                  <div>
                    <span class="itemlabel">
                      <i class="el-icon-location"></i> Type:
                    </span>
                    {{message.type}}
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
            :total="messages.length"> 
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
  name: "MessageInbox",
  components: { navbar, footerbar },
  inject: ["reload"],
  data() {
    return{
      messages:[],
      pageSize:6,
      currentPage:1,
      noMessage: false
    }
  },
  methods: {
     pageChange() {
       this.currentPage = currentPage;
     },
     parseStatus(status){
       if(status == 0){
         return "Has Read";
       }else{
         return "Hasn't Read";
       }
     },
     isInvitaion(type){
       if(type = "CONFERENCE_CHECKED"){
         return false;
       }else{
         return true;
       }
     },
     // Agree the invitation
     //agree(id,isAllowed){
       //this.$axios.post('/Verify',{
         //id:conference.id,
         //isAllowed:isAllowed
       //})
       //.then(resp =>{
    //     if(resp.status === 200){
    //       //审核成功刷新页面
    //       this.reload(); 
    //     }
    //   })
    //   .catch(error=>{
    //     console.log(error);
    //   })
     //}
  },
  created(){
     // Apply for message information
     this.$axios
     .get('/Message',{})
     .then(resp => {
        if (resp.status === 200) {
          if(resp.data.length == 0){
            this.noMessage = true;
          }else{
          this.messages = resp.data;
         }
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
.itemlabel {
  /* background-color: #3755be; */
  color: #3755be;
  font-weight: bold;
  /* padding: 0.1em 0.3em;
  margin-right: 0.3em; */
}
</style>
