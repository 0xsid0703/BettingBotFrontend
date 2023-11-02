/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from 'react'

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import DropDown from "../DropDown";
import TrackDropDown from "../DropDown/TrackDropDown";

import { getLeaderboards } from "../../apis";

const LeaderBoard = ({kind}) => {

    const initialValue = {
        jockey: "ALL JOCKEYS",
        trainer: "ALL TRAINERS",
        horse: "ALL HORSES",
        track: ["Australia", "ALL"],
        condition: "ALL CONDITIONS",
        distance: "ALL DISTANCES",
        start: kind === "horse" ? "Last 50" : "Last 500",
    };

    let jockeys = new Set([initialValue["jockey"]]),
        horses = new Set([initialValue["horse"]]),
        trainers = new Set([initialValue["trainer"]]),
        conditions = new Set([
            initialValue["condition"],
            "Firm",
            "Synthetic",
            "Good",
            "Heavy",
            "Soft",
        ]),
        distances = new Set([
            initialValue["distance"],
            "1000 - 1200",
            "1300 - 1600",
            "1800 - 2200",
            "2400+",
        ]),
        starts = new Set([
            "Last 100",
            "Last 200",
            "Last 500",
            "Last 1000",
            "Last 2000",
            "Last 5000",
            "This Season",
            "Last Season",
        ]);

    const [filterObj, setFilter] = useState(initialValue);
    const [records, setRecords] = useState ()
    const [jockeynames, setJockeyNames] = useState ()
    const [horsenames, setHorseNames] = useState ()
    const [data, setData] = useState ()
    
    const setValue = (val) => {
        setData (undefined)
        let [kind, value] = val;
        let tmp = { ...filterObj };
        tmp[kind] = value;
        setFilter(tmp);
    };

    jockeynames && jockeynames.map ((jockey) => {jockeys.add(jockey)})
    horsenames && horsenames.map ((horse) => {horses.add(horse)})

    const initialize = useCallback(async() => {
        const [tmpTrainers, tmpJockeys, tmpHorses] = await getLeaderboards (filterObj, kind)
        console.log (tmpTrainers, ">>>>")
        setRecords (tmpTrainers)
        setJockeyNames (tmpJockeys)
        setHorseNames (tmpHorses)
    }, [filterObj, kind])

    useEffect (()=>{
        initialize ()
    }, [initialize])

    useEffect(() => {
        let tmp = []
        records && records.map ((record) => {
            let sumWinPercent = 0
            let sumPlacePercent = 0
            let sumFinishPercent = 0
            let sumPrize = 0
            record['races'].map ((race) => {
                sumWinPercent += race['win_percentage']
                sumPlacePercent += race['place_percentage']
                sumFinishPercent += race['finish_percentage']
                sumPrize += race['horse_prizemoney']
            })
            tmp.push ({
                "winPercent": (sumWinPercent / record['races'].length).toFixed (2),
                "placePercent": (sumPlacePercent / record['races'].length).toFixed (2),
                "finishPercent": (sumFinishPercent / record['races'].length).toFixed (2),
                "total": sumPrize,
                "average": (sumPrize / record['races'].length).toFixed (2),
                "name": record['name']
            })
        })
        setData (tmp)
    }, [records])

    return (
        <div className="p-[16px] 2xl:p-[58px] 4xl:p-[112px] bg-white min-w-[1024px]">
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-12 bg-pink-1 border border-grey-2 rounded-[10px]">
                <div className="grid grid-cols-12 col-span-12 border-b border-grey-2">
                    <div className="flex flex-row items-center col-span-2 text-2xl font-bold leading-6 py-6 px-5 w-full">
                        {kind === "trainer" ? "Trainers" : kind === "jockey" ? "Jockeys" : "Horses"}
                    </div>
                    <div className="col-span-10 grid grid-cols-12 gap-2 px-5 py-6">
                        {
                            (kind === "trainer" || kind === "horse") &&
                            <div className="col-span-2 flex flex-row items-center justify-center">
                                <DropDown
                                    btnStr={initialValue["jockey"]}
                                    data={jockeys}
                                    kind="jockey"
                                    setValue={(val) => setValue(val)}
                                />
                            </div>
                        }
                        {
                            (kind === "jockey" || kind === "horse") &&
                            <div className="col-span-2 flex flex-row items-center justify-center">
                                <DropDown
                                    btnStr={initialValue["trainer"]}
                                    data={trainers}
                                    kind="trainer"
                                    setValue={(val) => setValue(val)}
                                />
                            </div>
                        }
                        { kind !== "horse" &&
                            <div className="col-span-2 flex flex-row items-center justify-center">
                                <DropDown
                                    btnStr={initialValue["horse"]}
                                    data={horses}
                                    kind="horse"
                                    setValue={(val) => setValue(val)}
                                />
                            </div>
                        }
                        <div className="col-span-2 flex flex-row items-center justify-center">
                            <TrackDropDown
                                btnStr={initialValue["track"]}
                                kind="track"
                                setValue={(val) => setValue(val)}
                            />
                        </div>
                        <div className="col-span-2 flex flex-row items-center justify-center">
                            <DropDown
                                btnStr={initialValue["condition"]}
                                data={conditions}
                                kind="condition"
                                setValue={(val) => setValue(val)}
                            />
                        </div>
                        <div className="col-span-2 flex flex-row items-center justify-center">
                            <DropDown
                                btnStr={initialValue["distance"]}
                                data={distances}
                                kind="distance"
                                setValue={(val) => setValue(val)}
                            />
                        </div>
                        <div className="col-span-2 flex flex-row items-center justify-center">
                            <DropDown
                                btnStr={initialValue["start"]}
                                data={starts}
                                kind="start"
                                setValue={(val) => setValue(val)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-pink-1 border border-grey-2 rounded-[10px]">
                <div className="grid grid-cols-11">
                    <div className="racehistory-header-start col-span-2 px-5">
                        Name
                    </div>
                    <div className="racehistory-header">Win %</div>
                    <div className="racehistory-header">AVG BSP / W</div>
                    <div className="racehistory-header">Win ROI</div>
                    <div className="racehistory-header">Place %</div>
                    <div className="racehistory-header">AVG BSP / P</div>
                    <div className="racehistory-header">Place ROI</div>
                    <div className="racehistory-header">Finish %</div>
                    <div className="racehistory-header">AVG $</div>
                    <div className="racehistory-header">Total $</div>
                </div>
                {
                    data && data.map ((t, idx) => 
                    <div  key={idx} className="grid grid-cols-11 border-t border-grey-2">
                        <a
                            className="racehistory-item-start text-link col-span-2 px-5"
                            href="#"
                        >
                            {t?.name}
                        </a>
                        <div className="racehistory-item text-black-2">
                            {t?.winPercent}
                        </div>
                        <div className="racehistory-item text-black-2">
                            0
                        </div>
                        <div className="racehistory-item text-black-2">
                            0
                        </div>
                        <div className="racehistory-item text-black-2">
                            {t?.placePercent}
                        </div>
                        <div className="racehistory-item text-black-2">
                            0
                        </div>
                        <div className="racehistory-item text-black-2">
                            0
                        </div>
                        <div className="racehistory-item text-black-2">
                            {t?.finishPercent}
                        </div>
                        <div className="racehistory-item text-black-2">
                            {t?.average}
                        </div>
                        <div className="racehistory-item text-black-2">
                            {t?.total}
                        </div>
                    </div>
                    )
                }
                {
                    (!data || (data && data.length === 0)) && Array.from({length: 20}).map((item, idx) => 
                        <div key={idx} className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                            <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                            />
                        </div>
                    )
                }
            </div>
        </div>
        </div>
    );
};

export default LeaderBoard;
