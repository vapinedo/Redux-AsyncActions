const redux = require('redux')
const createStore = redux.createStore

const initialState = {
    isLoading: false,
    data: [],
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
const fetchDataSuccess = data => {
    return {
        type: FETCH_DATA_REQUEST,
        payload: data
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
                ...state,
                isLoading: false,
                error: '',
                data: action.payload
            }
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                data: [],
                isLoading: false,
                error: action.payload
            }
    }
}

const store = createStore(reducer)