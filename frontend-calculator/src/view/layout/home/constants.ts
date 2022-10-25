// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

export const id = {
    sendInputForm: {
        main: "sendInputForm",
        petalLengthInput: "pl",
        petalWidthInput: "pw",
        sepalLengthInput: "sl",
        sepalWidthInput: "sw",
    },
};

export const string = {
    brandBanner: {
        heroPart1: "Web3",
        heroPart2: "Calculator",
        description:
            "Build your math expression and calculate it in the blockchain.",
    },
    resultPreview: {
        title: "Result preview",
        titleWithHistory: "History",
        idleFeedback: "Use the calculator buttons to build an expression. 🧮",
        pendingFeedback: "Waiting for result...",
    },
    sendInputForm: {
        petalLabel: "Petal",
        sepalLabel: "Sepal",
        lengthLabel: "L",
        widthLabel: "W",
        submitButtonText: "See result",
        clearButtonText: "Clear result",
        loadingButtonText: "Waiting...",
        description: "Use our first blockchain calculator!🧐",
    },
    sendInputFeedback: {
        requestStarted:
            "Sending infos, wait please. It may take a few minutes.",
        web3OnboardError:
            "You need to connect the wallet to proceed with this action!",
        onError: "Sorry! An error occurred while send infos, try again later.",
    },
    fetchNoticesFeedback: {
        onSucess: "Your result is ready!",
        onError: "Sorry! An error occurred while get result, try again later.",
    },
};
