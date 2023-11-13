/* eslint-disable react/jsx-key */
import { useCallback, useContext, useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import TracksForPlace from "../../components/Tracks/TracksForPlace"
import Event from "../../components/Event"

import { marketContext } from '../../contexts/marketContext';
import { eventsContext } from "../../contexts/eventsContext"
import { getRaceByNum } from '../../apis'
import ClockElement from "../../components/Tracks/ClockElement";
import PredictScoreChart from "../../components/ScoreChart/PredictScoreChart";

import silkImg from '../../assets/silks/silk.jpg'
import gearSvg from '../../assets/gears/gear.svg'
import { formattedNum,getDateString } from "../../utils";
import { CLASS_POINT } from "../../constants";

const Predictor = () => {

    const { market } = useContext (marketContext)
    const { events } = useContext (eventsContext)
    const [startDate, setStartDate] = useState ()
    const [race, setRace] = useState ()
    const [venue, setVenue] = useState ()
    const [raceNum, setRaceNum] = useState ()

    const initialize = useCallback(async() => {
        if (startDate === undefined) return
        let num = -1
        let venue =""
        events.map((event)=> {
            event.markets.map((m, idx) => {
                if (market.marketId === m.marketId) {
                    num = idx + 1
                    venue = m.venue
                }
            })
        })
        setVenue (venue)
        setRaceNum (num)
        if (num > 0 && venue !== "") {
            try {
                const resp = await getRaceByNum(getDateString(startDate), venue, num)
                console.log (resp)
                setRace (resp)

            } catch (e) {
                console.log (e)
            }
        }
    }, [startDate, market])

    useEffect (() => {
        initialize ()
    }, [initialize])

    return (
        <div className="flex flex-col gap-5 p-[16px] 2xl:p-[58px] 4xl:p-[112px] bg-white min-w-[1440px]">
            <TracksForPlace setDate={(val) => setStartDate(val)}/>
            <div className='grid grid-cols-4 gap-4'>
                <Event />
            </div>
            <div className="grid grid-cols-2 items-center justify-between bg-grey-4 border border-grey-2 rounded-[10px]">
                <div className="p-5 text-xl text-black-2 font-bold leading-6">
                    {
                        venue && raceNum > 0 && race && race['class'] && race['class'].length > 0 ? (
                        <>
                            {`${venue} · R${raceNum}`} &nbsp;
                            <span className="text-grey-1 font-normal">{`(${race['class']})`}</span>
                        </>) : (
                            <div className="w-[200px]">
                                <Skeleton
                                    baseColor="#EAECF0"
                                    style={{ height: "100%" }}
                                    highlightColor="#D9D9D9"
                                />
                            </div>
                        )
                    }
                    
                </div>
                <div className="grid grid-cols-2">
                    <div className="grid grid-cols-3 border-l border-grey-2">
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Total Prize</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                            {
                                race && race['totalPrize'] ? (
                                    formattedNum(race['totalPrize'], true)
                                ) : (
                                    <Skeleton
                                        baseColor="#EAECF0"
                                        style={{ width: "100%" }}
                                        highlightColor="#D9D9D9"
                                    />
                                )
                            }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Betfair Pool</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['totalMatched'] ? (
                                        formattedNum(race['totalMatched'], true)
                                    ) : (
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Class</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['class'] ? (
                                        CLASS_POINT[race['class']]
                                    ) : (
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 border-l border-grey-2">
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Distance</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['distance'] ? (
                                        `${race['distance']}m`
                                    ) : (
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Condition</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['condition'] ? (
                                        `${race['condition']}`
                                    ) : (
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Start Time</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {   race && race['startTime'] && (
                                    new Date(race['startTime']).getTime() < new Date().getTime() ? 
                                    (<span className='text-shadow-sm text-grey-1'>$0</span>)
                                    // (<span className='text-shadow-sm shadow-green-600 text-green-1'>Closed</span>)
                                    : ( <ClockElement market={market}/> ))
                                }
                                {   (!race || (race && !race['startTime'])) &&
                                    <Skeleton
                                        baseColor="#EAECF0"
                                        style={{ width: "100%" }}
                                        highlightColor="#D9D9D9"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between bg-grey-4 border border-grey-2 rounded-[10px]">
                <div className="grid grid-cols-24 text-black-2 font-semibold text-sm leading-6">
                    <div className="col-span-1 predictor-race-header">Gear</div>
                    <div className="col-span-1 predictor-race-header">Silks</div>
                    <div className="col-span-1 predictor-race-header">Num</div>
                    <div className="col-span-2 p-5 flex flex-row items-center justify-start">Horse</div>
                    <div className="col-span-1 predictor-race-header">Starts</div>
                    <div className="col-span-1 predictor-race-header">Framed</div>
                    <div className="col-span-1 predictor-race-header">Barrier</div>
                    <div className="col-span-1 predictor-race-header">Weight</div>
                    <div className="col-span-1 predictor-race-header">Class</div>
                    <div className="col-span-1 predictor-race-header">AVG$</div>
                    <div className="col-span-1 predictor-race-header">Career/F</div>
                    <div className="col-span-1 predictor-race-header">Career/W</div>
                    <div className="col-span-1 predictor-race-header">Career/P</div>
                    <div className="col-span-1 predictor-race-header">Condition</div>
                    <div className="col-span-1 predictor-race-header">Distance</div>
                    <div className="col-span-1 predictor-race-header">Track</div>
                    <div className="col-span-1 predictor-race-header">Jockey</div>
                    <div className="col-span-1 predictor-race-header">Trainer</div>
                    <div className="col-span-1 predictor-race-header">Settling</div>
                    <div className="col-span-1 predictor-race-header">600m</div>
                    <div className="col-span-1 predictor-race-header">Speed</div>
                    <div className="col-span-1 predictor-race-header">Lst/Fn</div>
                    <div className="col-span-1 predictor-race-header">Lst/Mgn</div>
                </div>

                { (!race || (race && race['horses'].length == 0)) &&
                    Array.from({length: 8}).map((_, idx) => 
                        <div key={idx} className="py-3 px-2 w-full h-full border-t border-grey-2 self-center">
                            <Skeleton
                                baseColor="#EAECF0"
                                style={{ width: "100%" }}
                                highlightColor="#D9D9D9"
                            />
                        </div>
                    )
                }
                {race && race['horses'].length > 0 &&
                    race['horses'].map ((horse, idx) =>
                        <div key={idx} className="grid grid-cols-24 text-black-2 font-normal text-sm leading-6">
                        <div className="col-span-1 predictor-race-body">
                            <img src={gearSvg} className="w-8 h-8"/>
                        </div>
                        <div className="col-span-1 predictor-race-body">
                            <img src={horse['horse_silk']} className="w-8 h-8"/>
                        </div>
                        <div className="col-span-1 predictor-race-body">{idx + 1}</div>
                        <div className="col-span-2 p-5 flex flex-row items-center justify-start">{horse['horse_name']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['starts']}</div>
                        <div className="col-span-1 predictor-race-body">Framed</div>
                        <div className="col-span-1 predictor-race-body">{horse['horse_barrier']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['weight']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['class']}</div>
                        <div className="col-span-1 predictor-race-body">{formattedNum(horse['average'], true)}</div>
                        <div className="col-span-1 predictor-race-body">{horse['finishPercent']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['winPercent']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['placePercent']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['condition']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['distance']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['track']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['jockey']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['trainer']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['settling']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['last_600']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['speed']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['lastFn']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['lastMgn']}</div>
                        </div>
                    )
                }
            </div>
            <PredictScoreChart startDate={startDate} venue={venue} number={raceNum}/>
        </div>
    )
}

export default Predictor