/* eslint-disable react/jsx-key */
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
    Dialog,
    Card,
    Slider,
    CardBody,
    slider,
} from "@material-tailwind/react";

import TracksForPlace from "../../components/Tracks/TracksForPlace"
import Event from "../../components/Event"

import { marketContext } from '../../contexts/marketContext';
import { eventsContext } from "../../contexts/eventsContext"
import { getRaceCardByNum, getRaceFormByNum, setRaceCondition } from '../../apis'
import ClockElement from "../../components/Tracks/ClockElement";

import settingSvg from "../../assets/settings.svg"
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

const SORT_FIELD = {
    NO: 'tab_no',
    HORSE: 'horse_name',
    JOCKEY: 'jockey_name',
    STARTS: 'starts',
    BARRIER: 'horse_barrier',
    WEIGHT: 'weight',
    SCORE: 'score',
    FRAMED: 'framed_odds',
    BETFAIR: 'betfair',
    LIVE: 'live',
    DIFF: 'diff',
    TEN_DIFF: '10m',
    FIVE_DIFF: '5m',
    CLASS: 'class',
    AVG: 'average',
    FINISH: 'finishPercent',
    WIN: 'winPercent',
    PLACE: 'placePercent',
    CONDITION: 'condition',
    DISTANCE: 'distance',
    TRACK_PERCENT: 'track',
    JOCKEY_PERCENT: 'jockey',
    TRAINER_PERCENT: 'trainer',
    SETTLING: 'settling',
    LAST600: 'last_600',
    SPEED: 'speed',
    LASTFN: 'lastFn',
    LASTMGN: 'lastMgn',
}

const CONDITION = {
    GOOD: "Good",
    HEAVY: "Heavy",
    SOFT: "Soft",
    DEAD: "Dead",
    SYNTHETIC: "Synthetic",
    FIRM: "Firm",
}

