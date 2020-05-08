<template>
    <el-form
        @submit.native.prevent
        status-icon
        :model="paper"
        :rules="rules"
        label-position="top"
        ref="paperForm"
        v-loading="loading"
    >
        <!-- title -->
        <el-form-item prop="title" label="Title">
            <el-input
                type="text"
                v-model="paper.title"
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
                v-model="paper.summary"
                auto-complete="off"
                id="summary"
                placeholder="Summary of your paper"
            ></el-input>
        </el-form-item>
        <!-- topic -->
        <el-form-item prop="topic" label="Topic" class="is-required">
            <el-checkbox-group 
                v-model="paper.topics" 
                v-if = "conference.topics"
            >
                <el-checkbox
                    v-for="topic in paper.topics.split(',')"
                    :key = "topic"
                    :label="topic"
                    border
                >
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>
                    
        <!-- author -->
        <el-form-item prop="author" label="Author" class="is-required">
            <el-button class="button-new-tag"  @click="showAddAuthorForm">+ New Author</el-button>
            <p v-if="paper.authors.length >0">Drag to sort</p>
            <draggable v-model="paper.authors">
                <el-card v-for="(author,index) in paper.authors" :key=index >                    
                    <div slot="header" class="clearfix">
                        <span>{{ (index+1) + (['st', 'nd', 'rd'][(index+1) &lt; 20 ? index : (index+1) % 10 - 1] || 'th')}} Author</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="deleteAuthor(index)">Delete</el-button>
                    </div>
                    <p>Name: {{author.name}}</p>
                    <p>Organization: {{author.organization}}</p>
                    <p>Region: {{author.region}}</p>
                    <p>Email: {{author.email}}</p>
                </el-card>
            </draggable>
        </el-form-item>
                    
        <el-form-item prop="file" label="Upload File" class="is-required">
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
                <div class="el-upload__tip" slot="tip">Please upload one PDF file only.</div>
            </el-upload>
        </el-form-item>                

        <!-- submit button -->
        <el-form-item>
            <el-button type="primary" v-on:click="Submit('paperForm')">Upload</el-button>
        </el-form-item>
    </el-form>                       
</template>

<script>

export default {
  name: "SubmitPaper",
  props:{
    paper:{
        title:"",
        summary:"",
        topics:[],
        authors:[],
    }
  },
  data(){
      return{
          dialogVisible:false,
          pdfUrl:""
      }
  },
  methods:{
      preview(){
      this.$axios({
        method:'post',
        url:'/DownloadPaper',
        data:{paperId:this.id},
        responseType: 'blob'
      })
      .then(resp=>{
        this.dialogVisible = true;
        let url = URL.createObjectURL(new Blob([resp.data]));
        this.pdfUrl = "/static/pdf/web/viewer.html?file="+encodeURIComponent(url);
      })
      .catch(error =>{
        console.log(error);
      })
    },
  }
};
</script>
