import { useContext } from "react"
import {formattedNum} from "../../utils"
import { marketContext } from "../../contexts/marketContext"

/* eslint-disable react/prop-types */
const Event = ({marketId, venue, pool, percent, runners, leftTime}) => {
    
    const {setMarket} = useContext (marketContext)

    return (
        <div className="p-5 w-full bg-pink-1 rounded-[10px] border border-[1px] border-grey-2 cursor-pointer" onClick={() => setMarket({marketId, venue})}>
            <div className="text-black-2 text-base font-black leading-6">{venue}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Pool: $${formattedNum(pool)}`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Market: ${percent}%`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Runners: ${runners}`}</div>
            <div className="text-red-1 text-base font-medium leading-6">{leftTime}</div>
        </div>
    )
}

export default Event