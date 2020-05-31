import { Option } from "../../option";

describe("Simple test", () => {
  describe("get", () => {
    test("It properly returns the wrapped object", () => {
      const o = Option.of("s");
      expect(o.get()).toBe("s");
    });

    test("It throws if wraps a null object", () => {
      const o = Option.of(null);
      expect(() => o.get()).toThrow(new Error());
    });

    test("It throws if created with empty", () => {
      const o = Option.empty();
      expect(() => o.get()).toThrow(new Error());
    });

    test("It throws if wraps an undefined object", () => {
      const o = Option.of(undefined);
      expect(() => o.get()).toThrow(new Error());
    });
  });

  describe("getOrElse", () => {
    test("It returns the wrapped object with supplier", () => {
      const o = Option.of(1);
      expect(o.getOrElse(() => 2)).toBe(1);
    });

    test("It returns the default object with supplier", () => {
      const o = Option.of(null);
      expect(o.getOrElse(() => 2)).toBe(2);
    });

    test("It returns the wrapped object", () => {
      const o = Option.of(1);
      expect(o.getOrElse(2)).toBe(1);
    });

    test("It returns the default object", () => {
      const o = Option.of(null);
      expect(o.getOrElse(2)).toBe(2);
    });
  });

  describe("orElse", () => {
    test("It returns the wrapped object with supplier", () => {
      const o = Option.of(1).orElse(() => Option.of(2));
      expect(o.get()).toBe(1);
    });

    test("It returns the default object with supplier", () => {
      const o: Option<number> = Option.of(null).orElse(() =>
        Option.of(2)
      );
      expect(o.get()).toBe(2);
    });

    test("It returns the wrapped object", () => {
      const o = Option.of(1).orElse(Option.of(2));
      expect(o.get()).toBe(1);
    });

    test("It returns the default object", () => {
      const o = Option.of(null).orElse(Option.of(2));
      expect(o.get()).toBe(2);
    });
  });

  describe("map", () => {
    test("It properly maps the wrapped object", () => {
      const o = Option.of("s");
      const b: Option<number> = o.map((t) => 1 + t.length);
      expect(o.get()).toBe("s");
      expect(b.get()).toBe(2);
    });

    test("It does not call map on empty", () => {
      const o = Option.empty();
      const mapSpy = jest.spyOn(o, "map");
      expect(mapSpy).not.toHaveBeenCalled();
      expect(() => o.get()).toThrow(new Error());
    });
  });

  describe("flatMap", () => {
    test("It properly flatMaps the wrapped object", () => {
      const o = Option.of("s");
      const b: Option<number> = o.flatMap((t) => Option.of(1 + t.length));
      expect(o.get()).toBe("s");
      expect(b.get()).toBe(2);
    });

    test("It does not call flatMap on empty", () => {
      const o = Option.empty();
      const flatMapSpy = jest.spyOn(o, "flatMap");
      expect(flatMapSpy).not.toHaveBeenCalled();
      expect(() => o.get()).toThrow(new Error());
    });
  });

  describe("orNull", () => {
    test("It properly returns the wrapped object", () => {
      const o = Option.of("s").orNull();
      expect(o).toBe("s");
    });

    test("It throws if wraps a null object", () => {
      const o = Option.of(null).orNull();
      expect(o).toBeNull();
    });
  });

  describe("forEach", () => {
    test("It properly calls the consumer with the wrapped object", () => {
      const consumer = jest.fn();
      Option.of("s").forEach(consumer);
      expect(consumer).toBeCalledWith("s");
    });

    test("It throws if wraps a null object", () => {
      const consumer = jest.fn();
      Option.empty().forEach(consumer);
      expect(consumer).not.toBeCalled();
    });
  });

  describe("isEmpty", () => {
    test("It returns false if not empty", () => {
      const o = Option.of("a");
      expect(o.isEmpty()).toBe(false);
    });

    test("It returns true if empty", () => {
      const o = Option.of(null);
      expect(o.isEmpty()).toBe(true);
    });
  });
});
