import { gsap } from 'gsap';
import { RefObject, useCallback, useEffect } from 'react';

interface AnimationRefs {
    containerRef: RefObject<HTMLDivElement | null>;
    uploadAreaRef: RefObject<HTMLDivElement | null>;
    processingRef: RefObject<HTMLDivElement | null>;
    resultsRef: RefObject<HTMLDivElement | null>;
    beforeImageRef: RefObject<HTMLImageElement | null>;
    afterImageRef: RefObject<HTMLImageElement | null>;
    buttonsRef: RefObject<HTMLDivElement | null>;
    bannerRef: RefObject<HTMLDivElement | null>;
}

interface UseBackgroundRemoverAnimationsProps {
    refs: AnimationRefs;
    isUploading: boolean;
    isProcessing: boolean;
    currentImage: any;
    hasActiveSubscription: boolean | null;
    subscriptionChecked: boolean;
}

export const useBackgroundRemoverAnimations = ({
    refs,
    isUploading,
    isProcessing,
    currentImage,
    hasActiveSubscription,
    subscriptionChecked
}: UseBackgroundRemoverAnimationsProps) => {

    // Initial container animation
    useEffect(() => {
        if (refs.containerRef.current) {
            gsap.fromTo(
                refs.containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, [refs.containerRef]);

    // Banner animation when subscription status changes
    useEffect(() => {
        if (refs.bannerRef.current && subscriptionChecked && hasActiveSubscription === false) {
            gsap.fromTo(
                refs.bannerRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [subscriptionChecked, hasActiveSubscription, refs.bannerRef]);

    // Upload/Processing animations
    useEffect(() => {
        if (isUploading || isProcessing) {
            if (refs.uploadAreaRef.current) {
                gsap.to(refs.uploadAreaRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (refs.processingRef.current) {
                gsap.fromTo(
                    refs.processingRef.current,
                    { opacity: 0, scale: 0.9, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
                );

                // Animated loading bar
                const progressBar = refs.processingRef.current.querySelector('.progress-bar');
                if (progressBar) {
                    gsap.fromTo(
                        progressBar,
                        { width: '0%' },
                        {
                            width: isUploading ? '30%' : '70%',
                            duration: 1.5,
                            ease: 'power2.inOut',
                            repeat: -1,
                            yoyo: true
                        }
                    );
                }
            }
        }
    }, [isUploading, isProcessing, refs.uploadAreaRef, refs.processingRef]);

    // Results animations
    useEffect(() => {
        if (currentImage && !isProcessing && !isUploading) {
            // Hide processing view
            if (refs.processingRef.current) {
                gsap.to(refs.processingRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Show results with animation
            if (refs.resultsRef.current) {
                gsap.fromTo(
                    refs.resultsRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
                );
            }

            // Animate buttons
            if (refs.buttonsRef.current) {
                gsap.fromTo(
                    refs.buttonsRef.current.children,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.5
                    }
                );
            }

            // Animate images with reveal effect
            if (refs.beforeImageRef.current) {
                gsap.fromTo(
                    refs.beforeImageRef.current,
                    { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.6
                    }
                );
            }

            if (refs.afterImageRef.current) {
                gsap.fromTo(
                    refs.afterImageRef.current,
                    {
                        opacity: 0,
                        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                    },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.8
                    }
                );
            }
        }
    }, [currentImage, isProcessing, isUploading, refs]);

    // Animation helper functions
    const animateReset = useCallback((onComplete: () => void) => {
        if (refs.resultsRef.current) {
            gsap.to(refs.resultsRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.out',
                onComplete
            });
        } else {
            onComplete();
        }
    }, [refs.resultsRef]);

    const animateUploadAreaIn = useCallback(() => {
        if (refs.uploadAreaRef.current) {
            gsap.fromTo(
                refs.uploadAreaRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [refs.uploadAreaRef]);

    const animateDownloadButton = useCallback(() => {
        if (refs.buttonsRef.current) {
            const downloadBtn = refs.buttonsRef.current.querySelector('button');
            if (downloadBtn) {
                gsap.to(downloadBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        }
    }, [refs.buttonsRef]);

    return {
        animateReset,
        animateUploadAreaIn,
        animateDownloadButton
    };
};
