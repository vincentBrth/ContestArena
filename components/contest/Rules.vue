<template>
  <section>
    <div class="flex-block">
      <div v-if="rounds && rounds.length">
        <div>
          <img
            class="flex-block object-scale-down h-48 w-24 my-11 mx-auto"
            :src="
              theme === 'linen'
                ? 'https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fruler_linen.svg?alt=media&token=90e37241-7748-4a7b-bef8-c4f4435c060e'
                : theme === 'purple'
                ? 'https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fruler_purple.svg?alt=media&token=c5d641d6-e7ff-480c-9138-9bb3fa1b53b3'
                : 'https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fruler.svg?alt=media&token=1022768a-f079-492e-8abd-fcbbd143a02c'
            "
          />
        </div>
        <div>
          <div
            v-for="item in rounds"
            :key="item.name"
            class="flex-block text-center mb-4 w-full"
            :class="theme_text"
          >
            <div class="py-2">
              <h2 class="font-bold">{{ item.name }}</h2>
            </div>
            <p>{{ formatText(item) }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <span
          class="material-symbols-outlined text-neutral text-center w-full text-9xl"
        >
          more_horiz
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    rounds: {
      default: [],
      type: Array,
    },
    theme: {
      default: "",
      type: String,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
  },
  methods: {
    formatText(round) {
      let text = round["points"];
      text += round["points"] > 1 ? " points" : " point";
      text += round["max"] > 1 ? " per good choice" : " for the good choice";

      return text;
    },
  },
};
</script>
