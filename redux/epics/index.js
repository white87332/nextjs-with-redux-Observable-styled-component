import { combineEpics } from 'redux-observable';
import coinmarketcapEpics from './coinmarketcap';

const epics = combineEpics(
    ...coinmarketcapEpics
);

export default epics;
