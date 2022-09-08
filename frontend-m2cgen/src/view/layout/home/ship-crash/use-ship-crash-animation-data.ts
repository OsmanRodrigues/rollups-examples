import { HTMLMotionProps } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import { UseServiceState } from "../../../../controller/use-service/use-service.hook";
import { genTimerPromise } from "../../../../utils/timer-promise";

interface UseShipCrashAnimationDataReturn {
    shipMotion: HTMLMotionProps<"div">;
    icebergMotion: HTMLMotionProps<"div">;
    status: "idle"|"pending" |"ready";
}

const SHIP_INITIAL_X = 200;
const PIXEL_DIVISOR = 8;
const BREAKPOINT = {
    DESKTOP: 1368,
    MOBILE: 768
};
const initialShipMotionProps: HTMLMotionProps<"div"> = {
    initial: {
        x: -SHIP_INITIAL_X,
        y: -14,
    },
    animate: {
        x: 50,
    },
    transition: {
        duration: 60,
        repeat: Infinity,
    },
};
const initialIcebergMotionProps: HTMLMotionProps<"div"> = {
    initial: {
        x: 20,
        y: 22,
    },
};
const getShipResponsiveX = (breakpoint: number, size: number) =>
    ((size*SHIP_INITIAL_X) / breakpoint) -
    ((breakpoint-size) / (size > breakpoint ? PIXEL_DIVISOR*(1+(breakpoint-size)) : PIXEL_DIVISOR));

export const useShipCrashAnimationData = (
    requestStatus: UseServiceState<any>["status"]
): UseShipCrashAnimationDataReturn => {
    const [status, setStatus] =
        useState<UseShipCrashAnimationDataReturn['status']>('idle');
    const [shipMotion, setShipMotion] = useState(() => initialShipMotionProps);

    useLayoutEffect(() => {
        const updateShipMotion = async () => {
            setStatus("pending");
            await genTimerPromise(1000);
            setShipMotion((prev) => {
                const { innerWidth } = window;
                const breakpointFallback =
                    innerWidth < BREAKPOINT.MOBILE
                        ? BREAKPOINT.MOBILE
                        : BREAKPOINT.DESKTOP;

                const newShipMotion =
                    typeof prev.initial === "object"
                        ? {
                              ...prev,
                              initial: {
                                  ...prev.initial,
                                  x: -getShipResponsiveX(
                                      breakpointFallback,
                                      innerWidth
                                  ),
                              },
                          }
                        : {};
                return newShipMotion;
            });
            setStatus("ready");
        }
        window.addEventListener("resize", updateShipMotion);
        updateShipMotion();

        return () => window.removeEventListener("resize", updateShipMotion);
    }, []);

    return {
        shipMotion,
        icebergMotion: initialIcebergMotionProps,
        status
    };
};
