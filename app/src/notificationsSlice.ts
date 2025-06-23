import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface ToastNotification {
  id: number
  message: string
}

export interface NotificationsState {
  unreadCount: number
  notifications: ToastNotification[]
}

const initialState: NotificationsState = {
  unreadCount: 2,
  notifications: [],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setUnreadCount(state, action: PayloadAction<number>) {
      state.unreadCount = action.payload
    },
    markAllRead(state) {
      state.unreadCount = 0
    },
    addNotification(state, action: PayloadAction<string>) {
      state.notifications.push({ id: Date.now(), message: action.payload })
    },
    clearNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { setUnreadCount, markAllRead, addNotification, clearNotification } = notificationsSlice.actions
export default notificationsSlice.reducer

export const selectUnreadCount = (state: RootState) =>
  state.notifications.unreadCount

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications

