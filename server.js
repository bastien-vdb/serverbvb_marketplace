const Moralis = require('moralis').default;

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { EvmChain } = require('@moralisweb3/common-evm-utils');

const app = express();
const port = process.env.PORT || 3007;

// allow access to React app domain
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);

const MORALIS_API_KEY = process.env.MORALIS_APIKEY;

app.get('/balances/:address', async (req, res) => {
    try {

        const address = req.params.address;

        const chain = EvmChain.GOERLI;

        const data = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
        });
        res.json(data);
        console.log(data?.result);
    } catch (e) {
        console.error(e);
    }
});

const startServer = async () => {
    await Moralis.start({
        apiKey: MORALIS_API_KEY,
    });

    app.listen(port, () => {
        console.log(`Server starts on ${port}`);
    });
};

startServer();