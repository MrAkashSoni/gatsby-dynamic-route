import React, { useMemo } from 'react'
import JSONData from "../../../content/LPG.json"
import { getFullStateName, slugify } from '../../../helper/helpers'

const StationDetails = ({ params }) => {

    const stationDetails = useMemo(() => {
        return JSONData.fuel_stations.find(obj => slugify(getFullStateName(obj.state)) === params.state_name && slugify(obj.city) === params.city && slugify(obj.station_name) === params.station)
    }, [params])

    return (
        <div>
            <h1>
                {stationDetails?.station_name}
            </h1>
            <ul>
                <li> <b> Station Name </b> : {stationDetails?.station_name} </li>
                <li> <b> Street Address </b>: {stationDetails?.street_address} </li>
                <li> <b>Intersection Directions </b>: {stationDetails?.intersection_directions}</li>
                <li>  <b>City </b>: {stationDetails?.city}</li>
                <li>  <b>State </b>: {stationDetails?.state}</li>
                <li>  <b>Zip </b>: {stationDetails?.zip}</li>
                <li>  <b>Station Phone </b>: {stationDetails?.station_phone}</li>
            </ul>
        </div>
    )
}

export default StationDetails