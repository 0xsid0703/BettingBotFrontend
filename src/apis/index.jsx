import axios from "./axiosInstance";

export const getEvents = async({date, type}) => {
    try{
        const resp = await axios({
            url: `/basic/events/${type}/${date}`,
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

export const getLeaderboards = async(filterObj, kind, page = 0, sortedCol, sortDirection) => {
    try {
        const resp = await axios({
            url: `/board/getrecords`,
            method: 'POST',
            data: {"filter": filterObj, "kind": kind, "page": page, 'sortedCol': sortedCol, sortDirection: sortDirection}
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getLeaderboards function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getLeaderboards failed ==>", e.message)
        return null
    }
}

export const getHorsesInBoard = async(name) => {
    try {
        const resp = await axios({
            url: `/board/gethorsenames?name=${name}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getHorsesInBoard function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getHorsesInBoard failed ==>", e.message)
        return null
    }
}

export const getTrainersInBoard = async(name) => {
    try {
        const resp = await axios({
            url: `/board/gettrainernames?name=${name}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getTrainersInBoard function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getTrainersInBoard failed ==>", e.message)
        return null
    }
}

export const getJockeysInBoard = async(name) => {
    try {
        const resp = await axios({
            url: `/board/getjockeynames?name=${name}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getJockeysInBoard function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getJockeysInBoard failed ==>", e.message)
        return null
    }
}

export const getRaceByNum = async(startDate, trackName, raceNum, condition) => {
    try {
        const resp = await axios({
            url: `/board/getracebynum?date=${startDate}&track=${trackName}&race=${raceNum}&condition=${condition}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getRaceByNum function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getJockeysInBoard failed ==>", e.message)
        return null
    }
}

export const getRaceCardByNum = async(startDate, trackName, raceNum, condition) => {
    try {
        const resp = await axios({
            url: `/board/getracecardbynum?date=${startDate}&track=${trackName}&race=${raceNum}&condition=${condition}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getRaceByNum function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getJockeysInBoard failed ==>", e.message)
        return null
    }
}

export const getRaceFormByNum = async(startDate, trackName, raceNum, condition) => {
    try {
        const resp = await axios({
            url: `/board/getraceformbynum?date=${startDate}&track=${trackName}&race=${raceNum}&condition=${condition}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getRaceByNum function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getJockeysInBoard failed ==>", e.message)
        return null
    }
}

export const getRaceHorseScores = async(startDate, trackName, raceNum, condition="Good") => {
    try {
        const resp = await axios({
            url: `/board/gethorsescores?date=${startDate}&track=${trackName}&race=${raceNum}&condition=${condition}`,
            method: 'GET',
        })
        if (resp.status === 200) return resp.data
        console.log ("Axios getRaceByNum function status ===> ", resp.status)
        return null
    } catch (e) {
        console.log ("Axios getJockeysInBoard failed ==>", e.message)
        return null
    }
}