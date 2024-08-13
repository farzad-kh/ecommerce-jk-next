"use client";
import React, { PropsWithChildren } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
const queryClient = new QueryClient();
const WrappedQueryProvider = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      );
};

export default WrappedQueryProvider;






 