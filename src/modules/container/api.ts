import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Package, PackageExtended } from "@/@types/dto/package";

import { apiClient } from "@/shared/lib/api-client";
import { Rental, RentalExtended } from "@/@types/dto/rental";
import { Container } from "@/@types/dto/container";
// import { Container } from "postcss";

export default function createApi(accessToken?: string) {
  return {
    container: {
      list: async ({
        skip = 0,
        limit = 10,
        search,
        location,
        status,
        sort = {},
      }: {
        skip?: number;
        limit?: number;
        search?: string;
        status?: string;
        location?: string;
        sort?: {
          "sort[id]"?: "asc" | "desc";
        };
      }): Promise<Paginated<Container>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        if (location) params.append("location", location);
        if (status) params.append("status", status);
        if (search) {
          params.append("$client[search]", search);
        }
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: Container[] }>(`/container?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<Container>);
      },
      create: async (
        data: Omit<Container, keyof BaseDto>
      ): Promise<Container> => {
        return await apiClient.post("/container", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/container/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Container> => {
        return await apiClient.get(`/container/${packageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        packageId: number,
        data: Partial<Omit<Container, keyof BaseDto>>
      ): Promise<Container> => {
        return await apiClient.patch(`/container/${packageId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
    },
  };
}
