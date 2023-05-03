const logoutdiv = document.getElementById('logout');

// Add a click event listener to the logout button
logoutdiv.innerHTML="You are sucessfully loggedout"
  setTimeout(function() {
    // Redirect to the home page
    window.location.href = '/home';
  }, 3000); // 5 seconds