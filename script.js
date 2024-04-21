const messageBar = document.querySelector(".bar-container input");
const sendBtn = document.querySelector(".send");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY="";

sendBtn.onclick = function () {
    if (messageBar.value.length > 0) {
      const UserTypedMessage = messageBar.value;
      messageBar.value = "";
  
      let message =
        `<div class="chat message">
          <img src="images/user.png">
          <span>
            ${UserTypedMessage}
          </span>
        </div>`;
  
      let response =
        `<div class="chat response">
          <img src="images/gpt.jpg">
          <span class="new">...</span>
        </div>`;
  
      messageBox.insertAdjacentHTML("beforeend", message);
  
      setTimeout(() => {
        messageBox.insertAdjacentHTML("beforeend", response);
  
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": UserTypedMessage}]
          })
        };
  
        fetch(API_URL, requestOptions)
          .then(res => res.json())
          .then(data => {
            let ChatBotResponse = document.querySelector(".response .new");
            ChatBotResponse.innerHTML = data.choices[0].message. content;
            ChatBotResponse.classList.remove("new");
          })
          .catch((error) => {
            let ChatBotResponse = document.querySelector(".response .new");
            ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
          });
      }, 100);
    }
  };
  