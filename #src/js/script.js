function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

/*==== Объявляем переменные ====*/
const modalForm = document.querySelector(".modal__form"),
  modalHeader = document.querySelector(".modal__header"),
  breadcrumbs = document.querySelectorAll(".modal-breadcrumb__item"),
  modalTabs = document.querySelectorAll(".modal__tab"),
  delivery = document.querySelector("#delivery"),
  deliveryFio = document.querySelector("#delivery-fio"),
  deliveryCity = document.querySelector("#delivery-city"),
  deliveryAdress = document.querySelector("#delivery-adress"),
  deliveryCountry = document.querySelector("#delivery-country"),
  deliveryIndex = document.querySelector("#delivery-index"),
  payment = document.querySelector("#payment"),
  paymentName = document.querySelector("#payment-name"),
  paymentCard = document.querySelector("#payment-card"),
  paymentDate = document.querySelector(".input-group__date"),
  paymentDateMonth = document.querySelector("#payment-date-month"),
  paymentDateYear = document.querySelector("#payment-date-year"),
  paymentCvv = document.querySelector("#payment-cvv"),
  verified = document.querySelector("#verified"),
  buttonInfo = document.querySelector("#button1"),
  buttonPayment = document.querySelector("#button2"),
  resultText = document.querySelector(".res");

let deliveryValidaionSuccess, paymentValidaionSuccess;

/* ====== Пустой объект с данными формы ======= */
const formData = {
  deliveryAdress: { value: "", valid: false },
  deliveryCity: { value: "", valid: false },
  deliveryCountry: { value: "", valid: false },
  deliveryFio: { value: "", valid: false },
  deliveryIndex: { value: "", valid: false },
  paymentCardCvv: { value: "", valid: false },
  paymentCardDateMonth: { value: "", valid: false },
  paymentCardDateYear: { value: "", valid: false },
  paymentCardName: { value: "", valid: false },
  paymentCardNumber: { value: "", valid: false },
};

/* ====== Функции ======= */

const checkDeliveryValidationSuccess = () => {
  if (formData.deliveryAdress.valid === false) {
    addError(deliveryAdress);
  }
  if (formData.deliveryCity.valid === false) {
    addError(deliveryCity);
  }
  if (formData.deliveryCountry.valid === false) {
    addError(deliveryCountry);
  }
  if (formData.deliveryFio.valid === false) {
    addError(deliveryFio);
  }
  if (formData.deliveryIndex.valid === false) {
    addError(deliveryIndex);
  }
  if (
    formData.deliveryAdress.valid === false ||
    formData.deliveryCity.valid === false ||
    formData.deliveryCountry.valid === false ||
    formData.deliveryFio.valid === false ||
    formData.deliveryIndex.valid === false
  ) {
    deliveryValidaionSuccess = false;
  } else deliveryValidaionSuccess = true;
};

const checkPaymentValidationSuccess = () => {
  if (formData.paymentCardCvv.valid === false) {
    addError(paymentCvv);
  }
  if (formData.paymentCardDateMonth.valid === false) {
    addError(paymentDate);
  }
  if (formData.paymentCardDateYear.valid === false) {
    addError(paymentDate);
  }
  if (formData.paymentCardName.valid === false) {
    addError(paymentName);
  }
  if (formData.paymentCardNumber.valid === false) {
    addError(paymentCard);
  }
  if (
    formData.paymentCardCvv.valid === false ||
    formData.paymentCardDateMonth.valid === false ||
    formData.paymentCardDateYear.valid === false ||
    formData.paymentCardName.valid === false ||
    formData.paymentCardNumber.valid === false
  ) {
    paymentValidaionSuccess = false;
  } else {
    paymentValidaionSuccess = true;
    console.log("formData: ", formData);
  }
};

const removeTabActiveClass = () => {
  modalTabs.forEach((item) => item.classList.remove("active"));
};

const showPaymentTab = () => {
  checkDeliveryValidationSuccess();
  if (deliveryValidaionSuccess) {
    removeTabActiveClass();
    breadcrumbs[0].classList.remove("active");
    breadcrumbs[1].classList.add("active");
    payment.classList.add("active");
    translitFio();
  }
};

const showVerifiedTab = () => {
  checkPaymentValidationSuccess();
  if (paymentValidaionSuccess) {
    removeTabActiveClass();
    modalHeader.classList.add("hide");
    verified.classList.add("active");
    resultText.innerHTML = "Данные формы в консоле!";
  }
};

const translit = (word) => {
  let answer = "";
  const converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  for (let i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }

  return answer;
};

const addError = (element) => {
  element.classList.add("input-group__error");
};

const removeError = (element) => {
  element.classList.remove("input-group__error");
};

