const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");

const userRep = document.querySelector(".user-rep");
const userImage = document.querySelector(".user-image");
const userName = document.querySelector(".user-name");
const userBio = document.querySelector(".user-bio");
const userLocation = document.querySelector(".user-location");

btnSearch.addEventListener("click", () => {
    if(+inputSearch.value == 0) return;
    if(inputSearch.value.split("/").join("") != inputSearch.value) return;
    if(userRep.firstElementChild) userRep.innerHTML = "";
    
    const url = `https://api.github.com/users/${inputSearch.value}`;

    fetch(url).then((data) => {
        if(data.status == 200) { 
            data.json()
                .then((data) => {
                    fetch(data.repos_url)
                        .then((data) => data.json())
                        .then((data) => {
                            for(let rep of data) {
                                const a = document.createElement("a");
                                a.className = "rep-link";
                                a.target = "_blank";
                                a.textContent = rep.name; 
                                a.href = rep.clone_url;
                                userRep.append(a);
                            }
                        });
                    setData(data);
                });
        } else if(data.status == 404) {
            userImage.src = "./img/user404.png"
            userName.textContent = "Not Found";
        } else if(data.status == 403) {
            userImage.src = "";
            userName.textContent = "Limit is exhausted";
        } else {
            userImage.src = "";
            userName.textContent = "Try later";
        }
        nullInfo();
    }).catch((error) => console.log(error));
});


function setData(data) {
    userImage.src = data.avatar_url;
    userName.textContent = data.login;
    userBio.textContent = data.bio;
    userLocation.textContent = data.location;
}

function nullInfo() {
    userBio.textContent = "";
    userLocation.textContent = "";
    userRep.innerHTML = "";
}