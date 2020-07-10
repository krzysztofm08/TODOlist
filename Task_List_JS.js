//TODO LIST
let listOfTasks = document.querySelector(".listOfTasks");
let todoInput = document.querySelector(".todoInput");
let noNameAlert = document.querySelector(".noNameAlert")
let addTaskBtn = document.querySelector(".addTaskBtn");
let newTask;
let tools = document.querySelector(".tools");
let btnComplete = document.querySelector(".btnComplete");
let btnEdit = document.querySelector(".btnEdit");
let btnDelete = document.querySelector("btnDelete");
let iconComplete;
let iconDelete;
let removeTask;
let popup = document.querySelector(".popup");
let popupAccept = document.querySelector(".popupAccept");
let popupCancel = document.querySelector(".popupCancel");
let noTaskAlert = document.querySelector(".noTaskAlert");
let taskQuantity;
let popupInput = document.querySelector(".popupInput");
let taskId = 2;
let taskUnderEdit;
let noInputNameAlert = document.querySelector(".noInputNameAlert");

//Weather
let apiKey = "&APPID=1449243495e60a1a57654bfb6ce2b822";
let cityTyped = document.querySelector(".cityTyped");
cityTyped.value = "Kielce";
let apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
let weatherCity;
let url;
let units = "&units=metric";
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let weatherSend = document.querySelector(".weatherSend");
let weather = document.querySelector(".weather");
let cityName = document.querySelector(".cityName");
let photo = document.querySelector(".photo");
let weatherError = document.querySelector(".weatherError");

//TODOLIST

const addNewTask = () => {
    if (todoInput.value !== "") {
        newTask = document.createElement("li");
        newTask.setAttribute("id", taskId);
        taskId++;
        newTask.innerText = todoInput.value;
        newTask.className = "listItem";
        listOfTasks.appendChild(newTask);

        //Add tools to the button
        tools = document.createElement("div");
        tools.className = "tools";
        iconComplete = document.createElement("i");
        iconDelete = document.createElement("i");
        newTask.appendChild(tools);

        btnComplete = document.createElement("button");
        btnComplete.className = "btnComplete";
        tools.appendChild(btnComplete);
        btnComplete.appendChild(iconComplete);
        iconComplete.className = "fas fa-check";

        btnEdit = document.createElement("button");
        btnEdit.className = "btnEdit";
        btnEdit.innerText = "Edit";
        tools.appendChild(btnEdit);

        btnDelete = document.createElement("button");
        btnDelete.className = "btnDelete";
        tools.appendChild(btnDelete);
        btnDelete.appendChild(iconDelete);
        iconDelete.className = "fas fa-times";

        taskQuantity = document.querySelector(".listOfTasks").getElementsByTagName("li").length;
        taskAlert();
        noNameAlert.style.display = "none";

        }
    else {
            noNameAlert.style.display = "flex";
        }
};

const checkTodo = (e) => {
    if (e.target.closest("button").classList.contains("btnComplete")){
        e.target.closest("li").classList.toggle("liCompleted");
        e.target.closest("button").classList.toggle("btnCompleted");
    }
    else if (e.target.closest("button").className === "btnEdit") {
        openPopUp(e);
    }
    else if (e.target.closest("button").className === "btnDelete"){
        removeTaskFunction(e);
        taskQuantity = document.querySelector(".listOfTasks").getElementsByTagName("li").length;
        taskAlert();
    }
};
const removeTaskFunction = (e) => {
    const removeTodo = e.target.closest("li");
    removeTodo.remove();
};

const openPopUp = (e) => {
    popup.style.display = "flex";
    const beforeEdit = e.target.closest("li").id;
    taskUnderEdit = document.getElementById(beforeEdit);
    popupInput.value = taskUnderEdit.firstChild.textContent;
}

const closePopUp = () => {
    popup.style.display = "none";
}

const acceptPopUp = () => {
    if (popupInput.value !== "") {
        popup.style.display = "none";
        taskUnderEdit.firstChild.textContent = popupInput.value;
        noInputNameAlert.style.display = "none";
}
    else {
        noInputNameAlert.style.display = "flex";
    }
}

const taskAlert = () => {
    if (taskQuantity === 0){
      noTaskAlert.style.display = "flex";
    }
    else{
      noTaskAlert.style.display = "none";
    }
}

addTaskBtn.addEventListener("click", addNewTask);
listOfTasks.addEventListener("click", checkTodo);
popupCancel.addEventListener("click", closePopUp);
popupAccept.addEventListener("click", acceptPopUp);

//WEATHER

const getWeather = () => {
    weatherCity = cityTyped.value;
    url = apiLink + weatherCity + apiKey + units;
    axios.get(url)
    .then (res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const whatWeather = Object.assign({}, ...res.data.weather);

        temperature.textContent = Math.floor(temp) + `°C`;
        humidity.textContent = hum + `%`;
        weather.textContent = whatWeather.main;
        cityName.textContent = cityTyped.value;

        weatherError.textContent = "";
        weatherError.style.visibility = "hidden";

        if ( whatWeather.id >= 200 && whatWeather.id <300)
            photo.src = "weather/thunderstorm.png";
        else if ( whatWeather.id >=300 && whatWeather.id <400) 
            photo.src = "weather/drizzle.png";
        else if ( whatWeather.id >=500 && whatWeather.id <600)
            photo.src = "weather/rain.png";
        else if ( whatWeather.id >=600 && whatWeather.id <700)
            photo.src = "weather/ice.png";
        else if ( whatWeather.id >=700 && whatWeather.id <800) 
            photo.src = "weather/fog.png";
        else if ( whatWeather.id ===800) 
            photo.src = "weather/sun.png";
        else if ( whatWeather.id >=801 && whatWeather.id <900) 
            photo.src = "weather/cloud.png";
        else 
            photo.src = "weather/unknown.png";
  })
  .catch(() => {
      weatherError.textContent = "Insert correct city name!";
      weatherError.style.visibility = "visible";
    });
};

weatherSend.addEventListener("click", getWeather);
getWeather();
