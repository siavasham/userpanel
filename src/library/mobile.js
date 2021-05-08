export const isPhoneNumberPatternValid = (phoneNumber) => {
  const generalRegex = new RegExp(/^((\+98|0)?9\d{9})$/);
  return generalRegex.test(phoneNumber);
};
export const normalizePhoneNumber = (phoneNumber) => {
  return phoneNumber.length == 10
    ? "0" + phoneNumber
    : phoneNumber.replace("+98", "0");
};
export const MobileCodes = {
  MTN: [
    "0901",
    "0902",
    "0903",
    "0904",
    "0905",
    "0930",
    "0933",
    "0935",
    "0936",
    "0937",
    "0938",
    "0939",
    "0941",
  ],
  MCI: [
    "0910",
    "0911",
    "0912",
    "0913",
    "0914",
    "0915",
    "0916",
    "0917",
    "0918",
    "0919",
    "0990",
    "0991",
    "0992",
  ],
  RIGHTEL: ["0920", "0921", "0922"],
};
export const getPhoneNumberOperator = (phoneNumber) => {
  if (!isPhoneNumberPatternValid(phoneNumber)) {
    return false;
  }
  phoneNumber = normalizePhoneNumber(phoneNumber);
  for (const operator of Object.keys(MobileCodes)) {
    for (const code of MobileCodes[operator]) {
      if (phoneNumber.indexOf(code) === 0) {
        return operator;
      }
    }
  }
  return false;
};
export const isValidPhoneNumber = (phoneNumber) => {
  return getPhoneNumberOperator(phoneNumber) !== false;
};
export const checkPhoneNumber = (phoneNumber) => {
  return (
    isPhoneNumberPatternValid(phoneNumber) && isValidPhoneNumber(phoneNumber)
  );
};
