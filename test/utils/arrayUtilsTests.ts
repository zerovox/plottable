///<reference path="../testReference.ts" />

describe("Utils", () => {
  describe("ArrayUtils", () => {

    it("uniq()", () => {
      const strings = ["foo", "bar", "foo", "foo", "baz", "bam"];
      assert.deepEqual(Plottable.Utils.Array.uniq(strings), ["foo", "bar", "baz", "bam"]);
    });

  });
});
