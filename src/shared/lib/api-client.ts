import type {APIError} from "@/@types/api";

import lodash from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RecordType = Record<string, any>;

export type Params = Omit<RequestInit, "method">;

class Fetch {
  constructor(private basePath: string) {}

  private getHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }

  private async buildFetcher<TRecordType extends RecordType = RecordType>(
    path: string,
    method: "GET" | "PATCH" | "DELETE" | "POST",
    params?: Omit<RequestInit, "method">,
  ) {
    const res = await fetch(
      `${this.basePath}${path}`,
      lodash.merge(params || {}, {
        headers: this.getHeaders(),
        method,
      }),
    );

    if (res.ok) return (await res.json()) as TRecordType;

    const error = (await res.json()) as unknown as APIError;

    throw new Error(error.message);
  }

  get<TRecordType extends RecordType = RecordType>(path: string, params?: Params) {
    return this.buildFetcher<TRecordType>(path, "GET", params);
  }

  post<TRecordType extends RecordType = RecordType>(path: string, params?: RequestInit) {
    return this.buildFetcher<TRecordType>(path, "POST", params);
  }

  delete<TRecordType extends RecordType = RecordType>(path: string, params?: Params) {
    return this.buildFetcher<TRecordType>(path, "DELETE", params);
  }

  patch<TRecordType extends RecordType = RecordType>(path: string, params?: Params) {
    return this.buildFetcher<TRecordType>(path, "PATCH", params);
  }
}

export const apiClient = new Fetch(process.env.NEXT_PUBLIC_BASE_URL!);
