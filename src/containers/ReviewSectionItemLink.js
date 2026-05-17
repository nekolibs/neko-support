import { SectionItemLink, useTranslation } from '@neko-os/ui'

import { useOpenReviewDrawer } from '../utils/useOpenReviewDrawer'

export default function ReviewSectionItemLink(props) {
  const { t } = useTranslation('support')
  const open = useOpenReviewDrawer()

  return <SectionItemLink onPress={open} label={t('reviews.linkLabel')} icon="star-line" {...props} />
}
