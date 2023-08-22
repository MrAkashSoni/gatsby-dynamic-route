import React, { useMemo } from "react"
import JSONData from "../../content/LPG.json"
import { DataGrid } from '@mui/x-data-grid';
import { navigate } from 'gatsby';
import { getFullStateName, slugify } from "../../helper/helpers";

const CityDetails = ({ params }) => {

    const cityList = useMemo(() => {

        const stationList = JSONData.fuel_stations.filter(obj => slugify(obj.city) === params.city && slugify(getFullStateName(obj.state)) === params.state_name)

        // Remove duplicate station
        const filteredStation = stationList.filter((obj, index) => {
            return index === stationList.findIndex(o => o.station_name === obj.station_name)
        })

        return filteredStation

    }, [params.city, params.state_name])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'station_name', headerName: 'Station name', width: 130
        },
    ];

    return (
        < div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
            <h1>{"Stations"}</h1>
            <div style={{ height: 630, width: '100%' }}>
                <DataGrid
                    onRowClick={(params) => {
                        navigate(slugify(params.row.station_name))
                    }}
                    rows={cityList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                />
            </div>
        </div >
    )
}

export default CityDetails;