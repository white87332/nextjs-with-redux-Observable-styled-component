const initialState = [];

export default function coinmarketcap(state = initialState, action = {})
{
    switch (action.type)
    {
        case 'FETCH_TICKER_SUC':
            return {
                ...action.data
            };

        case 'FETCH_TICKER_ERR':
            return state;

        default:
            return state;
    }
}
