<template>
          <!--v-else-->
          <el-form     
            @submit.native.prevent
            status-icon
            :model="reviewForm"
            :rules="rules"
            label-position="top"
            ref="reviewForm"
          >
            <!-- score -->
            <el-form-item prop="score" label="Score" class="is-required">
              <el-rate
                v-model="reviewForm.score"
                show-text
                id="score"
                :max="max"
                :texts="texts"
                :colors="colors"
              ></el-rate>
            </el-form-item>

            <!-- comment -->
            <el-form-item prop="comment" label="Comment">
              <el-input
                type="textarea"
                autosize
                v-model="reviewForm.comment"
                auto-complete="off"
                id="comment"
                placeholder="Your comment on this paper"
              ></el-input>
            </el-form-item>

            <!-- confidence -->
            <el-form-item prop="confidence" label="Confidence">
              <el-radio-group v-model="reviewForm.confidence">
                <el-radio-button label="Very low"></el-radio-button>
                <el-radio-button label="Low"></el-radio-button>
                <el-radio-button label="High"></el-radio-button>
                <el-radio-button label="Very High"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <br />

            <!-- submit button -->
            <el-form-item>
              <el-button
                native-type="submit"
                type="primary"
                v-on:click="Submit('reviewForm')"
                :disabled="reviewDisabled"
              >Submit Review Results</el-button>
            </el-form-item>
          </el-form>
</template>
<script>
export default {
    name: "ReviewPaper",
    props:['paper'],
    data(){
      return{
          reviewForm: {
            score: null,
            comment: "",
            confidence: ""
          },
          rules: {
            score: [
              {
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback(new Error("Score is required"));
                  }
                  callback();
                },
                trigger: "blur"
              }
            ],
            comment: [{ required: true, trigger: "blur" }],
            confidence: [{ required: true, trigger: "blur" }]
          },
          // el-rate
          texts: [
            " -2 ( reject )",
            " -1 ( week reject )",
            " 1 ( weak accept )",
            " 2 ( accept )"
          ],
          max: 4,
          colors: ["#99A9BF", "#F7BA2A", "#FF9900"]
      }      
    },
    computed: {
      reviewDisabled() {
        let tmp = this.reviewForm;
        return !tmp.score || tmp.comment == "" || tmp.confidence == "";
      }
    },
    methods:{
      Submit(formName) {
        let tmp = this.reviewForm;
        this.$axios
          .post("/SubmitReviewResult", {
            paperId: this.paper.id,
            score: tmp.score,
            comment: tmp.comment,
            confidence: tmp.confidence
          })
          .then(resp => {
            if (resp.status === 200) {            
              this.$message({
                dangerouslyUseHTMLString: true,
                type: "success",
                message: '<strong style="color:teal">Submit success!</strong>',
                center: true
              });
              this.reload();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
     created(){
       console.log(this.paper);
    //     // Edit
    //     if(this.paper !== undefined){
    //         this.paperForm = this.paper;
    //         this.isEdit = true;
    //         this.files[0].name = this.paperForm.title+".pdf";
    //         this.conferenceTopics = this.topics[0].topic.split(',');            
    //         this.paperForm.authors.sort(function(a, b){return a.orderOfAuthor - b.orderOfAuthor});
    //         return;
    //     }

    //     // First upload
    //     this.conferenceTopics = this.topics.split(',');        
    //     this.files=[];
     }
}
</script>