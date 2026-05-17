import { Storage } from '@neko-os/ui'

import { COUNT_KEY, GIVEN_KEY } from './storage'
import { useOpenReviewDrawer } from './useOpenReviewDrawer'

export function useReviewPrompt({ at = [], max } = {}) {
  const open = useOpenReviewDrawer()
  const [count, setCount] = Storage.useState(COUNT_KEY, 0)
  const [given] = Storage.useState(GIVEN_KEY, 0)

  return () => {
    const next = count + 1
    setCount(next)
    if (max != null && given >= max) return
    if (at.includes(next)) open()
  }
}
