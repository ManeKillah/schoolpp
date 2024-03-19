import type { User } from "@/@types/dto/user";
import type { BaseDto } from "@/@types/dto/base";
import type { Paginated } from "@/@types/api";
import type { Address } from "@/@types/dto/address";
import { apiClient } from "@/shared/lib/api-client";
import axios from "axios";

const apiFileImage = axios.create({
  baseURL: "http://localhost:3030",
});

export default function createApi(accessToken?: string) {
  return {
    admin: {
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
        params.append("role[$ne]", "user");
        if (search) params.append("$client[search]", search);
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: User[] }>(`/users?${params.toString()}`, {
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
      get: async (userId: number): Promise<User> => {
        return await apiClient.get(`/users/${userId}`, {
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
    },
    customer: {
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
      }): Promise<Paginated<User>> => {
        const params = new URLSearchParams();

        params.append("$skip", skip.toString());
        params.append("$limit", limit.toString());
        params.append("role", "user");
        if (status) params.append("status", status);
        if (search) params.append("$client[search]", search);
        Object.entries(sort).forEach(([key, value]) => {
          params.set(`$${key}`, value === "asc" ? "1" : "-1");
        });

        return await apiClient
          .get<{ data: User[] }>(`/users?${params.toString()}`, {
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
          | "email"
          | "updatedAt"
          | "phone_country_code"
          | "phone"
          | "status"
          | "fileImage"
          | "role"
        >
      ): Promise<User> => {
        // const formData = new FormData();
        // console.log(44, data);
        return await apiClient.post("/users", {
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      delete: async (challengeId: number): Promise<void> => {
        await apiClient.delete(`/users/${challengeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      get: async (userId: number): Promise<User> => {
        return await apiClient.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      },
      update: async (
        userId: number,
        data: Pick<
          User,
          | "first_name"
          | "email"
          | "updatedAt"
          | "phone_country_code"
          | "phone"
          | "status"
          | "fileImage"
          | "role"
        >
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
        create: async (
          data: Pick<
            Address,
            | "address_line1"
            | "address_line2"
            | "country_iso_code"
            | "city"
            | "user_id"
          >
        ): Promise<Address> => {
          return await apiClient.post("/addresses", {
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        },
      },
    },
    fileImage: {
      create: async (data: any) => {
        const formData = new FormData();

        if (data.fileImage) {
          formData.append("data", data.fileImage);
          // formData.append("runul", "metal");
          // console.log("66");
          // console.log(data.fileImage);
        }

        console.log(33, formData, data.fileImage);

        try {
          const response = await apiFileImage.post("/file-image", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data;
        } catch (error: any) {
          throw new Error("Error creating user: " + error.message);
        }
      },
    },
  };
}
