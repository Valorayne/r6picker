import { Ref } from "vue";

export type Query<Result, InitiallyUndefined = true> = {
  data: InitiallyUndefined extends true ? Ref<Result> | undefined : Ref<Result>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error>
}

export type QueryParam<Result> = Result | Ref<Result>