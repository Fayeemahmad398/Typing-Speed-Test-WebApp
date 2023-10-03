const firebaseAuthErrorMessages = {
  "auth/user-not-found": "Please Enter the valid email adress or signup.",
  "auth/wrong-password": "Invalid Credential.",
  "auth/email-already-in-use": "Email in already in use",
  "auth/weak-password": "Password should contain 6 or more characters",
  "auth/unknown": "Please try again later",
  "auth/network-request-failed":
    "Please make sure You have stable internet connection",
  "auth/cancelled-popup-request": "Network issue",

  // Firebase: Unable to establish a connection with the popup. It may have been blocked by the browser. (auth/popup-block
};

export default firebaseAuthErrorMessages;
