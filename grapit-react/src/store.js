import {configureStore} from '@reduxjs/toolkit'
import user from './store/userSlice'
import chat from './store/chatSlice'

export default configureStore({
    reducer: {
        user: user.reducer,
        chat: chat.reducer
    }
})