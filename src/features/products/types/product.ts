export interface Product {
  car_id: number;
  man_id: number;
  car_model: string;
  prod_year: number;
  prod_month: number;

  photo: string;
  photo_ver: number;
  pic_number: number;

  price: number;
  price_usd: number;
  price_value: number;
  currency_id: 1 | 3;
  first_deposit?: number | null;

  predicted_price?: number | null;
  pred_min_price?: number | null;
  pred_max_price?: number | null;

  right_wheel?: boolean;
  fuel_type_id?: number;
  gear_type_id?: number;
  drive_type_id?: number;

  engine_volume?: number;
  engine_type_label?: string;
  gear_type_name?: string;
  drive_type_name?: string;
  vehicle_type?: number;

  car_run?: number;
  car_run_km?: number;
  car_run_dim?: 1 | 2;

  airbags?: number;
  cylinders?: number;
  color_id?: number;
  comfort_features?: number[];

  customs_passed: boolean;

  client_name?: string;
  client_phone?: string;
  user_type?: "dealer" | "individual";
  dealerId?: number | null;
  has_logo?: boolean;
  logo_ver?: number | null;
  dealer_title?: string | null;

  checked?: boolean;
  for_rent?: boolean;
  special_persons?: boolean;
  is_payd?: boolean;
  prom_color?: number;
  stickers?: string[];
  has360?: boolean;

  location_id: number;

  daily_views?: {
    views: number;
    product_id: number;
    insert_Date: string;
    };
  views?: number;
}
