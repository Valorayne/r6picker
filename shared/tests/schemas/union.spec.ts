import { Schemas, TypeFromSchema } from "../../src/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("union", () => {
    it("is required by default", () => {
      const schema = Schemas.union(Schemas.string(), Schemas.number())

      expectTypeOf<string | number>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<number>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<boolean>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue("hello").toMatch(schema)
      expectValue(42).toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
      expectValue(true).not.toMatch(schema)
      expectValue({ hello: "world" }).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.union(Schemas.string(), Schemas.number()).optional()

      expectTypeOf<string | number | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<number>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<boolean>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue("hello").toMatch(schema)
      expectValue(42).toMatch(schema)
      expectValue(undefined).toMatch(schema)
      expectValue(true).not.toMatch(schema)
      expectValue({ hello: "world" }).not.toMatch(schema)
    })
  })
})