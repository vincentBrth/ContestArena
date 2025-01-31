<template>
  <div v-if="!$store.getters['loader/visible']">
    <NavBar :title="title" :theme_bg="theme_nav"></NavBar>
    <section class="mx-4">
      <!-- year selection -->
      <div class="block fixed inset-x-0 top-14 z-10 bg-default-lightest">
        <NavSubBar :modelValue="tab" @update:modelValue="(v) => (tab = v)" :tabs="_tabs"></NavSubBar>
      </div>

      <!-- event selection -->
      <div class="flex flex-wrap justify-center gap-4 my-4 pt-32 w-full">
        <ContestCard v-for="(item, key) in _event" :key="key" :id="key" :title="item.settings.info.name"
          :state="contestStatus(item)" :subtitle="date(item.settings.info.date)" :asset="item.settings.info.asset[0]"
          :abstract="item.settings.info.abstract" :voting="false" @click.native="$router.push('/contest?id=' + key)"
          class="cursor-pointer"></ContestCard>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: this.theme_nav,
      },
    };
  },
  data() {
    return {
      title: "Contest Arena",
      theme_nav: "bg-default-lightest",
      data: {},
      tab: "",
    };
  },
  async fetch() {
    this.$store.commit("loader/setVisible", 1);
    try {
      await this.$fire.database.ref("/contest").on("value", (snapshot) => {
        this.data = snapshot.val();
        this.tab = Object.keys(this._tabs)[Object.keys(this._tabs).length - 1];
        this.$store.commit("loader/setVisible", -1);
      });
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    _event: {
      get() {
        let ret = {};
        for (const [key, value] of Object.entries(this.data)) {
          const date = new Date(
            value.settings && value.settings.info && value.settings.info.date
              ? value.settings.info.date
              : ""
          );

          if (date.getFullYear() == this.tab) {
            ret[key] = value;
          }
        }
        return ret;
      },
    },
    _tabs: {
      get() {
        let ret = {};
        for (const value of Object.values(this.data)) {
          if (value.settings && value.settings.info) {
            const date = new Date(
              value.settings && value.settings.info && value.settings.info.date
                ? value.settings.info.date
                : ""
            ).getFullYear();
            ret[date] = {};
          }
        }
        return ret;
      },
    },
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleString("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
      });
    },
    contestStatus(item) {
      let ret = "disabled";
      if (
        item &&
        item.event &&
        item.settings &&
        item.settings.enabled &&
        item.event.rounds
      ) {
        let locked = [];
        let qualified = [];
        item.event.rounds.forEach((element) => {
          locked.push(element.locked);
          qualified.push(
            element.qualified && element.qualified.length ? true : false
          );
        });
        if (qualified.includes(true) && !qualified.includes(false)) {
          ret = "archived";
        } else if (
          locked.includes(true) &&
          !locked.includes(false) &&
          !qualified.includes(true)
        ) {
          ret = "coming";
        } else if (
          (qualified.includes(true) && qualified.includes(false)) ||
          locked.includes(false)
        ) {
          ret = "live";
        }
      }
      return ret;
    },
  },
};
</script>
