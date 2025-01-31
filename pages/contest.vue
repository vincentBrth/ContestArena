<template>
  <div v-if="data &&
    data.settings &&
    data.settings.info &&
    (data.settings.enabled || _admin)
    ">
    <NavBar :title="title" :theme_bg="theme.bg.lightest"></NavBar>
    <!-- password -->
    <div v-if="data.settings.password &&
      $store.getters['event/password'] != data.settings.password &&
      !_admin
      " class="mt-16 w-full max-w-lg items-center mx-auto">
      <span class="material-symbols-outlined text-center w-full text-9xl" :class="[theme.text.lightest]">
        lock
      </span>
      <div :class="[theme.text.lightest]">
        <div class="flex justify-center">
          Contest&nbsp;<span class="font-bold">{{ title }}</span>&nbsp;is protected with a password
        </div>
        <div class="flex justify-center">
          <FormField modelValue="" input_type="password" input_max="20" :autocomplete="false"
            :theme_label="theme.text.default" :theme_bg="theme.bg.default" :theme_text="theme.text.default"
            :theme_border="theme.border.default" @update:modelValue="(v) => $store.commit('event/setPassword', v)">
          </FormField>
        </div>
      </div>
    </div>

    <!-- contest content -->
    <div v-else>
      <div v-if="data.event && data.event.rounds" class="mx-4">
        <!-- choices -->
        <section v-if="['choices', 'watching'].includes(tab)">
          <!-- round selection -->
          <div class="block fixed inset-x-0 top-14 z-10" :class="theme.bg.lightest">
            <NavSubBar :modelValue="round" @update:modelValue="(v) => (round = v)" :tabs="_tabs_rounds"
              :theme_active="theme.bg.dark" :theme_inactive="theme.bg.light" :theme_text="theme.text.default"></NavSubBar>
          </div>
          <!-- cards -->
          <div class="flex flex-wrap justify-center gap-4 mb-20 mt-32 w-full">
            <ContestCard v-for="(candidate, key) in data &&
                data.settings &&
                data.settings.base_pool
                ? data.settings.base_pool
                : {}" v-if="event_pool.includes(key)" :key="key" :id="key" :title="key"
              :title_img="candidate.title_img ? candidate.title_img : ''" :subtitle="candidate.subtitle.length
                  ? `${candidate.title} | ${candidate.subtitle}`
                  : candidate.title
                " :link="candidate.link" :asset="candidate.asset[data.settings.asset_in_use ? data.settings.asset_in_use : 0]" :abstract="candidate.abstract" :voting="((!event_round.locked && !event_qualified.length) ||
      _admin_on) &&
    event_pool.includes(key)
    " :liked="_is_watchable ? _likes.includes(key) : false" :qualified="event_qualified.includes(key)" :theme_default="theme.bg.light"
              :theme_text="theme.text.default" :theme_subtext="theme.text.lightest"
              theme_img="object-cover h-[360px] w-[360px]" @action:vote="(v) => vote(v)"></ContestCard>
          </div>
        </section>
        <!-- ranking -->
        <section v-else-if="tab === 'ranking'">
          <div class="block fixed inset-x-0 top-14 z-10" :class="theme.bg.lightest">
            <NavSubBar :modelValue="subtab" @update:modelValue="(v) => (subtab = v)" :tabs="_tabs_ranking"
              :theme_active="theme.bg.dark" :theme_inactive="theme.bg.light" :theme_text="theme.text.default">
            </NavSubBar>
          </div>
          <div v-if="subtab === 'ranks'" class="flex flex-wrap justify-center gap-4 my-16 w-full">
            <ContestRanking :rounds="event_rounds" :players="event_players" :filters="_ranking_filters"
              :modelValue="$store.getters['event/ranking_filter'] ? $store.getters['event/ranking_filter'] : []"
              @update:modelValue="(v) => $store.commit('event/setRankingFilter', v)" @action:watch="(v) => watch(v)"
              :theme_odd="theme.bg.light" :theme_even="theme.bg.lightest" :theme_text="theme.text.default">
            </ContestRanking>
          </div>
          <div v-else-if="subtab === 'advanced'"  class="flex flex-wrap justify-center gap-4 my-16 w-full">
            <ContestRankingAdvanced :pool="event_pool_all" :tabs="_tabs_rounds" :rounds="event_rounds" :players="event_players" :filters="_ranking_filters"
                :modelValue="$store.getters['event/ranking_filter'] ? $store.getters['event/ranking_filter'] : []"
                @update:modelValue="(v) => $store.commit('event/setRankingFilter', v)"
                :theme_active="theme.bg.dark" :theme_inactive="theme.bg.light"
                :theme_odd="theme.bg.light" :theme_even="theme.bg.lightest" :theme_text="theme.text.default"
                :asset_in_use="data.settings.asset_in_use ? data.settings.asset_in_use : 0">
            </ContestRankingAdvanced>
          </div>
        </section>
        <!-- rules -->
        <section v-else-if="tab === 'rules'" class="mt-32">
          <div>
            <ContestRules :rounds="event_rounds" :theme="data.settings.theme" :theme_text="theme.text.default">
            </ContestRules>
          </div>
        </section>
        <!-- admin -->
        <section v-else-if="tab == 'admin'" class="mt-32">
          <div class="flex items-center justify-center w-full mt-12 mb-12">
            <FormToggle label="Administrator" :modelValue="_admin_on" @update:modelValue="(v) => (_admin_on = v)"
              :theme_text="theme.text.default" :theme_bg="theme.bg.default"></FormToggle>
          </div>
          <div v-if="_admin_on" class="flex justify-center">
            <ContestManagement :data="data" :theme_bg="theme.bg.default" :theme_text="theme.text.default"
              :theme_border="theme.border.default" :theme_odd="theme.bg.default" :theme_even="theme.bg.lightest"
              @action:update="(v) =>
                  update(
                    v.endpoint,
                    v.value,
                    v.admin ? v.admin : false,
                    v.numberify ? v.numberify : false,
                    v.confirm ? v.confirm : ''
                  )
                "></ContestManagement>
          </div>
        </section>
        <!-- none-->
        <section v-else class="flex">
          <span class="material-symbols-outlined text-center w-full text-9xl" :class="[theme.text.light]">
            sentiment_very_dissatisfied
          </span>
        </section>
      </div>
      <div v-else>
        <span class="material-symbols-outlined text-neutral text-center w-full text-9xl">
          more_horiz
        </span>
      </div>
      <NavStatus :statuses="_statuses" @status:id="(v) => (_statuses = v)"></NavStatus>
      <div class="pt-16">
        <!-- Navigation bottom bar-->
        <NavBottomBar :modelValue="tab" @update:modelValue="(v) => (tab = v)" :progress="_progress" :tabs="_tabs"
          :theme_bg="theme.bg.default" :theme_active="theme.bg.lightest" :theme_text="theme.text.default"></NavBottomBar>
      </div>
    </div>
  </div>
  <div v-else-if="!$store.getters['loader/visible']" class="mt-16">
    <span class="material-symbols-outlined text-center w-full text-9xl" :class="[theme.text.light]">
      sentiment_very_dissatisfied
    </span>
    <div class="w-full" :class="[theme.text.light]">
      <div class="flex justify-center">This contest is not available</div>
      <div class="flex justify-center underline">
        <NuxtLink to="/">Back to home</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Contest Arena | ${this.title}`,
      bodyAttrs: {
        class: this.theme.bg.lightest,
      },
    };
  },
  data() {
    return {
      title: "",
      tab: "",
      subtab: "",
      round: "0",
      watching: {},
      admin: {},
      endpoint: "",
      data: {},
    };
  },
  watch: {
    tab(new_tab, old_tab) {
      if (old_tab === "watching") {
        this._watching = {};
      }
    },
  },
  created() {
    if (this._tabs) {
      this.tab = Object.keys(this._tabs)[0];
    }
    if (this._tabs_ranking) {
      this.subtab = Object.keys(this._tabs_ranking)[0];
    }
    this.$store.commit('event/setRankingFilter', []);
  },
  async fetch() {
    this.$store.commit("loader/setVisible", 1);
    try {
      if (this.$route.query && this.$route.query.id) {
        this.endpoint = `/contest/${this.$route.query.id}`;
        await this.$fire.database.ref(this.endpoint).on("value", (snapshot) => {
          this.data = snapshot.val();
          this.title =
            this.data &&
              this.data.settings &&
              this.data.settings.info &&
              this.data.settings.info.name
              ? this.data.settings.info.name
              : "contest";
          this.$store.commit("loader/setVisible", -1);
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    _tabs: {
      get() {
        return {
          choices: { icon: "diagnosis", active: true },
          ranking: {
            icon: "military_tech",
            active: !this._watching,
          },
          watching: {
            name: "ranking",
            icon: "military_tech",
            active: this._watching,
          },
          rules: { icon: "info", active: true },
          admin: {
            icon: "admin_panel_settings",
            active: this._admin,
          },
        };
      },
    },
    _tabs_rounds: {
      get() {
        let ret = {};

        if (this.event_rounds.length) {
          this.event_rounds.forEach((element, index) => {
            ret[index.toString()] = {
              name: element.name,
              disabled: !element.pool || (!element.watch && this._watching && this._admin_on),
            };
          });
        }

        return ret;
      },
    },
    _tabs_ranking: {
      get() {
        let ret = { ranks: {name:"ranks"}, advanced: {name:"advanced"} };

        return ret;
      },
    },
    _statuses: {
      get() {
        let ret = [];

        if (["choices", "ranking", "watching"].includes(this.tab)) {
          if (this._admin_on) {
            ret.push({
              msg: "Administrator is used",
              type: "alert",
              id: "admin",
            });
          }
        }

        if (["choices"].includes(this.tab)) {
          if (this.event_qualified.length) {
            ret.push({ msg: "Round is over" });
          } else if (this.event_round.locked) {
            ret.push({ msg: "Round is locked" });
          }
          if (!this.data.settings.base_pool) {
            ret.push({ msg: "No choices available yet" });
          }
        }

        if (["ranking"].includes(this.tab)) {
          if (Object.keys(this.event_players).length < 1) {
            ret.push({ msg: "No ranking available yet" });
          }
        }

        if (["rules"].includes(this.tab)) {
          if (Object.keys(this.event_rounds).length < 1) {
            ret.push({ msg: "No rules available yet" });
          }
        }

        if (["watching"].includes(this.tab)) {
          if (this._watching) {
            if (this.event_round && this.event_round.watch) {
              ret.push({ msg: `Watching as ${this.watching.name}`, id: "watch" });
            } else {
              ret.push({ msg: "Round is not watchable", id: "watch"});
            }
          }
        }

        if (!["admin"].includes(this.tab)) {
          if (this.data && this.data.settings && this.data.settings.message) {
            ret.push({ msg: this.data.settings.message, type: "warning" });
          }
          if (this.data && this.data.settings) {
            if (this.data.settings.enabled === false) {
              ret.push({
                msg: "This contest is not available",
                type: "warning",
              });
            }
          }
        }

        return ret;
      },
      set(value) {
        if (value.id) {
          if (value.id === "watch") {
            this._watching = "";
            this.tab = "ranking";
          } else if (value.id === "admin") {
            this._admin_on = false;
          }
        }
      },
    },
    _admin: {
      get() {
        let ret = false;
        if (this.$fire.auth.currentUser) {
          const admins =
            this.data && this.data.settings && this.data.settings.admins
              ? this.data.settings.admins
              : [];
          ret = admins.includes(this.$fire.auth.currentUser.uid);
        }
        return ret;
      },
    },
    _admin_on: {
      get() {
        return (
          this._admin &&
          this.admin.hasOwnProperty("enabled") &&
          this.admin.enabled
        );
      },
      set(value) {
        if (value) {
          this.admin = { enabled: value };
        } else {
          this.admin = {};
        }
      },
    },
    _watching: {
      get() {
        return Object.keys(this.watching).length > 0;
      },
      set(value) {
        const is_me = this.$fire.auth.currentUser ? this.$fire.auth.currentUser.uid == value.uid : false;
        if(!is_me || this._admin_on) {
          this.watching = value;
          if (this._watching) {
            this.tab = "watching";
          }
        }
      },
    },
    _is_watchable: {
      get() {
        const round_watchable = this.event_round ? this.event_round.watch : true;
        return round_watchable && this._watching || this._admin_on || !this._watching;
      },
    },
    _progress: {
      get() {
        const max =
          this.event_round && this.event_round.max ? this.event_round.max : -1;
        const likes_count = this._likes ? this._likes.length : 0;

        return likes_count > 0 && ["choices", "watching"].includes(this.tab)
          ? (likes_count / max) * 100
          : 0;
      },
    },
    _likes: {
      get() {
        let likes = [];
        if (this.$fire.auth.currentUser || this._watching) {
          if (this._admin_on && !this._watching) {
            return this.event_qualified;
          } else {
            let uid = this._watching
              ? this.watching.uid
              : this.$fire.auth.currentUser.uid;
            likes =
              this.event_players &&
                this.event_players[uid] &&
                this.event_players[uid].likes &&
                this.event_players[uid].likes[this.round] &&
                (this._is_watchable ||
                  (this.event_qualified && this.event_qualified.length > 0))
                ? this.event_players[uid].likes[this.round]
                : [];
          }
        }
        return likes;
      },
    },
    _ranking_filters: {
      get() {
        let options = [];
        let _countries = null;
        let _players = null;
        let _squads = null;
        if (this.$store.getters['user/ranking_filters'].includes('countries')) {
          options.push({ language: 'Countries', libs: [] })
          _countries = [];
        }
        if (this.$store.getters['user/ranking_filters'].includes('squads')) {
          options.push({ language: 'Squads', libs: [] })
          _squads = [];
        }
        if (this.$store.getters['user/ranking_filters'].includes('players')) {
          options.push({ language: 'Players', libs: [] })
          _players = [];
        }


        if (this.event_players) {
          Object.keys(this.event_players).forEach((key) => {
            const player = this.event_players[key];
            if (player.user_info) {
              const user_info = player.user_info;
              if (user_info.country && _countries != null) {
                const country = user_info.country;
                if (!_countries.includes(country)) {
                  _countries.push(country);
                  options[0].libs.push({ name: country, category: 'Countries' });
                }
              }
              if (user_info.squads && _squads != null) {
                const squads = user_info.squads;
                for (let s in squads) {
                  if (!_squads.includes(squads[s])) {
                    _squads.push(squads[s]);
                    options[1].libs.push({ name: squads[s], category: 'Squads' });
                  }
                }
              }
              if (user_info.pseudo && _players != null) {
                const pseudo = user_info.pseudo;
                if (!_players.includes(pseudo)) {
                  _players.push(pseudo);
                  options[2].libs.push({ name: pseudo, category: 'Players' });
                }
              }
            }
          });

          // sort
          options.forEach((option) => {
            option.libs.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          });
        }
        return options;
      },
    },
    event_rounds: {
      get() {
        return this.data && this.data.event && this.data.event.rounds
          ? this.data.event.rounds
          : [];
      },
    },
    event_round: {
      get() {
        return this.event_rounds && this.event_rounds[this.round]
          ? this.event_rounds[this.round]
          : {};
      },
    },
    event_pool: {
      get() {
        return this.event_round && this.event_round.pool
          ? this.event_round.pool
          : [];
      },
    },
    event_pool_all: {
      get() {
        return this.data && this.data.settings && this.data.settings.base_pool ? this.data.settings.base_pool : {};
      },
    },
    event_qualified: {
      get() {
        return this.event_round && this.event_round.qualified
          ? this.event_round.qualified
          : [];
      },
    },
    event_players: {
      get() {
        return this.data && this.data.event && this.data.event.players
          ? this.data.event.players
          : {};
      },
    },
    theme: {
      get() {
        const themes = {
          default: {
            bg: {
              darkest: "bg-neutral-darkest",
              dark: "bg-neutral-dark",
              default: "bg-neutral",
              light: "bg-neutral-light",
              lightest: "bg-neutral-lightest",
            },
            text: {
              darkest: "text-default-darkest",
              dark: "text-default-dark",
              default: "text-default",
              light: "text-default-light",
              lightest: "text-default-lightest",
            },
            border: {
              darkest: "border-default-darkest",
              dark: "border-default-dark",
              default: "border-default",
              light: "border-default-light",
              lightest: "border-default-lightest",
            },
          },
          linen: {
            bg: {
              darkest: "bg-linen-darkest",
              dark: "bg-linen-dark",
              default: "bg-linen",
              light: "bg-linen-light",
              lightest: "bg-linen-lightest",
            },
            text: {
              darkest: "text-default-darkest",
              dark: "text-default-dark",
              default: "text-default",
              light: "text-default-light",
              lightest: "text-gray-400",
            },
            border: {
              darkest: "border-default-darkest",
              dark: "border-default-dark",
              default: "border-default",
              light: "border-default-light",
              lightest: "border-default-lightest",
            },
          },
          purple: {
            bg: {
              darkest: "bg-purple-rain-darkest",
              dark: "bg-purple-rain",
              default: "bg-purple-rain",
              light: "bg-purple-rain-light",
              lightest: "bg-purple-rain-lightest",
            },
            text: {
              darkest: "text-default-darkest",
              dark: "text-default-dark",
              default: "text-default",
              light: "text-default",
              lightest: "text-default",
            },
            border: {
              darkest: "border-default-darkest",
              dark: "border-default-dark",
              default: "border-default",
              light: "border-default-light",
              lightest: "border-default-lightest",
            },
          },
        };
        let ret = themes["default"];

        if (this.data && this.data.settings && this.data.settings.theme) {
          if (Object.keys(themes).includes(this.data.settings.theme)) {
            ret = themes[this.data.settings.theme];
          } else {
            console.warn(`theme '${this.data.settings.theme}' not available`);
          }
        }
        return ret;
      },
    },
  },
  methods: {
    vote(key) {
      let toasts = [];
      if (this.$fire.auth.currentUser) {
        if ((!this._watching && !this.event_round.locked) || this._admin_on) {
          try {
            // initialize
            let endpoints = [];
            const propagate =
              this.data && this.data.settings && this.data.settings.propagate
                ? this.data.settings.propagate
                : false;
            const max =
              this.data.event &&
                this.data.event.rounds &&
                this.data.event.rounds[this.round] &&
                this.data.event.rounds[this.round].max
                ? this.data.event.rounds[this.round].max
                : -1;

            if (this._admin_on) {
              if (!this._watching) {
                endpoints.push(
                  `${this.endpoint}/event/rounds/${this.round}/qualified`
                );
                if (propagate && this.round + 1 < this.event_rounds.length) {
                  endpoints.push(
                    `${this.endpoint}/event/rounds/${Number(this.round) + 1
                    }/pool`
                  );
                }
              } else {
                endpoints.push(
                  `${this.endpoint}/event/players/${this.watching.uid}/likes/${this.round}`
                );
              }
            } else {
              this.$fire.database
                .ref(
                  `${this.endpoint}/event/players/${this.$fire.auth.currentUser.uid}/user_info`
                )
                .set(this.$store.getters["user/getUser"]);
              endpoints.push(
                `${this.endpoint}/event/players/${this.$fire.auth.currentUser.uid}/likes/${this.round}`
              );
            }
            // update vote
            let values = this._likes.filter((x) => x); // remove empty slot
            if (values.includes(key)) {
              values.splice(values.indexOf(key), 1);
            } else {
              if (values.length < max) {
                values.push(key);
              } else {
                toasts.push({
                  msg: `You reached the max number of choices for this round (${max})`,
                });
              }
            }
            if (toasts.length < 1) {
              // update database
              endpoints.forEach((e) => {
                this.$fire.database.ref(e).set(values);
              });
            }
          } catch (e) {
            toasts.push({
              msg: e,
              type: "error",
            });
          }
        }
      } else {
        toasts.push({
          msg: "You need to be&nbsp;<a href='/identification' style='text-decoration: underline;'>logged</a>",
        });
      }

      toasts.forEach((toast) => {
        this.$toast.show(toast.msg, {
          duration: toast.duration ? toast.duration : 1500,
          type: toast.type,
          className: "toast-theme",
        });
      });
    },
    async update(
      endpoint,
      value,
      admin_required,
      numberify = false,
      confirm = ""
    ) {
      if (admin_required && this._admin_on) {
        try {
          if (numberify) {
            value = Number(value);
          }
          if (confirm.length > 0 && !window.confirm(confirm)) {
            return;
          } else {
            if (endpoint === "/" && value === {}) {
              await this.$fire.database.ref(this.endpoint).remove();
            } else {
              await this.$fire.database
                .ref(this.endpoint + endpoint)
                .set(value);
            }
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error("not admin");
      }
    },

    watch(player) {
      if (
        !this.$fire.auth.currentUse ||
        this.$fire.auth.currentUser.uid != player.uid ||
        this._admin_on
      ) {
        this._watching = player;
      }
    },
  },
};
</script>

<style scoped></style>
