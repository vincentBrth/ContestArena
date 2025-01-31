<template>
  <div class="max-w-lg">
    <div v-if="true">
      <div class="block fixed inset-x-0 top-28 z-10" :class="theme_even">
        <!-- tabs -->
        <NavSubBar :modelValue="tab" @update:modelValue="(v) => (tab = v)" :tabs="_tabs" :theme_active="theme_active"
          :theme_inactive="theme_inactive" :theme_text="theme_text">
        </NavSubBar>
        <!-- filter -->
        <FormMultiSelect :modelValue="modelValue" :options="filters" class="flex justify-center px-6 py-2"
          @update:modelValue="(v) => $emit('update:modelValue', v)">
        </FormMultiSelect>
        <!-- display mode -->
        <div>
          <div v-if="focus == undefined && $store.getters['advanced/debugMode'].includes('grid')" class="flex justify-center px-6 py-2">
            <FormToggle label="grid" :modelValue="grid_mode" @update:modelValue="(v) => (grid_mode = v)"
              :theme_text="theme_text" :theme_bg="theme_active"></FormToggle>
          </div>
          <div v-if="focus != undefined"
            class="flex justify-center px-6 text-2xl cursor-pointer material-symbols-outlined" @click="focus = undefined">
            keyboard_return
          </div>
        </div>
      </div>
      <div class="mt-52">
        <div v-if="grid_mode == false && focus == undefined">
          <!-- ranks -->
          <table class="table-fixed">
            <thead>
              <tr :class="theme_text">
                <th scope="col" class="w-12"></th>
                <th scope="col"></th>
                <th scope="col" class="text-xs text-left first-letter:capitalize cursor-pointer w-[200px] pl-3"
                  :class="[order === 'candidate' ? 'underline' : '']" @click="order = 'candidate'">Candidate</th>
                <th scope="col" class="text-xs text-left first-letter:capitalize cursor-pointer w-[150px]"
                  :class="[order === 'votes' ? 'underline' : '']" @click="order = 'votes'">Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr class="select-none cursor-pointer h-14" v-for="( ranked, index ) in ranking_advanced "
                :key="ranked.candidate" :class="[theme_text, index % 2 ? theme_even : theme_odd]"
                @click="focus = [ranked.candidate]">
                <td class="text-left text-xs pl-3"># {{ ranked.rank + 1 }}</td>
                <td class="w-20"><img :src="ranked.candidate_data.asset[asset_in_use]" :title="ranked.candidate" /></td>
                <td class="pl-3 text-xs">{{ ranked.candidate }}</td>
                <td class="text-xs">{{ ranked.votes }}
                <span v-if="tab == 'all'">{{ ranked.voter.map((subarray) => subarray.length)}}
                </span>
                  ({{ (ranked.percent * 100).toFixed(0) }}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <!-- grid table -->
          <table class="table-fixed w-full mt-2">
            <thead>
              <tr>
                <th rowspan="2" class="w-[150px]"></th>
                <th v-for="(candidate, candidate_index) in ranking_grid.header" :colspan="_rounds_available.length"
                  class="w-[100px] text-xs" :class="[theme_text, candidate_index % 2 ? theme_even : theme_odd]">
                  {{ candidate.key }}
                </th>
              </tr>
              <tr>
                <th v-for="(candidate, candidate_index) in ranking_grid.header" :colspan="_rounds_available.length"
                  :class="[theme_text, candidate_index % 2 ? theme_even : theme_odd]"><img
                    class="object-top object-cover w-full h-36" :src="candidate.img" /></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, index) in ranking_grid.data" :class="[theme_text, index % 2 ? theme_even : theme_odd]">
                <td class="border-collapse border">{{ value.player }}</td>
                <td v-for="(vote, index2) in value.votes"
                  class="border-collapse border material-symbols-outlined table-cell text-center w-full"
                  :class="[vote == 1 ? 'text-emerald-400' : vote == 2 ? 'text-red-600' : vote < 0 ? 'bg-gray-50' : '']">
                  {{ vote > 0 ? 'check' : '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-else class="flex pt-28">
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
      order: "votes",
      tab: "all",
      grid_mode: false,
      focus: undefined,
    };
  },
  props: {
    players: {
      default: {},
      required: true,
      type: Object,
    },
    pool: {
      default: {},
      required: true,
      type: Object,
    },
    rounds: {
      default: [],
      required: true,
      type: Array,
    },
    tabs: {
      type: Object,
      default: {},
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
      default: "votes",
      type: String,
    },
    theme_active: {
      type: String,
      default: "bg-neutral-darkest",
    },
    theme_inactive: {
      type: String,
      default: "bg-neutral",
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
    asset_in_use: {
      default: 0,
      type: Number,
    },
  },
  emits: ["action:watch", "update:modelValue"],
  computed: {
    _tabs: {
      get() {
        let tabs = new Map();
        tabs.set("all", { name: "All" });
        for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(this.tabs)))) {
          if (this.focus != undefined) {
            value["disabled"] = true;
            this.focus.forEach((element) => {
              if (this.rounds[key].pool && this.rounds[key].pool.includes(element)) {
                value["disabled"] = false;
              }
            });
          }
          tabs.set(key.toString(), value);
        }
        return tabs;
      },
    },
    _rounds_available: {
      get() {
        let rounds_index = [];
        if (this.tab == "all") {
          for (const [index] of this.rounds.entries()) {
            if (this.rounds[index].watch) {
              rounds_index.push(index);
            }
          }
        } else {
          rounds_index.push(Number(this.tab));
        }
        return rounds_index;
      }
    },
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
    ranking_advanced: {
      get() {
        // initialize ranking
        let ranked = {};
        let nb_votes = 0;
        let rounds_index = [];
        this._rounds_available.forEach(entry => {
          rounds_index[entry] = [];
        });

        for (const key of Object.keys(this.pool)) {
          ranked[key] = rounds_index.map((entry) => []);
        }

        // add player votes
        for (const [player_uid, value] of Object.entries(this.players_filtered)) {
          const player_name = value.user_info && value.user_info.pseudo ? value.user_info.pseudo : player_uid;
          if (value.likes) {
            for (const [round_idx, player_likes] of Object.entries(
              value.likes
            )) {
              if (this._rounds_available.includes(Number(round_idx))) {
                player_likes.forEach((element) => {
                  ranked[element][round_idx].push(player_name);
                  nb_votes += 1;
                });
              }
            }
          }
        }
        // make a list
        let ranking_list = [];
        for (const [key, value] of Object.entries(ranked)) {
          // additional filter
          if (this.tab != "all") {
            if (!(this.rounds[this.tab].pool && this.rounds[this.tab].pool.includes(key))) {
              continue;
            }
          }
          const votes = value.flat().length;
          ranking_list.push({ candidate: key, candidate_data: this.pool[key], voter: value, votes: votes, percent: votes / nb_votes });
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
          if (typeof ranking_list[0][this.order] == "string") {
            ranking_list.sort((a, b) => {
              return a[this.order].toLowerCase() > b[this.order].toLowerCase() ? 1 : ((b[this.order].toLowerCase() > a[this.order].toLowerCase()) ? -1 : 0);
            });
          } else {
            ranking_list.sort(
              (a, b) => parseFloat(b[this.order]) - parseFloat(a[this.order])
            );
          }
        }
        return ranking_list;
      },
    },

    ranking_grid: {
      get() {
        let header = [];
        let data = [];

        // fill data votes
        for (const [player_uid, player_value] of Object.entries(this.players_filtered)) {
          let player_data = {};
          for (const round of this._rounds_available) {
            for (const candidate_key of Object.keys(this.pool)) {
              let player_candidate_data;
              if (this.rounds[round].pool && this.rounds[round].pool.includes(candidate_key)) {
                if (round in player_value.likes && player_value.likes[round].includes(candidate_key)) {
                  if (this.rounds[round].qualified) {
                    player_candidate_data = this.rounds[round].qualified.includes(candidate_key) ? 1 : 2;
                  } else {
                    player_candidate_data = 3;
                  }
                } else {
                  player_candidate_data = 0;
                }
              } else {
                player_candidate_data = -1;
              }
              player_data[candidate_key] = player_data[candidate_key] || [];
              player_data[candidate_key].push(player_candidate_data);
            }
          }
          data.push({ player: player_value.user_info.pseudo, votes: player_data });
        }
        data.sort((a, b) => {
          return a.player.toLowerCase() > b.player.toLowerCase() ? 1 : ((b.player.toLowerCase() > a.player.toLowerCase()) ? -1 : 0);
        });

        // filter
        this.ranking_advanced.forEach((element) => {
          if (this.focus == undefined || this.focus.includes(element.candidate)) {
            header.push({ key: element.candidate, img: element.candidate_data.asset[this.asset_in_use] });
          }
        });

        // format data for display
        data.forEach((element) => {
          let row = [];
          header.forEach((value) => {
            if (element.votes && value.key in element.votes) {
              row.push(element.votes[value.key].flat());
            } else {
              row.push(0);
            }
          });
          element.votes = row.flat();
        });
        return { header: header, data: data };
      }
    }
  },
  methods: {
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
        if ('squads' in user_info && element.category === "Squads" && user_info.squads.includes(element.name)) {
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
