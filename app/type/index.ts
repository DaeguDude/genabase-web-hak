export type TThread = {
  id: string;
  title?: string;
  created_at?: string;
};

export type TSyncStatus = {
  customer_synced: boolean;
  fulfillment_synced: boolean;
  inventory_synced: boolean;
  is_30_days_synced: boolean;
  is_synced: boolean;
  last_30_days_fulfillment_synced: boolean;
  last_30_days_marketing_activity_synced: boolean;
  last_30_days_order_synced: boolean;
  marketing_activity_synced: boolean;
  order_synced: boolean;
  product_synced: boolean;
};

export type TMessage = {
  id: string;
  type: string;
  content: string;
};

export type TJobResult = {
  job_id: string;
  question: string;
  prediction: string;
  created_at: string;
  data: Record<string, string>[];
  visualizationPreference?: string;
};

export type TCsAgent = {
  name: string;
  phone_number: string;
  contact_phone_number: string;
  contact_email: string;
  contact_preference: string;
};

export type TShop = {
  id: string;
  phone_number: string;
  email: string;
  name: string;
  cs_agent: TCsAgent;
};
