import { supportCS } from './cs'
import { supportDA } from './da'
import { supportDE } from './de'
import { supportEL } from './el'
import { supportEN } from './en'
import { supportES } from './es'
import { supportFI } from './fi'
import { supportFR } from './fr'
import { supportHI } from './hi'
import { supportHU } from './hu'
import { supportID } from './id'
import { supportIT } from './it'
import { supportJA } from './ja'
import { supportKO } from './ko'
import { supportNL } from './nl'
import { supportNO } from './no'
import { supportPL } from './pl'
import { supportPT } from './pt'
import { supportRO } from './ro'
import { supportRU } from './ru'
import { supportSV } from './sv'
import { supportTH } from './th'
import { supportTR } from './tr'
import { supportUK } from './uk'
import { supportVI } from './vi'
import { supportZH } from './zh'

const locales = {
  cs: supportCS,
  da: supportDA,
  de: supportDE,
  el: supportEL,
  en: supportEN,
  es: supportES,
  fi: supportFI,
  fr: supportFR,
  hi: supportHI,
  hu: supportHU,
  id: supportID,
  it: supportIT,
  ja: supportJA,
  ko: supportKO,
  nl: supportNL,
  no: supportNO,
  pl: supportPL,
  pt: supportPT,
  ro: supportRO,
  ru: supportRU,
  sv: supportSV,
  th: supportTH,
  tr: supportTR,
  uk: supportUK,
  vi: supportVI,
  zh: supportZH,
}

export function registerSupportLocales(i18n) {
  Object.entries(locales).forEach(([lang, data]) => {
    if (i18n.resources[lang]) {
      i18n.addResources(lang, 'support', data)
    }
  })
}
