<template>
  <div id="base_application">
    <el-form :model="applicationForm" :rules="rules"  label-position="left"  label-width="0px" v-loading="loading" :ref="applicationForm">
      <h3>会议申请</h3>

      <el-form-item prop="nameAbbreviation">
        <label for = "nameAbbreviation">Abbreviation</label>
        <el-input type="text" v-model="applicationForm.nameAbbreviation"
                  auto-complete="off" id = "nameAbbreviation" placeholder="Enter the abbreviation of your conference"></el-input>
      </el-form-item>

      <el-form-item prop="fullName">
        <label for = "fullName">Full name</label>
        <el-input type="text" v-model="applicationForm.fullName"
                  auto-complete="off" id = "fullName" placeholder="Enter the full name of your conference"></el-input>
      </el-form-item>

      <el-form-item prop="place">
        <label for = "place">Place</label>
        <el-input type="text" v-model="applicationForm.place"
                  auto-complete="off" id = "place" placeholder="Enter the place you'll hold the conference"></el-input>
      </el-form-item>

      <el-form-item prop="time">
        <label for = "time">Time</label>
        <el-input type="text" v-model="applicationForm.time"
                  auto-complete="off" id = "time" placeholder="Enter the time you'll hold the conference"></el-input>
      </el-form-item>

      <el-form-item prop="deadline">
        <label for = "deadline">Deadline</label>
        <el-input type="text" v-model="applicationForm.deadline"
                  auto-complete="off" id="deadline" placeholder="Enter the contribution deadline."></el-input>
      </el-form-item>

      <el-form-item prop="resultAnnounceDate">
        <label for = "resultAnnuoceDate">Result announce date</label>
        <el-input type="text" v-model="applicationForm.resultAnnounceDate"
                  auto-complete="off" id="resultAnnuoceDate" placeholder="Enter the date of announcing the result"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="apply(applicationForm)">apply</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ConferenceApplication',
    data () {
      const dataValid = (rule, value, callback) => {
        if(!value || value === '') {
          return callback(new Error('Can\'t be empty'))
        }
        return callback()
      }

      return {
        applicationForm: {
          nameAbbreviation: '',
          fullName: '',
          place: '',
          time: '',
          deadline:'',
          resultAnnouceDate:''
        },
        rules: {
          // blur 失去鼠标焦点时触发验证
          nameAbbreviation: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          fullName: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          place: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          time: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          deadline: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}],
          resultAnnouceDate: [{required: true, message: '', trigger: 'blur'}, {validator: dataValid, trigger: 'blur'}]
        },
        loading: false
      }
    },
    methods: {
      apply(formName){
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$axios.post('/ConferenceApplication', {
                nameAbbreviation: this.applicationForm.nameAbbreviation,
                fullName: this.applicationForm.fullName,
                time: this.applicationForm.time,
                place: this.applicationForm.place,
                deadline:this.applicationForm.deadline,
                resultAnnouceDate:this.applicationForm.resultAnnouceDate
              }
            )
              .then(resp => {
                // 根据后端的返回数据修改
                if(resp.status === 200 && resp.data.hasOwnProperty("id")) {
                  // 跳转到login
                  alert('Your application is now being audited.Please wait in patient')
                  this.$router.replace('/login')
                } else{
                  alert('response error')
                }
              })
              .catch(error => {
                console.log(error)
                alert('application error')
              })
          } else {
            alert('wrong submit')
          }
        })
      }
    }
  }
</script>
