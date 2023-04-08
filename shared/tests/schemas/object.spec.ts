import { Schemas, TypeFromSchema } from "../../src/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("object", () => {
    it("is required by default", () => {
      const schema = Schemas.object({
        test: Schemas.string()
      })

      expectTypeOf<{ test: string }>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ amount: number }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      // current TypeScript shortcoming: https://github.com/microsoft/TypeScript/issues/12936#issuecomment-284590083
      expectTypeOf<{ test: string, amount: number }>().toMatchTypeOf<TypeFromSchema<typeof schema>>()


      expectTypeOf<{}>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({ test: "value" }).toMatch(schema)
      expectValue({}).not.toMatch(schema)
      expectValue(null).not.toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.object({
        test: Schemas.string()
      }).optional()

      expectTypeOf<{ test: string } | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ amount: number }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      // current TypeScript shortcoming: https://github.com/microsoft/TypeScript/issues/12936#issuecomment-284590083
      expectTypeOf<{ test: string, amount: number }>().toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectTypeOf<{}>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({ test: "value" }).toMatch(schema)
      expectValue({}).not.toMatch(schema)
      expectValue(null).toMatch(schema)
      expectValue(undefined).toMatch(schema)
    })

    it("supports specifying properties", () => {
      const schema = Schemas.object({
        hello: Schemas.string(),
        amount: Schemas.number(),
        optional: Schemas.number().optional()
      })

      expectTypeOf<{
        hello: string
        amount: number
        optional: number | undefined
      }>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ hello: string }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      // current TypeScript shortcoming: https://github.com/microsoft/TypeScript/issues/12936#issuecomment-284590083
      expectTypeOf<{
        hello: string
        amount: number
        optional: number | undefined
        additional: number
      }>().toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({ hello: "world", amount: 42 }).toMatch(schema)
      expectValue({ hello: "world", amount: 42, optional: 1 }).toMatch(schema)
      expectValue({ hello: "world" }).not.toMatch(schema)
      expectValue({ amount: 42 }).not.toMatch(schema)
      expectValue({}).not.toMatch(schema)
    })

    it("can get nested", () => {
      const schema = Schemas.object({
        how: Schemas.object({
          deep: Schemas.object({
            can: Schemas.object({
              you: Schemas.string().enum("go")
            })
          })
        }),
      })

      // expectTypeOf doesn't seem to work well with deep nesting
      expectTypeOf<{
        how: {
          deep: {
            can: {
              you: "go"
            }
          }
        }
      }>().toEqualTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({ how: { deep: { can: { you: "go" } } } }).toMatch(schema)
      expectValue({ how: { deep: { can: { you: "leave" } } } }).not.toMatch(schema)
      expectValue({ how: {} }).not.toMatch(schema)
      expectValue({}).not.toMatch(schema)
    })

    it("supports additional properties", () => {
      const schema = Schemas.object({
        hello: Schemas.string(),
      }).additionalProperties()

      expectTypeOf<({ hello: string } & Record<string, unknown>)>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ hello: string, amount: number }>().toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({ hello: "world", amount: 42 }).toMatch(schema)
      expectValue({ hello: "world", amount: 42, optional: 1 }).toMatch(schema)
      expectValue({ hello: "world" }).toMatch(schema)
      expectValue({ amount: 42 }).not.toMatch(schema)
      expectValue({}).not.toMatch(schema)
    })
  })
})