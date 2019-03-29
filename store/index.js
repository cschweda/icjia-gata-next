export const state = () => ({
  pages: [],
  grants: []
})

export const mutations = {
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  SET_GRANTS(state, grants) {
    state.grants = grants
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const pages = await require('@/api/pages.json')
    commit('SET_PAGES', pages)
    const grants = await require('@/api/grants.json')
    commit('SET_GRANTS', grants)
    console.log('json data loaded')
  }
}

export const getters = {
  grants: (state, getters) => {
    return state.grants
  },
  pages: (state, getters) => {
    return state.pages
  }
}
