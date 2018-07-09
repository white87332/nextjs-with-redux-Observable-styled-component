import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { of } from 'rxjs';
import isNode from 'is-node';
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

@translate([], { wait: isNode ? false : true })
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

        this.langChange = this.langChange.bind(this);
    }

    componentDidMount()
    {
        const { query, fetchTicker } = this.props;

        setInterval(() => {
            this.langChange();
            fetchTicker({
                query: {
                    limit: query.limit || 10
                }
            });
        }, 5000);
    }

    static async getInitialProps({ query, store })
    {
        const resultAction = await rootEpic(
            of(fetchTicker({ query })),
            store
        ).toPromise(); // we need to convert Observable to Promise

        store.dispatch(resultAction);

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
