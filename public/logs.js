const handleCreateLogging = (time, level, message) => {
  const bgLevel = {
    "LOG": "bg-gray-200",
    "INFO": "bg-blue-200",
    "WARN": "bg-yellow-200",
    "ERROR": "bg-red-200"
  }
  const tr = document.createElement("tr");
  const tdTime = document.createElement("td");
  const tdMessage = document.createElement("td");
  const contentMessage = document.createElement("p");
  tdTime.textContent = `-> ${time}`;
  contentMessage.textContent = message;
  tdTime.setAttribute("class", "w-1/5 px-2");
  tdMessage.setAttribute("class", "w-4/5 px-2 py-2");
  contentMessage.setAttribute("class", "break-all");
  tdMessage.appendChild(contentMessage);
  tr.setAttribute("class", `${bgLevel[level]} border-b-2 border-neutral-600`);
  tr.appendChild(tdTime);
  tr.appendChild(tdMessage);
  return tr;
};

electronAPI.onSystemLogging((data) => {
  const MAX_LOGGING = 100;
  const [time, level, message] = data.split("&-&");
  if (!time ||!level ||!message) {
    return;
  }
  const tr = handleCreateLogging(time, level, message);
  const logContents = document.querySelectorAll("#logging-table > tr");
  const tbody = document.getElementById("logging-table"); 
  if (!logContents.length) {
    return tbody.appendChild(tr);
  }
  tbody.insertBefore(tr, tbody.firstChild);
  if (logContents.length >= MAX_LOGGING) {
    logContents[logContents.length - 1].remove();
  }
});