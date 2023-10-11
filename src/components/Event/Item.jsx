import { useEffect, useState, useContext } from "react"
import clsx from 'clsx'

import { marketContext } from "../../contexts/marketContext"

import {formattedNum} from "../../utils"

/* eslint-disable react/prop-types */
const Item = ({marketId, venue, pool, percent, runners, leftTime}) => {
    const [hours, minutes, seconds] = leftTime
    const startTime = new Date().getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000
    const {setMarket} = useContext (marketContext)

    const [[h,m,s], setTime] = useState([0,0,0])

    useEffect(() => {
        const interval = setInterval(()=> {
        const delta = (startTime - new Date().getTime())/1000
        let tmpH = parseInt (delta/3600)
        let tmpM = parseInt ((delta - tmpH * 3600)/60)
        let tmpS = parseInt (delta - tmpH * 3600 - tmpM * 60)
        setTime ([tmpH, tmpM, tmpS])
        }, 1000)
        return () => clearInterval(interval)
    }, [leftTime])

    return (
        <div className="p-5 w-full bg-pink-1 rounded-[10px] border border-grey-2 cursor-pointer" onClick={() => setMarket({marketId, venue})}>
            <div className="text-black-2 text-base font-black leading-6">{venue}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Pool: $${formattedNum(pool)}`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Market: ${percent}%`}</div>
            <div className="text-black-1 text-base font-medium leading-6">{`Runners: ${runners}`}</div>
            <div className={clsx(`${h === 0 && m < 10? "text-red-1" : "text-grey-2"} text-base font-medium leading-6`)}>
                {h > 0 ? `${h}h ${m}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`}
            </div>
        </div>
    )
}

export default Item