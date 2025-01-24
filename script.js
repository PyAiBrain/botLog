document.addEventListener("DOMContentLoaded", () => {
    const logDisplay = document.getElementById("log-display")
    const lastReminder = document.getElementById("last-reminder")
    const lastAction = document.getElementById("last-action")
    const lastLogEntry = document.getElementById("last-log-entry")
  
    function update() {
      // Sample log data (replace this with your actual log data)
      fetch('./bot.log')
        .then(response => response.text())
        .then(data => {
          const logData = data;
          displayLog(logData)
        }) #UPDATED
      }
  
    // Function to parse and display log entries
    function displayLog(log) {
      const lines = log.split("\n")
      let lastReminderText = ""
      let lastActionText = ""
  
      lines.forEach((line) => {
        const [timestamp, level, , ...message] = line.split(/\s+/)
        const logEntry = document.createElement("div")
        logEntry.classList.add("log-entry", level.toLowerCase())
        logEntry.textContent = line
        logDisplay.appendChild(logEntry)
  
        if (line.includes("created a reminder")) {
          lastActionText = `Reminder created: ${message.join(" ")}`
        } else if (line.includes("Reminder sent")) {
          lastReminderText = `${message.join(" ")}`
        }
      })
  
      // Update sidebar information
      if (lastReminderText) {
        lastReminder.textContent = lastReminderText
      }
      if (lastActionText) {
        lastAction.textContent = lastActionText
      }
      lastLogEntry.textContent = lines[lines.length - 1]
    };
    update()
  }
)
  
  