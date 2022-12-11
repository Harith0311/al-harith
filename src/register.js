// Function to make sure the number of cart still there after refresh the page
function refreshCartNum() {
    let productNum = localStorage.getItem("cartNum");
  
    if (productNum) {
      document.querySelector("li .cart span").textContent = productNum;
    }
  }
  
  refreshCartNum();

  var password = document.getElementById("pswd");         //Get the password value into 'password' variable
      var letter = document.getElementById("letter");         //Variable for password condition
      var capital = document.getElementById("capital");       //Variable for password condition
      var number = document.getElementById("number");         //Variable for password condition
      var length = document.getElementById("length");         //Variable for password condition
      var text = document.getElementById("text");             //Text to warning caps lock
      var confirm_password = document.getElementById("confirm_password");
      
      // When the user clicks on the password field, show the message box
      password.onfocus = function() {
        document.getElementById("message").style.display = "block";
      }
      
      // When the user clicks outside of the password field, hide the message box
      password.onblur = function() {
        document.getElementById("message").style.display = "none";
      }
      
      // When the user starts to type something inside the password field
      password.onkeyup = function() {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(password.value.match(lowerCaseLetters)) {
          letter.classList.remove("invalid");
          letter.classList.add("valid");
        } else {
          letter.classList.remove("valid");
          letter.classList.add("invalid");
      }
      
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(password.value.match(upperCaseLetters)) {
          capital.classList.remove("invalid");
          capital.classList.add("valid");
        } else {
          capital.classList.remove("valid");
          capital.classList.add("invalid");
        }
      
        // Validate numbers
        var numbers = /[0-9]/g;
        if(password.value.match(numbers)) {
          number.classList.remove("invalid");
          number.classList.add("valid");
        } else {
          number.classList.remove("valid");
          number.classList.add("invalid");
        }
      
        // Validate length
        if(password.value.length >= 8) {
          length.classList.remove("invalid");
          length.classList.add("valid");
        } else {
          length.classList.remove("valid");
          length.classList.add("invalid");
        }
      }

      //Trigger caps lock
      //var input = document.getElementById("pswd");
      
      password.addEventListener("keyup", function(event) {

        if (event.getModifierState("CapsLock")) {
          text.style.display = "block";
        } else {
          text.style.display = "none"
        }
      });

      //Confirm password validation
      function validatePassword(){
        if(password.value != confirm_password.value) {
          confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
          confirm_password.setCustomValidity('');
        }
      }

      password.onchange = validatePassword;
      confirm_password.onkeyup = validatePassword;

      function insertData(e){
        event.preventDefault();
        let fullname = document.getElementById("fName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("pswd").value;
        let confirm_password = document.getElementById("cPswd").value;
        let mobileNumber = document.getElementById("mobile").value;

        let user = {
          fullname: fullname,
          email: email,
          password: password,
          confirmPassword: confirm_password,
          mobileNumber: mobileNumber
        };

        if (fullname != "" && email != "" && password != "" && confirm_password != "" && mobileNumber != "")
        {
          
          localStorage.setItem("userDetails", JSON.stringify(user));
          alert("Your account has been successfully registered!");
        }

      }
