import {DataTable} from "@/shared/components/ui/data-table";
import {columns} from "@/modules/users/components/customers-table/columns";
import createApi from "@/modules/users/api";
import {getAccessToken} from "@/shared/lib/auth";

import {FilterButtons, Search} from "./search";
import {list} from "@vercel/blob";


export async function Table({
  skip,
  limit,
  q,
  status,
  sort,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  status?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const api = createApi(await getAccessToken());
  // const {blobs} = await list()
  // console.log(blobs);

  const {data, ...pagination} = await api.customer.list({skip, limit, search: q, status: status, sort});

  console.log({status});

  return (
    <div>
    
    <div className="flex justify-between mb-4">
  <div>
    <FilterButtons />
  </div>
  <div>
    <Search />
  </div>
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
