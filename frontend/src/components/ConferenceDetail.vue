<template>
  <div id="base_verification" v-title data-title="ArkChair - Conference Detail">
    <navbar></navbar>

    <section class="bg-primary header-inner p-0 jarallax position-relative o-hidden" data-overlay>
      <div class="container py-0 layer-2">
        <div class="row my-4 my-md-6 text-light">
          <div class="col-lg-9 col-xl-6">
            <h1 class="display-4">{{conference.nameAbbreviation}}</h1>
            <p class="lead mb-0">{{conference.fullName}}</p>
            <br>
            <el-button class="lead mb-0" v-if = "seeChangeAuthority" @click="seeChooseAuthority = true">Change Authority</el-button>
          </div>
        </div>

      </div>
    </section>

    <div class="contentContainer">
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
                    <i class="el-icon-user-solid"></i> Owner:
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
                    <i class="el-icon-price-tag"></i> Topics:
                  </span>
                  <el-tag
                  :key="index"
                  v-for="(topic,index) in conference.topics.split(',')"
                  >
                {{topic}}
                </el-tag>
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
                  <span v-if = "conference.startTime">
                  {{conference.startTime.substring(0, 10) }}
                  </span>
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-video-pause"></i> Ends at:
                  </span>
                  <span v-if = "conference.endTime">
                  {{conference.endTime.substring(0, 10)}}
                  </span>
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-date"></i> Submission deadline:
                  </span>
                  <span v-if = "conference.deadline">
                  {{conference.deadline.substring(0, 10)}}
                  </span>
                </div>
                <div class="infoitem">
                  <span class="itemlabel">
                    <i class="el-icon-medal-1"></i> Result announcement at:
                  </span>
                  <span v-if = "conference.resultAnnounceDate">
                  {{conference.resultAnnounceDate.substring(0,10)}}
                  </span>
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

      <section v-if="notADMIN">
        <div class="container">
          <div class="row">
            <div v-if="isCHAIR" class="col-xl-8 col-lg-8">

              <h2 v-if="isCHECKED || isSUBMIT_ALLOWED || isFINISHED">
                <i class="el-icon-magic-stick"></i> Conference Operations
              </h2>

              <div class="row">
                <div v-if="isCHECKED">
                  <el-button
                    class="onPageBtn"
                    type="primary"
                    @click="startContribution()"
                  >Start accepting papers</el-button>
                </div>

                <div v-if="isCHECKED || isSUBMIT_ALLOWED|| isFINISHED">
                  <el-button
                    class="onPageBtn"
                    type="primary"
                    @click="dialogFormVisible = true"
                  >Invite PC member</el-button>
                </div>

                <div v-if="isCHECKED || isSUBMIT_ALLOWED || isFINISHED">
                  <el-button
                    class="onPageBtn"
                    type="primary"
                    @click="updateInvitation()"
                  >See current PC members</el-button>
                </div>

                <div v-if="isSUBMIT_ALLOWED">
                  <el-button
                    class="onPageBtn"
                    type="primary"
                    @click="startReview()"
                  >Start review</el-button>
                </div>

                <!-- Invite dialog -->
                <el-dialog
                  title="Invite PC members to your conference"
                  :visible.sync="dialogFormVisible"
                >
                  <el-form
                    @submit.native.prevent
                    status-icon
                    :model="inviteForm"
                    :rules="inviteRules"
                    :inline="true"
                    label-position="left"
                    v-loading="loading"
                    :ref="inviteForm"
                    hide-required-asterisk
                  >
                    <!-- user full name-->
                    <el-form-item prop="fullName" label="Search user by their real names:">
                      <el-input
                        type="text"
                        v-model="inviteForm.fullName"
                        auto-complete="off"
                        id="fullName"
                        placeholder="Real name of the user"
                      ></el-input>
                    </el-form-item>

                    <!-- submit button -->
                    <el-form-item>
                      <el-button
                        native-type="submit"
                        :disabled="isSearchDisabled"
                        type="primary"
                        style="width: 100%"
                        v-on:click="search(inviteForm)"
                      >Search</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button v-if="searched"  @click="invite()" type="primary">Invite</el-button>
                    </el-form-item>
                  </el-form>

                  <!-- display table -->
                  <el-table
                    @selection-change="handleSelectionChange"
                    :data="users"
                    style="width: 100%"
                    max-height="250"
                  >
                    <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column fixed prop="fullname" label="Real name" width="150"></el-table-column>
                    <el-table-column prop="email" label="E-mail" width="150"></el-table-column>
                    <el-table-column prop="region" label="Region" width="150"></el-table-column>
                    <el-table-column prop="organization" label="Organization" width="150"></el-table-column>
                  </el-table>
                </el-dialog>

                <!-- Look for current pc_members -->
                <el-dialog
                  title="See current PC member"
                  :visible.sync="dialogMemberTableVisible"
                >
                  <!-- pc_members display table -->
                  <el-table
                    @selection-change="handleSelectionChange"
                    :data="pcMembers"
                    style="width: 100%"
                    max-height="250"
                  >
                    <el-table-column fixed prop="fullname" label="Real name" width="130"></el-table-column>
                    <el-table-column prop="email" label="E-mail" width="130"></el-table-column>
                    <el-table-column prop="region" label="Region" width="130"></el-table-column>
                    <el-table-column prop="organization" label="Organization" width="130"></el-table-column>
                    <el-table-column
                      prop="password"
                      label="Status"
                      width="130"
                      :filters="[{ text: 'UNREAD', value: 'UNREAD' },{ text: 'ACCEPT', value: 'ACCEPT' }, { text: 'REJECT', value: 'REJECT' }]"
                      :filter-method="filterTag"
                      filter-placement="bottom-end">
                      <template slot-scope="scope">
                        <el-tag
                          :type="handleType(scope.row.password)"
                          disable-transitions>{{scope.row.password}}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-dialog>
              </div>
            </div>

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

              <div v-if = "isAUTHOR">
                <h2><i class="el-icon-document"></i>Papers you have contributed</h2>
                <el-card 
                shadow="hover"
                class="box-card"
                style="margin-top: 1em;"
                v-for="paper in papers.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
                :key="paper.id"
                >
                <p>
                  <span class="itemlabel">
                    <i class="el-icon-s-opportunity"></i> Title:
                  </span>{{paper.title}}</p>
                <p>                  
                  <span class="itemlabel">
                    <i class="el-icon-s-fold"></i> Summary:
                  </span>{{paper.summary}}</p>
                <p v-if = "paper.createdTime">                  
                  <span class="itemlabel">
                    <i class="el-icon-date"></i> Upload date:
                  </span>{{paper.createdTime.substring(0,10)}}</p>
                </el-card>                               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Choose Authority -->
    <el-dialog
      title="Choose Authority"
      :visible.sync="seeChooseAuthority"
      width="50%"
      :show-close="false"
      :close-on-click-modal = "false"
      :close-on-press-escape = "false"
    >
    <p>You have more than 1 authority in this conference, choose one to enter</p>
    <el-radio-group v-model="chooseAuthority" @change="changeAuthority">
      <el-radio 
      border
      v-for="authority in authorities"
      :key="authority.id"
      :label="authority.authority"
      >
      {{authority.authority}}
      </el-radio>
    </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="seeChooseAuthority = false" :disabled = "hasChosen">Enter</el-button>
      </span>
    </el-dialog>

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
      notADMIN: true,
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
      if(val == 'PC_MEMBER'){
        this.isPC_MEMBER = true;
        this.isAUTHOR = false;
      }
      if(val == 'AUTHOR'){
        this.isPC_MEMBER = false;
        this.isAUTHOR = true;
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
              // 根据后端的返回数据修改
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

  created() {
    //获取会议信息
    this.$axios
      .post("/ConferenceDetails", {
        id: this.$route.params.conferenceID
      })
      .then(resp => {
        if (resp.status === 200) {
          this.papers = resp.data.papers;
          this.authorities = resp.data.authorities;
          this.conference = resp.data.conference;

          // Authority
          //Don't display function part for ADMIN
          if (this.$store.state.userType == "ADMIN") {
            this.notADMIN = false;
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
  },
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
