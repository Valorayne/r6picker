import { Schemas, TypeFromSchema } from "../../src/schemas";
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
      expectValue(null).not.toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.array(Schemas.string()).optional()

      expectTypeOf<string>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<string[] | undefined>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<undefined>().toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue(["hello", "world"]).toMatch(schema)
      expectValue(null).toMatch(schema)
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
        id: Schemas.string().enum("hello", "world")
      }))

      expectTypeOf<{ id: "hello" | "world" }[]>().toEqualTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{}[]>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ id: string }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()
      expectTypeOf<{ id: number }>().not.toMatchTypeOf<TypeFromSchema<typeof schema>>()

      expectValue([]).toMatch(schema)
      expectValue([{}]).not.toMatch(schema)
      expectValue([{ id: "hello" }, { id: "world" }]).toMatch(schema)
      expectValue(["hello", "world"]).not.toMatch(schema)
    })
  })
})