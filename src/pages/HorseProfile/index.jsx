import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import clsx from "clsx";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import DropDown from "../../components/DropDown";
import HorseSVG from "../../assets/horse.svg";
import SilkSVG from "../../assets/silk.svg";

import { getRaces } from "../../apis";
import { formattedNum } from "../../utils";

const HorseProfile = () => {
  const { id } = useParams();

  const [races, setRaces] = useState([]);
  const [homeRace, setHomeRace] = useState();
  const [sum, setSum] = useState();
  const initialize = useCallback(async () => {
    const tmp = await getRaces("horse", id);
    setRaces(tmp);
    if (tmp.length > 0) setHomeRace(tmp[0]);

    let tmpSum = { Symthetic: 0, Firm: 0, Good: 0, Soft: 0, Heavy: 0 };

    for (let item of tmp) {
      if ("sumLast600" in tmpSum) {
        if (parseFloat(item["last_600"]) >= 0)
          tmpSum["sumLast600"] += item["last_600"];
      } else {
        if (parseFloat(item["last_600"]) >= 0)
          tmpSum["sumLast600"] = item["last_600"];
      }

      if ("sumSpeed" in tmpSum) {
        if (parseFloat(item["speed"]) >= 0) tmpSum["sumSpeed"] += item["speed"];
      } else {
        if (parseFloat(item["speed"]) >= 0) tmpSum["sumSpeed"] = item["speed"];
      }

      if ("sumFinishPercent" in tmpSum) {
        if (parseFloat(item["finish_percentage"]) >= 0)
          tmpSum["sumFinishPercent"] += item["finish_percentage"];
      } else {
        if (parseFloat(item["finish_percentage"]) >= 0)
          tmpSum["sumFinishPercent"] = item["finish_percentage"];
      }

      if ("sumWinPercent" in tmpSum) {
        if (parseFloat(item["win_percentage"]) >= 0)
          tmpSum["sumWinPercent"] += item["win_percentage"];
      } else {
        if (parseFloat(item["win_percentage"]) >= 0)
          tmpSum["sumWinPercent"] = item["win_percentage"];
      }

      if ("sumPlacePercent" in tmpSum) {
        if (parseFloat(item["place_percentage"]) >= 0)
          tmpSum["sumPlacePercent"] += item["place_percentage"];
      } else {
        if (parseFloat(item["place_percentage"]) >= 0)
          tmpSum["sumPlacePercent"] = item["place_percentage"];
      }

      if ("sumPrize" in tmpSum) {
        if (parseFloat(item["prizemoney_won"]) >= 0)
          tmpSum["sumPrize"] += item["prizemoney_won"];
      } else {
        if (parseFloat(item["prizemoney_won"]) >= 0)
          tmpSum["sumPrize"] = item["prizemoney_won"];
      }

      if ("sumSettling" in tmpSum) {
        if (parseFloat(item["settling"]) >= 0)
          tmpSum["sumSettling"] += item["settling"];
      } else {
        if (parseFloat(item["settling"]) >= 0)
          tmpSum["sumSettling"] = item["settling"];
      }

      if (item["track_condition"] === "Good") tmpSum["Good"] += 1;

      if (item["track_condition"] === "Symthetic") tmpSum["Symthetic"] += 1;

      if (item["track_condition"] === "Firm") tmpSum["Firm"] += 1;

      if (item["track_condition"] === "Soft") tmpSum["Soft"] += 1;

      if (item["track_condition"] === "Heavy") tmpSum["Heavy"] += 1;
    }
    setSum(tmpSum);
    console.log(sum, "LLLL");
  }, [id]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="p-[112px] bg-white min-w-[1920px]">
      <div className="flex flex-col gap-8">
        <div className="grid grid-rows-3 grid-cols-12 bg-pink-1 border border-grey-2 rounded-[10px]">
          <div className="grid grid-cols-12 col-span-12 border-b border-grey-2">
            {homeRace ? (
              <div className="flex flex-row items-center col-span-3 text-2xl font-bold leading-6 py-6 px-5 w-full">
                {homeRace && homeRace["horse_name"]}
              </div>
            ) : (
              <div className="col-span-3 h-[30px] w-[200px] px-5 self-center">
                <Skeleton
                  baseColor="#EAECF0"
                  style={{ height: "100%" }}
                  highlightColor="#D9D9D9"
                />
              </div>
            )}
            <div className="col-span-9 grid grid-cols-12 gap-2 px-5 py-6">
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL JOCKEYS" data={[1, 2, 3]} />
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL TRAINERS" data={[1, 2, 3]} />
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL TRACKS" data={[1, 2, 3]} />
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL CONDITIONS" data={[1, 2, 3]} />
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL DISTANCES" data={[1, 2, 3]} />
              </div>
              <div className="col-span-2 flex flex-row items-center justify-center">
                <DropDown btnStr="ALL STARTS" data={[1, 2, 3]} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 grid-rows-2 col-span-12">
            <div className="row-span-2 col-span-1 flex flex-row items-center justify-center border border-grey-2">
              <img src={HorseSVG} className="w-16 h-16" />
            </div>
            <div className="horse-header-black">Country</div>
            <div className="horse-header-black">Age</div>
            <div className="horse-header-black">Foaled</div>
            <div className="horse-header-black">Home Track</div>
            <div className="horse-header-black">600m</div>
            <div className="horse-header-black">Speed</div>
            <div className="horse-header-black">Finish %</div>
            <div className="horse-header-black">Win %</div>
            <div className="horse-header-black">Place %</div>
            <div className="horse-header-black">AVG BSP / W</div>
            <div className="horse-header-black">ROI</div>

            {
                homeRace ? (
                    <div className="horse-item-normal-black">
                        {homeRace["horse_country"]}
                    </div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                homeRace ? (
                    <div className="horse-item-normal-black">
                        {`${homeRace["horse_age"]}yo`}
                    </div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                homeRace ? (
                    <div className="horse-item-normal-black">{`${homeRace["horse_foaling_date"]}`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                homeRace ? (
                    <div className="horse-item-normal-black">{homeRace["home_track_name"]}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{(sum["sumLast600"] / races.length).toFixed(2)}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["sumSpeed"] * 3.6) / races.length).toFixed(2)}km/h`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${(sum["sumFinishPercent"] / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${(sum["sumWinPercent"] / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${(sum["sumPlacePercent"] / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">$3.50</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">$3.50</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
          </div>
          <div className="grid grid-cols-12 grid-rows-2 col-span-12">
            <div className="row-span-2 col-span-1 flex flex-row items-center justify-center border border-grey-2">
              <img src={SilkSVG} className="w-16 h-16" />
            </div>
            <div className="horse-header-black">Size</div>
            <div className="horse-header-black">Dam</div>
            <div className="horse-header-black">Trainer</div>
            <div className="horse-header-black">Total $</div>
            <div className="horse-header-black">AVG $</div>
            <div className="horse-header-black">Settling</div>
            <div className="horse-header-black">Symthetic</div>
            <div className="horse-header-black">Firm</div>
            <div className="horse-header-green">Good</div>
            <div className="horse-header-yellow">Soft</div>
            <div className="horse-header-red">Heavy</div>
            {
                homeRace ? (
                    <div className="horse-item-normal-black">45</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                homeRace ? (
                    <div className="horse-item-normal-black">{homeRace["dam_name"]}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                homeRace ? (
                    <div className="horse-item-normal-black">{homeRace["trainer_name"]}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum ? (
                    <div className="horse-item-normal-black">{`$${formattedNum(sum["sumPrize"], false)}`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`$${formattedNum((sum["sumPrize"] / races.length).toFixed(2), false)}`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${(sum["sumSettling"] / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["Symthetic"] * 100) / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["Firm"] * 100) / races.length ).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["Good"] * 100) /  races.length ).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["Soft"] * 100) / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
                        <Skeleton
                            baseColor="#EAECF0"
                            style={{ height: "100%" }}
                            highlightColor="#D9D9D9"
                        />
                    </div>
                )
            }
            {
                sum && races ? (
                    <div className="horse-item-normal-black">{`${((sum["Heavy"] * 100) / races.length).toFixed(2)}%`}</div>
                ) : (
                    <div className="pt-1 pb-3 px-2 w-full h-full border-t border-grey-2 self-center">
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
        <div className="flex flex-col bg-pink-1 border border-grey-2 rounded-[10px]">
            <div className="grid grid-cols-24">
                <div className="racehistory-header">Date</div>
                <div className="racehistory-header-start col-span-3 px-5">
                Jockey
                </div>
                <div className="racehistory-header-start col-span-3 px-5">
                Track
                </div>
                <div className="racehistory-header">Race</div>
                <div className="racehistory-header">Starters</div>
                <div className="racehistory-header">Class</div>
                <div className="racehistory-header">Barrier</div>
                <div className="racehistory-header">Weight</div>
                <div className="racehistory-header">Settling</div>
                <div className="racehistory-header">Condition</div>
                <div className="racehistory-header">Distance</div>
                <div className="racehistory-header">BSP / W</div>
                <div className="racehistory-header">BSP / P</div>
                <div className="racehistory-header">600m</div>
                <div className="racehistory-header">Finish</div>
                <div className="racehistory-header">Finish %</div>
                <div className="racehistory-header">Time</div>
                <div className="racehistory-header">Speed</div>
                <div className="racehistory-header">Margin</div>
                <div className="racehistory-header">$ Won</div>
            </div>
            {races && races.length > 0 ? (
                races.map((item, idx) => (
                    <div
                    className="grid grid-cols-24 border-t border-grey-2"
                    key={idx}
                    >
                    <div className="racehistory-item text-black-2">
                        {item["date"]}
                    </div>
                    <div className="racehistory-item-start text-black-2 col-span-3 px-5">
                        {item["jockey_name"]}
                    </div>
                    <div className="racehistory-item-start text-black-2 col-span-3 px-5">
                        {item["track_name"]}
                    </div>
                    <div className="racehistory-item text-black-2">
                        {item["race_num"]}
                    </div>
                    <div className="racehistory-item text-black-2">
                        {item["starters"]}
                    </div>
                    <div className="racehistory-item text-black-2">7.5</div>
                    <div className="racehistory-item text-black-2">
                        {item["barrier"]}
                    </div>
                    <div className="racehistory-item text-black-2">
                        {item["weight"]}
                    </div>
                    <div className="racehistory-item text-black-2">{`${item["settling"]} %`}</div>
                    <div
                        className={clsx(
                        `racehistory-item ${
                            item["track_condition"] === "Good"
                            ? "text-green-3"
                            : item["track_condition"] === "Soft"
                            ? "text-yellow-1"
                            : "text-red-1"
                        }`
                        )}
                    >
                        {item["track_condition"]}
                    </div>
                    <div className="racehistory-item text-black-2">
                        {item["distance"]}
                    </div>
                    <div className="racehistory-item text-black-2">$14.31</div>
                    <div className="racehistory-item text-black-2">$14.31</div>
                    <div className="racehistory-item text-black-2">
                        {item["last_600"]}
                    </div>
                    <div className="racehistory-item text-black-2">
                        {item["finish_number"]}
                    </div>
                    <div className="racehistory-item text-black-2">{`${item["finish_percentage"]} %`}</div>
                    <div className="racehistory-item text-black-2">{`${parseInt(
                        item["time"] / 60
                    )}m ${parseInt(item["time"]) % 60}s`}</div>
                    <div className="racehistory-item text-black-2">{`${(
                        (item["speed"] * 3600) /
                        1000
                    ).toFixed(2)} km/h`}</div>
                    <div className="racehistory-item text-black-2">
                        {item["margin"]}
                    </div>
                    <div className="racehistory-item text-black-2">{`$${formattedNum(
                        parseInt(item["prizemoney_won"]),
                        false
                    )}`}</div>
                    </div>
                ))): (
                    Array.from({length: 20}).map((item, idx) =>
                        <div className="py-4 px-2 border-t border-grey-2" key={idx}>
                            <Skeleton
                                baseColor="#EAECF0"
                                style={{ height: "100%" }}
                                highlightColor="#D9D9D9"
                            />
                        </div>
                    )
                )
            }
        </div>
      </div>
    </div>
  );
};

export default HorseProfile;
