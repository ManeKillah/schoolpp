import {DataTable} from "@/shared/components/ui/data-table";
// import {columns} from "@/modules/packages/components/packages-table/columns";
// import createApi from "@/modules/packages/api";
import {getAccessToken} from "@/shared/lib/auth";

import {Search} from "./search";
// import { User } from "lucide-react";
import createApi from "../../api";
import { columns } from ".";
import LocationSelect from "@/modules/container/ui/select-store";
import { FilterButtons } from "@/modules/container/components/container-table/search";

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
  status?: string;
  location?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const api = createApi(await getAccessToken());

  const {data, ...pagination} = await api.equipment.list({skip, limit, search: q, location, status, sort});

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
