export const state = () => ({
    pseudo: "",
    country: "",
    squads: [],
    advanced: { ranking_filters: ["countries", "squads"], theme: "light", language: "en"},
})

export const mutations = {
    setUser(state, data) {
        state.pseudo = data && data.pseudo != null ? data.pseudo : "";
        state.country = data && data.country != null ? data.country : "";
        if (data && data.squads != null) {
            state.squads = typeof data.squads === "string" ? data.squads.split(",") : data.squads;
        } else {
            state.squads = [];
        }
    },
}

export const getters = {
    pseudo: state => state.pseudo,
    country: state => state.country,
    squads: state => state.squads,
    ranking_filters: state => state.advanced.ranking_filters,
    theme: state => state.advanced.theme,
    language: state => state.advanced.language,
    getUser(state) {
        return { pseudo: state.pseudo, country: state.country, squads: state.squads }
    },
}