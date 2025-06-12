import { useRef, useState, useCallback, useEffect } from 'react';
import { AppState } from 'react-native';
import { SlidesInteractionTracker } from '@/services/SlidesInteractionTracker';
import { productSlideType } from '@/types/productSlide';
import { usePresentationContext } from '@/contexts/presentationContext';

const useSlideTimeTracker = (
    currentSlideIndex: number,
    slides: { id: string }[],
    presentedSlides: productSlideType[] | undefined,
    setTimeSpent: (slideId: string, timeSpent: number) => void
) => {
    const { updateLocalProductPresentationSummary } = usePresentationContext()
    const startTimeRef = useRef<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        // console.log("child render")
        startTimer()

        // AppState.addEventListener('change', async (nextAppState) => {
        //     if (nextAppState === 'background' || nextAppState === 'inactive') {
        //         console.log(`app going to background or inactive...`)
        //         stopTimer()
        //         SlidesInteractionTracker.syncInteractions()
        //     }
        // })

        return () => {
            stopTimer() // stop and set time spent on slide change
            updateLocalProductPresentationSummary()
        }
    }, [currentSlideIndex])


    const startTimer = () => {
        if (!isPaused)
            startTimeRef.current = Date.now()
    }

    // stop and set time spent
    const stopTimer = useCallback(() => {
        
        if (startTimeRef.current !== null) {
            const timeSpent = Date.now() - startTimeRef.current
            const slideId = slides[currentSlideIndex]?.id

            if (slideId) {
                
                const slide = presentedSlides?.find(presentedSlide => String(presentedSlide.slideId) === String(slideId))
                if (slide) {
                    const timeToSeconds = timeSpent / 1000
                    if (timeToSeconds >= 3) {
                        slide.timeSpent += timeToSeconds
                        setTimeSpent(slideId, timeToSeconds)
                        SlidesInteractionTracker.saveProductSlideToStorage(slide)
                    }
                }
            }

            startTimeRef.current = null
        }
    }, [currentSlideIndex, slides, presentedSlides])

    // pause the timer and set time spent
    const pauseTimer = useCallback(() => {
        stopTimer()
        setIsPaused(true)
    }, [currentSlideIndex, slides, presentedSlides])

    // resume the timer
    const resumeTimer = useCallback(() => {
        if (isPaused) {
            startTimeRef.current = Date.now()
            setIsPaused(false)
        }
    }, [isPaused])

    return {
        pauseTimer,
        resumeTimer,
    }
}

export default useSlideTimeTracker