import { FC, PropsWithChildren, useContext } from "react";
import { ShepherdTour, ShepherdTourContext, Tour } from "react-shepherd";
import { onBoardTourSteps } from "./onboard-tour.steps";

const tourOptions: Tour.TourOptions = {
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
    },
    useModalOverlay: true,
};

export const OnboardTourProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ShepherdTour steps={onBoardTourSteps} tourOptions={tourOptions}>
            {children}
        </ShepherdTour>
    );
};

export const useOnboardTour = () => {
    const tour = useContext(ShepherdTourContext);

    if (!tour)
        throw new Error(
            "useOnboardTour must be used inside an OnboardTourProvider tree."
        );

    return tour;
};
