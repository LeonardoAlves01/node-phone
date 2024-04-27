const { iniciaisFixo, codigosDDD } = require("./utils/constants");

/**
 * @param {string} phoneNumber - The phone number to validate
 * @param {Object} options - The options for validation
 * @param {boolean} options.onlyFixedLines - Validate only fixed line numbers
 * @param {boolean} options.onlyMobileLines - Validate only mobile line numbers
 * @param {string[]} options.onlyValidDDDs - Validate only specific DDDs
 */

const validatePhoneNumber = (phoneNumber, options = {}) => {
  const { onlyFixedLines, onlyMobileLines, onlyValidDDDs } = {
    onlyFixedLines: false,
    onlyMobileLines: false,
    onlyValidDDDs: null,
    ...options,
  };

  if (phoneNumber == null || typeof phoneNumber !== "string") return null;

  let cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (cleanedPhoneNumber.length === 12 || cleanedPhoneNumber.length === 13) {
    if (cleanedPhoneNumber.substring(0, 2) === "55")
      cleanedPhoneNumber = cleanedPhoneNumber.substring(
        2,
        cleanedPhoneNumber.length
      );
    else return null; // DDD não brasileiro
  }

  // apenas telefones fixos com DDD ou celulares com DDD
  if (cleanedPhoneNumber.length < 10 || cleanedPhoneNumber.length > 11)
    return null;

  // todos os celulares tem 11 dígitos
  if (onlyMobileLines === true && cleanedPhoneNumber.length === 10) return null;

  // todos os telefones fixos tem 10 dígitos
  if (onlyFixedLines === true && cleanedPhoneNumber.length === 11) return null;

  if (cleanedPhoneNumber.length === 11) {
    // todos os telefones celulares começam com 9
    if (cleanedPhoneNumber.substring(2, 3) !== "9") return null;
    // não existe 90
    if (cleanedPhoneNumber.substring(3, 4) === "0") return null;
  } else if (
    cleanedPhoneNumber.length === 10 &&
    iniciaisFixo.indexOf(cleanedPhoneNumber.substring(2, 3)) === -1
  )
    return null; // inicial do celular fixo

  const ddd = cleanedPhoneNumber.substring(0, 2);
  // código de DDD inválido
  if (codigosDDD.indexOf(parseInt(ddd)) === -1) return null;

  //código de DDD inválido
  if (onlyValidDDDs != null && onlyValidDDDs.indexOf(ddd) === -1) return null;

  return cleanedPhoneNumber;
};
module.exports = validatePhoneNumber;
