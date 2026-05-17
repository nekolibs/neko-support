import { useModalsNavigation } from '@neko-os/ui'

export function useOpenContactDrawer() {
  const { push } = useModalsNavigation()
  return () => push('contacts/edit')
}
