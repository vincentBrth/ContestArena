<template>
  <div class="max-w-lg pt-28">
    <div v-if="ranking.length > 0">
      <FormMultiSelect :modelValue="modelValue" :options="filters"
        @update:modelValue="(v) => $emit('update:modelValue', v)">
      </FormMultiSelect>
      <table class="table-fixed w-full mt-2">
        <tbody>
          <tr :class="theme_text">
            <th scope="col" class="w-12"></th>
            <th scope="col" class="w-8"></th>
            <th scope="col"></th>
            <th v-if="n_qualified > 0" scope="col"
              class="text-xs text-left first-letter:capitalize cursor-pointer w-[70px]"
              :class="[order === 'good' ? 'underline' : '']" @click="order = 'good'">
              good
            </th>
            <th scope="col" class="text-xs text-left first-letter:capitalize cursor-pointer w-[70px]"
              :class="[order === 'points' ? 'underline' : '']" @click="order = 'points'">
              points
            </th>
          </tr>
          <tr class="select-none cursor-pointer h-14" v-for="( player, index ) in  ranking " :key="player.uid"
            :class="[theme_text, index % 2 ? theme_even : theme_odd]" @click="$emit('action:watch', player)">
            <td class="text-left text-sm pl-3"># {{ player.rank + 1 }}</td>
            <td class="text-center">
              <span class="material-symbols-outlined pt-[6px]" :class="{
                active: is_me(player.uid),
              }">
                person
              </span>
            </td>
            <td class="text-left text-sm first-letter:capitalize">{{ player.name }}</td>
            <td v-if="n_qualified > 0" class="text-xs">
              {{ player.good }} ({{
                ((player.good / n_qualified) * 100).toFixed(0)
              }}%)
            </td>
            <td class="text-left text-xs pr-3">{{ player.points }} points</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="flex">
      <span class="material-symbols-outlined text-neutral text-center w-full text-9xl">
        more_horiz
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: "points",
    };
  },
  props: {
    players: {
      default: {},
      required: true,
      type: Object,
    },
    rounds: {
      default: [],
      required: true,
      type: Array,
    },
    filters: {
      default: [],
      required: true,
      type: Array,
    },
    modelValue: {
      required: true,
      type: Array,
    },
    rank_order: {
      default: "points",
      type: String,
    },
    theme_text: {
      default: "text-white",
      type: String,
    },
    theme_odd: {
      default: "bg-neutral",
      type: String,
    },
    theme_even: {
      default: "bg-neutral-lightest",
      type: String,
    },
  },
  emits: ["action:watch", "update:modelValue"],
  computed: {
    players_filtered: {
      get() {
        let ret = {};
        for (const [player_uid, value] of Object.entries(this.players)) {
          if (this.is_filtered(value.user_info, this.modelValue)) {
            ret[player_uid] = value;
          }
        }
        return ret;
      },
    },
    ranking: {
      get() {
        let ranking_list = [];
        for (const [player_uid, value] of Object.entries(this.players_filtered)) {
          const player_name =
            value.user_info && value.user_info.pseudo
              ? value.user_info.pseudo
              : player_uid;
          let player = {
            name: player_name,
            uid: player_uid,
            good: 0,
            points: 0,
          };
          if (value.likes) {
            for (const [round_idx, player_likes] of Object.entries(
              value.likes
            )) {
              let round = this.rounds[round_idx];
              player_likes.forEach((element) => {
                if (round.qualified && round.qualified.includes(element)) {
                  player.points += round.points;
                  player.good += 1;
                }
              });
            }
          }

          ranking_list.push(player);
        }

        // order rank with default filter
        ranking_list.sort(
          (a, b) => parseFloat(b[this.rank_order]) - parseFloat(a[this.rank_order])
        );

        ranking_list.forEach((element, index) => {
          element["rank"] = index;
        });

        // order
        if (
          ranking_list.length > 0 &&
          ranking_list[0].hasOwnProperty(this.order)
        ) {
          ranking_list.sort(
            (a, b) => parseFloat(b[this.order]) - parseFloat(a[this.order])
          );
        }
        return ranking_list;
      },
    },
    n_qualified: {
      get() {
        let n = 0;
        for (const [key, value] of Object.entries(this.rounds)) {
          n += value.qualified ? value.qualified.length : 0;
        }
        return n;
      },
    },
  },
  methods: {
    is_me(player_uid) {
      return (
        this.$fire.auth.currentUser &&
        player_uid === this.$fire.auth.currentUser.uid
      );
    },
    is_filtered(user_info, data) {
      let ret = data.length === 0;
      data.forEach(element => {
        if (element.category === "Players" && element.name === user_info.pseudo) {
          ret = true;
          return;
        }
        if (element.category === "Countries" && element.name === user_info.country) {
          ret = true;
          return;
        }
        if('squads' in user_info && element.category === "Squads" && user_info.squads.includes(element.name)) {
          ret = true;
          return;
        }
      });

      return ret;
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined.active {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
