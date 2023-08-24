import React, { useMemo } from "react"
import JSONData from "../content/LPG.json";
import { DataGrid } from '@mui/x-data-grid';
import { navigate } from 'gatsby';
import { slugify, getFullStateName } from "../helper/helpers";

const StateDetails = ({ params }) => {

    const cityList = useMemo(() => {
        const cityList = JSONData.fuel_stations.filter((obj) => slugify(getFullStateName(obj.state)) === params.state_name)

        // Remove duplicate city
        const filteredCity = cityList.filter((obj, index) => {
            return index === cityList.findIndex(o => obj.city === o.city)
        })

        return filteredCity
    }, [params.state_name])

    const getStationList = (city, state) => {
        const stationList = JSONData.fuel_stations.filter(obj => obj.city === city && obj.state === state)

        // Remove duplicate station
        const filteredStation = stationList.filter((obj, index) => {
            return index === stationList.findIndex(o => o.station_name === obj.station_name)
        })

        return filteredStation
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'city', headerName: 'City', width: 130,
        },
        {
            field: 'station_1', headerName: 'Station - 1', align: "center", width: 250, valueGetter: ({ row }) => {
                const stationList = getStationList(row.city, row.state)
                return stationList[0] ? `${stationList[0].station_name} (${stationList[0].street_address})` : '-'
            }
        },
        {
            field: 'station_2', headerName: 'Station - 2', align: "center", width: 250, valueGetter: ({ row }) => {
                const stationList = getStationList(row.city, row.state)
                return stationList[1] ? `${stationList[1].station_name} (${stationList[1].street_address})` : '-'
            }
        },
        {
            field: 'station_3', headerName: 'Station - 3', align: 'center', width: 250, valueGetter: ({ row }) => {
                const stationList = getStationList(row.city, row.state)
                return stationList[2] ? `${stationList[2].station_name} (${stationList[2].street_address})` : '-'
            }
        }
    ];

    return (
        <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
            <div>
                <h1>
                    {getFullStateName(params?.state_name?.toUpperCase())}
                </h1>
                <h2>{"City"}</h2>
            </div>
            <div style={{ height: 630, width: '100%' }}>
                <DataGrid
                    onRowClick={(params) => navigate(slugify(params.row.city))}
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
        </div>
    )
};

export default StateDetails;