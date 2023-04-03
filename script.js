//Create an empty array
let data = [];

//get all
const buttons = document.querySelectorAll(".activity-tracker-option");

//activate clicked button
const activateClickedButton = (button) => {
  buttons.forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
};

//Import dataset
const loadData = async () => {
  // Fetch data
  const response = await fetch("./asset/data.json");
  const fetchedData = await response.json();
  data = fetchedData;
  buttons[1].click();
};

//clear html pages
const clearActivities = () => {
  //clear all html activities
  const activities = document.querySelectorAll(".activity-tracker-activity");
  activities.forEach((a) => a.remove());
};

//render data
const renderCards = (clickedOption) => {
  //activate/call clear html function
  clearActivities();

  const activityTracker = document.querySelector("section.activity-tracker");

  const calcTimeframe = (option) => {
    if (option === "daily") {
      return "Yesterday";
    } else if (option === "weekly") {
      return "Last Week";
    } else if (option === "monthly") {
      return "Last Month";
    }
  };

  //run forEach loop
  data.forEach((activity) => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(" ", "-");
    const timeframeData = activity.timeframes[clickedOption];
    const previousTimeframe = calcTimeframe(clickedOption);
    const section = document.createElement("section");
    section.classList.add("activity-tracker-activity", activityClass);
    const stringToInject = `
    <div class="activity-background">
    <img src="./images/icon-${activityClass}.svg" alt="" />
  </div>
  <div class="activity-info">
    <header class="activity-header">
      <h2 class="activity-name">${name}</h2>
      <div class="activity-options">
        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
            fill="#BBC0FF"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </header>
    <div class="activity-timeframes">
      <h3 class="activity-current-timeframe">${timeframeData.current}hrs</h3>
      <div class="activity-previous-timeframe">
        <p class="time-window">${previousTimeframe}</p>
        <p>-</p>
        <p class="time">${timeframeData.previous}hrs</p>
      </div>
    </div>
  </div> 
    `;
    section.innerHTML = stringToInject;
    activityTracker.append(section);
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activateClickedButton(button);
    const clickedOption = button.dataset.option;
    renderCards(clickedOption);
  });
});

// buttons[1].click();
//call loaded data
loadData();
