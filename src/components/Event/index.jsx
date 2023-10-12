/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef } from 'react'

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { marketContext } from "../../contexts/marketContext"
import { eventsContext } from "../../contexts/eventsContext"

import Item from './Item'
import { getMarketBooks } from "../../apis"

/* eslint-disable react/prop-types */
const Event = () => {
    const [upcomingMarkets, setUpcomingMarkets] = useState ([])
    const {market, setMarket} = useContext (marketContext)
    const {events} = useContext (eventsContext)
    
    const marketRef = useRef(market)

    const getUpcomingMarkets = async() => {
        if (events.length === 0) {
            setUpcomingMarkets (undefined)
            return
        }
        let tmp = []
        events.map((item)=>{
            item?.markets.map((m, idx)=> {
                m["raceNum"] = idx + 1
                tmp.push (m)
            })
        })
        tmp = tmp.sort ((a, b)=>{
            if (new Date(a.startTime).getTime() < new Date(b.startTime).getTime()) return -1
            else return 1
        })
        .filter((a)=> new Date(a.startTime).getTime() > new Date().getTime())
        .slice(0, 4)
        let tmpUpcomingData = []
        for (let m of tmp) {
            const resp = await getMarketBooks({
                marketId: m.marketId,
            })
            let totalMatched = 0
            let marketPercent = 0
            let runnerLen = 0
            if (resp.success) {
                totalMatched = Number(resp.data.totalMatched)
                marketPercent = ((Number(resp.data.totalMatched) / Number(resp.data.totalAvailable)) * 100).toFixed(2)
                runnerLen = resp.data.runnerLen
            }
            tmpUpcomingData.push ({
                totalMatched: totalMatched,
                marketPercent: marketPercent,
                runnerLen: runnerLen,
                startTime: m.startTime,
                venue: m.venue + " R" + m.raceNum.toString(),
                marketId: m.marketId,
            })
        }
        if (tmpUpcomingData.length > 0) {
            if (!marketRef.current) {
                setMarket ({marketId: tmpUpcomingData[0]['marketId'], venue: tmpUpcomingData[0]['venue']})
            }
            setUpcomingMarkets (tmpUpcomingData)
        } else {
            setUpcomingMarkets (undefined)
        }
    }

    useEffect (() => {
        const interval = setInterval (async() => {
            await getUpcomingMarkets()
        }, 30000)
        return () => clearInterval(interval)
    }, [events])

    useEffect (() => {
        getUpcomingMarkets ()
    }, [events])

    useEffect (() => {
        marketRef.current = market
    }, [market])

    if (typeof upcomingMarkets === 'object'){
        return (
            <>
                { upcomingMarkets.map((item, idx) => 
                    <Item 
                        key={idx}
                        venue={`${item['venue']}`}
                        pool={item['totalMatched']}
                        percent={item['marketPercent']}
                        runners={item['runnerLen']}
                        startTime={item['startTime']}
                        marketId={item['marketId']}
                    /> 
                )}
                {
                    upcomingMarkets.length === 0 &&
                    Array.from({length: 4}).map((item, idx) =>
                        <div key={idx} className="p-5 w-full bg-pink-1 rounded-[10px] border border-grey-2 cursor-pointer h-[162px]">
                            <Skeleton
                                    baseColor="#EAECF0"
                                    style={{ height: "100%" }}
                                    highlightColor="#D9D9D9"
                                />
                        </div>
                    )
                }
            </>
        )
    }
    else return null
}

export default Event