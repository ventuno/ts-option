type Some<T> = {
  readonly kind: "some";
  readonly value: T;
}

type None = {
  kind: "none";
}

export class Option<T> {
  private value: Some<T> | None;

  private constructor(val: T | null) {
    if (val) {
      this.value = { kind: "some", value: val };
    } else {
      this.value = { kind: "none" };
    }
  }

  static of<T>(value: T): Option<T> {
    return new Option<T>(value);
  }

  static empty<T>(): Option<T> {
    return new Option<T>(null);
  }

  map<U>(fn: (a: T) => U): Option<U> {
    switch (this.value.kind) {
      case "some":
        return Option.of(fn(this.value.value));
      case "none":
        return Option.empty();
    }
  }

  flatMap<U>(fn: (a: T) => Option<U>): Option<U> {
    switch (this.value.kind) {
      case "some":
        return fn(this.get());
      case "none":
        return Option.empty();
    }
  }

  getOrElse<U>(x: () => U): U;
  getOrElse<U>(x: U): U;
  getOrElse(x): T {
    switch (this.value.kind) {
      case "some":
        return this.get();
      case "none":
        if (typeof x === "function") {
          return x();
        }
        return x;
    }
  }

  orElse<U>(x: Option<U>): Option<U>;
  orElse<U>(x: () => Option<U>): Option<U>;
  orElse(x): Option<T> {
    switch (this.value.kind) {
      case "some":
        return this;
      case "none":
        if (typeof x === "function") {
          return x();
        }
        return x;
    }
  }

  get(): T {
    switch (this.value.kind) {
      case "some":
        return this.value.value;
      case "none":
        throw new Error();
    }
  }

  orNull(): T | null {
    switch (this.value.kind) {
      case "some":
        return this.get();
      case "none":
        return null;
    }
  }

  forEach(consumer: (value: T) => void): void {
    switch (this.value.kind) {
      case "some":
        consumer(this.get());
      case "none":
    }
  }

  isEmpty(): boolean {
    switch (this.value.kind) {
      case "some":
        return false;
      case "none":
        return true;
    }
  }
}
