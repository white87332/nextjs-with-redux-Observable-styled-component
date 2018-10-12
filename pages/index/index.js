import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { of, interval } from 'rxjs';
import { toArray, map } from 'rxjs/operators';
import isNode from 'is-node';
import { withCookies } from 'react-cookie';
import rootEpic from '../../redux/epics';
import { fetchTicker } from '../../redux/actions/tick';
import {
    SCcontainer, SCimg, SCpercentChange, SCtitle, SCprice
} from './style';

function mapStateToProps(state)
{
    return {
        coinmarketcap: state.coinmarketcap
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        fetchTicker: bindActionCreators(fetchTicker, dispatch)
    };
}

@withNamespaces([], { wait: isNode ? false : true })
@withCookies
class Index extends React.Component
{
    static propTypes = {
        query: PropTypes.object.isRequired,
        coinmarketcap: PropTypes.object.isRequired,
        fetchTicker: PropTypes.func.isRequired
    }

    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }

    componentDidMount()
    {
        const { query, fetchTicker } = this.props;

        let source = interval(5000).pipe(
            map(() => {
                return fetchTicker({
                    query: {
                        limit: query.limit || 10
                    }
                });
            })
        );
        source.subscribe();
    }

    static async getInitialProps({ query, store })
    {
        const resultAction = await rootEpic(
            of(fetchTicker({ query }), fetchTicker({ query })),
            store
        ).pipe(toArray()).toPromise(); // we need to convert Observable to Promise
        
        resultAction.map((data) => {
            store.dispatch(data);
        });

        return { query };
    }

    renderItems()
    {
        const { coinmarketcap } = this.props;
        let items = [];
        for (let key in coinmarketcap)
        {
            const item = coinmarketcap[key];
            let dom = (
                <div key={item.id}>
                    <SCimg symbol={key} />
                    <SCtitle className="title">
                        {item.symbol}
                    </SCtitle>
                    <SCprice className="price">
                        {item.quotes.USD.price}
                    </SCprice>
                    <SCpercentChange percentChange={item.quotes.USD.percent_change_24h}>
                        {item.quotes.USD.percent_change_24h}
                        %
                    </SCpercentChange>
                </div>
            );
            items = [...items, dom];
        }

        return items;
    }

    render()
    {
        return (
            <SCcontainer>
                {this.renderItems()}
            </SCcontainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
