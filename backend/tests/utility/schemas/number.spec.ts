import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";

describe("schemas", () => {
  describe("number", () => {

    function assertType<T>(arg: T): void {
      // only used for type checking
    }

    it("gets resolved to number", () => {
      const schema = Schemas.number()
      type NumberType = TypeFromSchema<typeof schema>

      assertType<NumberType>(3)
      // @ts-expect-error
      assertType<NumberType>("hello")
      // @ts-expect-error
      assertType<NumberType>(undefined)
    })

    it("supports optionals", () => {
      const schema = Schemas.number().optional()
      type NumberType = TypeFromSchema<typeof schema>

      assertType<NumberType>(3)
      // @ts-expect-error
      assertType<NumberType>("hello")
      assertType<NumberType>(undefined)
    })
  })
})