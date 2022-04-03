const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    isLoading: false,
    users: [],
    error: ''
}

const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}
const fetchDataSuccess = users => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: users
    }
}
const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                isLoading: false,
                error: '',
                users: action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                users: [],
                isLoading: false,
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchDataRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id)
                dispatch(fetchDataSuccess(users))
            })
            .catch(error => {
                dispatch(fetchDataFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())