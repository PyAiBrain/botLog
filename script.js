document.addEventListener("DOMContentLoaded", () => {
  const logDisplay = document.getElementById("log-display")
  const lastReminder = document.getElementById("last-reminder")
  const lastAction = document.getElementById("last-action")
  const lastLogEntry = document.getElementById("last-log-entry")

  function update() {
    // Sample log data (replace this with your actual log data)
    fetch("./bot.log")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((data) => {
        const logData = data
        displayLog(logData)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error)
        logDisplay.textContent = "Error loading log data"
      })
  }

  // Function to parse and display log entries
  function displayLog(log) {
    const lines = log.split("\n")
    let lastReminderText = ""
    let lastActionText = ""

    logDisplay.innerHTML = "" // Clear existing log entries

    lines.forEach((line) => {
      const [date, time, level, bot, ...message] = line.split(/\s+/)
      const logEntry = document.createElement("div")
      logEntry.classList.add("log-entry")

      const dateSpan = document.createElement("span")
      dateSpan.classList.add("log-date")
      dateSpan.textContent = `${date} ${time} `
      logEntry.appendChild(dateSpan)

      const levelSpan = document.createElement("span")
      levelSpan.classList.add(`log-type-${level}`)
      levelSpan.textContent = `${level} `
      logEntry.appendChild(levelSpan)

      const botSpan = document.createElement("span")
      botSpan.classList.add("log-bot")
      botSpan.textContent = `${bot} `
      logEntry.appendChild(botSpan)

      const messageSpan = document.createElement("span")
      messageSpan.classList.add("log-message")
      messageSpan.textContent = message.join(" ")
      logEntry.appendChild(messageSpan)

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
  }
  update()
})

