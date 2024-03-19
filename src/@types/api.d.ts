export interface APIError {
  name: string;
  message: string;
  code: number;
  className: string;
  data: Datum[];
}

export interface Datum {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params: Params;
  message: string;
}

export interface Params {
  additionalProperty: string;
}

export interface Paginated<TData> {
  total: number;
  limit: number;
  skip: number;
  data: TData[];
}
