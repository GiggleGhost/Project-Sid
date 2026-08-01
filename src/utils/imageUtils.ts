/**
 * Formats image or video URLs so that local paths, web links, and Google Drive share links
 * all render properly inside <img>, <video>, or <iframe> tags.
 */

export function getDriveFileId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match && match[1] ? match[1] : null;
}

export function isVideoUrl(url: string, explicitIsVideo?: boolean): boolean {
  if (explicitIsVideo !== undefined) return explicitIsVideo;
  if (!url) return false;

  const clean = url.trim().toLowerCase();
  
  // Extension check
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(clean)) return true;

  // Keywords check
  if (clean.includes('video') || clean.includes('/video/') || clean.includes('.mp4')) return true;

  return false;
}

export function formatImageUrl(url: string): string {
  if (!url) return '';

  const trimmed = url.trim();

  // Handle Google Drive links
  const driveId = getDriveFileId(trimmed);
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // Handle relative paths without leading slash
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:') && !trimmed.startsWith('/')) {
    return `/${trimmed}`;
  }

  return trimmed;
}

export function formatMediaUrl(
  primaryUrl: string,
  secondaryUrl?: string,
  isVideo?: boolean
): {
  type: 'video' | 'image';
  src: string;
  fallbackSrc?: string;
  iframeSrc?: string;
  isDrive: boolean;
} {
  const urlToUse = primaryUrl || secondaryUrl || '';
  if (!urlToUse) return { type: 'image', src: '', isDrive: false };

  const trimmed = urlToUse.trim();
  const detectedVideo = isVideoUrl(trimmed, isVideo) || !!secondaryUrl;
  const driveId = getDriveFileId(trimmed);

  if (detectedVideo) {
    if (driveId) {
      return {
        type: 'video',
        isDrive: true,
        src: `https://lh3.googleusercontent.com/d/${driveId}`,
        fallbackSrc: secondaryUrl ? formatImageUrl(secondaryUrl) : `https://drive.google.com/uc?export=download&id=${driveId}`,
        iframeSrc: `https://drive.google.com/file/d/${driveId}/preview`
      };
    }

    let videoSrc = trimmed;
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('data:') && !trimmed.startsWith('/')) {
      videoSrc = `/${trimmed}`;
    }

    let fallback: string | undefined = undefined;
    if (secondaryUrl) {
      const secDriveId = getDriveFileId(secondaryUrl);
      if (secDriveId) {
        fallback = `https://lh3.googleusercontent.com/d/${secDriveId}`;
      } else {
        fallback = secondaryUrl;
      }
    }

    return {
      type: 'video',
      isDrive: false,
      src: videoSrc,
      fallbackSrc: fallback
    };
  }

  return {
    type: 'image',
    isDrive: !!driveId,
    src: formatImageUrl(trimmed)
  };
}

