import axios from 'axios';

const instanse = axios.create({
    baseURL: 'http://localhost:8080'
})

export default instanse;