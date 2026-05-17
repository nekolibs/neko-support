import { useNotifier } from '@neko-os/ui'
import { useState } from 'react'

import { SUPPORT_API_URL, SUPPORT_SUBDOMAIN, getMetadata } from '../../../../config'

export function useSubmitContact() {
  const notifier = useNotifier()
  const [state, setState] = useState({ loading: false, error: null })

  const submit = async ({ type, name, email, content }) => {
    setState({ loading: true, error: null })
    try {
      const res = await fetch(`${SUPPORT_API_URL}/rest/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          subdomain: SUPPORT_SUBDOMAIN,
        },
        body: JSON.stringify({ type, name, email, content, ...getMetadata() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState({ loading: false, error: null })
      return await res.json()
    } catch (e) {
      setState({ loading: false, error: e })
      notifier.error({ title: 'Error', description: e?.message })
      console.error(e)
      throw e
    }
  }

  return [submit, state]
}
