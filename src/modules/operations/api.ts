import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Package, PackageExtended } from "@/@types/dto/package";

import { apiClient } from "@/shared/lib/api-client";
import { Rental, RentalExtended } from "@/@types/dto/rental";
import { Operations, OperationsExtended } from "@/@types/dto/operations";

export default function createApi(accessToken?: string) {
  return {
    operations: {
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
      }): Promise<Paginated<OperationsExtended>> => {
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
          .get<{ data: OperationsExtended[] }>(
            `/operations?${params.toString()}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => res as Paginated<OperationsExtended>);
      },
      create: async (data: Omit<Rental, keyof BaseDto>): Promise<Rental> => {
        return await apiClient.post("/rental", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Operations> => {
        return await apiClient.get(`/operations/${packageId}`, {
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
