/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect, useRef } from "react";
import { marketContext } from '../../contexts/marketContext';
import { clockContext } from '../../contexts/clockContext';

const ClockElement = ({market, idx}) => {
    const { setMarket } = useContext (marketContext)
    const { clock } = useContext (clockContext)
    const [[h,m,s], setTime] = useState(['0','0','0'])
    const clockFlg = useRef (false)
    
    let tmpH, tmpM, tmpS
    useEffect(() => {
        const delta = (new Date(market.startTime) - clock)/1000
        if (delta < 3600) clockFlg.current = true
        else clockFlg.current = false
        if (clockFlg.current) {
            tmpH = parseInt (delta/3600)
            tmpM = parseInt ((delta - tmpH * 3600)/60)
            tmpS = parseInt (delta - tmpH * 3600 - tmpM * 60)
            setTime ([tmpH.toString(), tmpM.toString(), tmpS.toString()])
        }else {
            let date = new Date(market.startTime);

            // Extract hours and minutes, then format them
            tmpH = String(date.getHours()).padStart(2, '0');
            tmpM = String(date.getMinutes()).padStart(2, '0');
            setTime ([tmpH, tmpM, '0'])
        }
    }, [market.startTime, clock])

    return (
        <span 
            className='track-body-item cursor-pointer text-grey-2 hover:bg-grey-2'
            onClick={() => setMarket({"marketId":market.marketId, venue: `${market.venue} R${idx+1}`})}
        >
            {clockFlg.current === true ? 
                (Number(h) > 0 ? `${h}h ${m}m ${s}s` : Number(m) > 0 ? `${m}m ${s}s` : `${s}s`):
                (`${h}:${m}`)
            }
        </span>
    )
}

export default ClockElement