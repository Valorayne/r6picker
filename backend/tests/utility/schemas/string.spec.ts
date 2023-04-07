import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";
import { expectValue } from "../utility";
import { expectTypeOf } from "expect-type";

describe("schemas", () => {
  describe("string", () => {
    it("is required by default", () => {
      const schema = Schemas.string()

      expectTypeOf("hello").toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(3).not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(undefined).not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue("hello").toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.string().optional()

      expectTypeOf("hello").toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(3).not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf(undefined).toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue("hello").toMatch(schema)
      expectValue(undefined).toMatch(schema)
    })

    it("supports enum", () => {
      const schema = Schemas.string().enum(["hello", "world"])

      expectTypeOf<"hello" | "world">().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<"hello">().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<"world">().toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<"something">().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue("hello").toMatch(schema)
      expectValue("world").toMatch(schema)
      expectValue("something").not.toMatch(schema)
    })

    it("supports enum + optional", () => {
      const schema = Schemas.string().enum(["hello", "world"]).optional()
      expectTypeOf<"hello" | "world" | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectValue(undefined).toMatch(schema)
    })
  })
})