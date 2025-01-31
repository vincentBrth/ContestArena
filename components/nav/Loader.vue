<template>
  <section class="block fixed inset-x-0 top-28 z-0">
    <div
      v-if="type == 'dots'"
      class="flex items-center justify-center space-x-2 animate-bounce"
    >
      <div class="w-8 h-8 bg-neutral rounded-full"></div>
      <div class="w-8 h-8 bg-neutral-dark rounded-full"></div>
      <div class="w-8 h-8 bg-neutral-darkest rounded-full"></div>
    </div>
    <div v-else-if="type == 'spinner'" class="flex items-center justify-center">
      <div
        class="w-40 h-40 border-t-4 border-b-4 border-neutral-dark rounded-full animate-spin"
      ></div>
    </div>
    <div
      v-else-if="type == 'dots-fade'"
      class="flex items-center justify-center space-x-2 animate-pulse"
    >
      <div class="w-8 h-8 bg-neutral rounded-full"></div>
      <div class="w-8 h-8 bg-neutral-dark rounded-full"></div>
      <div class="w-8 h-8 bg-neutral-darkest rounded-full"></div>
    </div>
    <div v-else-if="type == 'star'" class="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-24 h-24 text-neutral-dark animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    </div>
    <div v-else-if="type == 'spinner-0'">
      <div
        style="border-top-color: transparent"
        class="w-16 h-16 border-4 border-neutral-dark border-solid rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="type == 'spinner-1'">
      <div
        style="border-top-color: transparent"
        class="w-16 h-16 border-4 border-neutral-dark border-dashed rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="type == 'spinner-2'">
      <div
        style="border-top-color: transparent"
        class="w-16 h-16 border-4 border-neutral-dark border-dotted rounded-full animate-spin"
      ></div>
    </div>
    <div v-else>
      <div
        style="border-top-color: transparent"
        class="w-16 h-16 border-4 border-neutral-dark border-double rounded-full animate-spin"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    type: {
      default: "dots",
      type: String,
    },
  },
};
</script>
