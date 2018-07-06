import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { get } from 'superagent';
import * as tickActions from '../actions/tick';
import * as types from '../actionTypes';

const fetchTickerEpic = (action$) => {
    return action$
        .pipe(
            ofType(types.FETCH_TICKER_REQ),
            mergeMap((action) => {
                return get(`https://api.coinmarketcap.com/v2/ticker/?limit=${action.query}`);
            }),
            map((res) => {
                return tickActions.fetchTickerSuc(
                    res.body.data
                );
            }),
            catchError((err) => {
                return of(
                    tickActions.fetchTickerErr(
                        err.response
                    )
                );
            })
        );
};

export default [
    fetchTickerEpic
];
