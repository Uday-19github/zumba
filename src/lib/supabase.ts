export type ContentRow = {
  id: string;
  section_key: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  is_visible: boolean;
  sort_order: number;
  meta?: Record<string, any>;
};

export type AdminField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image" | "url" | "list" | "image-list" | "pair-list";
  placeholder?: string;
  max?: number;
  hint?: string;
};

export type SectionConfig = {
  label: string;
  icon: string;
  color: string;
  description: string;
  fields: AdminField[];
};

export const SECTION_CONFIGS: Record<string, SectionConfig> = {};
export const SECTION_COLORS: Record<string, string> = {};
export const PULSE_SEED: ContentRow[] = [];
export const META_COLUMN_SQL = `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS meta jsonb DEFAULT '{}'::jsonb;`;

const noOpResponse = { data: null, error: null };
const builder = {
  select: async () => noOpResponse,
  insert: async () => noOpResponse,
  update: async () => noOpResponse,
  delete: async () => noOpResponse,
  upsert: async () => noOpResponse,
  eq() { return this; },
  in() { return this; },
  order() { return this; },
  limit() { return this; },
  single() { return this; },
  maybeSingle() { return this; },
  range() { return this; },
};

const storageBucket = {
  list: async () => noOpResponse,
  getPublicUrl: () => ({ data: { publicUrl: "" }, error: null }),
  upload: async () => noOpResponse,
  remove: async () => noOpResponse,
};

export const supabase = {
  from: () => builder,
  storage: { from: () => storageBucket },
  auth: { onAuthStateChange: () => ({ subscription: {} }) },
  channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
  removeChannel: () => {},
};
