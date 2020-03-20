<template>
  <div id="base_register">
    <section class="row no-gutters min-vh-100 p-0">
      <div class="col-lg-4 bg-primary-3 d-flex justify-content-end">
        <img src="../assets/img/sora.png" alt="Image" class="bg-image" />
        <div class="divider divider-vertical d-none d-lg-block">
          <svg
            width="100%"
            height="100%"
            version="1.1"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 C66.6666667,83.3333333 100,66.6666667 100,50 C100,33.3333333 66.6666667,16.6666667 0,0 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
      
      <div class="col px-5 position-relative d-flex align-items-center">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <div class="text-center mb-4">
              <h1 class="mb-1">Register</h1>
              <span>Into the world of <router-link to="ConferenceApplication">ArkChair</router-link></span>
            </div>
            <el-form
              :model="registerForm"
              :rules="rules"
              class="register_container"
              label-position="left"
              label-width="0px"
              v-loading="loading"
              :ref="registerForm"
            >
              <el-form-item prop="username" size="medium">
                <el-input size="medium"
                  type="text"
                  v-model="registerForm.username"
                  auto-complete="off"
                  placeholder="Username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password" size="medium">
                <el-input size="medium"
                  type="password"
                  v-model="registerForm.password"
                  auto-complete="off"
                  placeholder="Password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="email" size="medium">
                <el-input size="medium"
                  type="email"
                  v-model="registerForm.email"
                  auto-complete="off"
                  placeholder="E-mail"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item prop="fullname">
                <el-input
                  type="text"
                  v-model="registerForm.fullname"
                  auto-complete="off"
                  placeholder="Full name"
                ></el-input>
              </el-form-item> -->
              <el-form-item prop="organization" size="medium">
                <el-input size="medium"
                  type="organization"
                  v-model="registerForm.organization"
                  auto-complete="off"
                  placeholder="Organization"
                ></el-input>
              </el-form-item>
              <el-form-item prop="region" size="medium">
                <el-input size="medium"
                  type="region"
                  v-model="registerForm.region"
                  auto-complete="off"
                  placeholder="Region"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item prop="usertype">
                <el-radio-group v-model="registerForm.usertype" @change="userTypeChange">
                  <el-radio label="Admin">Admin</el-radio>
                  <el-radio label="Contributor">Contributor</el-radio>
                  <el-radio label="Reviewer">Reviewer</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-form-item style="width: 100%">
                <el-button size="medium"
                  type="primary"
                  style="width:100%"
                  v-on:click="register(registerForm)"
                >Register</el-button>
              </el-form-item>
              <!-- <hr /> -->
              <div class="text-center text-small text-muted">
                <span>
                  Already have an account?
                  <router-link to="login">Sign in</router-link>
                </span>
              </div>
            </el-form>

            
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const dataValid = (rule, value, callback) => {
      if (!value || value === "") {
        return callback(new Error("Can't be empty"));
      }

      return callback();
    };
    return {
      registerForm: {
        username: "",
        password: "",
        fullname: "",
        usertype: ""
      },
      rules: {
        // blur 失去鼠标焦点时触发验证
        username: [
          { required: true, message: "Username is required", trigger: "blur" },
          { validator: dataValid, trigger: "blur" }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          { validator: dataValid, trigger: "blur" }
        ],
        email: [
          { required: true, message: "Your e-mail is required", trigger: "blur" },
          { type: 'email', message: "Please insert a vaild e-mail address", trigger: "blur" },
          { validator: dataValid, trigger: "blur" }
        ],
        // fullname: [
        //   { required: true, message: "Your full name is required", trigger: "blur" },
        //   { validator: dataValid, trigger: "blur" }
        // ],
        organization: [
          { required: true, message: "Your organization is required", trigger: "blur" },
          { validator: dataValid, trigger: "blur" }
        ],
        region: [
          { required: true, message: "Your region is required", trigger: "blur" },
          { validator: dataValid, trigger: "blur" }
        ],
        // usertype: [
        //   { required: true, message: "Please choose a user type", trigger: "blur" },
        //   { validator: dataValid, trigger: "blur" }
        // ]
      },
      loading: false
    };
  },
  methods: {
    userTypeChange() {},
    register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/register", {
              username: this.registerForm.username,
              password: this.registerForm.password,
              fullname: this.registerForm.fullname,
              authorities: [this.registerForm.usertype]
            })
            .then(resp => {
              // 根据后端的返回数据修改
              if (resp.status === 200 && resp.data.hasOwnProperty("id")) {
                // 跳转到login
                alert("successful registration");
                this.$router.replace("/login");
              } else {
                alert("register error");
              }
            })
            .catch(error => {
              console.log(error);
              alert("register error");
            });
        } else {
          alert("wrong submit");
        }
      });
    }
  }
};
</script>

<style scoped>
/* #base_register{
    background: url("../assets/background/checkerboard-cross.png") repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  } */
/* .register_container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
} */
</style>
