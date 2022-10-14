import { ShepherdOptionsWithType } from "react-shepherd";
import { resetTourScroll } from "./helpers";

export const onboardTourCSSClass = {
    "onboard-tour-button-primary": "onboard-tour-button-primary",
    "onboard-tour-button-secondary": "onboard-tour-button-secondary",
    "onboard-tour-element-1": "onboard-tour-element-1",
    "onboard-tour-element-2": "onboard-tour-element-2",
    "onboard-tour-element-3": "onboard-tour-element-3",
    "onboard-tour-element-4": "onboard-tour-element-4",
};

const buttons = [
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
        title: "Step 1",
        text: [
            "React-Shepherd is a JavaScript library for guiding users through your React app.",
        ],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-2"]}`,
            on: "bottom",
        },
        title: "Step 2",
        text: ["Lorem impsum sut amet"],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-3"]}`,
            on: "bottom",
        },
        title: "Step 3",
        text: ["Lorem impsum sut amet"],
        ...sharedOptions,
    },
    {
        attachTo: {
            element: `.${onboardTourCSSClass["onboard-tour-element-4"]}`,
            on: "bottom",
        },
        title: "Step 4",
        text: ["Lorem impsum sut amet"],
        ...sharedOptions,
    },
];
