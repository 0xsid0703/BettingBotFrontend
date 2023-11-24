/* eslint-disable react/jsx-key */
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import TracksForPlace from "../../components/Tracks/TracksForPlace"
import Event from "../../components/Event"

import { marketContext } from '../../contexts/marketContext';
import { eventsContext } from "../../contexts/eventsContext"
import { getRaceByNum, getRaceCardByNum, getRaceFormByNum } from '../../apis'
import ClockElement from "../../components/Tracks/ClockElement";
// import PredictScoreChart from "../../components/ScoreChart/PredictScoreChart";

import gearSvg from '../../assets/gears/gear.svg'
import blackSvg from '../../assets/gears/Black.svg'
import blackCONBSvg from '../../assets/gears/Black-CrossOverNoseBand.svg'
import blackEMSvg from '../../assets/gears/Black-EarMuffs.svg'
import blackNRSvg from '../../assets/gears/Black-NoseRoll.svg'
import blackPSvg from '../../assets/gears/Black-Pacifiers.svg'
import blackWSvg from '../../assets/gears/Black-Winkers.svg'
import blackBSvg from '../../assets/gears/Black-Blinkers.svg'
import blackBFSvg from '../../assets/gears/Black-BlinkersFirstTime.svg'
import brownSvg from '../../assets/gears/Brown.svg'
import brownCONBSvg from '../../assets/gears/Brown-CrossOverNoseBand.svg'
import brownEMSvg from '../../assets/gears/Brown-EarMuffs.svg'
import brownNRSvg from '../../assets/gears/Brown-NoseRoll.svg'
import brownPSvg from '../../assets/gears/Brown-Pacifiers.svg'
import brownWSvg from '../../assets/gears/Brown-Winkers.svg'
import brownBSvg from '../../assets/gears/Brown-Blinkers.svg'
import brownBFSvg from '../../assets/gears/Brown-BlinkersFirstTime.svg'
import chestnutSvg from '../../assets/gears/Chestnut.svg'
import chestnutCONBSvg from '../../assets/gears/Chestnut-CrossOverNoseBand.svg'
import chestnutEMSvg from '../../assets/gears/Chestnut-EarMuffs.svg'
import chestnutNRSvg from '../../assets/gears/Chestnut-NoseRoll.svg'
import chestnutPSvg from '../../assets/gears/Chestnut-Pacifiers.svg'
import chestnutWSvg from '../../assets/gears/Chestnut-Winkers.svg'
import chestnutBSvg from '../../assets/gears/Chestnut-Blinkers.svg'
import chestnutBFSvg from '../../assets/gears/Chestnut-BlinkersFirstTime.svg'
import baySvg from '../../assets/gears/Bay.svg'
import bayBSvg from '../../assets/gears/Bay-Blinkers.svg'
import bayCONBSvg from '../../assets/gears/Bay-CrossOverNoseBand.svg'
import bayEMSvg from '../../assets/gears/Bay-EarMuffs.svg'
import bayNRSvg from '../../assets/gears/Bay-NoseRoll.svg'
import bayPSvg from '../../assets/gears/Bay-Pacifiers.svg'
import bayWSvg from '../../assets/gears/Bay-Winkers.svg'
import bayBFSvg from '../../assets/gears/Bay-BlinkersFirstTime.svg'
import greySvg from '../../assets/gears/Grey.svg'
import greyCONBSvg from '../../assets/gears/Grey-CrossOverNoseBand.svg'
import greyEMSvg from '../../assets/gears/Grey-EarMuffs.svg'
import greyNRSvg from '../../assets/gears/Grey-NoseRoll.svg'
import greyPSvg from '../../assets/gears/Grey-Pacifiers.svg'
import greyWSvg from '../../assets/gears/Grey-Winkers.svg'
import greyBSvg from '../../assets/gears/Grey-Blinkers.svg'
import greyBFSvg from '../../assets/gears/Grey-BlinkersFirstTime.svg'

