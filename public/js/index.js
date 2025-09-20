// FRONT-END (CLIENT) JAVASCRIPT HERE

window.onload = function() {
  const errorMessage = document.getElementById('error-message');

  const params = new URLSearchParams(window.location.search);

  if (params.get('error') === 'serverError') {
    errorMessage.textContent = "Server error. Try again later."
    errorMessage.style.display = 'block';
  }
  else if (params.get('error') === 'incorrectCreds') {
    errorMessage.textContent = "Incorrect username or password."
    errorMessage.style.display = 'block';
    errorMessage.style.marginTop = "20px"
  }
  
}