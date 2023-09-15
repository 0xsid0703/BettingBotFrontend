import Datepicker from '../Datepicker';
import auFlag from '../../assets/flags/AU.svg'
import gbFlag from '../../assets/flags/GB.svg'

const Tracks = () => {

    return (
        <div className="w-full grid grid-flow-row gap-[1px]">
            <div className="grid grid-cols-2 gap-[1px] w-full">
                <div className="p-8 bg-pink-1 rounded-tl-[10px]">
                    <Datepicker />
                </div>
                <div className="flex flex-row items-center bg-pink-1 p-8 text-2xl font-bold justify-end rounded-tr-[10px]">
                    <span className='text-black'>$128,472</span>&nbsp;
                    <span className='text-grey-1'>+</span>&nbsp;
                    <span className='text-green-1'>$12,735</span>
                </div>
            </div>
            <div className='track-row'>
                <div className='track-header'>Track</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
                <div className='track-header-item'>R1</div>
            </div>
            <div className='track-row'>
                <div className='track-body-header'>
                    <img src={auFlag} className='w-4 h-4 mr-[9px]'/>
                    Flemington
                </div>
                <div className='track-body-item bg-green-2'>$532</div>
                <div className='track-body-item bg-green-2'>$764</div>
                <div className='track-body-item bg-green-2'>$1053</div>
                <div className='track-body-item bg-pink-2'>-$1231</div>
                <div className='track-body-item bg-green-2'>$843</div>
                <div className='track-body-item bg-green-2'>$819</div>
                <div className='track-body-item bg-green-2'>$3291</div>
                <div className='track-body-item bg-pink-1'>23m</div>
                <div className='track-body-item bg-pink-1'>17:15</div>
                <div className='track-body-item bg-pink-1'>17:45</div>
            </div>
            <div className='track-row'>
                <div className='track-body-header'>
                    <img src={gbFlag} className='w-4 h-4 mr-[9px]'/>
                    Ascot
                </div>
                <div className='track-body-item bg-pink-2'>-$382</div>
                <div className='track-body-item bg-green-2'>$893</div>
                <div className='track-body-item bg-pink-2'>-$762</div>
                <div className='track-body-item bg-green-2'>$2842</div>
                <div className='track-body-item bg-green-2'>$5192</div>
                <div className='track-body-item bg-green-2'>$1294</div>
                <div className='track-body-item bg-pink-2'>-$543</div>
                <div className='track-body-item bg-green-2'>$8193</div>
                <div className='track-body-item bg-pink-1'>8m</div>
                <div className='track-body-item bg-pink-1'>17:28</div>
            </div>
        </div>
    )
}

export default Tracks