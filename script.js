const textarea = document.querySelector("textarea");
const wordCountDisplay = document.querySelector(".word-count");
const timeLeftDisplay = document.querySelector(".time-left");

let minuteInterval = null;
let secondInterval = null;

textarea.addEventListener("input", () => {
  textAreaAdjust(textarea);
  const text = textarea.value.trim();
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  wordCountDisplay.textContent = `Words: ${wordCount}`;
});

let showTimeLeft = (expiryTime) => {
  const currentTime = new Date();

  // Find time difference between expiry time and current time
  const timeLeft = new Date(
    expiryTime - currentTime + currentTime.getTimezoneOffset() * 60 * 1000,
  );

  // Get the hours, minutes, and seconds
  const hours = timeLeft.getHours();
  const minutes = timeLeft.getMinutes();
  if (minutes <= 5) {
    clearInterval(minuteInterval);
    timeLeftDisplay.style.color = "red";

    showSecondsLeft(expiryTime);
    secondInterval = setInterval(showSecondsLeft, 1000, expiryTime);
  } else {
    timeLeftDisplay.textContent = `${minutes} minutes remaining`;
  }
};

let showSecondsLeft = (expiryTime) => {
  const currentTime = new Date();
  // Find time difference between expiry time and current time
  const timeLeft = new Date(
    expiryTime - currentTime + currentTime.getTimezoneOffset() * 60 * 1000,
  );

  // Get the hours, minutes, and seconds
  const minutes = timeLeft.getMinutes();
  const seconds = timeLeft.getSeconds();

  timeLeftDisplay.textContent = `${minutes} minutes ${seconds} seconds remaining`;
};

let textAreaAdjust = (element) => {
  element.style.height = "1px";
  element.style.height = 30 + element.scrollHeight + "px";
};

let startTimer = (element) => {
  // Set expiry time to 40 minutes from now
  let expiryTime = new Date(new Date().getTime() + 40 * 60 * 1000 + 1 * 1000);

  if (minuteInterval) {
    clearInterval(minuteInterval);
  }

  if (secondInterval) {
    clearInterval(secondInterval);
  }

  showTimeLeft(expiryTime);
  minuteInterval = setInterval(showTimeLeft, 60000, expiryTime);
  element.textContent = "Restart";
};

const onSubmit = () => {
  const newTopic = document.querySelector("#change-topic").value.trim();

  const lines = newTopic.split("\n");
  const task = document.querySelector(".editable-topic");

  task.innerHTML = formatlines(lines);

  document.querySelector("#change-topic").value = "";
  toggleEditTopic();
};

const formatlines = (lines) => {
  let formattedLines = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => `<p class="task-details">${line}</p>`);

  // Join the formatted lines
  return formattedLines.join("\n");
};

const toggleEditTopic = () => {
  const task = document.querySelector(".edit-topic");
  const expand = document.querySelector("#expand");
  if (task.style.display === "none") {
    task.style.display = "flex";
    expand.innerHTML = `<i class="fa fa-compress"></i>`;
  } else {
    task.style.display = "none";
    expand.innerHTML = `<i class="fa fa-pencil-square-o"></i>`;
  }
};

const copyToClipboard = () => {
  const topicTitle = document
    .querySelector(".editable-topic")
    .textContent.split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
  const response = document.querySelector("#response").value;

  // Copy the text to the clipboard
  navigator.clipboard.writeText(`${topicTitle}\n\nResponse:\n${response}`);
};

textAreaAdjust(textarea);
