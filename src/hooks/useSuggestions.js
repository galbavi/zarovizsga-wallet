import { useCallback, useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "./useApi";

export const useTransactions = (author = "", limit = 5) => {
    const [cursor, setCursor] = useState("");
    const [transactions, setTransactions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const apiCallCallback = useCallback((newCursor) => {
        setLoading(true);
        doApiCall(AXIOS_METHOD.POST, '/transactions', (responseData) => {
            setTransactions(oldTransactions => {
                if (oldTransactions === false || newCursor === "") {
                    return responseData?.Transactions;
                }
                return [...oldTransactions, ...responseData?.transactions]
            });
            setCursor(responseData?.cursor);
            setHasMore(responseData?.has_more);
            setError(false);
            setLoading(false);
        }, (errorMessage) => {
            setError(errorMessage);
            setTransactions(false);
            setHasMore(true);
            setCursor("");
            setLoading(false);
        }, {
            author,
            limit,
            cursor: newCursor
        });
    }, [setTransactions, setError, setLoading, setHasMore, author, limit]);

    const resetSuggestionList = useCallback(() => {
        apiCallCallback("");
    }, [apiCallCallback]);

    useEffect(() => {
        resetSuggestionList();
    }, [resetSuggestionList]);


    const onLoadMore = useCallback(() => {
        apiCallCallback(cursor);
    }, [apiCallCallback, cursor]);


    return [transactions, loading, error, onLoadMore, hasMore, resetSuggestionList];
}