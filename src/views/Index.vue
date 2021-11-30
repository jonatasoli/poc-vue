<template>
  <MinimalLayout theme="light">
    <div class="landing-page-wrapper">
      <!-- Hero and Navbar -->
      <div class="hero rounded-hero is-active">
        <!-- Navbar partial -->
        <LandingNavigation />
      </div>
    </div>
    <div class="container column is-6">
      <div class="is-primary">
         <page :screen="screen" />
      </div>
    </div>
  </MinimalLayout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { API } from "@/core/api";

import Page from "/src/components/simbiose/Page.vue";
import MinimalLayout from "/src/components/vuero/layouts/MinimalLayout.vue";
import LandingNavigation from "/src/components/vuero/partials/landing/LandingNavigation.vue"


@Options({
  name: "Index",
  components: {
    Page,
    MinimalLayout,
    LandingNavigation,
  },
  data() {
    return {
      screen: {},
      allScreens: [],
    };
  },
  methods: {
    handleClick(url) {
      this.$router.push({ path: url });
    },
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
})
export default class Index extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async beforeCreate() {
    this.$store.dispatch("loadRoutes");

    // Get user and set on localstorage
    const user = {
      current_user_organization: 1,
      current_user: 1,
      current_api_user: 1,
    };

    localStorage.setItem("user", JSON.stringify(user));

    this.allScreens = await API.client.get("/screens");
    [this.screen] = this.allScreens;
  }
}
</script>

<style scoped lang="scss"></style>
