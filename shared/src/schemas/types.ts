import { Schema } from "./schema";
import { StringSchemaProps } from "./string";
import { NumberSchemaProps } from "./number";
import { ArraySchemaProps } from "./array";
import { ObjectId } from "mongodb";
import { ObjectSchemaProps } from "./object";
import { UnionSchemaProps } from "./union";

type TypeFromSubSchema<T extends Schema<unknown, boolean>> = T extends Schema<infer P, boolean>
  ? (
    | (P extends StringSchemaProps<infer S> ? S : never)
    | (P extends NumberSchemaProps ? number : never)
    | (P extends ArraySchemaProps<infer S> ? TypeFromSchema<S>[] : never)
    | (P extends "ObjectId" ? ObjectId : never)

    | (
    P extends ObjectSchemaProps<infer S, infer A> ? (
      A extends true
        ? { [Key in keyof S]: TypeFromSchema<S[Key]> } & Record<string, unknown>
        : { [Key in keyof S]: TypeFromSchema<S[Key]> }
      ) : never)

    | (
    P extends UnionSchemaProps<infer S> ? (
      S extends (infer U)[] ? (U extends Schema<unknown, boolean> ? TypeFromSchema<U> : never) : never
      ) : never)

    ) : never

export type TypeFromSchema<T extends Schema<unknown, boolean>> = T extends Schema<infer P, infer O> ?
  (O extends true ? TypeFromSubSchema<T> | undefined : TypeFromSubSchema<T>) : never
