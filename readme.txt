let keywords = ["Katya Henry dating", "Katya Henry", "Katya Henry miami"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let googleInput = document.getElementsByName("q")[0];
let btnK = document.getElementsByName("btnK")[0];

if (btnK !== undefined) {
googleInput.value = keyword;
} else {
for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("fanbuzz.com")) {
    let link = links[i];
    console.log("find the site " + links[i]);
    link.click();
    break;
    }
}
}
function getRandom (min, max) {
return Math.floor(Math.random()*(max - min) + min);
}
