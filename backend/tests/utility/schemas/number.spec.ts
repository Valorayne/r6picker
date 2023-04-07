import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";
import { expectValue } from "../utility";

describe("schemas", () => {
  describe("number", () => {

    function assertType<T>(arg: T): void {
      // only used for type checking
    }

    it("is required by default", () => {
      const schema = Schemas.number()
      type NumberType = TypeFromSchema<typeof schema>

      assertType<NumberType>(3)
      // @ts-expect-error
      assertType<NumberType>("hello")
      // @ts-expect-error
      assertType<NumberType>(undefined)

      expectValue(42).toMatch(schema)
      expectValue(undefined).not.toMatch(schema)
    })

    it("supports optionals", () => {
      const schema = Schemas.number().optional()
      type NumberType = TypeFromSchema<typeof schema>

      assertType<NumberType>(3)
      // @ts-expect-error
      assertType<NumberType>("hello")
      assertType<NumberType>(undefined)

      expectValue(42).toMatch(schema)
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