import styled from 'styled-components';

export const SCcontainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 80%;
    margin: auto;

     > div
    {
        box-sizing: border-box;
        width: 16%;
        margin-right: 5%;
        margin-bottom: 25px;
        padding: 2%;

        border: 1px solid #0e1223;
        border-radius: 8px;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, .16);

        &:nth-child(5n)
        {
            margin-right: 0;
        }
    }
`;

export const SCimg = styled.div`
    width: 32px;
    height: 32px;
    background-position:center;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${(props) => {
        const { symbol } = props;
        return `url(https://s2.coinmarketcap.com/static/img/coins/32x32/${symbol}.png)`;
    }};
    margin:auto;
`;

export const SCtitle = styled.h2`
    color: #8a8a8a;
`;

export const SCprice = styled.h2`
    color: #000;
`;

export const SCpercentChange = styled.h2`
    color: ${(props) => {
        const { percentChange } = props;
        if (percentChange > 0)
        {
            return '#27ca7b';
        }
        else if (percentChange < 0)
        {
            return '#f44173';
        }
        else
        {
            return 'gray';
        }
    }};
`;
