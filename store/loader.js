export const state = () => ({
    visible: 0,
})

export const mutations = {
    setVisible(state, data) {
        if (typeof data == 'number') {
            state.visible += data;
            if (state.visible < 0) {
                state.visible = 0;
            }
        } else {
            console.warn('Spin:visible required a number')
        }
    },
}

export const getters = {
    visible: state => state.visible > 0,
}