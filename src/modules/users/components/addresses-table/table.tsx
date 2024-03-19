import {DataTable} from "@/shared/components/ui/data-table";
import {columns} from "@/modules/users/components/addresses-table/columns";
import createApi from "@/modules/users/api";
import {getAccessToken} from "@/shared/lib/auth";

// import {Search} from "./search";

export async function Table({
  skip,
  limit,
  q,
  sort,
  user_id,
}: {
  skip?: number;
  limit?: number;
  user_id?: number;
  q?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const api = createApi(await getAccessToken());

  const {data, ...pagination} = await api.customer.addresses.list({
    user_id,
    skip,
    limit,
    search: q,
    sort,
  });

  console.log(data);

  return (
    <div>
      {/* <div className="mb-4">
        <Search />
      </div> */}
      <DataTable
        columns={columns}
        data={data}
        pageCount={Math.ceil(pagination.total / pagination.limit)}
        pageSize={limit}
      />
    </div>
  );
}
