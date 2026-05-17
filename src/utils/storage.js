import { Storage } from '@neko-os/ui'

export const COUNT_KEY = 'reviews:count'
export const GIVEN_KEY = 'reviews:givenCount'
export const STORE_REQUESTED_KEY = 'reviews:storeRequested'

export const incGivenCount = () => Storage.set(GIVEN_KEY, (Storage.get(GIVEN_KEY) || 0) + 1)

export const wasStoreReviewRequested = () => !!Storage.get(STORE_REQUESTED_KEY)
export const markStoreReviewRequested = () => Storage.set(STORE_REQUESTED_KEY, true)
