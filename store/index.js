export const state = () => ({
  pages: [],
  grants: [],
  news: []
})

export const mutations = {
  SET_PAGES(state, pages) {
    state.pages = pages
  },
  SET_GRANTS(state, grants) {
    state.grants = grants
  },
  SET_NEWS(state, news) {
    state.news = news
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const pages = await require('@/api/pages.json')
    commit('SET_PAGES', pages)
    const grants = await require('@/api/grants.json')
    commit('SET_GRANTS', grants)
    const news = await require('@/api/news.json')
    commit('SET_NEWS', news)
    console.log('json data loaded')
  }
}

export const getters = {
  grants: (state, getters) => {
    return state.grants
  },
  pages: (state, getters) => {
    return state.pages
  },
  news: (state, getters) => {
    return state.news
  }
}
