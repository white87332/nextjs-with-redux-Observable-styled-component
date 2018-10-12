import styled from 'styled-components';

export const SCcontainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
    min-height: 100vh;
    margin: auto;
    background-image: linear-gradient(55deg, #efb9d1, #fce5ef);
    .header
    {
        background-image:  ${props => `url('/static/images/main-pic-02${props.lan === 'en-us' ? '_en' : ''}.png')`};
        background-repeat: no-repeat;
        background-position: center top;
        height: 300px;
        min-height: auto;
        position: relative;

        display: flex;
        align-items: center;

        @media (max-width: 430px)
        {
            height: 200px;
            background-size: contain;
        }
    }

    .content
    {
        min-height: calc(100vh - 300px - 180px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .bottom
    {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-image: url('/static/images/rectangle.png');
        background-position: 100% bottom;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 180px;
        justify-content: space-around;
        overflow: hidden;

        @media (max-width: 800px)
        {
            justify-content: center;
        }

        .pic
        {
            flex: 1;
            &:nth-child(1)
            {
                img
                {
                    padding-left: 73px;
                }
            }

            &:nth-child(3)
            {
                img
                {
                    padding-top: 15px;
                }
            }

            @media (max-width: 860px)
            {
                display: none;
            }
        }

        .center
        {
            flex: 1.5;
            margin-top: 40px;

            @media (max-width: 860px)
            {
                margin-top: initial;
            }
            .iconGroup
            {
                display: flex;
                justify-content: center;
                align-items: center;

                img
                {
                    padding: 0 15px;
                    cursor: pointer;
                }
            }
        }


        .copyright
        {
            font-size: 12px;
            text-align: center;

            @media (max-width: 800px)
            {
                padding-top: 15px;
            }

            @media (max-width: 350px)
            {
                width: 95%;
            }
        }
    }
`;

export const SCbackBtn = styled.a`
    font-size: 24px;            
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #7c3553;
    margin-left: 10%;
    text-decoration: none;

    &.goBackDesk
    {

        @media (max-width: 860px)
        {
            display: none;
        }
    }

    &.goBackMobile
    {
        display: none;
        margin: 0;
        @media (max-width: 860px)
        {
            text-align: center;
            display: block;
        }
    }
`;


export const SCwordCloudContainer = styled.div`
    width: 100%;
    height: 480px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    padding: 10px 20px 50px 20px;

    .error
    {
        font-size: 25px;
        color: #000;
        text-align: center;
        font-weight: 300;
    }

    > div
    {
        box-sizing: border-box;

        &#demo
        {
            width: 100%;
            height: 100%;
            position: relative;
            line-height: normal;
            position: relative;
            margin: 0 auto;
            opacity: 0;
            overflow: hidden;
        }
        &.jqcloud {
            span
            {
                >a {
                    text-decoration: none;
                    color: #7c3553;
                    font-weight: 500;

                    font-size: 48px;
                    @media (max-width: 550px)
                    {
                        font-size: 24px;
                    }
                };
                &.w1
                {
                    font-size: 24px;
                    @media (max-width: 550px)
                    {
                        font-size: 14px;
                        padding-left: 0;
                        padding-right: 0;
                    }
                }
                &.w2
                {
                    font-size: 48px;
                    padding: 5px;
                    @media (max-width: 550px)
                    {
                        font-size: 24px;
                        padding-left: 30px;
                        padding-right: 10px;
                    }
                }
            }
        }
    }
`;
