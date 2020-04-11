<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Home">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">My ArkChair Center</h1>
            <!-- <p
              class="lead mb-0"
            >Check out ongoing conferences here.</p>-->
          </div>
        </div>
      </div>
    </section>

    <!-- Just for logic development -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div>
              <h2>
                <i class="el-icon-info"></i> My Info
              </h2>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-user"></i> Username:
                </span>
                {{user.username}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-s-custom"></i> Real name:
                </span>
                {{user.fullname}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-office-building"></i> Organization:
                </span>
                {{user.organization}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-map-location"></i> Region:
                </span>
                {{user.region}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-message"></i> Email:
                </span>
                {{user.email}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

     <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-12">
            <div class="text item">
              <div v-if = "noMeeting"><el-card shadow="hover">No related conference now!</el-card></div>
              <el-card v-else
                shadow="hover"
                class="box-card"
                style="margin-top: 1em;"
                v-for="conference in conferences.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
                :key="conference.id"
              >
                <div slot="header" class="clearfix">
                  <span style="font-weight: bold">{{conference.nameAbbreviation}}</span>
                  <router-link :to="'conference-detail/'+conference.id" style="float: right; padding: 3px 0" >View details.</router-link>
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
                    {{conference.status}}
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
  name: "MyArkChair",
  components: { navbar, footerbar },
  data() {
    return {
      user: null,
      conferences: [],
      pageSize: 6,
      currentPage: 1,
      noMeeting: false
    };
  },
  methods: {
    pageChange() {
      this.currentPage = currentPage;
    }
  },
  created(){
     // Get information of conferences that relate to the present user 
     this.$axios
     .get('/Profile',{})
     .then(resp => {
       if (resp.status === 200) {
         console.log(resp.data);   
         this.user = resp.data[1];
         this.conferences = resp.data[0];
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
.itemlabel,
h2 {
  color: #3755be;
  font-weight: bold;
}
.infoitem {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
