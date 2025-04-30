/**
 * Transforms URLs based on their source.
 * Currently handles YouTube URLs to convert them to no-cookies embeds.
 */
export function transformUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Handle YouTube URLs
    if (isYouTubeUrl(parsedUrl)) {
      return convertToYouTubeEmbed(parsedUrl);
    }
    
    // For all other URLs, return as is
    return url;
  } catch (error) {
    console.error("Error transforming URL:", error);
    return url;
  }
}

/**
 * Checks if a URL is a YouTube URL.
 */
function isYouTubeUrl(url: URL): boolean {
  const youtubeHosts = [
    'youtube.com',
    'www.youtube.com',
    'youtu.be',
    'm.youtube.com'
  ];
  
  return youtubeHosts.includes(url.hostname);
}

/**
 * Converts a YouTube URL to a YouTube embed URL with no cookies.
 */
function convertToYouTubeEmbed(url: URL): string {
  let videoId: string | null = null;
  
  // Extract video ID from different YouTube URL formats
  if (url.hostname === 'youtu.be') {
    // Short URL format: https://youtu.be/VIDEO_ID
    videoId = url.pathname.substring(1);
  } else if (url.pathname.includes('/watch')) {
    // Standard format: https://youtube.com/watch?v=VIDEO_ID
    videoId = url.searchParams.get('v');
  } else if (url.pathname.includes('/embed/')) {
    // Already an embed: https://www.youtube.com/embed/VIDEO_ID
    videoId = url.pathname.split('/embed/')[1];
  } else if (url.pathname.includes('/shorts/')) {
    // YouTube shorts: https://youtube.com/shorts/VIDEO_ID
    videoId = url.pathname.split('/shorts/')[1];
  }
  
  // If we found a video ID, convert to no-cookies embed URL
  if (videoId) {
    // Handle any URL parameters from the original URL that should be preserved
    const params = new URLSearchParams();
    
    // Copy relevant parameters from original URL
    for (const [key, value] of url.searchParams.entries()) {
      // Skip the 'v' parameter as we're using it in the path
      if (key !== 'v') {
        params.append(key, value);
      }
    }
    
    // Build the no-cookies embed URL with any additional parameters
    const paramsString = params.toString() ? `?${params.toString()}` : '';
    return `https://www.youtube-nocookie.com/embed/${videoId}${paramsString}`;
  }
  
  // If we couldn't extract a video ID, return the original URL
  return url.toString();
}