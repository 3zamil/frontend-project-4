import axios from 'axios'
import apiUrl from '../apiConfig'

export const index = (user) => {
return axios({url:apiUrl + "/notes",
method: "get",
headers:{
    "Authorization": `Bearer ${user.token}`
}
})
}
export const show = (id) => {
    return axios({url:apiUrl + "/notes/" + id,
    method: "get"
    })
}
export const create = (note, user) => {
        return axios({url:apiUrl + "/notes/",
        method: "post",
        headers:{
            "Authorization": `Bearer ${user.token}`
        },
        data:{note:note}
        })
}
    export const update = (note, id) => {
    return axios({url:apiUrl + "/notes/" + id,
            method: "put",
            data:{note:note}
            })
}        
    export const destroy = (user, id) => {
                return axios({
                    url:apiUrl + "/notes/" + id,
                method: "delete",
                headers:{
                    "Authorization": `Bearer ${user.token}`
                }
                
                })
        }
