import { InMemoryImage } from "..";

const mockBuffer = Buffer.from([1, 2, 3]);

describe("InMemoryImage", () => {
  it("should be a function", () => {
    expect(InMemoryImage).toBeInstanceOf(Function);
  });

  describe("constructor", () => {
    it("should return an instance of InMemoryImage", () => {
      expect(new InMemoryImage(mockBuffer)).toBeInstanceOf(InMemoryImage);
    });
  });

  describe("instance methods", () => {
    let instance: InMemoryImage;
    beforeEach(() => {
      instance = new InMemoryImage(mockBuffer);
    });

    describe("toBuffer", () => {
      it("should return a Promise which resolves the original buffer", async () => {
        expect(instance.toBuffer()).resolves.toBe(mockBuffer);
      });
    });
  });
});
