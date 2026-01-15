
import React from 'react';

interface MediaBoxProps {
    src: string;
    type?: 'image' | 'video';
    alt?: string;
    caption?: string;
    // 'cover' enforces aspect ratio and crops to fill. 'contain' shows full content without cropping.
    mode?: 'cover' | 'contain';
    // Only used when mode is 'cover'
    aspectRatio?: 'portrait' | 'landscape' | 'square';
    className?: string;
}

const MediaBox: React.FC<MediaBoxProps> = ({
    src,
    type = 'image',
    alt = 'Media content',
    caption,
    mode = 'cover',
    aspectRatio = 'portrait',
    className = ''
}) => {
    // Ensure spaces and special characters are encoded
    const processedSrc = encodeURI(src);

    // If mode is contain, we largely let the content dictate sizing or fit within the container
    const isCover = mode === 'cover';

    const aspectRatioClass = isCover
        ? (aspectRatio === 'portrait' ? 'aspect-[3/4] md:aspect-[3/4]' :
            aspectRatio === 'landscape' ? 'aspect-[16/9]' :
                'aspect-square')
        : 'aspect-auto'; // aspect-auto for full view

    // For 'contain' mode, we want the content to define the height (natural aspect ratio).
    // So we use h-auto instead of h-full.
    const fitClass = isCover ? 'object-cover h-full w-full' : 'object-contain w-full h-auto';
    const isVideo = type === 'video' || src.endsWith('.mp4');

    return (
        <div className={`relative group w-full ${className}`}>
            <div className={`
                relative overflow-hidden
                ${isCover ? 'rounded-lg' : 'rounded-2xl'}
                ${isCover ? 'shadow-md border border-white/10 bg-white/5 backdrop-blur-sm' : ''}
                ${aspectRatioClass}
            `}>
                {isVideo ? (
                    <video
                        src={processedSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={!isCover}
                        className={`${fitClass} ${!isCover ? 'rounded-2xl shadow-lg' : ''}`}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={processedSrc}
                        alt={alt}
                        className={`${fitClass} ${isCover ? 'transition-transform duration-700 group-hover:scale-110' : 'rounded-2xl shadow-lg'}`}
                    />
                )}

                {caption && (
                    <div className={`
                        absolute left-0 right-0 p-4 transition-opacity duration-300
                        ${isCover ? 'bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100' : 'bottom-0 bg-black/60 backdrop-blur-md rounded-b-xl opacity-100 translate-y-full group-hover:translate-y-0'}
                     `}>
                        <p className="text-white text-sm md:text-base font-medium text-center drop-shadow-md">
                            {caption}
                        </p>
                    </div>
                )}
            </div>

            {/* Decorative Glass Border for Cover Mode */}
            {isCover && (
                <div className={`absolute inset-0 rounded-lg border border-white/20 pointer-events-none ${aspectRatioClass}`} aria-hidden="true" />
            )}
        </div>
    );
};

export default MediaBox;
