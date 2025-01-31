export const state = () => ({
    password: "",
    ranking_filter: [],
})

export const mutations = {
    setPassword(state, password) {
        state.password = password;
    },
    setRankingFilter(state, ranking_filter) {
        state.ranking_filter = ranking_filter;
    },
}

export const getters = {
    password: state => state.password,
    ranking_filter: state => state.ranking_filter,
}