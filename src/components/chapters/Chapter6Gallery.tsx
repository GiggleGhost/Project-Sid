import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, X, Heart, Video } from 'lucide-react';
import { STORY_CONFIG, GalleryPhoto } from '../../config';
import { TurnPageButton } from '../TurnPageButton';
import { sounds } from '../../utils/sound';
import { formatMediaUrl } from '../../utils/imageUtils';

const GalleryVideoPlayer: React.FC<{
  src: string;
  fallbackSrc?: string;
  iframeSrc?: string;
  isDrive?: boolean;
  title: string;
  isModal?: boolean;
}> = ({ src, fallbackSrc, iframeSrc, isDrive = false, title, isModal = false }) => {
  const [loadError, setLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [src, isModal, isDrive]);

  // If it's a Google Drive video or direct native video failed, use Google's native HD Preview Iframe
  if ((isDrive || loadError) && iframeSrc) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <iframe
          src={`${iframeSrc}?autoplay=1`}
          className="w-full h-full border-0 rounded-xl"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title={title}
        />
        {!isModal && (
          /* Invisible overlay in card view so clicking anywhere on card opens the modal */
          <div className="absolute inset-0 z-10 bg-transparent cursor-pointer" />
        )}
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted={true}
      controls={isModal}
      playsInline
      preload="auto"
      onError={() => {
        if (fallbackSrc && videoRef.current && videoRef.current.src !== fallbackSrc) {
          videoRef.current.src = fallbackSrc;
          videoRef.current.play().catch(() => setLoadError(true));
        } else {
          setLoadError(true);
        }
      }}
      className="w-full h-full object-cover pointer-events-auto"
    />
  );
};

export const Chapter6Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    sounds.playSparkle();
    setSelectedPhoto(photo);
  };

  return (
    <section id="chapter-6" className="min-h-screen flex flex-col justify-between p-6 py-16 relative z-20">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Chapter Header */}
        <div className="text-center mb-12">
          <span className="font-title text-3xl sm:text-4xl text-[#E75480] block">Chapter VI</span>
          <h2 className="font-heading text-2xl sm:text-4xl font-semibold text-[#444444]">Our Memory Gallery</h2>
          <p className="font-body text-xs sm:text-sm text-[#888888] mt-2 flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4 text-[#E75480]" /> Click any photo or video memory to view in detail
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORY_CONFIG.gallery.map((photo) => {
            const media = formatMediaUrl(photo.videoUrl || '', photo.imageUrl, photo.isVideo);

            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className="interactive bg-white p-4 pb-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-[#FFD6E8]/60 group relative"
                style={{
                  transform: `rotate(${photo.rotation}deg)`
                }}
              >
                {/* Top Pin Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF8DB3] border-2 border-white shadow-md z-10 flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>

                {/* Video Badge if video */}
                {media.type === 'video' && (
                  <div className="absolute top-6 right-6 bg-black/60 text-white p-1.5 rounded-full z-10 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Media Frame */}
                <div className="overflow-hidden rounded-xl aspect-square bg-[#FFF8FC] mb-4 border border-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                  {media.type === 'video' ? (
                    <GalleryVideoPlayer
                      src={media.src}
                      fallbackSrc={media.fallbackSrc}
                      iframeSrc={media.iframeSrc}
                      isDrive={media.isDrive}
                      title={photo.title}
                      isModal={false}
                    />
                  ) : (
                    <img
                      src={media.src}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Handwritten Style Caption */}
                <div className="text-center space-y-1">
                  <h3 className="font-title text-2xl text-[#E75480]">{photo.title}</h3>
                  <p className="font-heading text-xs text-[#888888]">{photo.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Photo/Video Modal */}
      {selectedPhoto && (() => {
        const media = formatMediaUrl(selectedPhoto.videoUrl || '', selectedPhoto.imageUrl, selectedPhoto.isVideo);

        return (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl border-2 border-[#FFD6E8] animate-float"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-[#E75480] p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Container */}
              <div className="overflow-hidden rounded-2xl shadow-lg aspect-square mb-6 border border-gray-100 bg-black/5 flex items-center justify-center">
                {media.type === 'video' ? (
                  <GalleryVideoPlayer
                    src={media.src}
                    fallbackSrc={media.fallbackSrc}
                    iframeSrc={media.iframeSrc}
                    isDrive={media.isDrive}
                    title={selectedPhoto.title}
                    isModal={true}
                  />
                ) : (
                  <img
                    src={media.src}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption Details */}
              <div className="text-center space-y-2">
                <span className="font-title text-3xl text-[#E75480] block">
                  {selectedPhoto.title}
                </span>
                <div className="flex items-center justify-center gap-2 text-xs font-heading text-[#888888]">
                  <span>{selectedPhoto.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#E75480]">
                    <MapPin className="w-3 h-3" /> {selectedPhoto.location}
                  </span>
                </div>
                <p className="font-body text-sm text-[#444444] pt-2 italic">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      <TurnPageButton targetChapterId="chapter-7" label="Turn to Reasons Why I Love You ❤️" />
    </section>
  );
};

