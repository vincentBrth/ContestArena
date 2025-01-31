<template>
  <nav v-if="!$store.getters['loader/visible']" class="block fixed inset-x-0 top-0 z-20 py-3 px-3 w-full" :class="[theme_bg, theme_text]">
    <div class="flex items-center justify-between">
      <div v-if="!isHome()" class="flex justify-center text-2xl cursor-pointer material-symbols-outlined w-8"
        @click.prevent="$router.push('/')">
        home
      </div>
      <div v-else class="w-8"></div>
      <div class="flex px-4 text-xl cursor-pointer capitalize">
        {{ title }}
      </div>
      <NavMenu v-if="!isIdentification()" class="flex w-8 justify-center" :theme_text="theme_text"></NavMenu>
      <div v-else class="w-8"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      default: "NA",
      type: String,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_bg: {
      default: "bg-neutral-lightest",
      type: String,
    },
  },
  methods: {
    isHome() {
      return this.$nuxt.$route.path === "/";
    },
    isIdentification() {
      return this.$nuxt.$route.path === "/identification" && !this.$fire.auth.currentUser;
    },
  },
};
</script>
