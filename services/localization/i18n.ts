import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from "expo-localization"

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "fr";

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		lng: deviceLanguage,
		ns: ['login', 'home', 'appointments', 'presentation'], // namspaces
		defaultNS: 'home', // default namespace
		resources: {
			en: {
				login: require('@/locales/en/login.json'),
			},
	    	fr: {
	    		login: require('@/locales/fr/login.json'),
	    	},
	},
})

export default i18n