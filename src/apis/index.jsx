import axios from "./axiosInstance";

export const getEvents = async({date}) => {
    try{
        const resp = await axios({
            url: `/basic/events/${date}`,
            method: "GET", 
        })
        if (resp.status === 200) {
            return resp.data
        }
        console.log ("Axios getEvents function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getEvents failed ==>", e.message)
        return null
    }
}

export const getMarketBooks = async({marketId}) => {
    try{
        const resp = await axios({
            url: `/basic/marketbooks/${marketId}`,
            method: "GET"
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getMarketBooks function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getMarketBooks failed ==>", e.message)
        return null
    }
}