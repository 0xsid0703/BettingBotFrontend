import { useRef, useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns';

import Datepicker from '../Datepicker';
import auFlag from '../../assets/flags/AU.svg'
// import gbFlag from '../../assets/flags/GB.svg'

import { getEvents } from '../../apis';

const Tracks = () => {
    const [pWidth, setPWidth] = useState (0)
    const ref = useRef(null)
    const isClient = typeof window === 'object'
    const [events, setEvents] = useState([])

    const [startDate, setStartDate] = useState (new Date())
    const [maxEvents, setMaxEvents] = useState (0)
    const [loading, setLoading] = useState (false)

    const initialize = useCallback(async() => {
        setLoading (false)
        // eslint-disable-next-line no-undef
        const resp = await getEvents({
            date: format (startDate, "yyyy-MM-d"),
        })
        console.log (resp, startDate)
        setLoading (true)
        if (resp?.success) {
            const data = resp.data.sort((a, b) => {
                return new Date(a.startTimes[0]).getTime() - new Date(b.startTimes[0]).getTime()
            })
            setEvents (data)
            const maxValue = Math.max(...resp.data.map(item => item.startTimes.length));
            setMaxEvents (maxValue)
        }
    }, [startDate])

    const getTimeString = (datetimeStr) => {
        try{
            // Parse the string into a Date object
            let date = new Date(datetimeStr);

            // Extract hours and minutes, then format them
            let hours = String(date.getHours()).padStart(2, '0');
            let minutes = String(date.getMinutes()).padStart(2, '0');

            return `${hours}:${minutes}`;
        }catch (e) {
            console.log ("getTimeString() call failed.", e)
            return "00:00"
        }
    }

    useEffect (() => {
        initialize ()
    }, [initialize])

    useEffect(() => {
        setPWidth(ref?.current?.offsetWidth);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return false
        }
        function handleResize() {
            setPWidth(ref?.current?.offsetWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isClient, pWidth])

    return (
        <div className="w-full grid grid-flow-row gap-[1px] bg-grey-2 rounded-[10px] border border-grey-2" ref={ref}>
            <div className="grid grid-cols-2 gap-[1px] w-full">
                <div className="p-8 bg-pink-1 rounded-tl-[10px]">
                    <Datepicker date={startDate} onChangeDate={(d) => {
                        setStartDate (d)
                    }}/>
                </div>
                <div className="flex flex-row items-center bg-pink-1 text-2xl font-bold justify-end rounded-tr-[10px]">
                    <span className='text-black-2 px-5 py-4'>
                        <div className='text-right text-xl font-bold leading-5'>$128,764</div>
                        <div className='text-right text-[10px] font-normal leading-5'>BANKROLL</div>
                    </span>
                    <span className='text-black-2 px-5 py-4'>
                        <div className='text-right text-xl font-bold leading-5'>$42,184</div>
                        <div className='text-right text-[10px] font-normal leading-5'>TURNOVER</div>
                    </span>
                    <span className='text-black-2 px-5 py-4'>
                        <div className='text-right text-xl font-bold leading-5'>$3,741</div>
                        <div className='text-right text-[10px] font-normal leading-5'>PROFIT</div>
                    </span>
                    <span className='text-black-2 px-5 py-4'>
                        <div className='text-right text-xl font-bold leading-5'>7.43%</div>
                        <div className='text-right text-[10px] font-normal leading-5'>ROI</div>
                    </span>
                </div>
            </div>
            { events.length > 0 && loading &&
                <div className='w-full overflow-x-scroll' style={{maxWidth: `${pWidth}px`}}>
                    <div className='flex flex-row'>
                        <div className='track-header' style={{minWidth: `${pWidth/6}px`}}>Track</div>
                        {
                            Array.from ({length: maxEvents}).map((_, idx) => (
                                <div className='track-header-item' style={{minWidth: `${pWidth/12}px`}} key={idx}>{`R${idx + 1}`}</div>
                            ))
                        }
                    </div>
                    {
                        events.map ((event, idx) => {
                            return (
                                <div className='flex flex-row' key={idx}>
                                    <div className='track-body-header' style={{minWidth: `${pWidth/6}px`}}>
                                        <img src={auFlag} className='w-4 h-4 mr-[9px]'/>
                                        {event.venue}
                                    </div>
                                    {
                                        event.startTimes.map((datetimeStr, idx) => (
                                            <div className='track-body-item' key={idx} style={{minWidth: `${pWidth/12}px`}}>
                                                {
                                                    new Date(datetimeStr).getTime() < new Date().getTime() ? 
                                                    (<span className='text-shadow-sm shadow-green-600 text-green-1'>Closed</span>)
                                                    : (<span className='track-body-item text-grey-2'>{getTimeString (datetimeStr)}</span>)
                                                }
                                            </div>
                                        ))
                                    }
                                    {/* <span className='text-shadow-sm shadow-green-600 text-green-1'>Closed</span> */}
                                    {/* <div className='track-body-item'><span className='text-shadow-sm shadow-red-600 text-red-2'>-$1231</span></div> */}
                                    {/* <div className='track-body-item text-grey-2'>23m</div> */}
                                </div>
                            )
                        })
                    }
                    {/* <div className='track-row overflow-x-auto'>
                        <div className='track-body-header'>
                            <img src={auFlag} className='w-4 h-4 mr-[9px]'/>
                            Flemington
                        </div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$532</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$764</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$1053</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-red-600 text-red-2'>-$1231</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$843</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$819</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$3291</span></div>
                        <div className='track-body-item text-grey-2'>23m</div>
                        <div className='track-body-item text-grey-2'>17:15</div>
                        <div className='track-body-item text-grey-2'>17:45</div>
                    </div>
                    <div className='track-row'>
                        <div className='track-body-header'>
                            <img src={gbFlag} className='w-4 h-4 mr-[9px]'/>
                            Ascot
                        </div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-red-600 text-red-2'>-$382</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$893</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-red-600 text-red-2'>-$762</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$2842</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$5192</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$1294</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-red-600 text-red-2'>-$543</span></div>
                        <div className='track-body-item'><span className='text-shadow-sm shadow-green-600 text-green-1'>$8193</span></div>
                        <div className='track-body-item text-grey-2'>8m</div>
                        <div className='track-body-item text-grey-2'>17:28</div>
                    </div> */}
                </div>
            }
            {
                events.length == 0 && loading &&
                <div className='text-center text-2xl py-3'>
                    No displayed data.
                </div>
            }
            {
                !loading &&
                <div className='text-center text-2xl py-3'>
                    Loading data...
                </div>
            }
        </div>
    )
}

export default Tracks