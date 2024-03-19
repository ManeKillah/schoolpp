import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Package, PackageExtended } from "@/@types/dto/package";

import { apiClient } from "@/shared/lib/api-client";
import { Rental, RentalExtended } from "@/@types/dto/rental";
import { Observations } from "@/@types/dto/observations";

export default function createApi(accessToken?: string) {
  return {
    rental: {
      list: async ({
        skip = 0,
        limit = 10,
        search,
        status,
        sort = {},
      }: {
        skip?: number;
        limit?: number;
        search?: string;
        status?: string;
        sort?: {
          "sort[id]"?: "asc" | "desc";
        };
      }): Promise<Paginated<RentalExtended>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        if (search) {
          params.append("$client[search]", search);
        }
        if (status) {
          params.append("status", status);
        }
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: RentalExtended[] }>(`/rental?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<RentalExtended>);
      },
      create: async (data: Omit<Rental, keyof BaseDto>): Promise<Rental> => {
        return await apiClient.post("/rental", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/rental/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Rental> => {
        return await apiClient.get(`/rental/${packageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        packageId: number,
        data: Partial<Omit<Rental, keyof BaseDto>>
      ): Promise<Rental> => {
        return await apiClient.patch(`/rental/${packageId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
    },
    observations: {
      list: async ({
        skip = 0,
        limit = 10,
        search,
        sort = {},
      }: {
        skip?: number;
        limit?: number;
        search?: string;
        sort?: {
          "sort[id]"?: "asc" | "desc";
        };
      }): Promise<Paginated<Observations>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        if (search) {
          params.append("$client[search]", search);
        }
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: Observations[] }>(`/observations?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<Observations>);
      },
      create: async (data: Omit<Rental, keyof BaseDto>): Promise<Rental> => {
        return await apiClient.post("/rental", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/rental/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Rental> => {
        return await apiClient.get(`/rental/${packageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        packageId: number,
        data: Partial<Omit<Rental, keyof BaseDto>>
      ): Promise<Rental> => {
        return await apiClient.patch(`/rental/${packageId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
    },
  };
}
