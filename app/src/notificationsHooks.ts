import { useAppDispatch, useAppSelector } from './storeHooks'
import {
  setUnreadCount,
  markAllRead,
  addNotification,
  clearNotification,
  selectUnreadCount,
  selectNotifications,
} from './notificationsSlice'

export function useNotifications() {
  const dispatch = useAppDispatch()
  const unreadCount = useAppSelector(selectUnreadCount)
  const notifications = useAppSelector(selectNotifications)

  return {
    unreadCount,
    setUnreadCount: (count: number) => dispatch(setUnreadCount(count)),
    markAllRead: () => dispatch(markAllRead()),
    addNotification: (msg: string) => dispatch(addNotification(msg)),
    clearNotification: (id: number) => dispatch(clearNotification(id)),
    notifications,
  }
}
