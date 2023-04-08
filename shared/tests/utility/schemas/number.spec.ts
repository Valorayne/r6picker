import { Schemas, TypeFromSchema } from "../../../src/schemas/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("number", () => {
    it("is required by default", () => {
      const schema = Schemas.number()

      expectTypeOf<number>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue(42).toMatch(schema)
      expectValue(null).not.toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.number().optional()

      expectTypeOf<number | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<number>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue(42).toMatch(schema)
      expectValue(null).toMatch(schema)
      expectValue(undefined).toMatch(schema)
    })

    it("supports minimum", () => {
      const schema = Schemas.number().min(42)

      expectValue(41).not.toMatch(schema)
      expectValue(42).toMatch(schema)
      expectValue(43).toMatch(schema)
    })

    it("supports maximum", () => {
      const schema = Schemas.number().max(42)

      expectValue(41).toMatch(schema)
      expectValue(42).toMatch(schema)
      expectValue(43).not.toMatch(schema)
    })
  })
})