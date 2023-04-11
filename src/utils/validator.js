import { regEx } from "../constants";

export default function validator(id, value, confirmPassword) {
  switch (id) {
    case "studioName":
      return validateString(value);
    case "studioCity":
      return validateString(value);
    case "studioAbout":
      return validateAddress(value);
    case "studioEmail":
      return validateEmail(value);
    case "password":
      return validatePassword(value);
    case "confirmPassword":
      return validateConfmPassword(value, confirmPassword);
    case "studioPincode":
      return validatePincode(value);
    case "studioPhoneNumber":
      return validatePhone(value);
    case "studioWhatsAppNumber":
      return validatePhone(value);
    case "studioAddress":
      return validateAddress(value);
    case "studioDailyRate":
      return validateDailyRate(value);
    /////////////////////////////////////////////////////////////
    case "userName":
      return validateString(value);
    case "userEmail":
      return validateEmail(value);
    case "userContactNumber":
      return validatePhone(value);
    case "userAlternateContactNumber":
      return validatePhone(value);
    case "userAddress":
      return validateAddress(value);
    case "userPinCode":
      return validatePincode(value);
    default:
      console.log("default case");
      break;
  }
}

function validateString(value) {
  if (regEx.string.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(value) {
  if (regEx.email.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(value) {
  if (regEx.pwsd.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateConfmPassword(value, confirmPassword) {
  if (value === confirmPassword) {
    return true;
  } else {
    return false;
  }
}

function validatePincode(value) {
  if (regEx.pincode.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateDailyRate(value) {
  if (regEx.dailyRate.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validatePhone(value) {
  if (regEx.phone.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateAddress(value) {
  if (regEx.address.test(value)) {
    return true;
  } else {
    return false;
  }
}
