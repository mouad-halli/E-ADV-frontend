import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLocales } from "expo-localization"

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "fr";

i18n
	.use(initReactI18next)
	.init({
		fallbackLng: 'fr',
		lng: deviceLanguage,
		ns: ['login', 'home', 'appointments', 'products', 'presentation', 'navbar', 'common'], // namspaces
		defaultNS: 'home', // default namespace
		resources: {
			en: {
				login: require('@/locales/en/login.json'),
				home: require('@/locales/en/home.json'),
				navbar: require('@/locales/en/navbar.json'),
				appointments: require('@/locales/en/appointments.json'),
				products: require('@/locales/en/products.json'),
				presentation: require('@/locales/en/common.json'),
				common: require('@/locales/en/presentation.json'),
			},
	    	fr: {
	    		login: require('@/locales/fr/login.json'),
	    		home: require('@/locales/fr/home.json'),
				navbar: require('@/locales/fr/navbar.json'),
				appointments: require('@/locales/fr/appointments.json'),
				products: require('@/locales/fr/products.json'),
				presentation: require('@/locales/fr/presentation.json'),
				common: require('@/locales/fr/common.json'),
	    	},
	},
})

export default i18n