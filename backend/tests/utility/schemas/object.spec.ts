import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("object", () => {
    it("is required by default", () => {
      const schema = Schemas.object({})

      expectTypeOf({}).toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf("hello").not.toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(undefined).not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({}).toMatch(schema)
      expectValue({ test: "value" }).toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.object({}).optional()

      expectTypeOf({}).toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(3).not.toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(undefined).toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue({}).toMatch(schema)
      expectValue({ test: "value" }).toMatch(schema)
      expectValue(undefined).toMatch(schema)
    })

    it("supports custom properties", () => {
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
              you: Schemas.string().enum(["go"])
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
  })
})