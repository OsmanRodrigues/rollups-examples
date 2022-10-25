// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { Row } from "react-grid-system";
import styled from "styled-components";
import {
    border,
    color,
    linearGradient,
    radius,
    spacing,
} from "../../atomic/styleguide.atm";

export const InteractiveBoardWrapper = styled(Row)`
    padding: ${spacing.padding.md};
    border: ${border.small} ${color.mediumMain};
    border-radius: ${radius.lg};
    background: ${linearGradient.homeInteractiveWrapper};
`;
