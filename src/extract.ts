import * as chrono from 'chrono-node';
import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";

dayjs.extend(objectSupport);

type PossibleChromeUILanguages =
  | 'en' | 'en-US' | 'en-GB'
  | 'ja' | 'ko'
  | 'fr' | 'de' | 'it'
  | 'zh' | 'zh-CN' | 'zh-TW'
  | 'es' | 'es-419'
  | 'ru' | 'pt' | 'pt-BR'
  | string;

type Locale = "ja" | "en" | "es" | "de" | "fr" | "nl" | "pt" | "ru" | "uk" | "zh"

const Locales:Locale[] = [
	"en",
	"uk",
	"es",
	"de",
  "fr",
	"pt",
	"nl",
	"ru",
	"zh",
  "ja",
];

const getChronoParser = (locale: Locale) => {
  switch (locale) {
    case 'de':
      return chrono.de;
    case 'fr':
      return chrono.fr;
    case 'nl':
      return chrono.nl;
    case 'pt':
      return chrono.pt;
    case 'ru':
      return chrono.ru;
    case 'zh':
      return chrono.zh;
    case 'ja':
      return chrono.ja;
    case 'es':
      return chrono.es;
    case 'uk':
      return chrono.uk;
    case 'en':
    default:
      return chrono.en;
  }
};

function chromeLang2ChronoLocale(userLang: PossibleChromeUILanguages): Locale {
  switch (userLang) {
    case 'ja':
      return 'ja';
    case 'es':
    case 'es-419':
      return 'es'
    case 'de':
      return 'de'
    case 'fr':
      return 'fr'
    case 'pt':
    case 'pt-BR':
      return 'pt'
    case 'nl':
      return 'nl'
    case 'ru':
      return 'ru'
    case 'zh':
    case 'zh-CN':
    case 'zh-TW':
      return 'zh'
    case 'uk':
      return 'uk'
    case 'en':
    case 'en-US':
    case 'en-GB':
    default:
      return 'en';
}}


function moveItemToStart(arr: Locale[], item: Locale): Locale[] {
  return [item, ...arr.filter(el => el !== item)];
}

/**
 * Extracts date and time from the given text using chrono-node library.
 * @param {string} text - The text to extract date and time from.
 * @param {PossibleChromeUILanguages} userLang - The language of the user interface. This language is used to determine the order of date parsers.
 * @returns {Object} An object containing the text without date, start date time, and end date time.
 */
function extractDateTime(text: string, userLang: PossibleChromeUILanguages) {  
  const convertedUserLang = chromeLang2ChronoLocale(userLang);
  const orderdLocales = moveItemToStart(Locales, convertedUserLang);

  let parsedResult: chrono.ParsedResult[] = [];
  for (const locale of orderdLocales) {
    parsedResult = getChronoParser(locale).parse(text);
    if (parsedResult.length > 0) break;
  }

  if (parsedResult.length === 0) {
    return {
      textWithoutDate: text,
      startDateTime: undefined,
      endDateTime: undefined
    };
  }

  return {
    textWithoutDate: text.replace(parsedResult[0].text, ""),
    startDateTime: dayjs(parsedResult[0].start.date()),
    endDateTime: parsedResult[0].end ?  dayjs(parsedResult[0].end.date()) : dayjs(parsedResult[0].start.date()).add(1, 'hour')
  };
}

export { extractDateTime };
