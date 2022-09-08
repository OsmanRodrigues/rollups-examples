import { HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";
import { UseServiceState } from "../../../../controller/use-service/use-service.hook";

type UseShipCrashAnimationDataReturn = [
    HTMLMotionProps<'div'>, HTMLMotionProps<'div'>
];

const initialShipMotionProps: HTMLMotionProps<"div"> = {
    initial: {
        x: -200,
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

export const useShipCrashAnimationData = (
    status: UseServiceState<any>["status"]
): UseShipCrashAnimationDataReturn => {
    const [shipMotion, setShipMotion] = useState(()=> initialShipMotionProps);
    useEffect(() => {
        const { innerHeight, innerWidth } = window;
        console.log({ innerHeight, innerWidth });
    }, []);

    return [shipMotion, initialIcebergMotionProps];
};
