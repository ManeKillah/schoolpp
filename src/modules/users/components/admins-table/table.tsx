import {DataTable} from "@/shared/components/ui/data-table";
import {columns} from "@/modules/users/components/admins-table/columns";
import createApi from "@/modules/users/api";
import {getAccessToken} from "@/shared/lib/auth";

import {Search} from "./search";

export async function Table({
  skip,
  limit,
  q,
  sort,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);

  const {data, ...pagination} = await api.admin.list({skip, limit, search: q, sort});

  return (
    <div>
      <div className="mb-4">
        <Search />
      </div>
      <DataTable
        columns={columns}
        data={data}
        pageCount={Math.ceil(pagination.total / pagination.limit)}
        pageSize={limit}
      />
    </div>
  );
}
