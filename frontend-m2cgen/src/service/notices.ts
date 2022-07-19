// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { createClient, defaultExchanges } from "@urql/core";
import fetch from "cross-fetch";
import { ethers } from "ethers";
import { GetNoticeDocument, Notice, NoticeKeys } from "../../generated/graphql";
import { DEFAULT_URL } from "./configs/constants";

// we don't get every field of Notice
export type PartialNotice = Pick<
    Notice,
    | "__typename"
    | "session_id"
    | "epoch_index"
    | "input_index"
    | "notice_index"
    | "payload"
>;

export interface NoticeViewModel extends PartialNotice {
    payload_parsed: string
}

// define a type predicate to filter out notices
const isPartialNotice = (n: PartialNotice | null): n is PartialNotice =>
    n !== null;

/**
 * Queries a GraphQL server looking for the notices of an input
 * @param url URL of the GraphQL server
 * @param input Blockchain event of input added or the notice keys to be queried
 * @param timeout How long to wait for notice to be detected
 * @returns List of notices
 */
export const getNotices = async (
    noticeKeys: NoticeKeys,
    url: string = DEFAULT_URL
): Promise<NoticeViewModel[]> => {
    // create GraphQL client to reader server
    const client = createClient({
        url,
        exchanges: defaultExchanges,
        fetch,
        fetchOptions: { cache: "no-cache" },
    });

    // query the GraphQL server for notices of our input
    // keeping trying forever (or until user kill the process)
    console.log(
        `querying ${url} for notices of ${JSON.stringify(noticeKeys)}...`
    );
    const { data, error } = await client
        .query(GetNoticeDocument, { query: noticeKeys })
        .toPromise();
    if (data?.GetNotice) {
        return data.GetNotice.filter(isPartialNotice).map(
            (partialNotice: PartialNotice) => ({
                ...partialNotice,
                payload_parsed: ethers.utils.toUtf8String(
                    "0x" + partialNotice.payload
                ),
            })
        );
    } else {
        throw new Error(error?.message);
    }
};
