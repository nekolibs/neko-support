import { Section, useTranslation } from '@neko-os/ui'

import ContactSectionItemLink from './ContactSectionItemLink'
import ReviewSectionItemLink from './ReviewSectionItemLink'

export default function SupportSection(props) {
  const { t } = useTranslation('support')

  return (
    <Section title={t('title')} marginH="md" {...props}>
      <ReviewSectionItemLink />
      <ContactSectionItemLink />
    </Section>
  )
}
