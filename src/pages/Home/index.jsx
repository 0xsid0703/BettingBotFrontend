import { useState, useCallback, useEffect } from 'react'

import Tracks from '../../components/Tracks'
import Event from '../../components/Event'
import RaceTable from '../../components/RaceTable'
import SelectionTable from '../../components/SelectionTable'
import ScoreChart from '../../components/ScoreChart'

import { getMarketBooks } from '../../apis';

const Home = () => {
    const [upcomingMarkets, setUpcomingMarkets] = useState ([])
    const [events, setEvents] = useState ([])

    const getUpcomingMarkets = useCallback(async() => {
        console.log ("FFFFFF")
        if (events.length === 0) return
        let tmp = []
        events.map((item)=>{
            item?.markets.map((market, idx)=> {
                market["raceNum"] = idx + 1
                console.log (market, ">>>")
                tmp.push (market)
            })
        })
        tmp = tmp.sort ((a, b)=>{
            if (new Date(a.startTime).getTime() < new Date(b.startTime).getTime()) return -1
            else return 1
        }).filter((a)=> {
            if (new Date(a.startTime).getTime() < new Date().getTime()) return false
            else return true
        }).slice(0, 4)
        let tmpUpcomingData = []
        for (let m of tmp) {
            const resp = await getMarketBooks({
                marketId: m.marketId,
            })
            if (resp.success) {
                tmpUpcomingData.push ({
                    totalMatched: Number(resp.data.totalMatched),
                    marketPercent: ((Number(resp.data.totalMatched) / Number(resp.data.totalAvailable)) * 100).toFixed(2),
                    runnerLen: resp.data.runnerLen,
                    leftTime: getLeftTimeString(m.startTime),
                    venue: m.venue + " R" + m.raceNum.toString()
                })
            }
        }
        console.log (tmpUpcomingData)
        setUpcomingMarkets (tmpUpcomingData)
    }, [events])

    useEffect (() => {
        getUpcomingMarkets ()
    }, [getUpcomingMarkets])

    const getLeftTimeString = (datetimeStr) => {
        try {
            let date = new Date(datetimeStr) - new Date();

            // Extract hours and minutes, then format them
            let minutes = String(new Date(date).getMinutes());
            let seconds = String(new Date(date).getSeconds());

            return `${minutes}m ${seconds}s`;
        }catch (e) {
            console.log ("getLeftTimeString() call failed.", e)
            return "0m 0s"
        }
    }

    return (
        <div className="grid grid-flow-row gap-5 p-8 sm:p-15 md:p-20 lg:p-28">
            <Tracks setEventsObj={val => setEvents (val)}/>
            <div className='grid grid-cols-4 gap-4'>
                { upcomingMarkets.map((item, idx) => 
                    <Event 
                        key={idx}
                        venue={`${item['venue']}`}
                        pool={item['totalMatched']}
                        percent={item['marketPercent']}
                        runners={item['runnerLen']}
                        leftTime={item['leftTime']}
                    /> 
                )}
            </div>
            <RaceTable />
            <SelectionTable />
            <ScoreChart />
        </div>
    )
}

export default Home