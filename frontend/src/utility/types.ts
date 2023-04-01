import type { Ref } from "vue";

export type Query<Result, InitiallyUndefined = true> = {
  data: InitiallyUndefined extends true ? Ref<Result | undefined> : Ref<Result>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error>
  refetch: Ref<() => void>
}

export type QueryParam<Result> = Result | Ref<Result>

export function unwrap<Result>(param: QueryParam<Result>): Result {
  return (param as Ref<Result>).value ?? param as Result
}