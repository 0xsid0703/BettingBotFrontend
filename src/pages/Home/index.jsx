/* eslint-disable react-hooks/exhaustive-deps */

import Tracks from '../../components/Tracks'
import Event from '../../components/Event'
import RaceTable from '../../components/RaceTable'
import SelectionTable from '../../components/SelectionTable'
import ScoreChart from '../../components/ScoreChart'

const Home = () => {
    // const [upcomingMarkets, setUpcomingMarkets] = useState ([])
    // const [events, setEvents] = useState ([])

    // const {market, setMarket} = useContext(marketContext)


    // const getUpcomingMarkets = async() => {
    //     if (events.length === 0) return
    //     let tmp = []
    //     events.map((item)=>{
    //         item?.markets.map((market, idx)=> {
    //             market["raceNum"] = idx + 1
    //             tmp.push (market)
    //         })
    //     })
    //     tmp = tmp.sort ((a, b)=>{
    //         if (new Date(a.startTime).getTime() < new Date(b.startTime).getTime()) return -1
    //         else return 1
    //     })
    //     .filter((a)=> new Date(a.startTime).getTime() > new Date().getTime())
    //     .slice(0, 4)
    //     let tmpUpcomingData = []
    //     for (let m of tmp) {
    //         const resp = await getMarketBooks({
    //             marketId: m.marketId,
    //         })
    //         let totalMatched = 0
    //         let marketPercent = 0
    //         let runnerLen = 0
    //         if (resp.success) {
    //             totalMatched = Number(resp.data.totalMatched)
    //             marketPercent = ((Number(resp.data.totalMatched) / Number(resp.data.totalAvailable)) * 100).toFixed(2)
    //             runnerLen = resp.data.runnerLen
    //         }
    //         tmpUpcomingData.push ({
    //             totalMatched: totalMatched,
    //             marketPercent: marketPercent,
    //             runnerLen: runnerLen,
    //             leftTime: getLeftTimeString(m.startTime),
    //             venue: m.venue + " R" + m.raceNum.toString(),
    //             marketId: m.marketId,
    //         })
    //     }
    //     if (tmpUpcomingData.length > 0) {
    //         if (!market) setMarket ({marketId: tmpUpcomingData[0]['marketId'], venue: tmpUpcomingData[0]['venue']})
    //         setUpcomingMarkets (tmpUpcomingData)
    //     }
    // }


    return (
        <div className="grid grid-flow-row gap-5 p-8 sm:p-15 md:p-20 lg:p-28">
            <Tracks />
            {/* <Tracks setEventsObj={val => setEvents (val)}/> */}
            <div className='grid grid-cols-4 gap-4'>
                <Event />
                {/* { upcomingMarkets.map((item, idx) => 
                    <Event 
                        key={idx}
                        venue={`${item['venue']}`}
                        pool={item['totalMatched']}
                        percent={item['marketPercent']}
                        runners={item['runnerLen']}
                        leftTime={item['leftTime']}
                        marketId={item['marketId']}
                    /> 
                )} */}
            </div>
            <RaceTable />
            <SelectionTable />
            <ScoreChart />
        </div>
    )
}

export default Home