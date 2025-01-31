<template>
  <div>
    <section v-if="Object.keys(bingo_formatted).length" class="w-full max-w-lg items-center px-3 mx-auto">
      <div>
        <p class="italic text-center text-sm pb-4">
          🔥 One rule : Take a shot for every line 🔥
        </p>
      </div>
      <div class="grid grid-cols-3 border-gray-400 border rounded-xl">
        <div v-for="(word, index) in bingo_formatted" :key="word.key"
          class="p-4 text-center text-xs cursor-pointer transition-colors duration-300 border-gray-200 border border-dotted"
          :class="[
            colorClass(word),
            cornerClass(index)
          ]" @click="$emit('action:check', word.key)">
          {{ word.label }}
          <div v-if="user_id == ''">({{ word.votes }}/{{ Object.keys(word.voter).length }} votes)</div>
        </div>
      </div>
    </section>
    <section v-else class="text-center">
      <button type="button"
        class="text-white bg-[#4285F4] font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
        @click="$emit('action:generate')">
        Generate a bingo
      </button>
    </section>
  </div>
</template>

<script scoped>

export default {
  props: {
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
    bingo: {
      type: Object,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  emits: ["action:check"],
  computed: {
    bingo_formatted() {
      let bingo_fmt = Object.keys(this.bingo).map((key) => {
        let votes = Object.keys(this.bingo[key].voter).map((voter) => {
          return this.bingo[key].voter[voter].checked
        })
        return { ...this.bingo[key], ...{ key: key, votes: votes.filter((vote) => vote == true).length } };
      })
      if (this.user_id == "") {
        // Sort by votes
        bingo_fmt = bingo_fmt.sort((a, b) => {
          return Object.keys(b.voter).length - Object.keys(a.voter).length
        }).sort((a, b) => {
          return b.votes - a.votes
        }).sort((a, b) => {
          return b.votes / Object.keys(b.voter).length - a.votes / Object.keys(a.voter).length
        })
      }
      return bingo_fmt;
    },
  },
  methods: {
    cornerClass(index) {
      if (index === 0) return 'rounded-tl-xl'
      if (index === 2) return 'rounded-tr-xl'
      if (index === Object.keys(this.bingo).length - 3) return 'rounded-bl-xl'
      if (index === Object.keys(this.bingo).length - 1) return 'rounded-br-xl'

      return ''
    },
    colorClass(word) {
      if (this.user_id == '') {
        if (word.checked) {
          return 'bg-success-lightest'
        }
        if ((word.votes / Object.keys(word.voter).length) > 0.75) {
          return 'bg-orange-300'
        }
        if ((word.votes / Object.keys(word.voter).length) > 0.5) {
          return 'bg-orange-200'
        }
        if ((word.votes / Object.keys(word.voter).length) > 0.25) {
          return 'bg-orange-100'
        }
      }
      if (word.voter[this.user_id]?.checked) {
        return word.checked ? 'bg-success-lightest' : 'bg-linen'
      }
      return 'bg-transparent'
    }
  },
};
</script>

<style scoped>
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>