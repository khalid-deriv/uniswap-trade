const Router = artifacts.require("Router.sol");
const Weth = artifacts.require("Weth.sol");
const Dai = artifacts.require("Dai.sol");

const RINKEBY_SUSHISWAP_ROUTER_ADDRESS =
    "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"; // sushiswap Rinkeby router address
const RINKEBY_UNISWAP_ROUTER_ADDRESS =
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; /// Uniswap Rinkeby router address
const RINKEBY_WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab"; // Rinkeby WETH address
const RINKEBY_DAI_ADDRESS = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"; // Rinkeby DAI address

const MAINNET_WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Mainnet WETH address
const MAINNET_DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // Mainnet DAI address
const MAINNET_UNISWAP_ROUTER_ADDRESS =
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // uniswap Mainnet router address
const MAINNET_SUSHISWAP_ROUTER_ADDRESS =
    "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"; // sushiswap Mainnet router address

const getTokenPriceInExchanges = async ({
    amountIn,
    sourceTokenAddress,
    targetTokenAddress,
    firstExchangeAddress,
    secondExchangeAddress,
}) => {
    const router1 = await Router.at(firstExchangeAddress);
    const router2 = await Router.at(secondExchangeAddress);

    const amountOutExchange1 = await router1.getAmountsOut(amountIn, [
        sourceTokenAddress,
        targetTokenAddress,
    ]);

    const amountOutExchange2 = await router2.getAmountsOut(amountIn, [
        sourceTokenAddress,
        targetTokenAddress,
    ]);

    formattedAmountOut1 = amountOutExchange1[1].toString();
    formattedAmountOut2 = amountOutExchange2[1].toString();
    console.log(amountOutExchange1, amountOutExchange2);
    return {
        exchange1: formattedAmountOut1,
        exchange2: formattedAmountOut2,
    };
};

module.exports = async (done) => {
    try {
        const amountIn = web3.utils.toWei("1");

        const comparisonParams = {
            amountIn: amountIn,
            sourceTokenAddress: MAINNET_WETH_ADDRESS,
            targetTokenAddress: MAINNET_DAI_ADDRESS,
            firstExchangeAddress: MAINNET_UNISWAP_ROUTER_ADDRESS,
            secondExchangeAddress: MAINNET_SUSHISWAP_ROUTER_ADDRESS,
        };
        const exchangePrices = await getTokenPriceInExchanges(comparisonParams);
        console.log(exchangePrices);
    } catch (e) {
        console.log(e);
    }
    done();
};
