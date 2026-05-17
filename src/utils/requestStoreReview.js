import * as StoreReview from 'expo-store-review'

import { markStoreReviewRequested, wasStoreReviewRequested } from './storage'

export const GOOD_REVIEW_THRESHOLD = 4

export async function requestStoreReview() {
  if (wasStoreReviewRequested()) return
  try {
    if (await StoreReview.isAvailableAsync()) {
      await StoreReview.requestReview()
      markStoreReviewRequested()
    }
  } catch (e) {
    console.warn('Store review request failed', e)
  }
}
