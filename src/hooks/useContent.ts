import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type ContentRow = {
  id: string;
  section_key: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  is_visible: boolean;
  sort_order: number;
  meta?: Record<string, any>;
};

export function useContent() {
  const [content, setContent] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*")
          .order("sort_order", { ascending: true });
        
        if (!mounted) return;
        
        if (error) {
          console.error("Supabase fetch error:", error);
        } else if (data) {
          console.log("Supabase fetch success:", data.length, "rows");
          setContent(data as ContentRow[]);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();

    const channel = supabase
      .channel(`content-changes-${Math.random().toString(36).slice(2, 9)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content" },
        (payload) => {
          setContent((prev) => {
            if (payload.eventType === "INSERT") {
              const row = payload.new as ContentRow;
              return [...prev.filter((r) => r.id !== row.id), row].sort(
                (a, b) => a.sort_order - b.sort_order
              );
            }
            if (payload.eventType === "UPDATE") {
              const row = payload.new as ContentRow;
              return prev
                .map((r) => (r.id === row.id ? row : r))
                .sort((a, b) => a.sort_order - b.sort_order);
            }
            if (payload.eventType === "DELETE") {
              const row = payload.old as ContentRow;
              return prev.filter((r) => r.id !== row.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const sec = (key: string) => content.find((c) => c.section_key === key);
  return { content, loading, sec };
}

export function useSection(key: string) {
  const { content, loading } = useContent();
  const section = content.find((c) => c.section_key === key);
  const visible = section ? (section.is_visible ?? section.visible ?? true) : true;
  return { section, loading, visible };
}