import { formattedNum,getDateString } from "../../utils";
import { CLASS_POINT } from "../../constants";
import clsx from "clsx";

const IMAG_PATH = {
    'b': baySvg,
    'b-CONB': bayCONBSvg,
    'b-EM': bayEMSvg,
    'b-NR': bayNRSvg,
    'b-P': bayPSvg,
    'b-W': bayWSvg,
    'b-B': bayBSvg,
    'b-BF': bayBFSvg,
    'bl': blackSvg,
    'bl-CONB': blackCONBSvg,
    'bl-EM': blackEMSvg,
    'bl-NR': blackNRSvg,
    'bl-P': blackPSvg,
    'bl-W': blackWSvg,
    'bl-B': blackBSvg,
    'bl-BF': blackBFSvg,
    'br': brownSvg,
    'br-CONB': brownCONBSvg,
    'br-EM': brownEMSvg,
    'br-NR': brownNRSvg,
    'br-P': brownPSvg,
    'br-W': brownWSvg,
    'br-B': brownBSvg,
    'br-BF': brownBFSvg,
    'b/br': baySvg,
    'b/br-B': bayBSvg,
    'b/br-BF': bayBFSvg,
    'br/bl': brownSvg,
    'br/bl-B': brownBSvg,
    'br/bl-BF': brownBFSvg,
    'gr': greySvg,
    'gr-CONB': greyCONBSvg,
    'gr-EM': greyEMSvg,
    'gr-NR': greyNRSvg,
    'gr-P': greyPSvg,
    'gr-W': greyWSvg,
    'gr-B': greyBSvg,
    'gr-BF': greyBFSvg,
    'gr/br': greySvg,
    'gr/br-B': greyBSvg,
    'gr/br-BF': greyBFSvg,
    'gr/bl': blackSvg,
    'gr/bl-B': blackBSvg,
    'gr/bl-BF': blackBFSvg,
    'gr/ro': greySvg,
    'gr/ro-B': greyBSvg,
    'gr/ro-BF': greyBFSvg,
    'gr/b': greySvg,
    'gr/b-B': greyBSvg,
    'gr/b-BF': greyBFSvg,
    'gr/ch': greySvg,
    'gr/ch-B': greyBSvg,
    'gr/ch-BF': greyBFSvg,
    'ch': chestnutSvg,
    'ch-CONB': chestnutCONBSvg,
    'ch-EM': chestnutEMSvg,
    'ch-NR': chestnutNRSvg,
    'ch-P': chestnutPSvg,
    'ch-W': chestnutWSvg,
    'ch-B': chestnutBSvg,
    'ch-BF': chestnutBFSvg,
    'wh': greySvg,
    'wh-B': greyBSvg,
    'wh-BF': greyBFSvg,
    'du/ch': chestnutSvg,
    'du/ch-B': chestnutBSvg,
    'du/ch-BF': chestnutBFSvg,
    'wh/b': baySvg,
    'wh/b-B': bayBSvg,
    'wh/b-BF': bayBFSvg,
}

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
    const [curTab, setCurTab] = useState (0)

    const startDateRef = useRef(startDate)
    const eventsRef = useRef(events)
    const marketRef = useRef(market)
    const curConditionRef = useRef(curCondition)
    const curTabRef = useRef(curTab)
    const intervalRef = useRef()

    useEffect(() => {
        startDateRef.current = startDate
        setRace ()
    }, [startDate])

    useEffect(() => {
        eventsRef.current = events
        setRace ()
    }, [events])

    useEffect(() => {
        marketRef.current = market
        setRace ()
    }, [market])

    useEffect(() => {
        curConditionRef.current = curCondition
        setRace ()
    }, [curCondition])

    useEffect(() => {
        curTabRef.current = curTab
        setRace ()
    }, [curTab])

    const initialize = useCallback(async() => {
        if (startDateRef.current === undefined) return
        // setRace ()
        if (intervalRef.current) clearInterval(intervalRef.current)
        let num = -1
        let venue =""

        eventsRef.current.map((event)=> {
            event.markets.map((m, idx) => {
                if (marketRef.current.marketId === m.marketId) {
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
                const resp = curTabRef.current === 0 ? 
                    await getRaceCardByNum(getDateString(startDate), venue, num, curConditionRef.current) :
                    await getRaceFormByNum(getDateString(startDate), venue, num, curConditionRef.current)
                setRace (resp)

            } catch (e) {
                console.log (e)
            }
        }
    }, [startDateRef.current, eventsRef.current, marketRef.current, curConditionRef.current, curTabRef.current])

    // useEffect (() => {
    //     initialize ()
    // }, [initialize])

    useEffect (() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = setInterval(async() => {
            console.log ("FFFFFFFF")
            await initialize()
        }, [5000])
        return () => clearInterval(intervalRef.current)
    }, [initialize])

    return (
        <div className="flex flex-col gap-5 p-[16px] 2xl:p-[58px] 4xl:p-[112px] bg-white min-w-[1440px]">
            <TracksForPlace setDate={(val) => setStartDate(val)}/>
            <div className='grid grid-cols-6 gap-4'>
                <Event show={6}/>
            </div>
            <div className="grid grid-cols-2 items-center justify-between bg-grey-4 border border-grey-2 rounded-[10px]">
                <div className="px-8 py-2 text-xl text-black-2 font-bold leading-6">
                    {
                        venue && raceNum > 0 && race && race['classStr'] && race['classStr'].length > 0 ? (
                        <>
                            {`${venue} · R${raceNum}`} &nbsp;
                            <span className="text-grey-1 font-normal">{`(${race['classStr']})`}</span>
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
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Total Prize</div>
                            <div className="flex flex-row items-center justify-center p-2 text-black-1 text-sm font-normal leading-6">
                            {
                                race && race['totalPrize'] ? (
                                    `$${formattedNum(parseInt(race['totalPrize']))}`
                                ) : (
                                    <div className="w-full">
                                    <Skeleton
                                        baseColor="#EAECF0"
                                        style={{ width: "100%" }}
                                        highlightColor="#D9D9D9"
                                    /></div>
                                )
                            }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Betfair Pool</div>
                            <div className="flex flex-row items-center justify-center p-2 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['totalMatched'] !== undefined ? (
                                        `$${formattedNum(race['totalMatched'])}`
                                    ) : (
                                        <div className="w-full">
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        /></div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Class</div>
                            <div className="flex flex-row items-center justify-center p-2 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['class'] !== undefined ? (
                                        race['class']
                                    ) : (
                                        <div className="w-full">
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        /></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="grid grid-rows-2">
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Distance</div>
                            <div className="flex flex-row items-center justify-center p-2 text-black-1 text-sm font-normal leading-6">
                                {
                                    race && race['distance'] ? (
                                        `${race['distance']}m`
                                    ) : (
                                        <div className="w-full">
                                        <Skeleton
                                            baseColor="#EAECF0"
                                            style={{ width: "100%" }}
                                            highlightColor="#D9D9D9"
                                        /></div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="grid grid-rows-2">
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Condition</div>
                            <div className="text-center p-2 text-black-1 text-sm font-normal leading-6">
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
                            <div className="flex flex-row items-center justify-center p-2 text-black-2 text-sm font-semibold leading-6 border-b border-grey-2">Start Time</div>
                            <div className="flex flex-row items-center justify-center p-2 text-black-1 text-sm font-normal leading-6">
                                {   race && race['startTime'] && (
                                    new Date(race['startTime']).getTime() < new Date().getTime() ? 
                                    (<span className='text-shadow-sm text-grey-1'>$0</span>)
                                    // (<span className='text-shadow-sm shadow-green-600 text-green-1'>Closed</span>)
                                    : ( <ClockElement market={curMarket}/> ))
                                }
                                {   (!race || (race && !race['startTime'])) &&
                                    <div className="w-full">
                                    <Skeleton
                                        baseColor="#EAECF0"
                                        style={{ width: "100%" }}
                                        highlightColor="#D9D9D9"
                                    /></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between bg-grey-4 border border-grey-2 rounded-[10px]">
                <div className="flex flex-row items-center justify-start gap-8 px-8 py-5 text-base text-grey-1 border-b border-grey-2 w-full">
                    <div 
                        className={clsx(`${curTab === 0? "text-black-2": ""} cursor-pointer font-semibold leading-6`)}
                        onClick={() => setCurTab(0)}
                    >Race Card</div>
                    <div 
                        className={clsx(`${curTab === 1? "text-black-2": ""} cursor-pointer font-semibold leading-6`)}
                        onClick={() => setCurTab(1)}
                    >Form Stats</div>
                </div>
                {
                    curTab === 1 &&(
                    <>
                    <div className="grid grid-cols-24 text-black-2 font-semibold text-sm leading-6 h-12 w-full">
                        <div className="col-span-1 predictor-race-header">Gear</div>
                        <div className="col-span-1 predictor-race-header">Silks</div>
                        <div className="col-span-1 predictor-race-header">Num</div>
                        <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">Horse</div>
                        <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">Jockey</div>
                        {/* <div className="col-span-1 predictor-race-header">Starts</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Framed</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Barrier</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Weight</div> */}
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
                            <div key={idx} className="py-5 px-5 w-full h-full border-t border-grey-2 self-center w-full">
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
                            <div key={idx} className="grid grid-cols-24 text-black-2 border-t border-grey-2 font-normal text-sm leading-6 w-full">
                            <div className="col-span-1 predictor-race-body">
                                {
                                    IMAG_PATH[horse['gear']] &&
                                    <img src={IMAG_PATH[horse['gear']]} className="w-8 h-8"/>
                                }
                                {
                                    !IMAG_PATH[horse['gear']] &&
                                    <img src={gearSvg} className="w-8 h-8"/>
                                }
                            </div>
                            <div className="col-span-1 predictor-race-body">
                                <img src={horse['horse_silk']} className="w-8 h-8"/>
                            </div>
                            <div className="col-span-1 predictor-race-body">{horse['tab_no']}</div>
                            <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">
                                <a href={`/horse/au/${horse['horse_id']}`} className="text-blue-1">
                                    {horse['horse_name']}
                                </a>
                            </div>
                            {/* <div className="col-span-1 predictor-race-body">{horse['starts']}</div>
                            <div className="col-span-1 predictor-race-body">{(horse['framed_odds']).toFixed(2)}</div>
                            <div className="col-span-1 predictor-race-body">{horse['horse_barrier']}</div>
                            <div className="col-span-1 predictor-race-body">{horse['weight']}</div> */}
                            <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">
                                <a href={`/jockey/au/${horse['jockey_id']}`} className="text-blue-1">
                                    {horse['jockey_name']}
                                </a>
                            </div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['class'])}%</div>
                            <div className="col-span-1 predictor-race-body">{`$${formattedNum(horse['average'])}`}</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['finishPercent'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['winPercent'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['placePercent'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['condition'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['distance'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['track'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['jockey'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['trainer'])}%</div>
                            <div className="col-span-1 predictor-race-body">{parseInt(horse['settling'])}%</div>
                            <div className="col-span-1 predictor-race-body">{Number(horse['last_600']).toFixed(2)}</div>
                            <div className="col-span-1 predictor-race-body">{horse['speed']}</div>
                            <div className="col-span-1 predictor-race-body">{horse['lastFn'] !== undefined ? parseInt(horse['lastFn']) : 0}%</div>
                            <div className="col-span-1 predictor-race-body">{horse['lastMgn'] !== undefined ? horse['lastMgn'] : 10}</div>
                            </div>
                        )
                    }
                    </>)
                }
                {
                    curTab === 0 && (
                        <>
                        <div className="grid grid-cols-24 text-black-2 font-semibold text-sm leading-6 h-12 w-full">
                            <div className="col-span-1 predictor-race-header">Gear</div>
                            <div className="col-span-1 predictor-race-header">Silks</div>
                            <div className="col-span-1 predictor-race-header">Num</div>
                            <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">Horse</div>
                            <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">Jockey</div>
                            <div className="col-span-1 predictor-race-header">Starts</div>
                            <div className="col-span-1 predictor-race-header">Barrier</div>
                            <div className="col-span-1 predictor-race-header">Weight</div>
                            <div className="col-span-7 p-5 flex flex-row items-center justify-start h-12">Form Score</div>
                            <div className="col-span-1 predictor-race-header">Framed</div>
                            <div className="col-span-1 predictor-race-header">Betfair</div>
                            <div className="col-span-1 predictor-race-header">Diff%</div>
                            <div className="col-span-1 predictor-race-header">10m</div>
                            <div className="col-span-1 predictor-race-header">5m</div>
                        </div>

                        { (!race || (race && race['horses'].length == 0)) &&
                            Array.from({length: 8}).map((_, idx) => 
                                <div key={idx} className="py-5 px-5 w-full h-full border-t border-grey-2 self-center w-full">
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
                                <div key={idx} className="grid grid-cols-24 text-black-2 border-t border-grey-2 font-normal text-sm leading-6 w-full">
                                <div className="col-span-1 predictor-race-body">
                                    {
                                        IMAG_PATH[horse['gear']] &&
                                        <img src={IMAG_PATH[horse['gear']]} className="w-8 h-8"/>
                                    }
                                    {
                                        !IMAG_PATH[horse['gear']] &&
                                        <img src={gearSvg} className="w-8 h-8"/>
                                    }
                                </div>
                                <div className="col-span-1 predictor-race-body">
                                    <img src={horse['horse_silk']} className="w-8 h-8"/>
                                </div>
                                <div className="col-span-1 predictor-race-body">{horse['tab_no']}</div>
                                <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">
                                    <a href={`/horse/au/${horse['horse_id']}`} className="text-blue-1">
                                        {horse['horse_name']}
                                    </a>
                                </div>
                                <div className="col-span-3 p-5 flex flex-row items-center justify-start h-12">
                                    <a href={`/jockey/au/${horse['jockey_id']}`} className="text-blue-1">
                                        {horse['jockey_name']}
                                    </a>
                                </div>
                                <div className="col-span-1 predictor-race-body">{horse['starts']}</div>
                                <div className="col-span-1 predictor-race-body">{horse['horse_barrier']}</div>
                                <div className="col-span-1 predictor-race-body">{horse['weight']}</div>
                                <div className="col-span-7 px-5 py-2 flex flex-row items-center justify-start">
                                    <div className="w-full bg-transparent rounded-full h-6">
                                        <div className="flex flex-row items-center justify-end bg-blue-1 h-6 rounded-md text-white text-sm pr-2" style={{width: `${parseFloat(horse['score'])/10 * 100}%`}}>{parseFloat(horse['score']).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="col-span-1 predictor-race-body">${horse['framed_odds'] ? (horse['framed_odds']).toFixed(2) : 0}</div>
                                <div className="col-span-1 predictor-race-body">${horse['betfair'] ? (horse['betfair']).toFixed(2) : 0}</div>
                                <div className="col-span-1 predictor-race-body">{parseInt(horse['diff'])}%</div>
                                <div className="col-span-1 predictor-race-body">{parseInt(horse['10m'])}%</div>
                                <div className="col-span-1 predictor-race-body">{parseInt(horse['5m'])}%</div>
                                </div>
                            )
                        }
                        </>
                    )
                }
            </div>
            {/* <PredictScoreChart startDate={startDate} venue={venue} number={raceNum} condition={curCondition} height={race ? race['horses'].length * 72 : 0}/> */}
            {/* <div className="flex flex-col items-center justify-between bg-grey-4 border border-grey-2 rounded-[10px]">
                
            </div> */}
        </div>
    )
}

export default Predictor