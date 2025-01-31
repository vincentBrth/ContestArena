export const state = () => ({
    debugMode: [],
})

export const mutations = {
    addDebugMode(state, mode) {
        state.debugMode.push(mode);
    },
}

export const getters = {
    debugMode: state => state.debugMode,
}