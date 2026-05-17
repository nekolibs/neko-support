import {
  Form,
  FormItem,
  KeyboardAvoidingView,
  Select,
  SubmitButton,
  TextArea,
  TextInput,
  TopBar,
  View,
  useModalsNavigation,
  useNotifier,
  useTranslation,
} from '@neko-os/ui'

import { useSubmitContact } from './_request/submitContact'

const DEFAULT_VALUES = { type: 'bug', name: '', email: '', content: '' }

export default function EditContactDrawer() {
  const { t } = useTranslation('support')
  const { goBack } = useModalsNavigation()
  const notifier = useNotifier()
  const [submit, { loading }] = useSubmitContact()

  const typeOptions = [
    { value: 'bug', label: t('contacts.types.bug') },
    { value: 'feedback', label: t('contacts.types.feedback') },
    { value: 'question', label: t('contacts.types.question') },
    { value: 'other', label: t('contacts.types.other') },
  ]

  const handleSubmit = async (values) => {
    try {
      await submit(values)
      notifier.info(t('contacts.thanks'))
      goBack()
    } catch (e) {
      // error toast already shown by useSubmitContact
    }
  }

  return (
    <Form flex onSubmit={handleSubmit} initialValues={DEFAULT_VALUES} gap={0}>
      <KeyboardAvoidingView flex>
        <TopBar
          title={t('contacts.title')}
          subtitle={t('contacts.subtitle')}
          useSafeArea={false}
          borderB
          marginT={-15}
        />

        <View padding="md" gap="md" flex>
          <FormItem name="type" label={t('contacts.type')} rules={[{ required: true }]}>
            <Select options={typeOptions} />
          </FormItem>

          <FormItem name="name" label={t('contacts.name')} rules={[{ required: true }]}>
            <TextInput placeholder={t('contacts.namePlaceholder')} autoCapitalize="words" />
          </FormItem>

          <FormItem name="email" label={t('contacts.email')} rules={{ required: true, type: 'email' }}>
            <TextInput
              placeholder={t('contacts.emailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </FormItem>

          <FormItem name="content" label={t('contacts.content')} rules={[{ required: true }]} flex>
            <TextArea placeholder={t('contacts.contentPlaceholder')} flex />
          </FormItem>

          <SubmitButton loading={loading} label={t('contacts.send')} sm />
        </View>
      </KeyboardAvoidingView>
    </Form>
  )
}
