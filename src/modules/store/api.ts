import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Package, PackageExtended } from "@/@types/dto/package";

import { apiClient } from "@/shared/lib/api-client";
import { Store } from "@/@types/dto/store";

export default function createApi(accessToken?: string) {
  return {
    store: {
      list: async ({
        skip = 0,
        limit = 10,
        search,
        location,
        sort = {},
      }: {
        skip?: number;
        limit?: number;
        search?: string;
        location?: string;
        sort?: {
          "sort[id]"?: "asc" | "desc";
        };
      }): Promise<Paginated<Store>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        if (search) {
          params.append("$client[search]", search);
        }
        if (location) {
          params.append("location", location);
          //   params.append("$client[search]", location);
        }
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: Store[] }>(`/store?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<Store>);
      },
      create: async (data: Omit<Store, keyof BaseDto>): Promise<Store> => {
        return await apiClient.post("/store", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/store/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Store> => {
        return await apiClient.get(`/store/${packageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        packageId: number,
        data: Partial<Omit<Store, keyof BaseDto>>
      ): Promise<Store> => {
        return await apiClient.patch(`/store/${packageId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
    },
  };
}
