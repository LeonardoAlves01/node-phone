const validatePhoneNumber = require("./validate");

/**
 * @param {string} phoneNumber Phone number to format
 */
const formatPhoneNumber = (phoneNumber) => {
  const validatedData = validatePhoneNumber(phoneNumber);
  if (!validatedData) return validatedData;

  const formattedDDDNumber = validatedData.substring(0, 2);
  const formattedNumber =
    validatedData.length === 10
      ? `(${formattedDDDNumber}) ${validatedData.substring(2, 6)}-${validatedData.substring(6, 11)}`
      : `(${formattedDDDNumber}) ${validatedData.substring(2, 7)}-${validatedData.substring(7, 12)}`;

  return formattedNumber;
};

module.exports = formatPhoneNumber;
