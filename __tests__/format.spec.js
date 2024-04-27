const { formatPhoneNumber } = require("../src");

describe("formatPhoneNumber function", () => {
  test("null deve retornar null", () => {
    expect(formatPhoneNumber(null)).toBe(null);
  });

  test("telefone inválido deve retornar null", () => {
    expect(formatPhoneNumber("123")).toBe(null);
  });

  test("celular válido deve retornar certo", () => {
    expect(formatPhoneNumber("6586019754")).toBe(null);
  });

  test("celular válido deve retornar certo", () => {
    expect(formatPhoneNumber("65986019754")).toBe("(65) 98601-9754");
  });

  test("telefone fixo válido retornar certo", () => {
    expect(formatPhoneNumber("6540655768")).toBe("(65) 4065-5768");
  });
});
