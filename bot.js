// ==UserScript==
// @name         Bing Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hiya!
// @author       Valentina
// @match        https://www.bing.com/*
// @match        https://www.audemarspiguet.com/*
// @match        https://www.britannica.com/*
// @match        https://ocr.ussailing.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
let sites = {
  "audemarspiguet.com":["Audemars Piguet the royal oak", "Audemars Piguet & Golf"],
  "britannica.com":["Biography of Edgar Dega", "Edgar Dega colour and line"],
  "ocr.ussailing.org":["US Open Sailing Series", "US Open sailing series long beach", "US Open Sailing Series Miami results"]
}

let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

let links = document.links;
let bingInput = document.getElementById("sb_form_q");
let button = document.getElementById("sb_form_go");

if (button !== undefined) {
  document.cookie = `site=${site}`;
}else if (location.hostname == "www.bing.com"){
  site = getCookie("site");
} else {
  site = location.hostname;
}


if (button !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      button.click();
    }
  }, 700);
} else if (location.hostname == site) {
  setInterval(() => {
    let index = getRandom(0, links.length);

    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    } else if (links[index].href.indexOf(site) !== -1){
      links[index].click();}
  }, getRandom(2000, 5000));
} else {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes(site)) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + links[i]);
      setTimeout(() => {
        link.click();
      }, getRandom(2000, 5000));

      break;
    }
  }
  if (document.querySelector("sb_pagS").innerText == "5") {
    nextBingPage = false;
    location.href = "https://www.bing.com/";
  }
  if (nextBingPage) {
    setTimeout(() => {
      pnnext.click();
    }, getRandom(3000, 7000));
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
