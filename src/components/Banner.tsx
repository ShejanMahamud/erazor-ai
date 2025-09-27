'use client';

import { useState } from 'react';

export const Banner = ({
    focusText,
    text,
    linkText,
    linkUrl,
}: {
    focusText?: string;
    text?: string;
    linkText?: string;
    linkUrl?: string;
}) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="dev-banner w-full bg-gradient-to-r from-orange-500 to-purple-600 h-16 flex items-center justify-center relative z-[60] border-b border-white/20">
            <div className="flex items-center gap-2 mx-0 max-w-[90%] text-white drop-shadow-md">
                <div className="flex items-center gap-2">
                    <p className="text-sm md:text-base">
                        <strong> {focusText}</strong> {text}{" "}
                        <a href={linkUrl} className="underline transition duration-200 hover:text-yellow-200">
                            {linkText}
                        </a>
                    </p>
                </div>
            </div>
            {/* Close button */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-yellow-200 transition-colors"
                onClick={() => setIsVisible(false)}
                aria-label="Close development banner"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
