import Axios from "axios"

const apiBaseUrl = 'http://localhost:4000';

const makeGetRequest = (path) => {
    return Axios.get(apiBaseUrl+path)
        .then(response => response.data)
        .catch((err) => console.log(err));

}

export const getMembers = () => makeGetRequest('/members')
export const getAbsences = () => makeGetRequest('/absences')