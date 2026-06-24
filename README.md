# neko-support

Drop-in support module for React Native (Expo) apps built with `@neko-os/ui`. Provides contact form, review/rating drawer, smart review prompting, and App Store review requests — with i18n support for 26 languages.

## Peer Dependencies

- `@neko-os/ui`
- `expo-store-review`
- `i18next`

## Configuration

Environment variables (or defaults):

| Variable | Default | Description |
|----------|---------|-------------|
| `EXPO_PUBLIC_SUPPORT_API` | `http://localhost:4000` | Support API base URL (leave to use default) |
| `EXPO_PUBLIC_SUPPORT_SUBDOMAIN` | `kora` | App identifier sent as `subdomain` header |

## Setup

### 1. Register locales

Call once at app boot, after i18n is initialized:

```jsx
import { registerSupportLocales } from 'neko-support'

registerSupportLocales(i18n)
```

### 2. Register modal routes

Both drawers use `@neko-os/ui` modal navigation:

```jsx
import { EditContactDrawer, EditReviewDrawer } from 'neko-support'

// Inside your ModalRoutes
<Modal.Screen name="contacts/edit" component={EditContactDrawer} />
<Modal.Screen name="reviews/edit" component={EditReviewDrawer} />
```

### 3. Add support section (optional)

Pre-built settings section with review + contact links:

```jsx
import { SupportSection } from 'neko-support'

<SupportSection />
```

## Exports

### Components

| Export | Description |
|--------|-------------|
| `SupportSection` | Settings section with review and contact links. |
| `ContactSectionItemLink` | Standalone "Contact us" link that opens the contact drawer. |
| `ReviewSectionItemLink` | Standalone "Leave a review" link that opens the review drawer. |
| `EditContactDrawer` | Contact form drawer (type, name, email, message). Submits to support API. |
| `EditReviewDrawer` | Review drawer (star rating + optional comment). Submits to support API. Triggers App Store review for ratings >= 4. |

### Hooks

| Export | Description |
|--------|-------------|
| `useOpenContactDrawer()` | Returns a function that opens the contact drawer. |
| `useOpenReviewDrawer()` | Returns a function that opens the review drawer. |
| `useReviewPrompt(options)` | Returns a trigger function for smart review prompting. Call it on meaningful actions — opens the review drawer at configured intervals. |

### Functions

| Export | Description |
|--------|-------------|
| `registerSupportLocales(i18n)` | Registers the `support` namespace into an existing i18next instance for all 26 supported languages. |

## useReviewPrompt

Smart prompting — ask for reviews at the right moments without spamming users.

```jsx
const triggerReview = useReviewPrompt({
  at: [5, 20, 50],  // show review drawer on 5th, 20th, 50th trigger
  max: 3,           // stop prompting after 3 reviews given
})

// Call on meaningful user actions
function onGoalCompleted() {
  triggerReview()
}
```

| Option | Type | Description |
|--------|------|-------------|
| `at` | `number[]` | Trigger counts at which to show the review drawer. |
| `max` | `number` | Max number of reviews before prompting stops. |

State persisted via `@neko-os/ui` Storage under keys `reviews:count`, `reviews:givenCount`, `reviews:storeRequested`.

## Review Flow

1. User triggers review (via `useReviewPrompt` or `ReviewSectionItemLink`)
2. `EditReviewDrawer` opens — star rating + optional comment
3. Review submitted to `POST /rest/reviews` with `subdomain` header
4. If rating >= 4, native App Store review dialog requested (once per app lifetime via `expo-store-review`)

## Contact Form

Fields: type (bug/feedback/question/other), name, email, message.

Submits to `POST /rest/contacts` with `subdomain` header. Success shows toast notification.

## API Endpoints

Both endpoints expect JSON body and a `subdomain` header:

| Method | Path | Body |
|--------|------|------|
| `POST` | `/rest/reviews` | `{ value: number, comment?: string }` |
| `POST` | `/rest/contacts` | `{ type: string, name: string, email: string, content: string }` |

## i18n

Namespace: `support`

26 languages: cs, da, de, el, en, es, fi, fr, hi, hu, id, it, ja, ko, nl, no, pl, pt, ro, ru, sv, th, tr, uk, vi, zh.

Translation keys organized under `reviews` and `contacts` groups. See `locales/en.js` for full key reference.
