export type BagSize = "small" | "large";
export type OrderKind = "ready" | "custom";
export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "accepted"
  | "manufacturing"
  | "shipped"
  | "delivered"
  | "rejected"
  | "refunded";
export type PaymentStatus = "pending" | "paid" | "refunded";
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Timestamped = {
  created_at: string;
  updated_at: string;
};

export type ProfileRow = Timestamped & {
  id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  address: string | null;
};

export type BagTypeRow = Timestamped & {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export type BaseModelRow = Timestamped & {
  id: number;
  bag_type_id: number;
  slug: string;
  name: string;
  size: BagSize;
  base_price: number;
  front_image_path: string;
  back_image_path: string;
  text_x: number;
  text_y: number;
  text_width: number;
  text_height: number;
  is_active: boolean;
  sort_order: number;
};

export type MaterialRow = Timestamped & {
  id: number;
  slug: string;
  name: string;
  small_price: number;
  large_price: number;
  prompt_text: string;
  sample_image_path: string | null;
  is_active: boolean;
  sort_order: number;
};

export type ColorRow = Timestamped & {
  id: number;
  slug: string;
  name: string;
  hex: string;
  prompt_text: string;
  sample_image_path: string | null;
  is_active: boolean;
  sort_order: number;
};

export type AddonRow = Timestamped & {
  id: number;
  slug: string;
  name: string;
  small_price: number;
  large_price: number;
  is_active: boolean;
  sort_order: number;
};

export type PriceLimitRow = {
  size: BagSize;
  max_price: number;
  updated_at: string;
};

export type ReadyProductRow = Timestamped & {
  id: number;
  bag_type_id: number;
  slug: string;
  name: string;
  description: string | null;
  size: BagSize;
  price: number;
  image_paths: string[];
  stock: number;
  is_featured: boolean;
  is_active: boolean;
};

type TableDefinition<Row, Insert = Partial<Row>, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: TableDefinition<ProfileRow>;
      bag_types: TableDefinition<BagTypeRow>;
      base_models: TableDefinition<BaseModelRow>;
      materials: TableDefinition<MaterialRow>;
      colors: TableDefinition<ColorRow>;
      addons: TableDefinition<AddonRow>;
      price_limits: TableDefinition<PriceLimitRow>;
      ready_products: TableDefinition<ReadyProductRow>;
      designs: TableDefinition<Record<string, unknown>>;
      orders: TableDefinition<Record<string, unknown>>;
      order_items: TableDefinition<Record<string, unknown>>;
      order_status_log: TableDefinition<Record<string, unknown>>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
