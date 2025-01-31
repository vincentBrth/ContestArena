<template>
  <div class="container mx-auto">
    <NavLoader
      type="dots"
      v-if="$store.getters['loader/visible']"
    ></NavLoader>
    <Nuxt v-else />
  </div>
</template>

<script>
export default {
  created() {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('debug');
    if (p) {
      p.split(',').forEach((element) => {
      this.$store.commit("advanced/addDebugMode", element.trim());
    });
    }
  },
  async fetch() {
    this.$store.commit("loader/setVisible", 1);
    try {
      // fetch player info if logged
      if (this.$fire.auth.currentUser !== null) {
        this.$fire.database
          .ref(`/users/${this.$fire.auth.currentUser.uid}`)
          .on("value", (snapshot) => {
            this.$store.commit("user/setUser", snapshot.val());
            this.$store.commit("loader/setVisible", -1);
          });
      } else {
        this.$store.commit("user/setUser", {});
        this.$store.commit("loader/setVisible", -1);
      }
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
