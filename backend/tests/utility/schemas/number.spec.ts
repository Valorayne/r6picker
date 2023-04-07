import { Schemas, TypeFromSchema } from "../../../src/utility/schemas";
import { expect } from "chai";

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

      expect(schema.toJsonSchema()).to.deep.equal({
        type: "number",
        required: true
      })
    })

    it("supports optionals", () => {
      const schema = Schemas.number().optional()
      type NumberType = TypeFromSchema<typeof schema>

      assertType<NumberType>(3)
      // @ts-expect-error
      assertType<NumberType>("hello")
      assertType<NumberType>(undefined)

      expect(schema.toJsonSchema()).to.deep.equal({
        type: "number",
        required: false
      })
    })

    it("supports minimum", () => {
      expect(Schemas.number().min(42).toJsonSchema()).to.deep.equal({
        type: "number",
        required: true,
        minimum: 42
      })
    })

    it("supports maximum", () => {
      expect(Schemas.number().max(42).toJsonSchema()).to.deep.equal({
        type: "number",
        required: true,
        maximum: 42
      })
    })
  })
})