import { ShepherdButtonWithType, ShepherdOptionsWithType } from "react-shepherd";
import { resetTourScroll } from "./helpers";
import { onboardTourCSSClass } from "./onboard-tour.style";

const buttons: ShepherdButtonWithType[] = [
    {
        classes: onboardTourCSSClass["onboard-tour-button-secondary"],
        text: "Exit",
        type: "cancel",
    },
    {
        classes: onboardTourCSSClass["onboard-tour-button-primary"],
        text: "Back",
        type: "back",
    },
    {
        classes: onboardTourCSSClass["onboard-tour-button-secondary"],
        text: "Next",
        type: "next",
    },
];

const sharedOptions: ShepherdOptionsWithType = {
    beforeShowPromise: resetTourScroll,
    buttons,
    scrollTo: false,
    cancelIcon: {
        enabled: true,
    },
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
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-2"]}`,
            on: "bottom",
        },
        title: "The form",
        text: [
            `The DApp predicts if you could survive the Titanic Accident through the infos passed by this form.
            Age and Gender are self informative, and Embarked Town is the three main cities where the passengers could embark in the trip.`,
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-3"]}`,
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
            element: `.${onboardTourCSSClass["onboard-tour-element-4"]}`,
            on: "bottom",
        },
        title: "Result preview",
        text: [
            "This area will shown you the prediction result computed by the DApp backend.",
        ],
        ...sharedOptions,
    },
];
