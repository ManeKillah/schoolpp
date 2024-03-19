
import {DataTable} from "@/shared/components/ui/data-table";
// import {columns} from "@/modules/packages/components/packages-table/columns";
// import createApi from "@/modules/packages/api";
import {getAccessToken} from "@/shared/lib/auth";

import { Search} from "./search";
import createApi from "../../api";
import createApiLocations from "../../../locations/api";
import { columns } from ".";
import useSelectStore from "../../lib/useSelectStore";
import LocationSelect from "../../ui/select-store";

export async function Table({
  skip,
  limit,
  q,
  location,
  sort,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  location?: string;
  sort?: {
    "sort[id]"?: "desc" | "asc";
  };
}) {
  const accessToken = await getAccessToken();
  const api = createApi(accessToken);
  const apiLocations = createApiLocations(accessToken);

  const {data, ...pagination} = await api.store.list({skip, limit, search: q, location, sort});
  // const {data, ...pagination} = await apiLocations.cities.list({});
  // const {cities} = useSelectStore()

  // console.log({data}, data[0]?.user);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="w-1/4">
          <LocationSelect  /> {/* Reducir el ancho de LocationSelect */}
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
