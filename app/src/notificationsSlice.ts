import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import type { RootState } from './store'

export interface NotificationsState {
  unreadCount: number
}

const initialState: NotificationsState = {
  unreadCount: 2,
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
  },
})

export const { setUnreadCount, markAllRead } = notificationsSlice.actions
export default notificationsSlice.reducer

export const selectUnreadCount = (state: RootState) =>
  state.notifications.unreadCount

export function useNotifications() {
  const dispatch = useAppDispatch()
  const unreadCount = useAppSelector(selectUnreadCount)

  return {
    unreadCount,
    setUnreadCount: (count: number) => dispatch(setUnreadCount(count)),
    markAllRead: () => dispatch(markAllRead()),
  }
}
