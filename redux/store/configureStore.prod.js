import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import reducer from '../reducers';
import rootEpic from '../epics';

export default function initStore(initialState)
{
    const epicMiddleware = createEpicMiddleware();
    epicMiddleware.run(rootEpic);
    const store = createStore(
        reducer,
        initialState,
        compose(applyMiddleware(thunkMiddleware, epicMiddleware))
    );

    return store;
}
