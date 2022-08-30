import Vue from 'vue'

export const state = () => ({
  chats: [],
  notifications: {},
})

export const mutations = {
  push_chat(state, chat) {
    state.chats.push(chat)
    let id = `${chat.TradeId}`
    console.log('push_chat', id)

    if (state.notifications[id] == undefined) {
      state.notifications[id] = "0"
      Vue.set(state.notifications[id], 1)
    }
    Vue.set(state.notifications[id], state.notifications[id] + 1)
  },
  push_chats(state, chats) {
    chats.forEach(element => {
      state.chats.push(element)
    });
  }
}
