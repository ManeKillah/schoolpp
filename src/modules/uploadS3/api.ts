import type { User } from "@/@types/dto/user";
import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Address } from "@/@types/dto/address";

import { apiClient } from "@/shared/lib/api-client";

export default function createApi(accessToken?: string) {
  return {
    apis3: {
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
      }): Promise<Paginated<User>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        // params.append("role", "user");
        if (search) params.append("$client[search]", search);
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: User[] }>(`/challenges?${params.toString()}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res as Paginated<User>);
      },
      create: async (
        data: Pick<
          User,
          | "first_name"
          | "last_name"
          | "email"
          | "phone_country_code"
          | "phone"
          | "status"
          | "role"
        >
      ): Promise<User> => {
        return await apiClient.post("/users", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (
        // userId: number,
        params?: Record<string, any>
      ): Promise<any> => {
        // const queryParams = new URLSearchParams(params).toString();
        // console.log({ queryParams });
        // console.log({ params });
        const url = `/s3Client/sign/${params ? `?objectName=${params.params.objectName}&path=${params.params.path}` : ""}`;
        return await apiClient.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        userId: number,
        data: Partial<Omit<User, keyof BaseDto>>
      ): Promise<User> => {
        return await apiClient.patch(`/users/${userId}`, {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },

      addresses: {
        list: async ({
          skip = 0,
          limit = 10,
          search,
          sort = {},
          user_id,
        }: {
          skip?: number;
          limit?: number;
          search?: string;
          user_id?: number;
          sort?: {
            "sort[id]"?: "asc" | "desc";
          };
        }): Promise<Paginated<Address>> => {
          const params = new URLSearchParams();

          params.append("$skip", skip.toString());
          params.append("$limit", limit.toString());
          if (user_id) {
            params.append("user_id", user_id.toString());
          }
          if (search) {
            params.append("$client[search]", search);
          }
          Object.entries(sort).forEach(([key, value]) => {
            params.set(`$${key}`, value === "asc" ? "1" : "-1");
          });

          return await apiClient
            .get<{ data: Address[] }>(`/addresses?${params.toString()}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => res as Paginated<Address>);
        },
      },
    },
  };
}
