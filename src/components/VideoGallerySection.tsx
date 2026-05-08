import { useContent } from "@/hooks/useContent";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface VideoGallerySectionProps {
  sectionKey: string;
  subtitle?: string;
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov|avi|mkv)$/i.test(url) ||
    url.includes("supabase") && url.includes("video");
}

export const VideoGallerySection = ({ sectionKey, subtitle = "Gallery" }: VideoGallerySectionProps) => {
  const { content, loading } = useContent();
  const [showAll, setShowAll] = useState(false);

  if (loading) return null;

  const row = content.find(c => c.section_key === sectionKey);
  if (!row || !row.is_visible) return null;

  const meta = row.meta as any;

  // Support both `videos` (legacy) and `media` (photos + videos combined)
  const mediaList: string[] = Array.isArray(meta?.media)
    ? meta.media
    : Array.isArray(meta?.videos)
    ? meta.videos
    : [];

  if (mediaList.length === 0) return null;

  // Videos recorded sideways that need rotation correction
  const rotatedVideos: string[] = meta?.rotated_videos ?? ["475521.mp4"];

  const INITIAL_COUNT = 3;
  const displayedMedia = showAll ? mediaList : mediaList.slice(0, INITIAL_COUNT);

  return (
    <section className="container py-20 border-t border-border">
      <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">{subtitle}</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <h2 className="font-display text-5xl md:text-7xl">{row.title || "Gallery."}</h2>
        {mediaList.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold uppercase tracking-widest text-xs"
          >
            {showAll ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Show All ({mediaList.length}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500">
        {displayedMedia.map((src: string, i: number) => {
          const video = isVideo(src);
          const needsRotation = video && rotatedVideos.some((r: string) => src.includes(r));

          return (
            <div
              key={i}
              className="relative aspect-[9/16] bg-muted overflow-hidden group animate-in fade-in zoom-in duration-500"
            >
              {video ? (
                <>
                  <video
                    src={src}
                    className={`w-full h-full object-cover ${needsRotation ? "rotate-[-90deg] scale-[1.78]" : ""}`}
                    loop
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      e.currentTarget.muted = false;
                      e.currentTarget.play().catch(() => {
                        e.currentTarget.muted = true;
                        e.currentTarget.play();
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.muted = true;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
