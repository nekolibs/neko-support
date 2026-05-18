# neko-support

Support module for React Native apps using `@neko-os/ui`. Contact forms, review/rating, smart review prompting.

## Structure

```
support/
├── index.js                        # Public exports
├── config.js                       # API URL + subdomain (env vars)
├── locales/                        # i18n translations (26 languages)
│   ├── index.js                    # registerSupportLocales()
│   └── <lang>.js                   # One file per language
├── containers/
│   ├── SupportSection.js           # Pre-built settings section (review + contact links)
│   ├── ContactSectionItemLink.js   # "Contact us" link
│   └── ReviewSectionItemLink.js    # "Leave a review" link
├── utils/
│   ├── useOpenContactDrawer.js     # Opens contact modal
│   ├── useOpenReviewDrawer.js      # Opens review modal
│   ├── useReviewPrompt.js          # Smart review prompting logic
│   ├── requestStoreReview.js       # Native App Store review (expo-store-review)
│   └── storage.js                  # Storage keys for review state
└── views/
    ├── contacts/edit/
    │   ├── EditContactDrawer.js    # Contact form (type, name, email, message)
    │   └── _request/
    │       └── submitContact.js    # POST /rest/contacts
    └── reviews/edit/
        ├── EditReviewDrawer.js     # Review form (star rating + comment)
        └── _request/
            └── submitReview.js     # POST /rest/reviews + store review trigger
```

## Key Patterns

- All UI built with `@neko-os/ui` modifiers (no raw StyleSheet)
- Drawers use `@neko-os/ui` modal navigation (`useModalsNavigation`)
- API calls go to configurable backend (`config.js`) with `subdomain` header
- i18n namespace is `support` — registered externally via `registerSupportLocales(i18n)`
- One `useTranslation('support')` per component, no aliasing
- Review state persisted via `@neko-os/ui` Storage (count, givenCount, storeRequested)
- App Store review triggered once per lifetime when rating >= 4 (`GOOD_REVIEW_THRESHOLD`)

## Adding a Language

1. Create `locales/<lang>.js` exporting `support<LANG>` object (copy structure from `en.js`)
2. Import and add to `locales` map in `locales/index.js`

## Request Metadata

Apps can attach extra fields to every contact and review request via `setGetMetadata`. Call once at app init — the function is invoked on each submit and its return value is spread into the request body.

```js
import { setGetMetadata } from '@neko-os/support'

setGetMetadata(() => ({
  device_id: Storage.get('analytics:deviceId'),
  app_version: '1.2.0',
}))
```

Do not import app-specific modules inside the support lib. Use `setGetMetadata` to inject external data from the consumer.

## API

Both endpoints expect JSON + `subdomain` header. Backend is the shared `nekoapps` API. Metadata fields from `setGetMetadata` are merged into every request.

- `POST /rest/contacts` — `{ type, name, email, content, ...metadata }`
- `POST /rest/reviews` — `{ value, comment?, ...metadata }`
