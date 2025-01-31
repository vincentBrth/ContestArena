<template>
  <div class="w-[360px] border-gray-200 border rounded-xl" :class="[
    voting
      ? theme_default
      : liked && qualified
        ? theme_valid
        : liked && !qualified
          ? theme_invalid
          : !liked && qualified
            ? theme_info
            : theme_default,
  ]">
    <div class="p-3 flex">
      <div class="w-11/12">
        <a v-if="link !== ''" :href="link" target="_blank">
          <h1 class="inline-block mb-2 font-bold capitalize" :class="theme_text">
            {{ title }}
          </h1>
        </a>
        <h1 v-else class="inline-block mb-2 font-bold capitalize" :class="theme_text">
          {{ title }}
        </h1>
        <img v-if="title_img != ''" class="inline-block h-6 w-6" :src="title_img" />
        <h3 class="uppercase text-sm" :class="theme_subtext">{{ subtitle }}</h3>
      </div>
      <div>
        <span v-if="voting" class="material-symbols-outlined text-4xl cursor-pointer select-none" v-bind:class="{
            active: liked,
          }" @click="$emit('action:vote', id)">favorite</span>
        <span v-else-if="liked && qualified" class="material-symbols-outlined text-4xl text-success-dark select-none">
          check_circle
        </span>
        <span v-else-if="liked && !qualified" class="material-symbols-outlined text-4xl text-danger-dark select-none">
          block
        </span>
        <span v-if="state" class="text-white select-none px-2 text-xs rounded-xl" :class="[
            ['live'].includes(state) ? 'bg-success-darkest' : null,
            ['coming'].includes(state) ? 'bg-info-dark' : null,
            state === 'archived' ? 'bg-neutral-dark' : null,
            ['live', 'coming', 'archived'].includes(state)
              ? null
              : 'bg-gray-400',
          ]">
          {{ state }}
        </span>
      </div>
    </div>
    <img class="object-top bg-clip-content" :class="[theme_img]" :src="asset === ''
      ? 'https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/template%2Fdefault_card.png?alt=media&token=ab4675ab-29df-4e75-99ee-a070840909c4'
      : asset
      " />
    <iframe v-if="abstract.includes('open.spotify.com') || abstract.includes('widget.deezer.com')" class="rounded-b-xl bg-[#282828]" :src="abstract" width="100%"
      height="80" frameBorder="0" allowtransparency="true" allowfullscreen="" allow="encrypted-media; clipboard-write"
      loading="lazy"></iframe>
    <div v-else>
      <p class="first-letter:capitalize p-3" :class="theme_text">
        {{ abstract }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      default: "",
      type: String,
    },
    title_img: {
      default: "",
      type: String,
    },
    state: {
      type: String,
    },
    subtitle: {
      default: "",
      type: String,
    },
    link: {
      default: "",
      type: String,
    },
    asset: {
      default: "",
      type: String,
    },
    abstract: {
      default: "abstract",
      type: String,
    },
    liked: {
      default: false,
      type: Boolean,
    },
    qualified: { default: false, type: Boolean },
    voting: { default: true, type: Boolean },
    theme_invalid: {
      default: "bg-danger-lightest",
      type: String,
    },
    theme_valid: {
      default: "bg-success-lightest",
      type: String,
    },
    theme_info: {
      default: "bg-info-lightest",
      type: String,
    },
    theme_default: {
      default: "bg-white",
      type: String,
    },
    theme_text: {
      default: "text-black",
      type: String,
    },
    theme_subtext: {
      default: "text-gray-400",
      type: String,
    },
    theme_img: {
      default: "object-fill h-48 w-[360px]",
      type: String,
    },
  },
  emits: ["action:vote"],
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  color: #b22222;
}
</style>
