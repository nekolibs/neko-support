import { useNotifier } from '@neko-os/ui'
import { useState } from 'react'

import { SUPPORT_API_URL, SUPPORT_SUBDOMAIN, getMetadata } from '../../../../config'
import { GOOD_REVIEW_THRESHOLD, requestStoreReview } from '../../../../utils/requestStoreReview'
import { incGivenCount } from '../../../../utils/storage'

export function useSubmitReview() {
  const notifier = useNotifier()
  const [state, setState] = useState({ loading: false, error: null })

  const submit = async ({ value, comment }) => {
    setState({ loading: true, error: null })
    try {
      const res = await fetch(`${SUPPORT_API_URL}/rest/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          subdomain: SUPPORT_SUBDOMAIN,
        },
        body: JSON.stringify({ value, comment, ...getMetadata() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      incGivenCount()
      setState({ loading: false, error: null })
      const data = await res.json()
      if (value >= GOOD_REVIEW_THRESHOLD) requestStoreReview()
      return data
    } catch (e) {
      setState({ loading: false, error: e })
      notifier.error({ title: 'Error', description: e?.message })
      console.error(e)
      throw e
    }
  }

  return [submit, state]
}
