<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Detail">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{conference.nameAbbreviation}}</h1>
            <p class="lead mb-0">{{conference.fullName}}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-8">
            <div>
              <h2>
                <i class="el-icon-info"></i> Conference Info
              </h2>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-user-solid"></i> Application by:
                </span>
                {{conference.owner}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-chat-dot-round"></i> Short name:
                </span>
                {{conference.nameAbbreviation}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-chat-line-round"></i> Full name:
                </span>
                {{conference.fullName}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-location"></i> Location:
                </span>
                {{conference.location}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-video-play"></i> Starts at:
                </span>
                {{ parseDate(conference.startTime) }}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-video-pause"></i> Ends at:
                </span>
                {{parseDate(conference.endTime)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-date"></i> Submission deadline:
                </span>
                {{parseDate(conference.deadline)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-medal-1"></i> Result announcement at:
                </span>
                {{conference.resultAnnounceDate.substring(0,10)}}
              </div>
              <div class="infoitem">
                <span class="itemlabel">
                  <i class="el-icon-s-flag"></i> Status:
                </span>
                {{parseStatus(conference.status)}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section v-if= "notADMIN">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-8">
            <div>
              
              <div v-if = "isCHAIR && isCHECKED">
                <el-button
                @click = "startContribution()"
                >Start accepting papers</el-button>
                <br/>
                <br/>
              </div>

              <div v-if = "isCHAIR && (isCHECKED || isSUBMIT_ALLOWED || isFINISHED)">
                <el-button
                type="text"
                @click = "dialogFormVisible = true"
                >Invite PC_MEMBER</el-button>
                <br/>
                <br/>
              </div>

              <!-- dialog -->
              <el-dialog title="INVITE PC_MEMBERS FOR YOUR CONFERENCE" :visible.sync="dialogFormVisible">
                <el-form
                @submit.native.prevent
                status-icon
                :model="inviteForm"
                :rules="inviteRules"
                label-position="top"
                v-loading="loading"
                :ref="inviteForm"
              >
                <!-- user full name-->
                <el-form-item prop="fullName" label="fullName">
                  <el-input
                    type="text"
                    v-model="inviteForm.fullName"
                    auto-complete="off"
                    id="fullName"
                    placeholder="Full name of the user"
                  ></el-input>
                </el-form-item>

                <!-- submit button -->
                <el-form-item style="width: 100%">
                  <el-button
                    native-type="submit"
                    :disabled="isSearchDisabled"
                    type="primary"
                    style="width: 100%"
                    v-on:click="search(inviteForm)"
                  >Search</el-button>
                </el-form-item>
              </el-form>

              <!-- display table -->
               <el-table
               @selection-change="handleSelectionChange"
                :data="users"
                style="width: 100%"
                max-height="250">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="fullname"
                  label="FullName"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="E-mail"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="region"
                  label="Location"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="organization"
                  label="Organization"
                  width="150">
                </el-table-column>
              </el-table>
              <el-button v-if = 'searched'
                @click = "invite()"
                type="primary"
                size="small">
                INVITE
              </el-button>
              
              </el-dialog>

              <div v-if = "!isCHAIR && isSUBMIT_ALLOWED">
              <h2>
                <i class="el-icon-document"></i> Paper submission
              </h2>

              <el-form
                @submit.native.prevent
                status-icon
                :model="paperForm"
                :rules="rules"
                label-position="top"
                ref="paperForm"
              >
                <!-- short name -->
                <el-form-item prop="title" label="Title">
                  <el-input
                    type="text"
                    v-model="paperForm.title"
                    auto-complete="off"
                    id="title"
                    placeholder="Title of your paper"
                  ></el-input>
                </el-form-item>

                <!--full name -->
                <el-form-item prop="summary" label="Summary">
                  <el-input
                    type="textarea"
                    autosize
                    v-model="paperForm.summary"
                    auto-complete="off"
                    id="summary"
                    placeholder="Summary of your paper"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="file" label="Upload File">
                  <el-upload
                    ref = "upload"
                    drag
                    action=""
                    :auto-upload="false"
                    :limit = "1"
                    :http-request="upload"
                    accept="application/pdf"
                    :before-upload="onBeforeUpload"
                    :on-exceed="handleExceed"
                    :file-list="files"                    
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drag file here to upload，or <em>click here</em></div>
                    <div class="el-upload__tip" slot="tip">Only ""pdf" file admitted，please upload only 1 file</div>
                  </el-upload>
                </el-form-item>
                <br />

                <!-- submit button -->
                <el-form-item style="width: 100%">
                  <el-button
                    native-type="submit"
                    type="primary"
                    style="width: 100%"
                    v-on:click="Submit('paperForm')"
                  >Upload</el-button>
                </el-form-item>
              </el-form>
              </div>

            </div>
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
  name: "ConferenceDetail",
  components: { navbar, footerbar },
  inject: ["reload"],
  
  data() {
    //Validators
    const isInviteFormReady = (rule, value, callback) => {
      this.isSearchDisabled = this.inviteForm.fullName == "";
      callback();
    };

    return {
      isSearchDisabled:true,

      papers:[],
      authorities: [],
      conference: {},

      // authority
      notADMIN: true,
      isCHAIR: false,
      isPC_MEMBER: false,
      isAUTHOR: false,

      // conference status
      isCHECKED:false,
      isSUBMIT_ALLOWED:false,
      isFINISHED:false,

      // invite form
      dialogFormVisible: false,
      inviteForm:{
        fullName:""
      },
      inviteRules:{
        fullName: [
          {
            required: true,
            message: "Please Enter the full name",
            trigger: "blur"
          },
          { validator: isInviteFormReady, trigger: "change" }
        ]
      },
      users:[],
      searched: false,
      multipleSelection:[],

      // paper form
      paperForm: {
        title: "",
        summary: "",
      },
      rules: {
        title: [
          {required: true, message: "Title of paper is required",trigger: "blur"},
          {max:50,message:"Title can't be more than 50 characters",trigger: "change"}
        ],
        summary: [
          {required: true,message: "Summary of paper is required",trigger: "blur"},
          {max:800,message:"Summary can't be more than 800 characters",trigger: "change"}
        ],
      },
      loading: false,
      files:[],
    };
  },
  methods: {

    parseStatus(status) {
      switch (status) {
        case "CHECKED":
          return "Approved by admin";
          break;
        case "SUBMIT_ALLOWED":
          return "Accepting papers";
          break;
        default:
          return "Currently unknown";
          break;
      }
    },
    handleChange(val) {
      // console.log(val);
    },
     parseDate(timestamp) {
      if (timestamp == "") {
         return "N/A";
       } else {
         return timestamp.substring(0, 10);
       }
     },

    startContribution(){
      this.$axios
      .post('/ConferenceOpenSubmit',{
        conferenceId:this.conference.id
      })
      .then(resp =>{
        if(resp.status === 200){
          this.reload();
          this.$message({
          dangerouslyUseHTMLString: true,
          type:'success',
          message: '<strong style="color:teal">Your conference has started to accept papers!</strong>',
          center:true
        });
        }else{
          this.$message("Request Error!");
        }
      })
      .catch(error => {
        this.$message("Request Error!");
        console.log(error);
      })
    },

    search(formName){
       //In case of some bug, still validate before submit
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/SearchByFullName", {
              fullname:this.inviteForm.fullName
            })
            .then(resp => {
              // 根据后端的返回数据修改
              if (resp.status === 200) {
                this.users = resp.data;
                this.searched = true;
              } else {
                this.$message.error("Request Error!");
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error("Request Error!");
            });
        } else {
          this.$message.error("Wrong submit! Please check the form.");
        }
      });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    invite(){
      this.$axios
      .post('/DistributeAuthority',{
        conferenceId:this.conference.id,
        users:this.multipleSelection
      })
      .then(resp =>{
        if(resp.status === 200){
          this.inviteForm.fullName = "";
          this.users = [];
          this.$message({
            dangerouslyUseHTMLString: true,
            type:'success',
            message: '<strong style="color:teal">Invitation has been sent!</strong>',
            center:true
          });
        }else{
          this.$message("Request Error!");  
        }
      })
      .catch(error =>{
        this.$message("Request Error!");
        console.log(error);
      })
    },
    onBeforeUpload(file){
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        this.$message.error('Please upload a pdf file!');
      }
      return isPDF;
    },

    upload(params){
        var data = new FormData(); //创建form对象
        data.append('title',this.paperForm.title);
        data.append('summary',this.paperForm.summary);
        data.append('conferenceId',this.conference.id);
        data.append('file',params.file);

        var config = {
           headers:{'Content-Type':'multipart/form-data'}
          };  //添加请求头

        this.$axios.post('/SubmitPaper',data,config)
        .then(response=>{
          console.log(response.data);
          if(response.code==1){
            this.$message({
              type: "success",
              center: true,
              dangerouslyUseHTMLString: true,
              message:"<strong style='color:teal'>Submission successful!</strong>"
            });
          }
        })
        .catch(error => {
          console.log(error);
         })
    },
    handleExceed(){
      this.$message({
        type:'warning',
        message:"Can't upload more than 1 file!"
        })
    },

    Submit(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs['upload'].submit();
        } else {
          this.$message.error("Wrong submit! Please check the form.");
        }
      })
    },
  },
  
  created() {
    //获取会议信息
    this.$axios
      .post("/ConferenceDetails", {
        id: this.$route.params.conferenceID
      })
      .then(resp => {
        if (resp.status === 200) {
          this.papers = resp.data.paper;
          this.authorities = resp.data.authorities;
          this.conference = resp.data.conference;

          // Authority 
          //Don't display function part for ADMIN
          if(this.$store.state.userType == 'ADMIN'){ 
            this.notADMIN = false;
          }else{// Normal user
          let len = this.authorities.length;
            for(let i = 0; i < len; i++){
              switch(this.authorities[i].authority){
                case 'CHAIR':
                  this.isCHAIR = true;
                  break;
                case 'PC_MEMBER':
                  this.isPC_MEMBER = true;
                  break;
                case 'AUTHOR':
                  this.isAUTHOR = true;
                  break;
              }
            }
          }

          // Conference Status
          switch(this.conference.status){
            case 'CHECKED':
              this.isCHECKED = true;
              break;
            case 'SUBMIT_ALLOWED':
              this.isSUBMIT_ALLOWED = true;
              break;
            case 'FINISHED':
              this.isFINISHED = true;
              break;
          }

        }else{
          this.$message("Request Error");
        }
      })
      .catch(error => {
        console.log(error);
        this.$message("Request Error");
      });
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
