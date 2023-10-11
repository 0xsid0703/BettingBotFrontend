/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'

import { useContext } from "react"
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
        if (events.length === 0) return
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
                leftTime: getLeftTimeString(m.startTime),
                venue: m.venue + " R" + m.raceNum.toString(),
                marketId: m.marketId,
            })
        }
        if (tmpUpcomingData.length > 0) {
            if (!marketRef.current) {
                setMarket ({marketId: tmpUpcomingData[0]['marketId'], venue: tmpUpcomingData[0]['venue']})
            }
            setUpcomingMarkets (tmpUpcomingData)
        }
    }

    const getLeftTimeString = (datetimeStr) => {
        try {
            let date = new Date(datetimeStr) - new Date();

            // Extract hours and minutes, then format them
            let hours = Number(new Date(date).getHours());
            let minutes = Number(new Date(date).getMinutes());
            let seconds = Number(new Date(date).getSeconds());
            return [hours, minutes, seconds];
        }catch (e) {
            console.log ("getLeftTimeString() call failed.", e)
            return "0m 0s"
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

    return (
        <>
            { upcomingMarkets.map((item, idx) => 
                <Item 
                    key={idx}
                    venue={`${item['venue']}`}
                    pool={item['totalMatched']}
                    percent={item['marketPercent']}
                    runners={item['runnerLen']}
                    leftTime={item['leftTime']}
                    marketId={item['marketId']}
                /> 
            )}
        
        </>
    )
}

export default Event