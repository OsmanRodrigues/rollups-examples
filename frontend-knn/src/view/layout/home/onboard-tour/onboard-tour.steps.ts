import { ShepherdOptionsWithType } from "react-shepherd";
import { getStepButtons, resetTourScroll } from "./helpers";
import { onboardTourCSSClass } from "./onboard-tour.style";

const sharedOptions: ShepherdOptionsWithType = {
    beforeShowPromise: resetTourScroll,
    buttons: getStepButtons(),
    scrollTo: false,
    cancelIcon: {
        enabled: true,
    },
};

const firstStepOptions: ShepherdOptionsWithType = {
    ...sharedOptions,
    buttons: getStepButtons("FirstStep"),
};

const lastStepOptions: ShepherdOptionsWithType = {
    ...sharedOptions,
    buttons: getStepButtons("LastStep"),
};

export const onBoardTourSteps: ShepherdOptionsWithType[] = [
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-1"]}`,
            on: "bottom",
        },
        title: "Wallet connection",
        text: [
            "First, connect your wallet properly. You will need a Metamask and Goerli testnet account with currency to use the DApp.",
        ],
        ...firstStepOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-2"]}`,
            on: "bottom",
        },
        title: "The form",
        text: [
            `The DApp predicts what kind of Iris flower, based on your inputs.
            Those inputs represents information of sepal and petal of that flower.
            For that, you fills the width (W) and the length (L) forms for both petal and sepal infomations.`,
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-3"]}`,
            on: "top",
        },
        title: "Sepal sizes",
        text: [
            "In this area you must input the sizes for sepal of the flower. The range of those values goes from 0.1 to 8.0.",
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-4"]}`,
            on: "top",
        },
        title: "Petal sizes",
        text: [
            `In this area you can input the sizes for petal of the flower.
            The range of those values goes from 0.1 to 8.0, but it has a restriction
            for the petal value should have be lower or equal than sepal values.`,
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-5"]}`,
            on: "bottom",
        },
        title: "The chart",
        text: [
            `This area is a graphic representation of the values choosen by you.`,
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-6"]}`,
            on: "bottom",
        },
        title: "Submitting the infos",
        text: [
            "With this button, you can send the operation to the blockchain. It will open the transaction in the Metamask wallet to be confirmed.",
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-7"]}`,
            on: "bottom",
        },
        title: "Result preview",
        text: [
            "This area will shown you the prediction result computed by the DApp backend.",
        ],
        ...lastStepOptions,
    },
];
