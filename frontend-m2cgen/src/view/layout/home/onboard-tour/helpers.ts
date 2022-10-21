import { ShepherdButtonWithType } from "react-shepherd";
import { onboardTourCSSClass } from "./onboard-tour.style";

enum StepType {
    FirstStep = "FirstStep",
    LastStep = "LastStep",
    CommonStep = "CommonStep",
}

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
        classes: onboardTourCSSClass["onboard-tour-button-primary"],
        text: "Next",
        type: "next",
    },
];


export const resetTourScroll = () =>
    new Promise(function (resolve) {
        setTimeout(function () {
            window.scrollTo(0, 0);
            resolve(void 0);
        }, 500);
    });

export const getStepButtons = (
    stepType?: keyof typeof StepType
): ShepherdButtonWithType[] =>
    buttons.map((button) => {
        if (stepType === "FirstStep" && button.type === "back")
            return {
                ...button,
                disabled: true,
            };
        else if (stepType === "LastStep" && button.type === "next")
            return {
                ...button,
                disabled: true,
            };
        return button;
    });
