// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC } from "react";
import { motion } from "framer-motion";
import ShipSVG from "../../../../assets/img/ship.svg";
import IcebergSVG from "../../../../assets/img/iceberg.svg";
import {
    OceanWrapper,
    ShipCrashAnimationBoard,
    ShipCrashAnimationWrapper,
} from "./ship-crash.style";
import { Image } from "../../../atomic/image.mol/image.mol";

export const ShipCrashAnimation: FC = () => {
    return (
        <ShipCrashAnimationWrapper>
            <ShipCrashAnimationBoard xs={12}>
                <motion.div
                    initial={{
                        x: -10,
                        y: -14,
                    }}
                    animate={{
                        x: 50,
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    <Image src={ShipSVG} size="xs" />
                </motion.div>
                <motion.div
                    initial={{
                        x: 20,
                        y: 22,
                    }}
                >
                    <Image src={IcebergSVG} />
                </motion.div>
            </ShipCrashAnimationBoard>
            <OceanWrapper />
        </ShipCrashAnimationWrapper>
    );
};
