const validate = require("../src/validate");

describe("Format function", () => {
  test("null deve retornar null", () => {
    expect(validate(null)).toBe(null);
  });
  test("telefone inválido deve retornar null", () => {
    expect(validate("123")).toBe(null);
  });
  test("telefone inválido deve retornar null", () => {
    expect(validate("00000000000")).toBe(null);
  });
  test("telefone inválido deve retornar null", () => {
    expect(validate("00900000000")).toBe(null);
  });
  test("telefone inválido deve retornar null", () => {
    expect(validate("9999999999")).toBe(null);
  });
  test("telefone inválido deve retornar null", () => {
    expect(validate("1190000000")).toBe(null);
  });
  test("celulares da nextel desde 2018 também começam com 9", () => {
    expect(validate("1178000000")).toBe(null);
  });
  test("telefone começando com DDI não brasileiro deve retornar null", () => {
    expect(validate("9921990000000")).toBe(null);
  });
  test("telefone fixo deve retornar null quando apenasCelular é true", () => {
    expect(validate("2140028922", { apenasCelular: true })).toBe(null);
  });
  test("celular deve retornar null quando apenasFixo é true", () => {
    expect(validate("21987874747", { apenasFixo: true })).toBe(null);
  });
  test("telefone deve retornar null quando DDD é inválido", () => {
    expect(validate("36987874747")).toBe(null);
  });
  test("telefone deve retornar null quando as iniciais do fixo são inválidas", () => {
    expect(validate("2110101010")).toBe(null);
  });
  test("celular deve retornar null não for um dos DDDs do apenasDDD", () => {
    expect(validate("21987874747", { apenasDDD: ["11"] })).toBe(null);
  });
  test("telefone fixo válido deve retornar somente números", () => {
    expect(validate("(11) 4002-8922")).toBe("1140028922");
  });
  test("telefone celular válido deve retornar somente números", () => {
    expect(validate("11990000000")).toBe("11990000000");
  });
  test("telefone válido começando com 55 deve retornar somente números sem DDI", () => {
    expect(validate("5521990000000")).toBe("21990000000");
  });
  test("telefone válido, pois dígitos repetidos podem ser um número válido", () => {
    expect(validate("99999999999")).toBe("99999999999");
  });
  test("telefone válido, pois agora existem celulares que começam com 5", () => {
    expect(validate("11956573882")).toBe("11956573882");
  });
});
