<template>
  <div id="base_login">
    <section class="row no-gutters min-vh-100 p-0">
      <div class="col-lg-4 bg-primary-3 d-flex justify-content-end">
        <img src="../assets/img/amiya.png" alt="Image" class="bg-image" />
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
              <h1 class="mb-1">Welcome back</h1>
              <span>Into the world of <router-link to="ConferenceApplication">ArkChair</router-link></span>
            </div>
            <el-form
              status-icon
              :model="loginForm"
              :rules="rules"
              class="login_container"
              label-position="left"
              label-width="0px"
              v-loading="loading"
            >

              <el-form-item prop="username" size="medium" >
                <el-input
                  size="medium"
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="Username"
                ></el-input>
              </el-form-item>

              <el-form-item prop="password" size="medium">
                <el-input
                  size="medium"
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="Password"
                ></el-input>
              </el-form-item>

              <el-form-item size="medium">
                <el-button
                  :disabled ="isDisabled"
                  size="medium"
                  type="primary"
                  style="width:100% "
                  v-on:click="login"
                >Sign In</el-button>
              </el-form-item>
            </el-form>
            <!-- <hr /> -->
            <div class="text-center text-small text-muted">
              <span>
                Don't have an account yet?
                <router-link to="register">Create one</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <el-form :model="loginForm"
             :rules="rules"
             class="login_container"
             label-position="left"
             label-width="0px"
             v-loading="loading">
      <h3 class="login_title">Login</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="password"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   style="width: 40%;background: #afb4db;border: none"
                   v-on:click="login">login</el-button>
        <router-link to="register">
          <el-button type="primary"
                     style="width: 40%;background: #afb4db;border: none">register</el-button>
        </router-link>
      </el-form-item>
    </el-form>-->
    <!-- <section class="min-vh-100 py-5">
      <div class="container">
        
        <div class="row justify-content-center mb-md-6">
          <div class="col-auto">
            ArkChair
          </div>
        </div>
        <div class="row justify-content-center pt-6">
          <div class="col-xl-4 col-lg-5 col-md-6">
            <div class="text-center mb-4">
              <h1 class="mb-1">Welcome back</h1>
              <span>Enter your account details below</span>
            </div>
            <el-form
              :model="loginForm"
              :rules="rules"
              class="login_container"
              label-position="left"
              label-width="0px"
              v-loading="loading"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn-block btn btn-primary" v-on:click="login">Sign In</el-button>
                <hr />
                <div class="text-center text-small text-muted">
                  <span>
                    Don't have an account yet?
                    <router-link to="register">Create one</router-link>
                  </span>
                </div>
              </el-form-item>
    </el-form>-->
    <!-- <form
              :model="loginForm"
              :rules="rules"
              class="login_container"
              label-position="left"
              label-width="0px"
              v-loading="loading"
            >
              <div class="form-group" prop="username">
                <input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="username"
                  class="form-control"
                />
              </div>
              <div class="form-group" prop="password">
                <input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="password"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <button v-on:click="login" class="btn-block btn btn-primary" type="submit">Sign in</button>
              </div>
              <hr />
              <div class="text-center text-small text-muted">
                <span>
                  Don't have an account yet?
                  <router-link to="register">Create one</router-link>
                </span>
              </div>
    </form>-->
    <!-- </div>
        </div>
      </div>
    </section>-->
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      const validateUsername=(rule,value,callback)=>{
        this.isUsernameValid = false;
        if (value === ''||!value) {
          callback(new Error('Username is required'));
        } else {
          let pattern = /^[a-zA-Z-][a-zA-Z0-9-_]{4,31}$/;
          if (!pattern.test(value )) {
            callback(new Error('Invalid username '));
          }else {
            this.isUsernameValid = true;
          }
        }
        callback();
        this.changeDisabled();
      }

      const validatePassword=(rule,value,callback)=>{
        this.isPasswordValid = false;
        if (value === ''|| !value) {
          callback(new Error('Password is required'));
        } else if(value.length < 6 || value.length > 32){
          callback(new Error('Password must be between 6 and 32 characters'));
        } else {
          this.isPasswordValid = true;
        }
        callback();
        this.changeDisabled();
      }

      return {
        isDisabled:true,
        isUsernameValid:false,
        isPasswordValid:false,
        loginForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [{validator:validateUsername, trigger:"change"}],
          password: [{validator:validatePassword, trigger:"change"}]
        },
        loading: false,
      };
    },

    methods: {
      login() {
        // Turn to loading mode when the form is submitted,and come back when getting response
        this.loading = true;
        this.$axios
          .post("/login", {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
              //Save token
              this.$store.commit("login", resp.data);
              this.$router.replace({ path: "/" });
            } else {
              this.errorNotification();
              this.loading = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.errorNotification();
            this.loading = false;
          });
      },

      //Control the "disable" attribution of the "sign in" button
      changeDisabled(){
       this.isDisabled = (!this.isUsernameValid) || (!this.isPasswordValid);
       },

      errorNotification(){
        this.$notify.error({
          title: 'Login error',
          message: 'Please check your username and password or try again later!'
        });
      },

      successNotification(){
        this.$notify.success({
          title:'Login successfully',
          message:'Jumping to the application page…'
        })
      }
    }
  };
</script>

<style scoped>
/* #base_login{
    background: url("../assets/background/checkerboard-cross.png") repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  } */
/* body{
    margin: 0px;
    padding: 0px;
  }
  .login_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #494e8f;
  } */
</style>
