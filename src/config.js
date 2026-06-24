export const SUPPORT_API_URL = process.env.EXPO_PUBLIC_SUPPORT_API || 'https://analytics.nekoapps.net'
export const SUPPORT_SUBDOMAIN = process.env.EXPO_PUBLIC_SUPPORT_SUBDOMAIN || 'kora'

let _getMetadata = () => ({})
export const setGetMetadata = (fn) => {
  _getMetadata = fn
}
export const getMetadata = () => _getMetadata()
