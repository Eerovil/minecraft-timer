console.log("Hello world")
window.noSleep = new NoSleep();

const start = (time) => {
    time = time;
    try {
        time = time || parseInt(document.getElementById("time").value)
    } catch (error) {
        alert("Please enter a valid number")
        return
    }
    console.log("Started with time: ", time);

    if (time > 10) {
        if (time >= 60) {
            setScale(0.43)
        } else if (time >= 45) {
            setScale(0.5)
        } else if (time >= 30) {
            setScale(0.55)
        } else {
            setScale(0.7)
        }
    } else {
        setScale(1);
    }

    showInput(false);
    createItems(time * 6);
    startTimer(time);
    noSleep.enable();
}

const setScale = (scale) => {
    window.scale = scale;
    console.log("Setting scale to: ", scale)
    // Set --scale to scale
    document.documentElement.style.setProperty('--scale', scale);
}

const stop = () => {
    clearInterval(window.timer);
    showInput(true);
    noSleep.disable();
    // Delete the element
    const container = document.getElementById("items");
    document.body.removeChild(container);
}

const showInput = (show) => {
    const input = document.getElementById("input");
    if (show) {
        input.style.display = "block";
    } else {
        input.style.display = "none";
    }
}

const createItems = (count) => {
    const oldContainer = document.getElementById("items");
    if (oldContainer) {
        // Delete the element
        document.body.removeChild(oldContainer);
    }

    const container = document.createElement("div");
    container.id = "items";
    container.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.classList.add("pixelated")
        item.innerHTML = "";
        container.appendChild(item);
    }
    const player = document.createElement("div");
    player.id = "player";
    player.classList.add("pixelated")
    player.classList.add("flipH")
    container.appendChild(player);
    document.body.appendChild(container);
}

const updateTimer = () => {
    window.timeLeft--;
    const timeLeftEl = document.getElementById("time-left");
    // Update time left as mm:ss
    const minutes = Math.floor((window.timeLeft % 3600) / 60);
    const seconds = window.timeLeft % 60;
    timeLeftEl.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (window.timeLeft <= 0) {
        stop();
        return;
    }
    // Find current item. (get modulo 10 of timeLeft)
    const items = document.getElementsByClassName("item");
    const currentItemIndex = items.length - parseInt(window.timeLeft / 10) - 1
    const prevIndex = window.currentItemIndex;
    if (prevIndex == currentItemIndex) {
        return;
    }
    window.currentItemIndex = currentItemIndex;
    // All items before current item should be hidden
    for (let i = 0; i < currentItemIndex; i++) {
        items[i].classList.add("hidden");
        items[i].classList.remove("current");
    }
    // current item has class "current"
    items[currentItemIndex].classList.add("current");

    // Move player to current item
    const player = document.getElementById("player");
    const scale = window.scale || 1;
    player.style.left = items[currentItemIndex].offsetLeft - (50 * scale) + "px";
    player.style.top = items[currentItemIndex].offsetTop - (10 * scale) + "px";
}

const startTimer = (time) => {
    if (window.timer) {
        clearInterval(window.timer);
    }
    window.timeLeft = time * 60;
    updateTimer();
    window.timer = setInterval(updateTimer, 1000);
}