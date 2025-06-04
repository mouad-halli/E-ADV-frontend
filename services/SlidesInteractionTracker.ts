import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';
import { INTERACTIONS_KEY, INTERACTIONS_SYNC_INTERVAL } from '@/constants/FeedbackSlides';
import { productSlideType } from '@/types/productSlide';
import $api from '@/services/Api/API';

let syncIntervalId: NodeJS.Timeout | null
let isSyncing = false

export const SlidesInteractionTracker = {

    //Save a feedback interaction to the local storage
    async saveProductSlideToStorage(productSlide: productSlideType): Promise<void> {
        try {
            // console.log('saving slide to storage...', productSlide.id)

            const storedData = await AsyncStorage.getItem(INTERACTIONS_KEY)
            const storedSlides: productSlideType[] = storedData ? JSON.parse(storedData) : []
            const idx = storedSlides.findIndex(slide => slide.id === productSlide.id)
            
            if (idx !== -1)
                storedSlides[idx] = productSlide
            else
                storedSlides.push(productSlide)
            await AsyncStorage.setItem(INTERACTIONS_KEY, JSON.stringify(storedSlides))
        } catch (error) {
            console.error('Error saving interaction:', error)
        }
    },

    //Sync interactions with the server
    async syncInteractions(): Promise<void> {
        if (isSyncing)
            return

        isSyncing = true

        try {
            const storedData = await AsyncStorage.getItem(INTERACTIONS_KEY)
            const storedSlides: productSlideType[] = storedData ? JSON.parse(storedData) : []
            console.log("syncing product slides to server...", storedSlides.map(slide => slide.id))

            if (storedSlides.length === 0)
                return

            const failedSlides: productSlideType[] = []

            await Promise.all(storedSlides.map(async (slide) => {
                try {
                    await $api.put(`/productSlide/${slide.id}`, slide)
                } catch (error: any) {
                    const errResponse = (error?.response?.data) || error?.message
                    console.error('error syncing slide:', errResponse)
                    failedSlides.push(slide)
                }
            }))

            if (failedSlides.length > 0) {
                await AsyncStorage.setItem(INTERACTIONS_KEY, JSON.stringify(failedSlides))
            } else {
                await AsyncStorage.removeItem(INTERACTIONS_KEY)
            }

        } catch (error) {
            console.error('Error syncing interactions:', error)
        } finally {
            isSyncing = false
        }
    },

    //Start the background sync process
    startSyncing(): void {

        if (syncIntervalId)
            return

        // console.log('Starting sync every', INTERACTIONS_SYNC_INTERVAL / 1000, 'seconds.')

        syncIntervalId = setInterval(() => {
            this.syncInteractions()
        }, INTERACTIONS_SYNC_INTERVAL)
    },

    //Stop the background sync process
    stopSyncing(): void {

        // console.log('stopping sync')
        
        if (!syncIntervalId)
            return

        clearInterval(syncIntervalId)
        syncIntervalId = null
    },

    isAppSyncing() {
        return isSyncing
    },

    //Listen for network and app state changes
    listenForAppStateChanges(): void {
        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                // console.log('app going to background, syncing interactions...')
                this.syncInteractions()
                this.stopSyncing()
            }
            else if (nextAppState === "active"){
                // console.log("app back again")
                this.startSyncing()
            }
        })
    },

    listenForNetworkStateChange(): void {
        NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                // console.log('Network reconnected, syncing interactions...')
                this.syncInteractions()
            }
        })
    }
}
