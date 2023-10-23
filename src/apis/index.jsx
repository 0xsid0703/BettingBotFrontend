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

export const getRunnersInfo = async(marketId) => {
    try{
        const resp = await axios({
            url: `/basic/events/getrunners/${marketId}`,
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

export const getRaces = async(type, id) => {
    try{
        if (type === "horse") {
            const resp = await axios({
                url: `/profile/races/horse/${id}`,
                method: 'GET'
            })
            if (resp.status === 200) return resp.data
            console.log ("Axios getRaces function status ===> ", resp.status)
            return null
        } else if (type === "trainer") {
            const resp = await axios({
                url: `/profile/races/trainer/${id}`,
                method: 'GET'
            })
            if (resp.status === 200) return resp.data
            console.log ("Axios getRaces function status ===> ", resp.status)
            return null
        } else if (type === "jockey") {
            const resp = await axios({
                url: `/profile/races/jockey/${id}`,
                method: 'GET'
            })
            if (resp.status === 200) return resp.data
            console.log ("Axios getRaces function status ===> ", resp.status)
            return null
        }
        return null
    }catch(e) {
        console.log ("Axios getRaces failed ==>", e.message)
        return null
    }
}