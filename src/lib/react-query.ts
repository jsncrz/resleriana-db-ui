import { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

// eslint-disable-next-line no-unused-vars
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

// eslint-disable-next-line no-unused-vars
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<
  // eslint-disable-next-line no-unused-vars
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
