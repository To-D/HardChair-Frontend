<template>
<div>
    <div v-if="papers.length == 0">
      <el-card shadow="hover">No paper now!</el-card>
    </div>
    <el-card
      v-else
      shadow="hover"
      class="box-card"
      style="margin-top: 1em;"
      v-for="paper in papers.slice((currentPage- 1)*pageSize,currentPage*pageSize)"
      :key="paper.id"
    >
      <p>
        <span class="itemlabel">
          <i class="el-icon-s-opportunity"></i> Title:
        </span>
        {{paper.title}}
      </p>
      <p>
        <span class="itemlabel">
          <i class="el-icon-s-fold"></i> Summary:
        </span>
        {{paper.summary}}
      </p>
      <p v-if="paper.createdTime">
        <span class="itemlabel">
          <i class="el-icon-date"></i> Upload date:
        </span>
        {{paper.createdTime.substring(0,10)}}
      </p>
      <!-- paper operation -->
      <preview :id="paper.id">Preview</preview>
      <download :id="paper.id" :title="paper.title"></download>
      <el-button @click="$router.push({path:'/paper/edit/'+paper.id}) ">Edit</el-button>
    </el-card>
    <div class="row">
      <div class="col-xl-6 col-lg-12">
        <el-pagination
          hide-on-single-page
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          :total="papers.length"
        >></el-pagination>
      </div>
    </div>
</div>
</template>

<script>
import download from "./DownloadPaper";
import preview from "./PreviewPaper";

export default {
  name: "ShowPapers",
  components:{download,preview},
  props:['conferenceId'],
  data(){
      return{
         pageSize: 2,
         currentPage: 1,
         papers:[],
      }
  },
  created(){
      this.$axios.post('/ReviewPapers',{
          conferenceId:this.conferenceId,
      })
      .then(resp=>{
          console.log(resp);
          this.papers = resp.data;
      })
      .catch(error=>{
          console.log(error);
      })
  },
};
</script>
