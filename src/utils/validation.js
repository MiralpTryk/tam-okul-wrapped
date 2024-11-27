export const validateEmail = (email) => {
  if (!email) {
    return "Okul numarası boş olamaz.";
  } else if (!/^\d+$/.test(email)) {
    return "Okul numarası sadece rakamlardan oluşmalıdır.";
  } else {
    return "";
  }
};

export const validatePassword = (password) => {
  if (!password) {
    return "Şifre alanı boş olamaz.";
  } else {
    return "";
  }
};
