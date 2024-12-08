import { useCallback, useEffect, useState } from "react";
import { AXIOS_METHOD, doApiCall } from "./useApi";

export const useTransactions = (wallet_id, limit = 5) => {
  const [cursor, setCursor] = useState("");
  const [transactions, setTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const apiCallCallback = useCallback(
    (newCursor) => {
      setLoading(true);
      doApiCall(
        AXIOS_METHOD.POST,
        "/transactions",
        (responseData) => {
          setTransactions((oldTransactions) => {
            if (oldTransactions === false || newCursor === "") {
              return responseData?.transactions;
            }
            return [...oldTransactions, ...responseData?.transactions];
          });
          setCursor(responseData?.cursor);
          setHasMore(responseData?.has_more);
          setError(false);
          setLoading(false);
        },
        (errorMessage) => {
          setError(errorMessage);
          setTransactions(false);
          setHasMore(true);
          setCursor("");
          setLoading(false);
        },
        {
          wallet_id,
          limit,
          ...(newCursor && { cursor: newCursor }),
        }
      );
    },
    [setTransactions, setError, setLoading, setHasMore, wallet_id, limit]
  );

  const resetTransactionList = useCallback(() => {
    apiCallCallback("");
  }, [apiCallCallback]);

  useEffect(() => {
    resetTransactionList();
  }, [resetTransactionList]);

  const onLoadMore = useCallback(() => {
    apiCallCallback(cursor);
  }, [apiCallCallback, cursor]);

  return [
    transactions,
    loading,
    error,
    onLoadMore,
    hasMore,
    resetTransactionList,
  ];
};
