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

import gearSvg from '../../assets/gears/gear.svg'
import { formattedNum,getDateString } from "../../utils";
import { CLASS_POINT } from "../../constants";

const Predictor = () => {

    const { market } = useContext (marketContext)
    const { events } = useContext (eventsContext)
    const [startDate, setStartDate] = useState ()
    const [curMarket, setCurMarket] = useState ()
    const [race, setRace] = useState ()
    const [venue, setVenue] = useState ()
    const [raceNum, setRaceNum] = useState ()
    const [selected, setSelected] = useState (false)
    const [curCondition, setCurCondition]=  useState ("Good")

    const initialize = useCallback(async() => {
        if (startDate === undefined) return
        let num = -1
        let venue =""
        setRace ()

        events.map((event)=> {
            event.markets.map((m, idx) => {
                if (market.marketId === m.marketId) {
                    num = idx + 1
                    venue = m.venue
                    setVenue (m.venue)
                    setRaceNum (idx + 1)
                    setCurMarket (m)
                }
            })
        })
        if (num > 0 && venue !== "") {
            try {
                const resp = await getRaceByNum(getDateString(startDate), venue, num, curCondition)
                console.log (resp, ">>>>>")
                setRace (resp)

            } catch (e) {
                console.log (e)
            }
        }
    }, [startDate, events, market, curCondition])

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
                                    `$${formattedNum(parseInt(race['totalPrize']))}`
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
                                        `$${formattedNum(race['totalMatched'])}`
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
                    <div className="grid grid-cols-3">
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
                                <div className="w-full relative flex flex-col items-center">
                                <button
                                    id="dropdownButton"
                                    data-dropdown-toggle="dropdown"
                                    className='text-black-2 w-full text-ellipsis overflow-hidden font-medium rounded-md text-sm px-4 tracking-wide text-center inline-flex items-center justify-center leading-8'
                                    type="button"
                                    onClick={()=>setSelected(!selected)}
                                >
                                    {curCondition}
                                    <svg
                                        className="w-2.5 h-2.5 ml-1.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="#6F6E84"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                <div
                                    id="dropdown"
                                    className={
                                        selected
                                            ? `z-20 bg-v3-primary border absolute border-primary divide-y divide-gray-100 rounded-lg shadow bg-white mt-8 overflow-y-auto max-h-[500px]`
                                            : `hidden`
                                    }
                                    style={{ width: `${100}px` }}
                                >
                                    { ["Good", "Heavy","Soft", "Synthetic", "Firm"].map ((item, idx) => 
                                    <ul
                                        className={`py-2 text-sm text-v3-primary font-medium dark:text-gray-200`}
                                        aria-labelledby="dropdownButton"
                                        key={idx}
                                    >
                                        <li onClick={() => {setCurCondition (item); setSelected(false)}}>
                                            <a className="flex flex-row items-center px-4 py-2 hover:bg-dropdown cursor-pointer">
                                                {item}
                                            </a>
                                        </li>
                                    </ul>
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="text-center p-5 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Start Time</div>
                            <div className="text-center p-5 text-black-1 text-sm font-normal leading-6">
                                {   race && race['startTime'] && (
                                    new Date(race['startTime']).getTime() < new Date().getTime() ? 
                                    (<span className='text-shadow-sm text-grey-1'>$0</span>)
                                    // (<span className='text-shadow-sm shadow-green-600 text-green-1'>Closed</span>)
                                    : ( <ClockElement market={curMarket}/> ))
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
                        <div className="col-span-1 predictor-race-body">{(horse['framed_odds']).toFixed(2)}</div>
                        <div className="col-span-1 predictor-race-body">{horse['horse_barrier']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['weight']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['class']}</div>
                        <div className="col-span-1 predictor-race-body">{`$${formattedNum(horse['average'])}`}</div>
                        <div className="col-span-1 predictor-race-body">{horse['finishPercent']}%</div>
                        <div className="col-span-1 predictor-race-body">{horse['winPercent']}%</div>
                        <div className="col-span-1 predictor-race-body">{horse['placePercent']}%</div>
                        <div className="col-span-1 predictor-race-body">{parseInt(horse['condition'])}%</div>
                        <div className="col-span-1 predictor-race-body">{parseInt(horse['distance'])}%</div>
                        <div className="col-span-1 predictor-race-body">{horse['track']}%</div>
                        <div className="col-span-1 predictor-race-body">{horse['jockey']}%</div>
                        <div className="col-span-1 predictor-race-body">{horse['trainer']}%</div>
                        <div className="col-span-1 predictor-race-body">{parseInt(horse['settling'])}%</div>
                        <div className="col-span-1 predictor-race-body">{parseInt(horse['last_600'])}</div>
                        <div className="col-span-1 predictor-race-body">{horse['speed']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['lastFn']}</div>
                        <div className="col-span-1 predictor-race-body">{horse['lastMgn']}</div>
                        </div>
                    )
                }
            </div>
            <PredictScoreChart startDate={startDate} venue={venue} number={raceNum} condition={curCondition}/>
        </div>
    )
}

export default Predictor