console.log("Hello world")

const start = () => {
    let time = 0;
    try {
        time = parseInt(document.getElementById("time").value)
    } catch (error) {
        alert("Please enter a valid number")
        return
    }
    console.log("Started with time: ", time);

    showInput(false);
    createItems(time * 6);
    startTimer(time);
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
    if (window.timeLeft <= 0) {
        clearInterval(window.timer);
        alert("Time is up!");
        showInput(true);
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
    player.style.left = items[currentItemIndex].offsetLeft - 50 + "px";
    player.style.top = items[currentItemIndex].offsetTop -10 + "px";
}

const startTimer = (time) => {
    if (window.timer) {
        clearInterval(window.timer);
    }
    window.timeLeft = time * 60;
    window.timer = setInterval(updateTimer, 1000);
}