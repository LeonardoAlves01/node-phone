const { iniciaisFixo, codigosDDD } = require("./utils/constants");

const default_options = {
  apenasFixo: false,
  apenasCelular: false,
  /** @type { string[] } */
  apenasDDD: null,
};

/**
 * @param {string} value número de telefone
 */
module.exports = function (value, options = default_options) {
  if (value == null || typeof value !== "string") return null;

  let data = value.replace(/\D/g, "");

  if (data.length === 12 || data.length === 13) {
    if (data.substring(0, 2) === "55")
      data = data.substring(2, data.length);
    else return null; // DDD não brasileiro
  }

  // apenas telefones fixos com DDD ou celulares com DDD
  if (data.length < 10 || data.length > 11) return null;

  // todos os celulares tem 11 dígitos
  if (options.apenasCelular === true && data.length === 10) return null;

  // todos os telefones fixos tem 10 dígitos
  if (options.apenasFixo === true && data.length === 11) return null;

  if (data.length === 11) {
    // todos os telefones celulares começam com 9
    if (data.substring(2, 3) !== "9") return null;
    // não existe 90
    if (data.substring(3, 4) === "0") return null;
  } else if (
    data.length === 10 &&
    iniciaisFixo.indexOf(data.substring(2, 3)) === -1
  )
    return null; // inicial do celular fixo

  const ddd = data.substring(0, 2);
  // código de DDD inválido
  if (codigosDDD.indexOf(parseInt(ddd)) === -1) return null;

  //código de DDD inválido
  if (options.apenasDDD != null && options.apenasDDD.indexOf(ddd) === -1)
    return null;

  return data;
};
