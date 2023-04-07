import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("array", () => {
    it("is required by default", () => {
      const schema = Schemas.array(Schemas.string())

      expectTypeOf<string>().not.toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string[]>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue(["hello", "world"]).toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.array(Schemas.string()).optional()

      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string[] | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue(["hello", "world"]).toMatch(schema)
      expectValue(undefined).toMatch(schema)
    })

    it("supports arrays with undefined elements", () => {
      const schema = Schemas.array(Schemas.string().optional())

      expectTypeOf<(string | undefined)[]>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string[]>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined[]>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue(["hello", "world"]).toMatch(schema)
      expectValue(["hello", undefined]).toMatch(schema)
    })

    it("can be nested with objects", () => {
      const schema = Schemas.array(Schemas.object({
        id: Schemas.number()
      }))

      expectTypeOf<{ id: number }[]>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{}[]>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ id: number }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue([{}]).not.toMatch(schema)
      expectValue([{ id: 1 }, { id: 2 }]).toMatch(schema)
      expectValue([1, 2]).not.toMatch(schema)
    })
  })
})