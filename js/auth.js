window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
};

function sendOTP() {
  const phone = document.getElementById("phone").value;
  auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then(result => {
      window.confirmationResult = result;
      alert("OTP sent");
    })
    .catch(console.error);
}

function verifyOTP() {
  const otp = document.getElementById("otp").value;
  window.confirmationResult.confirm(otp)
    .then(result => {
      alert("Verified");
      document.getElementById("order-section").style.display = "block";
    })
    .catch(() => alert("Invalid OTP"));
}
