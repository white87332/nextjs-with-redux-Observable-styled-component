import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import isNode from 'is-node';


import { SCcontainer } from './style';


function mapStateToProps()
{
    return {
        // coinmarketcap: state.coinmarketcap
    };
}

function mapDispatchToProps()
{
    return {
        // fetchTicker: bindActionCreators(fetchTicker, dispatch)
    };
}

@translate([], { wait: isNode ? false : true })

class WordCloud extends React.Component
{
    static propTypes = {
    }

    constructor(props, context)
    {
        super(props, context);
        this.state = {};
    }


    render()
    {
        const { i18n } = this.props;
        return (
            <SCcontainer lan={i18n.language}>
                123
            </SCcontainer>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WordCloud);
