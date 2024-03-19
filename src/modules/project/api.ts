import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Package, PackageExtended } from "@/@types/dto/package";

import { apiClient } from "@/shared/lib/api-client";
import { Rental, RentalExtended } from "@/@types/dto/rental";
import { Project } from "@/@types/dto/project";
// import { Project } from "next/dist/build/swc";

export default function createApi(accessToken?: string) {
  return {
    project: {
      list: async ({
        skip = 0,
        limit = 10,
        search,
        status,
        start_date,
        end_date,
        sort = {},
      }: {
        skip?: number;
        limit?: number;
        search?: string;
        status?: string;
        start_date?: string;
        end_date?: string;
        sort?: {
          "sort[id]"?: "asc" | "desc";
        };
      }): Promise<Paginated<Project>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        if (search) {
          params.append("$client[search]", search);
        }
        if (status) {
          params.append("status", status);
        }
        if (start_date) {
          params.append("$client[start_date]", start_date);
        }
        if (end_date) {
          params.append("$client[end_date]", end_date);
        }
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: Project[] }>(`/project?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<Project>);
      },
      create: async (data: Omit<Project, keyof BaseDto>): Promise<Project> => {
        return await apiClient.post("/project", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/project/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (packageId: number): Promise<Project> => {
        return await apiClient.get(`/project/${packageId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        packageId: number,
        data: Partial<Omit<Project, keyof BaseDto>>
      ): Promise<Project> => {
        return await apiClient.patch(`/project/${packageId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
    },
  };
}
