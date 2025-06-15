const socket = io();

const usernameInput = document.getElementById("username");
const startButton = document.getElementById("start-chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

let username = "";

startButton.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    usernameInput.parentElement.style.display = "none";
    messages.classList.remove("hidden");
    form.classList.remove("hidden");
    socket.emit("user-message", `👋 ${username} joined the chat`);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("user-message", `${username}: ${input.value}`);
    input.value = "";
  }
});

socket.on("message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  item.classList.add("fade-in");
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