const Predictor = () => {

    const { market } = useContext (marketContext)
    const { events } = useContext (eventsContext)
    const [startDate, setStartDate] = useState ()
    const [curMarket, setCurMarket] = useState ()
    const [race, setRace] = useState ()
    const [form, setForm] = useState ()
    const [venue, setVenue] = useState ()
    const [raceNum, setRaceNum] = useState ()
    const [selected, setSelected] = useState (false)
    const [curCondition, setCurCondition]=  useState ()
    const [showCondition, setShowCondition]=  useState ()
    const [curTab, setCurTab] = useState (0)
    const [sortedCol, setSortedCol] = useState (SORT_FIELD.NO)
    const [sortDirection, setSortDirection] = useState(true)
    const [open, setOpen] = useState(false);
    const [selectedSwitch, setSelectedSwitch] = useState (false)
    const [curOdds, setCurOdds] = useState ("BSP")

    const handleOpen = () => setOpen((cur) => !cur);
    
    const connection = useRef (null)

    const startDateRef = useRef(startDate)
    const eventsRef = useRef(events)
    const marketRef = useRef(market)
    const curConditionRef = useRef(curCondition)
    const intervalRef = useRef()

    useEffect(() => {
        startDateRef.current = startDate
        // setRace ()
        // setForm ()
        setWholeData ()
        if (intervalRef.current) clearInterval(intervalRef.current)
    }, [startDate])

    useEffect(() => {
        eventsRef.current = events
        // setRace ()
        // setForm ()
        setWholeData ()
        if (intervalRef.current) clearInterval(intervalRef.current)
    }, [events])

    useEffect(() => {
        marketRef.current = market
        // setRace ()
        // setForm ()
        setWholeData ()
        if (intervalRef.current) clearInterval(intervalRef.current)
    }, [market])

    useEffect(() => {
        curConditionRef.current = curCondition
        // setRace ()
        // setForm ()
        if (intervalRef.current) clearInterval(intervalRef.current)
    }, [curCondition])

    const initialize = useCallback(async() => {
        if (startDateRef.current === undefined) return
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
                getRaceCardByNum(getDateString(startDateRef.current), venue, num, marketRef.current.marketId)
                    .then((data) => {
                        setRace(data)
                        if (data && data['condition']) {
                            setShowCondition (CONDITION[data['condition']])
                        }
                    })
                    .catch((err) => console.log (err))
                getRaceFormByNum(getDateString(startDateRef.current), venue, num, marketRef.current.marketId)
                    .then((data) => {
                        setForm(data)
                    })
                    .catch((err) => console.log (err))
            } catch (e) {
                console.log (e)
            }
        }
    }, [startDate, events, market, curCondition])

    useEffect (() => {
        initialize ()
    }, [initialize])

    useEffect(() => {
        if (curCondition) {
            if (startDateRef.current === undefined) return
            if (raceNum > 0 && venue !== "") {
                setRaceCondition(getDateString(startDateRef.current), venue, raceNum, curCondition)
                    .then((data) => {
                        console.log (data)
                    })
                    .catch((err) => console.log (err))
            }
        }
    }, [curCondition])

    const [sliderValue, setSliderValue] = useState ({
        'horse_barrier': 0.5,
        'weight': 0.5,
        'class': 0.5,
        'average': 0.5,
        'finishPercent': 0.5,
        'winPercent': 0,
        'placePercent': 0,
        'condition': 0.5,
        'distance': 0.5,
        'track': 0.5,
        'jockey': 0.5,
        'trainer': 0.5,
        'settling': 0.5,
        'last_600': 0.5,
        'speed': 0.5,
        'lastFn': 0.5,
        'lastMgn': 0.5
    })
    const [scores, setScores] = useState ()

    const calculateScores = useCallback(() => {
        // if (Object.keys(formInfos).length === 0) return
        if (!form || !race) return
        const higher_is_better = ['class', 'average', 'finishPercent', 'winPercent', 'placePercent', 'condition', 'distance', 'track', 'jockey', 'trainer', 'settling', 'lastFn', 'speed']
        const lower_is_better = ['horse_barrier', 'weight', 'last_600', 'lastMgn']
        let racedata = {}
        for (let col of [...higher_is_better, ...lower_is_better]) {
            for (let horse of race['horses']) {
                if (col in horse) {racedata[horse['horse_name']] = {...racedata[horse['horse_name']]}; racedata[horse['horse_name']][col] = Number(horse[col])}
            }
            for (let horse of form['horses']) {
                if (col in horse) {racedata[horse['horse_name']] = {...racedata[horse['horse_name']]}; racedata[horse['horse_name']][col] = Number(horse[col])}
            }
        }
        let min = {}, max = {}
        for (let col of [...higher_is_better, ...lower_is_better]) {
            min[col] = 999999999
            max[col] = 0
        }
        for (let col of [...higher_is_better, ...lower_is_better]) {
            for (let name of Object.keys(racedata)) {
                if (racedata[name][col] > max[col]) {max[col] = racedata[name][col]}
                if (racedata[name][col] < min[col]) {min[col] = racedata[name][col]}
            }
        }
        for (let col of higher_is_better) {
            for (let name of Object.keys(racedata)) {
                racedata[name][col] = (racedata[name][col] - min[col]) / (max[col] - min[col])
            }
        }
        let mint = {}, maxt = {}
        for (let col of [...higher_is_better, ...lower_is_better]) {
            mint[col] = 999999999
            maxt[col] = 0
        }
        for (let col of [...higher_is_better, ...lower_is_better]) {
            for (let name of Object.keys(racedata)) {
                if (racedata[name][col] > maxt[col]) {maxt[col] = racedata[name][col]}
                if (racedata[name][col] < mint[col]) {mint[col] = racedata[name][col]}
            }
        }
        for (let col of lower_is_better) {
            for (let name of Object.keys(racedata)) {
                racedata[name][col] = 1 - (racedata[name][col] - mint[col]) / (maxt[col]  - mint[col])
            }
        }
        let mean = {};
        min = 999999999, max = 0
        for (let name of Object.keys(racedata)) {
            mean[name] = 0
            let sum = 0, cnt = 0
            for (let col of [...higher_is_better, ...lower_is_better]) {
                if (!isNaN(racedata[name][col])) {sum += sliderValue[col] * racedata[name][col]; cnt++}
            }
            mean[name] = sum / cnt
            if (min > mean[name]) min = mean[name]
            if (max < mean[name]) max = mean[name]
        }

        const tmpMean = {...mean}
        for (let name of Object.keys(mean)) {
            if (max > min) {
                tmpMean[name] = 1 + 9 * (mean[name] - min) / (max - min)
            } else {
                tmpMean[name] = 0
            }
        }
        setScores (tmpMean)
    }, [race, form, sliderValue])

    const [framedOdds, setFramedOdds] = useState ()

    const calculateFramedOdds = useCallback(() => {
        if (!race || !scores) return
        let odds = {}
        for (let horse of race['horses']) {
            if ('odds' in horse) {odds[horse['horse_name']] = {...odds[horse['horse_name']]}; odds[horse['horse_name']] = Number(horse['odds'])}
        }
        let totalScores = 0
        for (let key of Object.keys(scores)) { totalScores += scores[key] }
        let rawProb = {}
        for (let key of Object.keys(scores)) { rawProb[key] = scores[key] / totalScores }
        try {
            let totalProb = 0
            // eslint-disable-next-line no-unused-vars
            for (let key of Object.keys(odds)) { if (parseFloat(odds[key]) > 0) totalProb += 1 / parseFloat(odds[key]) }
            let framed_odds = {}, adjt_prob = {}
            let adjt_factor = totalProb
            for (let key of Object.keys(rawProb)) {
                adjt_prob[key] = rawProb[key] * adjt_factor
                if (adjt_prob[key] > 0) {framed_odds[key] = 1 / adjt_prob[key]}
                else {framed_odds[key] = 0}
            }
            setFramedOdds (framed_odds)
        } catch (e) {
            console.log (e)
        }
        
    }, [scores, race])


    const checkScoresNaN = () => {
        if (!scores) {return false}
        for (let key of Object.keys(scores)) {
            if (isNaN (scores[key]) || scores[key] === "NaN") {
                return false
            }
        }
        return true
    }

    const checkFramedOdds = () => {
        if (!framedOdds) {return false}
        for (let key of Object.keys(framedOdds)) {
            if (isNaN (framedOdds[key]) || framedOdds[key] === "NaN" || framedOdds[key] === undefined) {
                return false
            }
        }
        return true
    }

    useEffect(() => {
        calculateScores ()
    }, [calculateScores])


    useEffect(() => {
        calculateFramedOdds ()
    }, [calculateFramedOdds])
    
    useEffect(() => {
        // eslint-disable-next-line no-undef
        const ws = new WebSocket(`${__WSURL__}`)
        ws.onopen = () => {
            let num = -1; 
            let mvenue = ''
            eventsRef.current.map((event)=> {
                event.markets.map((m, idx) => {
                    if (marketRef.current.marketId === m.marketId) {
                        num = idx + 1
                        mvenue = m.venue
                    }
                })
            })
            if (startDateRef.current && num > 0 && market) {
                const data = {
                    startDate: getDateString(startDateRef.current), venue: mvenue, raceNum: num, marketId: marketRef.current.marketId
                }
                ws.send (JSON.stringify(data))
            }
        }
        ws.onmessage = (event) => {
            if (event.data) {
                const dataObj = JSON.parse (event.data)
                if (dataObj.raceCard) { setRace (dataObj.raceCard)}
                if (dataObj.raceForm) { setForm (dataObj.raceForm)}
            }
        }
        ws.onclose = () => {
            console.log ("Close Connection!")
        }
        connection.current = ws
        return () => connection.current.close()
    }, [startDate, events, market])

    const [wholeData, setWholeData] = useState()
    useEffect(() => {
        let horses = []
        if (!race || !form || !scores || !framedOdds) return
        if (!checkScoresNaN()) return
        if (!checkFramedOdds()) return
        for (let rhorse of race['horses']) {
            for (let fhorse of form['horses']) {
                if (parseInt(rhorse['tab_no']) === parseInt(fhorse['tab_no'])) {
                    const tmpHorse = {
                        ...rhorse,
                        ...fhorse,
                        'score': scores[rhorse['horse_name']],
                        'framed_odds': framedOdds[rhorse['horse_name']],
                    }
                    horses.push ({
                        ...tmpHorse,
                        'diff': curOdds === "BSP" ? 
                        ((parseFloat(rhorse['betfair']) - parseFloat(framedOdds[rhorse['horse_name']])) * 100 / parseFloat(framedOdds[rhorse['horse_name']])).toFixed(2):
                        ((parseFloat(rhorse['odds']) - parseFloat(framedOdds[rhorse['horse_name']])) * 100 / parseFloat(framedOdds[rhorse['horse_name']])).toFixed(2)
                    })
                    break
                }
            }
        }
        horses = horses.length > 0 && horses.sort((a, b) => {
            if (sortDirection) {
                try{
                    if (parseFloat(a[sortedCol]) > parseFloat(b[sortedCol])) return 1
                    else return -1
                } catch (e) {
                    if (parseFloat(a[sortedCol]) > parseFloat(b[sortedCol])) return 1
                    else return -1
                }
            } else {
                try{
                    if (parseFloat(a[sortedCol]) > parseFloat(b[sortedCol])) return -1
                    else return 1
                } catch (e) {
                    if (parseFloat(a[sortedCol]) > parseFloat(b[sortedCol])) return -1
                    else return 1
                }
            }
        })
        setWholeData ({
            'totalPrize': race['totalPrize'],
            'totalMatched': race['totalMatched'],
            'class': race['class'],
            'classStr': race['classStr'],
            'distance': race['distance'],
            'startTime': race['startTime'],
            'condition': race['condition'],
            'horses': horses
        })
    }, [scores, framedOdds, sortedCol, sortDirection, curOdds, race, form])

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
                                        `$${formattedNum(parseInt(race['totalMatched']))}`
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
                                    {showCondition ? showCondition : "Good"}
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
                                    { ["Firm", "Good", "Soft", "Heavy", "Synthetic"].map ((item, idx) => 
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
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.NO)
                                setSortDirection(sortedCol !== SORT_FIELD.NO ? true : !sortDirection)
                            }}
                        >
                            Num
                        </div>
                        <div
                            className="col-span-3 p-5 flex flex-row items-center justify-start h-12 cursor-pointer"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.HORSE)
                                setSortDirection(sortedCol !== SORT_FIELD.HORSE ? true : !sortDirection)
                            }}
                        >
                            Horse
                        </div>
                        <div
                            className="col-span-3 p-5 flex flex-row items-center justify-start h-12 cursor-pointer"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.JOCKEY)
                                setSortDirection(sortedCol !== SORT_FIELD.JOCKEY ? true : !sortDirection)
                            }}
                        >
                            Jockey
                        </div>
                        {/* <div className="col-span-1 predictor-race-header">Starts</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Framed</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Barrier</div> */}
                        {/* <div className="col-span-1 predictor-race-header">Weight</div> */}
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.CLASS)
                                setSortDirection(sortedCol !== SORT_FIELD.CLASS ? true : !sortDirection)
                            }}
                        >
                            Class
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.AVG)
                                setSortDirection(sortedCol !== SORT_FIELD.AVG ? true : !sortDirection)
                            }}
                        >
                            AVG$
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.FINISH)
                                setSortDirection(sortedCol !== SORT_FIELD.FINISH ? true : !sortDirection)
                            }}
                        >
                            Finish
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.WIN)
                                setSortDirection(sortedCol !== SORT_FIELD.WIN ? true : !sortDirection)
                            }}
                        >
                            Win
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.PLACE)
                                setSortDirection(sortedCol !== SORT_FIELD.PLACE ? true : !sortDirection)
                            }}
                        >
                            Place
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.CONDITION)
                                setSortDirection(sortedCol !== SORT_FIELD.CONDITION ? true : !sortDirection)
                            }}
                        >
                            Condition
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.DISTANCE)
                                setSortDirection(sortedCol !== SORT_FIELD.DISTANCE ? true : !sortDirection)
                            }}
                        >
                            Distance
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.TRACK_PERCENT)
                                setSortDirection(sortedCol !== SORT_FIELD.TRACK_PERCENT ? true : !sortDirection)
                            }}
                        >
                            Track
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.JOCKEY_PERCENT)
                                setSortDirection(sortedCol !== SORT_FIELD.JOCKEY_PERCENT ? true : !sortDirection)
                            }}
                        >
                            Jockey
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.TRAINER_PERCENT)
                                setSortDirection(sortedCol !== SORT_FIELD.TRAINER_PERCENT ? true : !sortDirection)
                            }}
                        >
                            Trainer
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.SETTLING)
                                setSortDirection(sortedCol !== SORT_FIELD.SETTLING ? true : !sortDirection)
                            }}
                        >
                            Settling
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.LAST600)
                                setSortDirection(sortedCol !== SORT_FIELD.LAST600 ? true : !sortDirection)
                            }}
                        >
                            600m
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.SPEED)
                                setSortDirection(sortedCol !== SORT_FIELD.SPEED ? true : !sortDirection)
                            }}
                        >
                            Speed
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.LASTFN)
                                setSortDirection(sortedCol !== SORT_FIELD.LASTFN ? true : !sortDirection)
                            }}
                        >
                            Lst/Fn
                        </div>
                        <div
                            className="col-span-1 predictor-race-header"
                            onClick={() => {
                                setSortedCol(SORT_FIELD.LASTMGN)
                                setSortDirection(sortedCol !== SORT_FIELD.LASTMGN ? true : !sortDirection)
                            }}
                        >
                            Lst/Mgn
                        </div>
                    </div>

                    { (!wholeData || (wholeData['horses'] && wholeData['horses'].length == 0)) &&
                        Array.from({length: 8}).map((_, idx) => 
                            <div key={idx} className="py-5 px-5 h-full border-t border-grey-2 self-center w-full">
                                <Skeleton
                                    baseColor="#EAECF0"
                                    style={{ width: "100%" }}
                                    highlightColor="#D9D9D9"
                                />
                            </div>
                        )
                    }
                    {wholeData && wholeData['horses'] && wholeData['horses'].length > 0 &&
                        wholeData['horses'].map ((horse, idx) =>
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
                            <div className="col-span-1 predictor-race-body">{`$${formattedNum(parseInt(horse['average']))}`}</div>
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
                            <div className="col-span-1 predictor-race-body">{horse['lastMgn'] !== undefined ? parseFloat(horse['lastMgn']).toFixed(2) : 10}</div>
                            </div>
                        )
                    }
                    </>)
                }
                {
                    curTab === 0 && (
                        <>
                        <div className="grid grid-cols-24 text-black-2 font-semibold text-sm leading-6 h-12 w-full">
                            <div className="col-span-1 predictor-race-header">
                                Gear
                            </div>
                            <div className="col-span-1 predictor-race-header">Silks</div>
                            <div 
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.NO)
                                    setSortDirection(sortedCol !== SORT_FIELD.NO ? true : !sortDirection)
                                }}
                            >
                                Num
                            </div>
                            <div
                                className="col-span-3 p-5 flex flex-row items-center justify-start h-12 cursor-pointer"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.HORSE)
                                    setSortDirection(sortedCol !== SORT_FIELD.HORSE ? true : !sortDirection)
                                }}
                            >
                                Horse
                            </div>
                            <div
                                className="col-span-3 p-5 flex flex-row items-center justify-start h-12 cursor-pointer"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.JOCKEY)
                                    setSortDirection(sortedCol !== SORT_FIELD.JOCKEY ? true : !sortDirection)
                                }}
                            >
                                Jockey
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.STARTS)
                                    setSortDirection(sortedCol !== SORT_FIELD.STARTS ? true : !sortDirection)
                                }}
                            >
                                Starts
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.BARRIER)
                                    setSortDirection(sortedCol !== SORT_FIELD.BARRIER ? true : !sortDirection)
                                }}
                            >
                                Barrier
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.WEIGHT)
                                    setSortDirection(sortedCol !== SORT_FIELD.WEIGHT ? true : !sortDirection)
                                }}
                            >
                                Weight
                            </div>
                            <div
                                className="flex flex-row items-center justify-between col-span-7 p-5 h-12"
                            >
                                <span 
                                    className="cursor-pointer transition-all"
                                    onClick={() => {
                                        setSortedCol(SORT_FIELD.SCORE)
                                        setSortDirection(sortedCol !== SORT_FIELD.SCORE ? true : !sortDirection)
                                    }}
                                >
                                    Form Score
                                </span>
                                <div className="cursor-pointer" onClick={handleOpen}>
                                    <img src={settingSvg} className="w-4 h-4"/>
                                </div>
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.FRAMED)
                                    setSortDirection(sortedCol !== SORT_FIELD.FRAMED ? true : !sortDirection)
                                }}
                            >
                                Framed
                            </div>
                            <div
                                className="relative col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.BETFAIR)
                                    setSortDirection(sortedCol !== SORT_FIELD.BETFAIR ? true : !sortDirection)
                                }}
                            >
                                <button
                                    id="dropdownButton"
                                    data-dropdown-toggle="dropdown"
                                    className='text-black-2 w-full text-ellipsis overflow-hidden rounded-md tracking-wide text-center inline-flex items-center justify-center leading-8'
                                    type="button"
                                >
                                    {curOdds}
                                    <svg
                                        className="w-2.5 h-2.5 ml-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                        onClick={()=>setSelectedSwitch(!selectedSwitch)}
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
                                    id="dropdownOdds"
                                    className={
                                        selectedSwitch
                                            ? `z-20 bg-v3-primary border absolute border-primary divide-y divide-gray-100 rounded-lg shadow bg-white top-12 overflow-y-auto max-h-[500px]`
                                            : `hidden`
                                    }
                                    style={{ width: `${100}px` }}
                                >
                                    { ["BSP", "LIVE"].map ((item, idx) => 
                                    <ul
                                        className={`py-2 text-sm text-v3-primary font-medium dark:text-gray-200`}
                                        aria-labelledby="dropdownButton"
                                        key={idx}
                                    >
                                        <li onClick={() => {setCurOdds (item); setSelectedSwitch(false); setSortedCol(item==="BSP"?SORT_FIELD.BETFAIR:SORT_FIELD.LIVE)}}>
                                            <a className="flex flex-row items-center px-4 py-2 hover:bg-dropdown cursor-pointer">
                                                {item}
                                            </a>
                                        </li>
                                    </ul>
                                    )}
                                </div>
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.DIFF)
                                    setSortDirection(sortedCol !== SORT_FIELD.DIFF ? true : !sortDirection)
                                }}
                            >
                                Gap
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.TEN_DIFF)
                                    setSortDirection(sortedCol !== SORT_FIELD.TEN_DIFF ? true : !sortDirection)
                                }}
                            >
                                10m
                            </div>
                            <div
                                className="col-span-1 predictor-race-header"
                                onClick={() => {
                                    setSortedCol(SORT_FIELD.FIVE_DIFF)
                                    setSortDirection(sortedCol !== SORT_FIELD.FIVE_DIFF ? true : !sortDirection)
                                }}
                            >
                                5m
                            </div>
                        </div>

                        { (!wholeData || (wholeData['horses'] && wholeData['horses'].length == 0)) &&
                            Array.from({length: 8}).map((_, idx) => 
                                <div key={idx} className="py-5 px-5 w-full h-full border-t border-grey-2 self-center">
                                    <Skeleton
                                        baseColor="#EAECF0"
                                        style={{ width: "100%" }}
                                        highlightColor="#D9D9D9"
                                    />
                                </div>
                            )
                        }

                        {wholeData && wholeData['horses'] && wholeData['horses'].length > 0 &&
                            wholeData['horses'].map ((horse, idx) =>

                                <div 
                                    key={idx} 
                                    className={clsx(`${horse['status'] === 'WINNER' ? 'bg-mark1': ''} grid grid-cols-24 text-black-2 border-t border-grey-2 font-normal text-sm leading-6 w-full`)}
                                >
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
                                        <div className="flex flex-row items-center justify-end bg-blue-1 h-6 rounded-md text-white text-sm pr-2" style={{width: `${parseFloat(scores[horse['horse_name']])/10 * 100}%`}}>{parseFloat(scores[horse['horse_name']]).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="col-span-1 predictor-race-body">${parseFloat(horse['framed_odds']).toFixed(2)}</div>
                                {/* <div className="col-span-1 predictor-race-body">${parseFloat(framedOdds[horse['horse_name']]).toFixed(2)}</div> */}
                                <div className="col-span-1 predictor-race-body">${curOdds === "BSP" ? (horse['betfair'] ? (horse['betfair']).toFixed(2) : 0) : (horse['odds'] ? (horse['odds']).toFixed(2) : 0)}</div>
                                <div className="col-span-1 predictor-race-body">{ parseInt(horse['diff']) }%</div>
                                <div className={clsx(`col-span-1 predictor-race-body ${parseInt(horse['10m']) < 0? "text-green-2": "text-red-3"}`)}>{parseInt(horse['10m'])}%</div>
                                <div className={clsx(`col-span-1 predictor-race-body ${parseInt(horse['5m']) < 0? "text-green-2": "text-red-3"}`)}>{parseInt(horse['5m'])}%</div>
                                </div>
                            )
                        }
                        </>
                    )
                }
            </div>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none mx-auto w-full"
            >
                <Card className="mx-auto w-full p-5 bg-grey-2">
                    <CardBody className="flex flex-col gap-4 bg-white">
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Barrier</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['horse_barrier'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'horse_barrier': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Weight</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['weight'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'weight': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Class</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['class'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'class': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">AVG$</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['average'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'average': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Finish</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['finishPercent'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'finishPercent': e.target.value/100})} />
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Win</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue"  defaultValue={sliderValue['winPercent'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'winPercent': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Place</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['placePercent'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'placePercent': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Condition</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['condition'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'condition': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Distance</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['distance'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'distance': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Track</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['track'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'track': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Jockey</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['jockey'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'jockey': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Trainer</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['trainer'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'trainer': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Settling</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['settling'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'settling': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">600m</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['last_600'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'last_600': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Speed</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['speed'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'speed': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Lst/Fn</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['lastFn'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'lastFn': e.target.value/100})}/>
                        </div>
                        <div className="grid grid-cols-12 items-center justify-between">
                            <span className="col-span-2 text-black text-right text-xs font-semibold leading-4 mr-3">Lst/Mgn</span>
                            <Slider className="col-span-10" step={10} min={0} color="blue" defaultValue={sliderValue['lastMgn'] * 100} onChange={(e)=>setSliderValue ({...sliderValue, 'lastMgn': e.target.value/100})}/>
                        </div>
                    </CardBody>
                </Card>
            </Dialog>
        </div>
    )
}

export default Predictor