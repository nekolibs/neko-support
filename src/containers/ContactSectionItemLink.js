import { SectionItemLink, useTranslation } from '@neko-os/ui'

import { useOpenContactDrawer } from '../utils/useOpenContactDrawer'

export default function ContactSectionItemLink(props) {
  const { t } = useTranslation('support')
  const open = useOpenContactDrawer()

  return <SectionItemLink onPress={open} label={t('contacts.linkLabel')} icon="mail-line" {...props} />
}
