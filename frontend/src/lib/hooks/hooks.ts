import {
  ApolloQueryResult,
  OperationVariables,
  useApolloClient,
} from "@apollo/client";
import { useCallback } from "react";
import { DocumentNode } from "graphql";

export function useGetData<TData = unknown, TVariables = OperationVariables>(
  query: DocumentNode
): (variables: TVariables) => Promise<ApolloQueryResult<TData>> {
  const client = useApolloClient();

  return useCallback(
    (variables) =>
      client.query<TData, TVariables>({
        query,
        variables,
      }),
    [client, query]
  );
}
