let darkThemeToggle = document.getElementById("icon");
let loadMoreButton = document.getElementById("load");
let iconSwap = document.getElementById("icon_swap");
let dynamicMap = document.querySelector(".post_container");
const cardSizes = ["card_small", "card_medium", "card_large"];
var globalLoadVar = 0;

// DarkMode Toggle Function
darkThemeToggle.onclick = function () {
    document.body.classList.toggle("dark_theme");

    if (document.body.classList.contains("dark_theme")) {
        iconSwap.classList.remove("fa-solid");
        iconSwap.classList.remove("fa-moon");
        iconSwap.classList.add("fa-regular");
        iconSwap.classList.add("fa-lightbulb");
    }
    else {
        iconSwap.classList.remove("fa-regular");
        iconSwap.classList.remove("fa-lightbulb");
        iconSwap.classList.add("fa-solid");
        iconSwap.classList.add("fa-moon");
    }
}


// Fetching and Appending Posts
fetch("./data.json")
    .then(res => res.json())
    .then(data => loadPosts(data))

const loadPosts = (data) => {
    for (let i = globalLoadVar; i <= globalLoadVar + 3; i++) {
        dynamicMap.innerHTML += `<div class="card ` + cardSizes[Math.floor(Math.random() * 3)] + `"
                                style="background: url(`+ data[i].image + `); background-size: cover;">
                                <p style="color: white; margin:10px; filter: drop-shadow(1px 1px 1px black);"><i class="fa-solid fa-heart"></i> `+ data[i].likes + `</p>
                                <img class="post_image" src="`+ data[i].image + `" style="display:none;"></div>`;

    }

    loadMoreButton.onclick = function () {
        if (globalLoadVar >= 15) {
            loadMoreButton.classList.add("disabled_load");
            console.log("'I'm afraid you've reached the end of your feed, friend.. I suggest you go outside and make some meaningful memories with the people you cherish close to your heart! Don't worry there'll always be new content ready for you to mindlessly scroll after. :)' -Martin")
        }
        else loadPosts(data);
    }

    globalLoadVar += 4;

    // Popup Image Function when clicking on a post
    document.querySelectorAll('.post_container .card').forEach(image => {
        image.onclick = () => {
            let formatedImg = image.style.backgroundImage;
            formatedImg = formatedImg.replace(/(url\(|\)|")/g, '');

            document.querySelector('.popup_post').style.display = 'block';
            document.querySelector('.popup_post img').src = formatedImg;
        }
    })

    document.querySelector('.popup_post span').onclick = () => {
        document.querySelector('.popup_post').style.display = 'none';
    }
}



