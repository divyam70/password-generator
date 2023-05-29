"use strict";
function generator() {
  const password = [];
  const passwordDisplay = document.querySelector(".password");
  const passwordLengthDisplay = document.querySelector(".length");
  const form = document.querySelector(".frame");
  const sliderEl = document.getElementById("length");
  const uppercaseEl = document.getElementById("uppercase");
  const lowercaseEl = document.getElementById("lowercase");
  const symbolEl = document.getElementById("symbol");
  const numberEl = document.getElementById("number");
  const generateBtn = document.querySelector(".generate-btn");
  const textIndicatorEl = document.querySelector(".text-indicator");
  const signIndicatorArr = Array.from(document.querySelectorAll(".child"));
  const typingSpeed = 50;
  const copyBtn = document.querySelector(".copy--check");

  const uppercaseArr = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const lowercaseArr = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const symbolArr = ["!", "@", "#", "$", "&", "^", "%"];

  sliderEl.addEventListener("input", () => {
    passwordLengthDisplay.innerHTML = sliderEl.value;
    if (sliderEl.value < 6) {
      textIndicatorEl.innerHTML = "EASY";
      signIndicatorArr.forEach(
        (index) => (index.style.backgroundColor = "red")
      );
    }
    if (sliderEl.value > 6 && sliderEl.value < 10) {
      textIndicatorEl.innerHTML = "MEDIUM";
      signIndicatorArr.forEach(
        (index) => (index.style.backgroundColor = "yellow")
      );
    } else if (sliderEl.value > 10) {
      textIndicatorEl.innerHTML = "HARD";
      signIndicatorArr.forEach(
        (index) => (index.style.backgroundColor = "green")
      );
    }
  });

  function givePassword(arrayOfChoices, passwordLength) {
    if (passwordLength % arrayOfChoices.length === 0) {
      for (let choice of arrayOfChoices) {
        for (let i = 0; i < passwordLength / arrayOfChoices.length; i++) {
          const random = Math.floor(Math.random() * choice.length);
          password.push(choice[random]);
        }
      }
    } else {
      for (let choice of arrayOfChoices) {
        for (
          let i = 0;
          i < Math.floor(passwordLength / arrayOfChoices.length);
          i++
        ) {
          const random = Math.floor(Math.random() * choice.length);
          password.push(choice[random]);
        }
      }
      for (let i = 0; i < passwordLength % arrayOfChoices.length; i++) {
        const randomArr =
          arrayOfChoices[Math.floor(Math.random() * arrayOfChoices.length)];
        password.push(randomArr[Math.floor(Math.random() * randomArr.length)]);
      }
    }
    return password.sort(() => Math.random() - 0.5).join("");
  }
  let txtToCopy;
  generateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(".copy-icon").classList.remove("hidden");
    document.querySelector(".check-icon").classList.add("hidden");
    let passwordLength = sliderEl.value;
    const userChoice = [];
    if (uppercaseEl.checked === true) userChoice.push(uppercaseArr);
    if (lowercaseEl.checked === true) userChoice.push(lowercaseArr);
    if (symbolEl.checked === true) userChoice.push(symbolArr);
    if (numberEl.checked === true) userChoice.push(numberArr);

    const givenPassword = givePassword(userChoice, passwordLength);
    txtToCopy = givenPassword;
    let charIndex = 0;
    // passwordDisplay.innerHTML = givenPassword;
    for (let i = 0; i < givenPassword.length; i++) {
      setTimeout(() => {
        passwordDisplay.innerHTML += givenPassword.charAt(i);
      }, typingSpeed * i);
    }
    passwordDisplay.innerHTML = "";
    password.length = 0;
    // console.log(givenPassword, givenPassword.length);
  });
  copyBtn.addEventListener("click", () => {
    document.querySelector(".copy-icon").classList.add("hidden");
    document.querySelector(".check-icon").classList.remove("hidden");
    if (txtToCopy) {
      navigator.clipboard
        .writeText(txtToCopy)
        .then(() => {
          console.log("Text copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    }
  });
  //   console.log(txtToCopy); this is undefined because the engine process this at the page load.
}

generator();
