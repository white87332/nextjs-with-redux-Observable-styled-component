import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducers';
import rootEpic from '../epics';

export default function initStore(initialState)
{
    const epicMiddleware = createEpicMiddleware();

    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(rootEpic);

    return store;
}
