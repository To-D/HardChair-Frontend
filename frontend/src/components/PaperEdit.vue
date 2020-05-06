<template>
  <div id="base_verification" v-title data-title="ArkChair - Paper Edit">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">Submit your paper</h1>
            <p class="lead mb-0">{{conference.nameAbbreviation}}</p>
            <br>
            <!-- <el-button class="lead mb-0" v-if = "seeChangeAuthority" @click="seeChooseAuthority = true">Change Authority</el-button> -->
          </div>
        </div>

      </div>
    </section>

    <div class="contentContainer">

      <section v-if="!isADMIN">
        <div class="container">
          <div class="row">

            <div class="col-xl-6 col-lg-6" v-if="!isCHAIR && isSUBMIT_ALLOWED">
              <h2>
                <i class="el-icon-upload2"></i> Paper submission
              </h2>

              <el-form
                @submit.native.prevent
                status-icon
                :model="paperForm"
                :rules="rules"
                label-position="top"
                ref="paperForm"
              >
                <!-- title -->
                <el-form-item prop="title" label="Title">
                  <el-input
                    type="text"
                    v-model="paperForm.title"
                    auto-complete="off"
                    id="title"
                    placeholder="Title of your paper"
                  ></el-input>
                </el-form-item>

                <!-- summary -->
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
                    ref="upload"
                    drag
                    action
                    :auto-upload="false"
                    :limit="1"
                    :http-request="upload"
                    accept="application/pdf"
                    :before-upload="onBeforeUpload"
                    :on-exceed="handleExceed"
                    :file-list="files"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      Drag file here to upload，or
                      <em>click here</em>
                    </div>
                    <div
                      class="el-upload__tip"
                      slot="tip"
                    >Please upload one PDF file only.</div>
                  </el-upload>
                </el-form-item>
                <br />

                <!-- submit button -->
                <el-form-item >
                  <el-button
                    native-type="submit"
                    type="primary"
                    v-on:click="Submit('paperForm')"
                  >Upload</el-button>
                </el-form-item>
              </el-form>
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
  name: "PaperEdit",
  components: { navbar, footerbar },
  inject: ["reload"],

  data() {
    dialogVisible = true;
    src = "C:\\Users\\12444\\Desktop\\learning materialsliu1588568942119.pdf"
    //Validators
    const isInviteFormReady = (rule, value, callback) => {
      this.isSearchDisabled = this.inviteForm.fullName == "";
      this.users = [];
      callback();
    };

    return {
      // Conference Information
      papers: [],
      authorities: [],
      conference: {},
      pcMembers:[],
      isCHECKED: false,
      isSUBMIT_ALLOWED: false,
      isFINISHED: false,

      // Visitor authority
      isADMIN: false,
      isCHAIR: false,
      isPC_MEMBER: false,
      isAUTHOR: false,

      // Choose Authority
      hasChosen:true,
      chooseAuthority:'',
      seeChooseAuthority:false,
      seeChangeAuthority:false,
      isSearchDisabled: true,

      // Paper paging
      pageSize: 6,
      currentPage: 1,

      // show Pc_member dialog
      dialogMemberTableVisible: false,


      /** Form data **/
      // 1. Search & invite form
      dialogFormVisible: false,
      inviteForm: {
        fullName: ""
      },
      inviteRules: {
        fullName: [
          {
            required: true,
            message: "Please enter the real name",
            trigger: "blur"
          },
          { validator: isInviteFormReady, trigger: "change" }
        ]
      },
      users: [],
      searched: false,
      multipleSelection: [],
      inviteUsers:[],

      // 2. Paper submit form
      paperForm: {
        title: "",
        summary: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Title of paper is required",
            trigger: "blur"
          },
          {
            max: 50,
            message: "Title can't be more than 50 characters",
            trigger: "change"
          }
        ],
        summary: [
          {
            required: true,
            message: "Summary of paper is required",
            trigger: "blur"
          },
          {
            max: 800,
            message: "Summary can't be more than 800 characters",
            trigger: "change"
          }
        ]
      },
      loading: false,
      files: [],
    };
  },
  methods: {
    // Show information
    pageChange() {
      this.currentPage = currentPage;
    },

    parseStatus(status) {
      switch (status) {
        case "CHECKED":
          return "Approved by admin";
          break;
        case "SUBMIT_ALLOWED":
          return "Accepting papers";
          break;
        case "UNCHECKED":
          return "Waiting for verification";
          break;
        default:
          return "Currently unknown";
          break;
      }
    },

    // 1. Change visitor authority
    changeAuthority(val){
      switch(val){
        case 'CHAIR':
          this.isCHAIR = true;
          this.isPC_MEMBER = false;        
          this.isAUTHOR = false;
          break;
        case 'PC_MEMBER':
          this.isPC_MEMBER = true;
          this.isCHAIR = false;        
          this.isAUTHOR = false;
          break;
        case 'AUTHOR':
          this.isAUTHOR = true;
          this.isCHAIR = false;
          this.isPC_MEMBER = false;        
          break;
      }
      this.hasChosen = false;
    },

    // 2. Start contribution
    startContribution() {
      this.$axios
        .post("/ConferenceOpenSubmit", {
          conferenceId: this.conference.id
        })
        .then(resp => {
          if (resp.status === 200) {
            this.reload();
            this.$message({
              dangerouslyUseHTMLString: true,
              type: "success",
              message:
                '<strong style="color:teal">Your conference has started to accept papers!</strong>',
              center: true
            });
          } else {
            this.$message("Request Error!");
          }
        })
        .catch(error => {
          this.$message("Request Error!");
          console.log(error);
        });
    },

    // 3. Search & Invite PC_MEMBER
    search(formName) {
      //In case of some bug, still validate before submit
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/SearchByFullName", {
              fullname: this.inviteForm.fullName,
              conferenceId:this.conference.id
            })
            .then(resp => {
              if (resp.status === 200) {
                if(resp.data.length != 0){
                  this.users = resp.data;                
                  this.searched = true;
                }else{
                  this.$message("No result!");  
                }
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
    invite() {
      let len =  this.multipleSelection.length;
      if(len > 0){
        for(let i = 0; i< len; i++){
          this.inviteUsers.push(this.multipleSelection[i].id);
        }
        this.$axios
          .post("/DistributeAuthority", {
            conferenceId: this.conference.id,
            users: this.inviteUsers
          })
          .then(resp => {
            if (resp.status === 200) {
              this.searched = false;
              this.inviteForm.fullName = "";
              this.users = [];
              this.$message({
                dangerouslyUseHTMLString: true,
                type: "success",
                message:
                  '<strong style="color:teal">Invitation has been sent!</strong>',
                center: true
              });
            } else {
              this.$message("Request Error!");
            }
          })
          .catch(error => {
            this.$message("Request Error!");
            console.log(error);
          });
      }else{
        this.$message("Please choose at least one user !")
      }
    },

    // 4. Upload paper
    onBeforeUpload(file) {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        this.$message.error("Please upload a pdf file!");
      }
      return isPDF;
    },
    upload(params) {
      var data = new FormData(); //创建form对象
      data.append("title", this.paperForm.title);
      data.append("summary", this.paperForm.summary);
      data.append("conferenceId", this.conference.id);
      data.append("file", params.file);
      var config = {
        headers: { "Content-Type": "multipart/form-data" }
      }; //添加请求头

      this.$axios
        .post("/SubmitPaper", data, config)
        .then(resp => {
          if (resp.status === 200) {
            this.reload();
            this.$message({
              type: "success",
              center: true,
              dangerouslyUseHTMLString: true,
              message:
                "<strong style='color:teal'>Submission successful!</strong>"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "Can't upload more than 1 file!"
      });
    },
    Submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs["upload"].submit();
        } else {
          this.$message.error("Wrong submit! Please check the form.");
        }
      });
    },

    // 6. See PC_MEMBER 
    updateInvitation(){
      this.$axios.post('/FindInvitationStatus',{
        conferenceId:this.conference.id
      })
      .then(resp => {
        if(resp.status === 200){
          this.pcMembers = resp.data;
        }else{
          this.$message.error("Request Error");
        }
      })
      .catch(error =>{
        this.$message.error("Request Error");
        console.log(error);
      })
      this.dialogMemberTableVisible = true;
    },
    // Invitation Status Tag
    handleType(tag){
      switch(tag){
        case 'UNREAD':
          return 'info';
          break;
        case 'ACCEPT':
          return 'success';
          break;
        case 'REJECT':
          return 'danger';
      }
    },
    filterTag(value, row) {
        return row.password === value;
      },
    
    // 7. Start Review
    startReview(){
      this.$axios.post('/OpenReview',{
        conferenceId : this.conference.id,
        //strategy : this.strategy
      })
    }
  },

  /*created() {
    this.$axios
      .post("/RevisePaper", {
        id: this.$route.params.paperID
      })
      .then(resp => {
        if (resp.status === 200) {
          this.papers = resp.data.papers;
          this.authorities = resp.data.authorities;
          this.conference = resp.data.conference;

          // Authority
          //Don't display function part for ADMIN
          if (this.$store.state.userType == "ADMIN") {
            this.isADMIN = true;
          } else {
            // Normal user
            let len = this.authorities.length;
            for (let i = 0; i < len; i++) {
              switch (this.authorities[i].authority) {
                case "CHAIR":
                  this.isCHAIR = true;
                  break;
                case "PC_MEMBER":
                  this.isPC_MEMBER = true;
                  break;
                case "AUTHOR":
                  this.isAUTHOR = true;
                  break;
              }
            }
          }

          // Conference Status
          switch (this.conference.status) {
            case "CHECKED":
              this.isCHECKED = true;
              break;
            case "SUBMIT_ALLOWED":
              this.isSUBMIT_ALLOWED = true;
              break;
            case "FINISHED":
              this.isFINISHED = true;
              break;
          }
          
        if(this.authorities.length > 1){
          this.seeChooseAuthority = true;
          this.seeChangeAuthority = true;
        }
        } else {
          this.$message("Request Error");
        }
      })
      .catch(error => {
        console.log(error);
        this.$message("Request Error");
      });
  },*/
};
</script>

<style scoped>
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
.el-tag {
    margin-right: 5px;
  }
</style>
