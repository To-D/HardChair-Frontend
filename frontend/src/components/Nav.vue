<template>
  <div id="base_application">
    <div class="navbar-container">
      <nav class="navbar navbar-expand-lg bg-white navbar-light" data-sticky="top">
        <div class="container">
          <a class="navbar-brand fade-page">
            <router-link to="/">ArkChair</router-link>
          </a>

          <div class="collapse navbar-collapse justify-content-end">
            <div class="py-2 py-lg-0">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link">
                    <router-link to="ConferenceApplication">Conference Application</router-link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">News</a>
                </li>
                <li>
                  <a class="nav-link">FAQ</a>
                </li>
                <li class="nav-item">
                  <div class="nav-link">
                    <router-link to="login">Sign in</router-link>
                  </div>
                </li>
                <li class="nav-item">
                  <div class="nav-link">
                    <router-link to="register">Register</router-link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {

    }
  },
  methods: {}
};
</script>

<style scoped>
</style>
