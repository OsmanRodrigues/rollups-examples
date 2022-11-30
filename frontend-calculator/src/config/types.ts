// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

export enum ChainId {
    localhost = "0x7a69",
    goerli_testnet = "0x5",
    arbitrum_goerli_testnet = "0x66eed",
}

export enum ChainToken {
    localhost = "ETH",
    goerli_testnet = "ETH",
    arbitrum_goerli_testnet = "AGOR",
}

export enum ChainLabel {
    localhost = "localhost",
    goerli_testnet = "Goerli testnet",
    arbitrum_goerli_testnet = "Arbitrum testnet",
}

export enum ChainRpcUrl {
    localhost = "http://localhost:8545",
    goerli_testnet = "https://goerli.etherscan.io/",
    arbitrum_goerli_testnet = "https://goerli-rollup.arbitrum.io/rpc",
}

export interface Chain {
    id: ChainId;
    token: ChainToken;
    label: ChainLabel;
    rpcUrl: ChainRpcUrl;
}

export enum WalletName {
    MetaMask = "MetaMask",
    Coinbase = "Coinbase",
}

export enum WalletUrl {
    MetaMask = "https://metamask.io",
    Coinbase = "https://wallet.coinbase.com/",
}
