'use client';

import { useEffect, useState } from 'react';

export const Banner = ({
    focusText,
    text,
    linkText,
    linkUrl,
    timer,
    days
}: {
    focusText?: string;
    text?: string;
    linkText?: string;
    linkUrl?: string;
    timer?: boolean;
    days?: number;
}) => {
    const [isVisible, setIsVisible] = useState(() => {
        // Check localStorage to see if banner was previously dismissed
        if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem('banner-dismissed');
            return dismissed !== 'true';
        }
        return true;
    });
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!timer || !days) return;

        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);

        const updateTimer = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [timer, days]);

    if (!isVisible) return null;

    return (
        <div className="dev-banner w-full bg-gradient-to-r from-orange-500 to-purple-600 min-h-16 flex items-center justify-center relative z-[60] border-b border-white/20 px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mx-0 max-w-[95%] sm:max-w-[90%] text-white drop-shadow-md text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <p className="text-xs sm:text-sm md:text-base leading-tight">
                        <strong> {focusText}</strong> {text}{" "}
                        <a href={linkUrl} className="underline transition duration-200 hover:text-yellow-200">
                            {linkText}
                        </a>
                    </p>
                    {timer && days && (
                        <div className="flex items-center gap-1 bg-black/20 rounded-lg px-2 sm:px-3 py-1">
                            <span className="text-xs sm:text-sm font-mono whitespace-nowrap">
                                <span className="hidden sm:inline">
                                    {timeLeft.days}d {timeLeft.hours.toString().padStart(2, '0')}:
                                    {timeLeft.minutes.toString().padStart(2, '0')}:
                                    {timeLeft.seconds.toString().padStart(2, '0')}
                                </span>
                                <span className="sm:hidden">
                                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {/* Close button */}
            <button
                className="absolute right-2 sm:right-4 top-3 sm:top-1/2 sm:-translate-y-1/2 text-white hover:text-yellow-200 transition-colors"
                onClick={() => {
                    setIsVisible(false);
                    localStorage.setItem('banner-dismissed', 'true');
                }}
                aria-label="Close development banner"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
