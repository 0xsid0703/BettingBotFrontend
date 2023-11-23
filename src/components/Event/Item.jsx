import { useEffect, useState, useContext } from "react"

import { marketContext } from "../../contexts/marketContext"
import { clockContext } from '../../contexts/clockContext';

import {formattedNum} from "../../utils"

/* eslint-disable react/prop-types */
const Item = ({marketId, venue, pool, percent, runners, startTime}) => {
    const {setMarket} = useContext (marketContext)
    const {clock} = useContext (clockContext)

    const [[h,m], setTime] = useState([0,0])

    useEffect(() => {
        const delta = (new Date(startTime) - clock)/1000
        let tmpH = parseInt (delta/3600)
        let tmpM = parseInt ((delta - tmpH * 3600)/60)
        setTime ([tmpH, tmpM])
    }, [startTime, clock])

    return (
        <div className="p-5 w-full bg-grey-4 rounded-[10px] border border-grey-2 cursor-pointer" onClick={() => setMarket({marketId, venue})}>
            <div className="text-black-2 text-base font-bold leading-6">{venue}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Pool: $${formattedNum(parseInt(pool))}`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Market: ${parseInt(percent)}%`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Runners: ${runners}`}</div>
            <div className="text-green-2 text-base font-medium leading-6">
                {h > 0 ? `${h}h ${m}m` : `${m}m`}
            </div>
        </div>
    )
}

export default Item