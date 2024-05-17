type AttrsMap = {
  a: { a1: number; a2: string };
  b: { b1: number; b2: string; b3: boolean };
  c: { c1: string; c2: boolean }; // 新增的kind类型
  // 你可以继续添加更多的kind类型
};

type T<K extends keyof AttrsMap = keyof AttrsMap> = K extends keyof AttrsMap
  ? { kind: K; attrs: AttrsMap[K] }
  : never;

// 使用泛型函数来处理不同kind类型的参数
const fn = <K extends keyof AttrsMap>(a: T<K>) => {
  switch (a.kind) {
    case "a":
      console.log(a.attrs.a1);
      console.log(a.attrs.a2);
      break;
    case "b":
      console.log(a.attrs.b1);
      console.log(a.attrs.b2);
      console.log(a.attrs.b3);
      break;
    case "c":
      console.log(a.attrs.c1);
      console.log(a.attrs.c2);
      break;
    // 添加新的case来处理其他kind类型
    default:
      const exhaustiveCheck: never = a;
      break;
  }
};

// 示例调用
const exampleA: T<"a"> = {
  kind: "a",
  attrs: {
    a1: 42,
    a2: "hello",
  },
};

const exampleB: T<"b"> = {
  kind: "b",
  attrs: {
    b1: 42,
    b2: "world",
    b3: true,
  },
};

const exampleC: T<"c"> = {
  kind: "c",
  attrs: {
    c1: "new",
    c2: false,
  },
};

fn(exampleA);
fn(exampleB);
fn(exampleC);
