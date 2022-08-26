// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { ethers } from "ethers";
import { NoticeDocument, Notice, NoticeQueryVariables } from "../../generated/graphql";
import { client } from "./config/client";

export interface NoticeViewModel extends Notice {
    payload_parsed: string;
}

/**
 * Queries a GraphQL server looking for the notices of an input
 * @param input Blockchain event of input added or the notice keys to be queried
 * @param timeout How long to wait for notice to be detected
 * @returns List of notices
 */

export const getNotice = async (
    noticeQueryVariables: NoticeQueryVariables,
    noCache?: boolean
): Promise<NoticeViewModel|null> => {
    // query the GraphQL server for notices of our input
    const { data, error } = await client.query({
        query: NoticeDocument,
        variables: noticeQueryVariables,
        fetchPolicy: noCache ? "network-only" : "cache-first",
    });

    if (data?.notice) {
        return {
            ...data.notice,
            payload_parsed: ethers.utils.toUtf8String(
                "0x" + data.notice.payload
            ),
        };
    } else if (error?.message) {
        throw new Error(error.message);
    } else {
        return null;
    }
};
