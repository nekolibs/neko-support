import {
  Form,
  FormItem,
  KeyboardAvoidingView,
  Link,
  RateInput,
  SubmitButton,
  TextArea,
  TopBar,
  View,
  useModalsNavigation,
  useNotifier,
  useTranslation,
} from '@neko-os/ui'

import { useSubmitReview } from './_request/submitReview'

export default function EditReviewDrawer() {
  const { t } = useTranslation('support')
  const { goBack } = useModalsNavigation()
  const notifier = useNotifier()
  const [submit, { loading }] = useSubmitReview()

  const handleSubmit = async (values) => {
    try {
      await submit(values)
      notifier.info(t('reviews.thanks'))
      goBack()
    } catch (e) {
      // error toast already shown by useSubmitReview
    }
  }

  return (
    <Form flex onSubmit={handleSubmit} gap={0}>
      <KeyboardAvoidingView flex>
        <TopBar title={t('reviews.title')} subtitle={t('reviews.subtitle')} useSafeArea={false} borderB marginT={-15} />
        <View padding="md" gap="md" flex>
          <FormItem name="value" center rules={[{ required: true }]}>
            <RateInput xxxl color="yellow" />
          </FormItem>

          <FormItem name="comment" flex>
            <TextArea placeholder={t('reviews.commentPlaceholder')} flex />
          </FormItem>

          <View gap="sm">
            <Link onPress={goBack} label={t('reviews.maybeLater')} center paddingH="sm" paddingV="xxs" strong />
            <SubmitButton loading={loading} label={t('reviews.submit')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Form>
  )
}
