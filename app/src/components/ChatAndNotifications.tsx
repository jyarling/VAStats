import { useState, useRef, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bell } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { selectNotifications, clearNotification } from '../notificationsSlice'
import { useAppDispatch, useAppSelector } from '../storeHooks'

export default function ChatAndNotifications() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [unread, setUnread] = useState(0)
  const messagesRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()
  const notifications = useAppSelector(selectNotifications)

  // show toast for each new notification
  const shown = useRef<Set<number>>(new Set())
  useEffect(() => {
    notifications.forEach(n => {
      if (!shown.current.has(n.id)) {
        shown.current.add(n.id)
        toast(n.message, { id: String(n.id), duration: 5000, position: 'bottom-right' })
        setTimeout(() => dispatch(clearNotification(n.id)), 5000)
      }
    })
  }, [notifications, dispatch])

  useEffect(() => {
    if (open) setUnread(0)
  }, [open])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages([...messages, text])
    setInput('')
    if (!open) setUnread(v => v + 1)
    requestAnimationFrame(() => {
      messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight })
    })
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="fixed right-2 top-2 z-40">
        <button onClick={() => setOpen(!open)} className="relative rounded-full p-2">
          <Bell className="h-6 w-6" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
              {unread}
            </span>
          )}
        </button>
      </div>
      <Dialog open={open} onClose={setOpen} className="fixed inset-y-0 left-0 z-40 flex">
        <Dialog.Panel className="flex h-full w-[200px] flex-col bg-white shadow-lg dark:bg-[#101a23]">
          <div className="flex items-center justify-between border-b p-2">
            <Dialog.Title className="font-semibold">Community Chat</Dialog.Title>
            {unread > 0 && (
              <span className="ml-2 rounded-full bg-red-600 px-2 text-xs text-white">
                {unread}
              </span>
            )}
          </div>
          <div ref={messagesRef} className="flex-1 space-y-1 overflow-y-auto p-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className="rounded bg-gray-200 p-1 dark:bg-gray-700">
                {m}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-2">
            <input
              className="w-full rounded border px-2 py-1 text-sm dark:bg-[#223649]"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
