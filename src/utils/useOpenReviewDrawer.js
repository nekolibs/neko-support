import { useModalsNavigation } from '@neko-os/ui'

export function useOpenReviewDrawer() {
  const { push } = useModalsNavigation()
  return () => push('reviews/edit')
}
