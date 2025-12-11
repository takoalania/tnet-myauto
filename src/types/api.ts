export type Manufacturer = {
  man_id: number | string;
  man_name: string;
  models?: Model[];
};

export type Model = {
  model_id: number | string;
  model_name: string;
};

export type Category = {
  category_id: number | string;
  title: string;
};