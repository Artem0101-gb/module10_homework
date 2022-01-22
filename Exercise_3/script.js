const wsUri = "wss://echo-ws-service.herokuapp.com";


//Чат
const inputValue = document.querySelector(".chat-input").value;
const output = document.querySelector("#output");
const btnSend = document.querySelector(".chat-btn");

//Геолокация
const btnGeo = document.querySelector(".chat-btn__geo");
const mapLink = document.querySelector("#map-link");

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  const linkGeo = mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  
  writeToScreen(linkGeo);
}

btnGeo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success);
  }
});



let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.innerHTML = message;
  output.appendChild(pre);
}

window.onload = function() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      `<span style="color: blue;">Ответ от сервера: ${evt.data}</span>`
    );
  };
  };

btnSend.addEventListener('click', () => {
  const inputValue = document.querySelector(".chat-input").value;
  if (inputValue.length == 0) {
    alert("Введите что-нибудь");
  } else {
    const message = inputValue;
    writeToScreen(`Ваше сообщение: ${inputValue}`);
    websocket.send(message);
  }
});