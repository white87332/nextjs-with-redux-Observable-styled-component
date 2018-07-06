import * as types from '../actionTypes';

export const fetchTicker = ({ query }) => {
    return {
        type: types.FETCH_TICKER_REQ,
        query: !query.limit ? 10 : query.limit
    };
};

export const fetchTickerSuc = (data) => {
    return {
        type: types.FETCH_TICKER_SUC,
        data
    };
};

export const fetchTickerErr = () => ({
    type: types.FETCH_TICKER_ERR
});
