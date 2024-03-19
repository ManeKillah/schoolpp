import {DataTable} from "@/shared/components/ui/data-table";
// import {columns} from "@/modules/packages/components/packages-table/columns";
// import createApi from "@/modules/packages/api";
import {getAccessToken} from "@/shared/lib/auth";

import {Search} from "./search";
// import { User } from "lucide-react";
import createApi from "../../api";
import { columns } from ".";

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
  const api = createApi(await getAccessToken());

  const {data, ...pagination} = await api.operations.list({skip, limit, search: q, sort});

  // console.log({data}, data[0]?.user);

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
