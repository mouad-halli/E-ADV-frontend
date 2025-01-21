import { useRef, useState, useCallback, useEffect } from 'react';
import { AppState } from 'react-native';
import { SlidesInteractionTracker } from '@/services/SlidesInteractionTracker';
import { productSlideType } from '@/types/productSlide';

const useSlideTimeTracker = (
    currentSlideIndex: number,
    slides: { id: string }[],
    presentedSlides: productSlideType[],
    setTimeSpent: (slideId: string, timeSpent: number) => void
) => {
    const startTimeRef = useRef<number | null>(null)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        console.log("child render")
        startTimer()

        AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                console.log(`app going to background or inactive...`)
                stopTimer()
                SlidesInteractionTracker.syncInteractions()
            }
        })

        return () => {
            console.log("child clean up")
            stopTimer() // stop and set time spent on slide change
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
                
                const slide = presentedSlides.find(presentedSlide => String(presentedSlide.slideId) === String(slideId))
                if (slide) {
                    slide.timeSpent += timeSpent / 1000
                    setTimeSpent(slideId, timeSpent / 1000)
                    SlidesInteractionTracker.saveProductSlideToStorage(slide)
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