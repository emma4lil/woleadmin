export const state = () => ({
    chats: []
})

export const mutations = {
    push_chat(state, chat) {
        state.chats.push(chat)
    },
    push_chats(state, chats) {
        chats.forEach(element => {
            state.chats.push(element)
        });
    }
}
