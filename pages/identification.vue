<template>
  <div>
    <NavBar :title="title" :theme_bg="theme_nav"></NavBar>
    <div v-if="['register', 'login', 'login_reset'].includes(tab)">
      <section>
        <!-- identification selection -->
        <div class="block fixed inset-x-0 top-14 z-10 bg-default-lightest">
          <NavSubBar :modelValue="tab" @update:modelValue="(v) => (tab = v)" :tabs="tabs"></NavSubBar>
        </div>
      </section>
      <!-- register / login / login_reset -->
      <section class="mt-32 px-3">
        <div class="w-full max-w-lg items-center mx-auto">
          <div v-if="['register', 'login'].includes(tab)" class="w-full max-w-lg items-center mx-auto">
            <div class="flex justify-center">
              <button type="button"
                class="text-white bg-[#4285F4] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
                @click="googleLogin()">
                <svg class="w-4 h-4 mr-2 -ml-1" data-prefix="fab" data-icon="google" role="img"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                  </path>
                </svg>
                Sign in with Google
              </button>

              <!-- <button
                type="button"
                class="text-white bg-[#050708] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
              >
                <svg
                  class="w-5 h-5 mr-2 -ml-1"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                Sign in with Apple
              </button> -->
            </div>

            <div
              class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p class="mx-4 mb-0 text-center text-neutral-400">or</p>
            </div>
          </div>
          <form @submit.prevent="submitAction">
            <FormField :modelValue="mail" @update:modelValue="(v) => (mail = v)" label="email"
              :autocomplete="tab == 'register' ? false : true" input_type="email" theme_bg="bg-neutral"
              theme_text="text-black" theme_label="text-black" theme_border="border-neutral"></FormField>
            <FormField :autocomplete="tab == 'register' ? false : true" :modelValue="password"
              @update:modelValue="(v) => (password = v)" label="password" input_type="password" input_min="6"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral"
              v-if="tab.includes('register') || tab == 'login'"></FormField>
            <FormField :modelValue="pseudo" :autocomplete="false" @update:modelValue="(v) => (pseudo = v)" label="pseudo"
              input_type="text" input_min="3" theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black"
              theme_border="border-neutral" v-if="tab.includes('register')"></FormField>
            <FormCountry :modelValue="country" @update:modelValue="(v) => (country = v)" label="country"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral"
              v-if="tab.includes('register')"></FormCountry>

            <div class="text-neutral text-xs underline first-letter:capitalize cursor-pointer" v-if="tab == 'login'"
              @click="tab = 'login_reset'">
              forgot password?
            </div>
            <FormButton type="submit" :label="tabs[tab].name" :disabled="_is_submit_disabled" class="my-8 w-full"></FormButton>
          </form>
        </div>
      </section>
    </div>
    <div v-else-if="['profile', 'profile_edit'].includes(tab)" class="mt-24">
      <!-- <div class="flex">
        <div class="w-full text-center material-symbols-outlined">
          <div class="text-8xl text-center">account_circle</div>
        </div>
      </div> -->
      <!-- profile -->
      <section v-if="tab == 'profile'">
        <div class="w-full max-w-lg items-center px-3 mx-auto">
          <div>
            <div class="text-right">
              <span @click="edit()">
                <FormButton label="edit" class="w-[75px] material-symbols-outlined"></FormButton>
              </span>
            </div>
            <FormField :modelValue="mail" label="email" input_type="email" :disabled="true" theme_bg="bg-neutral"
              theme_text="text-black" theme_label="text-black" theme_border="border-neutral"></FormField>
            <FormField :modelValue="this.$store.getters['user/pseudo']" label="pseudo" input_type="text" :disabled="true"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral">
            </FormField>
            <FormCountry :modelValue="this.$store.getters['user/country']" label="country" :disabled="true"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral">
            </FormCountry>
            <FormField :modelValue="this.$store.getters['user/squads'].join(',')" label="squads" input_type="text" :disabled="true"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral">
            </FormField>
          </div>
        </div>
      </section>
      <!-- edit profile -->
      <section v-else-if="tab == 'profile_edit'">
        <div class="w-full max-w-lg items-center px-3 mx-auto">
          <form @submit.prevent="submitAction">
            <FormField :modelValue="mail" label="email" input_type="email" :disabled="true" theme_bg="bg-neutral"
              theme_text="text-black" theme_label="text-black" theme_border="border-neutral"></FormField>
            <FormField :modelValue="pseudo" @update:modelValue="(v) => (pseudo = v)" label="pseudo" input_type="text"
              input_min="3" theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black"
              theme_border="border-neutral"></FormField>
            <FormCountry :modelValue="country" @update:modelValue="(v) => (country = v)" label="country"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral">
            </FormCountry>
            <FormField :modelValue="squads" @update:modelValue="(v) => (squads = v.split(','))" label="squads (can be multiple ex 'magic,fans')" input_type="text"
              theme_bg="bg-neutral" theme_text="text-black" theme_label="text-black" theme_border="border-neutral">
            </FormField>
            <FormField :modelValue="password" @update:modelValue="(v) => (password = v)" :autocomplete="false"
              label="password" input_type="password" input_min="6" theme_bg="bg-neutral" theme_text="text-black"
              theme_label="text-black" theme_border="border-neutral"></FormField>
            <FormButton type="submit" label="Update" :disabled="_is_submit_disabled" class="my-8 w-full"></FormButton>
          </form>
          <span class="w-full" @click="tab = 'profile'">
            <FormButton class="w-full" label="cancel"></FormButton>
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script scoped>
export default {
  head() {
    return {
      title: `Contest Arena | ${this.title}`,
      bodyAttrs: {
        class: this.theme_nav,
      },
    };
  },
  data() {
    return {
      theme_nav: "bg-default-lightest",
      title: "",
      tab: "",
      tabs: {
        login: { name: "login" },
        login_reset: { name: "reset", active: false },
        register: { name: "register" },
        profile: { name: "profile", active: false },
        profile_edit: { name: "profile_edit", active: false },
      },
      mail: "",
      pseudo: "",
      country: "",
      squads: [],
      password: "",
    };
  },
  created() {
    this.tab = Object.keys(this.tabs)[0];
  },
  async fetch() {
    this.$store.commit("loader/setVisible", 1);
    if (this.$fire.auth.currentUser) {
      this.tab = "profile";
      this.mail = this.$fire.auth.currentUser.email;
      this.pseudo = this.$store.getters["user/pseudo"];
      this.country = this.$store.getters["user/country"];
      this.squads = this.$store.getters["user/squads"].join(",");
    } else {
      this.tab = "login";
    }

    this.$store.commit("loader/setVisible", -1);
  },

  computed: {
    _is_submit_disabled: {
      get() {
        let state = false;
        if (this.tab == "register") {
          state = !(this.mail && this.pseudo && this.country && this.password);
        } else if (this.tab == "login") {
          state = !(this.mail && this.password);
        } else if (this.tab == "login_reset") {
          state = !this.mail;
        } else if (this.tab == "profile_edit") {
          state = !(this._user_changed || this._password_changed);
        }
        return state;
      },
    },
    _user_changed: {
      get() {
        return (
          this.pseudo != this.$store.getters["user/pseudo"] ||
          this.country != this.$store.getters["user/country"] || this.squads != this.$store.getters["user/squads"]
        );
      },
    },
    _password_changed: {
      get() {
        return this.password.length > 0;
      },
    },
  },
  methods: {
    googleLogin() {
      try {
        // connect to provider
        const provider = new this.$fireModule.auth.GoogleAuthProvider();
        this.$fire.auth.signInWithPopup(provider).then((resp) => {
          this.$store.commit("loader/setVisible", 1);

          // check if user is new
          if (resp.additionalUserInfo.isNewUser) {
            //push user profile
            this.$fire.database.ref(`/users/${resp.user.uid}`).set({
              pseudo: resp.additionalUserInfo.profile.given_name,
            });
          }
          // Signed in
          this.$fire.database
            .ref(`/users/${resp.user.uid}`)
            .once("value", (data) => {
              const user_data = data.val();
              this.$store.commit("user/setUser", user_data);
              this.$store.commit("loader/setVisible", -1);
            });

          this.$router.app.refresh();

          this.$toast.show("You have been and logged", {
            duration: 3000,
            type: "success",
          });
        });
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    submitAction() {
      if (this.tab == "register") {
        this.register(this.mail, this.password, this.pseudo, this.country);
      } else if (this.tab == "login") {
        this.login(this.mail, this.password);
      } else if (this.tab == "login_reset") {
        this.passwordReset(this.mail);
      } else if (this.tab == "profile_edit") {
        this.updateProfile(this.password_input, {
          pseudo: this.pseudo,
          country: this.country,
          squads: this.squads,
        });
      } else {
        alert(`No valid submit action for '${this.tab}'`);
      }
    },
    async register(mail, password, pseudo, country) {
      try {
        this.$store.commit("loader/setVisible", 1);
        // register user
        const user_credential =
          await this.$fire.auth.createUserWithEmailAndPassword(mail, password);
        // push user profile
        this.$fire.database
          .ref(`/users/${user_credential.user.uid}`)
          .set({ pseudo: pseudo, country: country });
        // Signed in
        this.$fire.database
          .ref(`/users/${user_credential.user.uid}`)
          .once("value", (data) => {
            const user_data = data.val();
            this.$store.commit("user/setUser", user_data);
          });
        this.$toast.show("You have been register and logged", {
          duration: 3000,
          type: "success",
        });
        this.$store.commit("loader/setVisible", -1);
      } catch (e) {
        this.$store.commit("loader/setVisible", -1);
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async login(mail, password) {
      try {
        this.$store.commit("loader/setVisible", 1);
        await this.$fire.auth
          .signInWithEmailAndPassword(mail, password)
          .then((userCredential) => {
            // Signed in
            this.$fire.database
              .ref(`/users/${userCredential.user.uid}`)
              .once("value", (data) => {
                const user_data = data.val();
                this.$store.commit("user/setUser", user_data);
                this.$store.commit("loader/setVisible", -1);
              });
            this.$toast.show("You have been correctly logged", {
              duration: 1500,
              type: "success",
            });
          });
      } catch (e) {
        this.$store.commit("loader/setVisible", -1);
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
    async passwordReset(mail) {
      this.$store.commit("loader/setVisible", 1);
      this.$fire.auth
        .sendPasswordResetEmail(mail)
        .then(() => {
          this.$store.commit("loader/setVisible", -1);
          this.$toast.show("An email has been sent to reset your password", {
            duration: 1500,
            type: "success",
          });
        })
        .catch((e) => {
          this.$store.commit("loader/setVisible", -1);
          this.$toast.show(`${e.message}`, {
            duration: 5000,
            type: "error",
          });
        });
    },
    edit() {
      this.pseudo = this.$store.getters["user/pseudo"];
      this.country = this.$store.getters["user/country"];
      this.squads = this.$store.getters["user/squads"];
      this.password = "";
      this.tab = "profile_edit";
    },
    async updateProfile(password, user) {
      try {
        // update password
        if (this._password_changed) {
          await this.$fire.auth.currentUser.updatePassword(password);
        }
        // update user informations
        await this.$fire.database
          .ref(`/users/${this.$fire.auth.currentUser.uid}`)
          .set(user);
        this.$toast.show("You profile have been updated", {
          duration: 3000,
          type: "success",
        });

        this.tab = "profile";
      } catch (e) {
        this.$toast.show(`${e.message}`, {
          duration: 5000,
          type: "error",
        });
      }
    },
  },
  watch: {
    tab(new_tab, old_tab) {
      if (["register", "login", "login_reset"].includes(new_tab)) {
        this.title = "Identification";
      } else if (["profile", "profile_edit"].includes(new_tab)) {
        this.title = "Profile";
      } else {
        this.title = "NA";
      }
    },
  },
};
</script>
