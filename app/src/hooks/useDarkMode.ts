import { useEffect } from 'react'

export default function useDarkMode(theme: 'light' | 'dark') {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
}
