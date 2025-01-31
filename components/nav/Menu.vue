<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="relative inline-block text-left dropdown">
        <span><button
            class="inline-flex justify-center w-full py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none"
            type="button" onclick="this.focus()" aria-haspopup="true" aria-expanded="true">
            <span class="material-symbols-outlined" :class="[theme_text]">
              account_circle
            </span>
          </button></span>
        <div
          class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
          <div
            class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            role="menu">
            <div class="px-4 py-3" v-if="$fire.auth.currentUser">
              <p class="text-sm leading-5 text-gray-400">
                @{{ $store.getters["user/pseudo"] }}
              </p>
              <p class="text-xs font-medium leading-5 text-gray-900 truncate">
                {{ $fire.auth.currentUser.email }}
              </p>
            </div>
            <div  v-if="$router.currentRoute.path !== '/identification' && $fire.auth.currentUser" class="py-1">
              <p tabindex="0"
                class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer"
                role="menuitem" @click="$router.push('/identification')">
                Account settings
              </p>
              <!-- <span role="menuitem" tabindex="-1"
                class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                aria-disabled="true">Hall of fame (wip)</span> -->
            </div>
            <div class="py-1" v-if="$router.currentRoute.path !== '/identification' || $fire.auth.currentUser">
              <p tabindex="3"
                class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer"
                role="menuitem" @click="$fire.auth.currentUser
                    ? logout()
                    : $router.push('/identification')
                  ">
                {{ $fire.auth.currentUser ? "Logout" : "Sign in" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme_text: {
      default: "text-black",
      type: String,
    },
  },
  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut();
        this.$store.commit("user/setUser", {});
        this.$toast.show(`You have been disconnected`, {
          duration: 1500,
          type: "success",
        });
        this.$router.app.refresh()
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