const validateFio = (name) => {
  if (name === "") return false;
  let words = name.trim().split(" ");
  if (words.length < 3) return false;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === "") return false;
    if (i < 3 && !/[А-Я-]/.test(words[i][0])) return false;
    if (i >= 3 && !/[а-яА-Я]/.test(words[i][0])) return false;
    if (/[^а-я-]/.test(words[i].slice(1))) return false;
  }
  return true;
};

const validateCardName = (name) => {
  if (name === "") return false;
  let words = name.trim().split(" ");
  if (words.length !== 2) return false;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === "") return false;
    if (i !== 3 && !/[A-Z-]/.test(words[i][0])) return false;
    if (i !== 2 && !/[a-zA-Z]/.test(words[i][0])) return false;
    if (/[^a-z-]/.test(words[i].slice(1))) return false;
  }
  return true;
};

const validateAdress = (adress) => {
  return adress.length >= 5 && !/[^-а-яА-Я0-9№.,/ ()"]/.test(adress);
};

const validateNumber = (number, digits) => {
  let cleanNumber = number
    .replace(/_/g, "")
    .replace(/ /g, "")
    .replace(/-/g, "");
  return cleanNumber.length === digits;
};

const translitFio = () => {
  let newName = translit(formData.deliveryFio.value);
  let words = newName.trim().split(" ");
  words.length = 2;
  newName = words.join(" ");
  paymentName.value = newName;
  formData.paymentCardName.value = newName;
  formData.paymentCardName.valid = true;
};

/* ====== События ====== */
modalForm.addEventListener("submit", (e) => e.preventDefault());
deliveryFio.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateFio(value)) {
    formData.deliveryFio.value = value;
    formData.deliveryFio.valid = true;
  } else {
    addError(target);
    formData.deliveryFio.valid = false;
  }
});
deliveryCity.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateAdress(value)) {
    formData.deliveryCity.value = value;
    formData.deliveryCity.valid = true;
  } else {
    addError(target);
    formData.deliveryCity.valid = false;
  }
});
deliveryAdress.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateAdress(value)) {
    formData.deliveryAdress.value = value;
    formData.deliveryAdress.valid = true;
  } else {
    addError(target);
    formData.deliveryAdress.valid = false;
  }
});
deliveryIndex.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateNumber(value, 4)) {
    formData.deliveryIndex.value = value;
    formData.deliveryIndex.valid = true;
  } else {
    addError(target);
    formData.deliveryIndex.valid = false;
  }
});
deliveryCountry.addEventListener("change", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateAdress(value)) {
    formData.deliveryCountry.value = value;
    formData.deliveryCountry.valid = true;
  } else {
    addError(target);
    formData.deliveryCountry.valid = false;
  }
});
paymentName.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateCardName(value)) {
    formData.paymentCardName.value = value;
    formData.paymentCardName.valid = true;
  } else {
    addError(target);
    formData.paymentCardName.valid = false;
  }
});
paymentCard.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateNumber(value, 16)) {
    formData.paymentCardNumber.value = value;
    formData.paymentCardNumber.valid = true;
  } else {
    addError(target);
    formData.paymentCardNumber.valid = false;
  }
});
paymentDateMonth.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value.length > 2) {
    value = value.substring(0, 2);
    paymentDateMonth.value = value.substring(0, 2);
  }
  if (value > 0 && value < 13) {
    formData.paymentCardDateMonth.value = value;
    formData.paymentCardDateMonth.valid = true;
  } else {
    paymentDate.classList.add("input-group__error");
    formData.paymentCardDateMonth.valid = false;
  }
  if (
    formData.paymentCardDateMonth.valid === true &&
    formData.paymentCardDateYear.valid === true
  ) {
    paymentDate.classList.remove("input-group__error");
  }
});
paymentDateYear.addEventListener("input", (e) => {
  let value = e.target.value;
  if (value.length > 2) {
    value = value.substring(0, 2);
    paymentDateYear.value = value.substring(0, 2);
  }
  if (value > 20 && value < 99) {
    formData.paymentCardDateYear.value = value;
    formData.paymentCardDateYear.valid = true;
  } else {
    paymentDate.classList.add("input-group__error");
    formData.paymentCardDateYear.valid = false;
  }
  if (
    formData.paymentCardDateMonth.valid === true &&
    formData.paymentCardDateYear.valid === true
  ) {
    paymentDate.classList.remove("input-group__error");
  }
});
paymentCvv.addEventListener("input", (e) => {
  const target = e.target;
  const value = e.target.value;
  removeError(target);
  if (validateNumber(value, 3)) {
    formData.paymentCardCvv.value = value;
    formData.paymentCardCvv.valid = true;
  } else {
    addError(target);
    formData.paymentCardCvv.valid = false;
  }
});
buttonInfo.addEventListener("click", showPaymentTab);
buttonPayment.addEventListener("click", showVerifiedTab);
