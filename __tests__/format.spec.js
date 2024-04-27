const { format } = require("../src");

describe("Format function", () => {
  test("null deve retornar null", () => {
    expect(format(null)).toBe(null);
  });

  test("telefone inválido deve retornar null", () => {
    expect(format("123")).toBe(null);
  });

  test("celular válido deve retornar certo", () => {
    expect(format("6586019754")).toBe(null);
  });

  test("celular válido deve retornar certo", () => {
    expect(format("65986019754")).toBe("(65) 98601-9754");
  });

  test("telefone fixo válido retornar certo", () => {
    expect(format("6540655768")).toBe("(65) 4065-5768");
  });
});
