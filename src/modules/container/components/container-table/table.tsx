import {DataTable} from "@/shared/components/ui/data-table";
// import {columns} from "@/modules/packages/components/packages-table/columns";
// import createApi from "@/modules/packages/api";
import {getAccessToken} from "@/shared/lib/auth";

import {FilterButtons, Search} from "./search";
import { User } from "lucide-react";
import createApi from "../../api";
import { columns } from ".";
import LocationSelect from "../../ui/select-store";

export async function Table({
  skip,
  limit,
  q,
  status,
  location,
  sort,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  location?: string;
  status?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const accessToken = await getAccessToken();
  // console.log(accessToken);
  const api = createApi(accessToken);

  const {data, ...pagination} = await api.container.list({skip, limit, search: q, status, location, sort});

  // console.log({data}, data[0]?.user);

  return (
    <div>
      <div className="flex justify-between mb-4">
      <div>
        <LocationSelect/>
      </div>
      <div>
       <FilterButtons/>
       {/* <DateRangePicker/> */}
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
