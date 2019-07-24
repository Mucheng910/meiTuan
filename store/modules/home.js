const state = () => ({
  menu: []
})

const mutations = {
  setMenu(state, val) {
    state.menu = val
  }
}
const actions = {
  setMenu: ({commit}, menu) => {
    commit('setMenu', menu)
  }
}

export default {
  namespaces: true,
  state,
  mutations,
  actions
}


