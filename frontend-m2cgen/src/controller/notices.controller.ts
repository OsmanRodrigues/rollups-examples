// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { Dispatch } from "react";
import { NoticeKeys } from "../../generated/graphql";
import { getNotices, NoticeViewModel } from "../service/notices.service";
import { genTimerPromise } from "../utils/timer-promise";
import { REFETCH_TIME_DEFAULT } from "./config/constants";
import { ServiceReducerActions } from "./use-service/use-service.hook";

export const fetchNotices = async (
    dispatch: Dispatch<ServiceReducerActions<NoticeViewModel[]>>,
    params?: NoticeKeys,
    refetchIfEmpty?: boolean
) => {
    dispatch({ type: "start_request" });
    try {
        const paramsFallback = params ?? { epoch_index: "0" };
        let fetchedNotices: NoticeViewModel[] = await getNotices(
            paramsFallback
        );

        if (refetchIfEmpty)
            while (!fetchedNotices.length) {
                await genTimerPromise(REFETCH_TIME_DEFAULT);
                const refetch = await getNotices(paramsFallback, true);
                fetchedNotices = refetch;
            }

        dispatch({ type: "resolve_request", data: fetchedNotices });

        return fetchedNotices;
    } catch (err) {
        dispatch({ type: "fail_request", error: err });

        throw err;
    }
};
