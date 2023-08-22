import React, { useMemo } from "react";
import JSONData from "../content/LPG.json";
import { DataGrid } from '@mui/x-data-grid';
import { navigate } from 'gatsby';
import { getFullStateName, slugify } from "../helper/helpers";


const States = () => {

  const stateList = useMemo(() => JSONData.fuel_stations.filter((obj, index) => {
    return index === JSONData.fuel_stations.findIndex(o => obj.state === o.state)
  }), []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'state', headerName: 'State', width: 130, valueGetter: ({ row }) => {
        const stateName = getFullStateName(row.state)
        return stateName
      }
    },
  ];

  return (
    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
      <div style={{ height: 630, width: '100%' }}>
        <DataGrid
          onRowClick={(params) => {
            const stateParams = slugify(getFullStateName(params.row.state))
            navigate(stateParams)
          }
          }
          rows={stateList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
    </div>
  );
}


export default States;