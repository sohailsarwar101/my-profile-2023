// Fetch Reading List
async function myBookmarks() {
    const requestURL = './database/bookmarks.json?v=0.013';
    const request = new Request(requestURL);
    const response = await fetch(request);
    const data = await response.json();
    bookmarkData(data);
}

function bookmarkData(obj) {

    var filterTag = "";
    document.querySelector("#filterList").addEventListener("change", function() {
        filterTag = this.value;
        //console.log(filterTag);
        document.getElementById("bookmarks").innerHTML ="";
        appendList();
    });

    function appendList() {
        if (filterTag === "") {
        var links = obj['bookmarks'];
        } else {
            var links = obj['bookmarks'].filter(({tag}) => tag === filterTag);
        }

        for (const link of links) {

            let getlink = link.url;
            let domain = (new URL(getlink)).hostname.replace('www.','');

            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <a href= "${link.url}" target="blank">
                <h2>${link.title}</h2>
                <span><img src="https://www.google.com/s2/favicons?domain=${domain}" alt=""> ${domain}</span>
                <svg id="link_icon" viewBox="0 0 15 15" width="15" height="15"><use xlink:href="#link_arrow"></use></svg>
            </a>
            `;

            let outLink = document.getElementById("bookmarks");

            outLink.appendChild(listItem);
        }  

    }
    appendList();
     
}

myBookmarks();

// Drage to Scroll Image Slider
document.querySelectorAll('.slider_inner').forEach(item => {
    let slider = item;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
        //console.log(walk);
    });
});


// Click to Copy Email 
let mail_el = document.querySelector('#copy_email');
let my_email = mail_el.getAttribute('name');
mail_el.addEventListener("click", () => {
    navigator.clipboard.writeText(my_email);
    mail_el.innerHTML = "Email copied"

    setTimeout(
        () => {
            mail_el.innerHTML = "Copy email";
        }, 3000
    );
});


// Animate Footer Block
const element = document.querySelector('footer');
const observer = new IntersectionObserver(entries => {
    element.classList.toggle( 'animate', entries[0].isIntersecting );
});
observer.observe(element);

// Javascript for theme Switcher
document.documentElement.classList.remove("no-js");const STORAGE_KEY="user-color-scheme",COLOR_MODE_KEY="--color-mode",modeToggleButton=document.querySelector(".js-mode-toggle"),modeToggleText=document.querySelector(".js-mode-toggle-text"),getCSSCustomProp=e=>{let t=getComputedStyle(document.documentElement).getPropertyValue(e);return t.length&&(t=t.replace(/\'|"/g,"").trim()),t},applySetting=e=>{let t=e||localStorage.getItem(STORAGE_KEY);t?(document.documentElement.setAttribute("data-user-color-scheme",t),setButtonLabelAndStatus(t)):setButtonLabelAndStatus(getCSSCustomProp("--color-mode"))},toggleSetting=()=>{let e=localStorage.getItem(STORAGE_KEY);switch(e){case null:e="dark"===getCSSCustomProp("--color-mode")?"light":"dark";break;case"light":e="dark";break;case"dark":e="light"}return localStorage.setItem(STORAGE_KEY,e),e},setButtonLabelAndStatus=e=>{modeToggleText.innerText=`Enable ${"dark"===e?"light":"dark"} Mode`};modeToggleButton.addEventListener("click",e=>{e.preventDefault(),applySetting(toggleSetting())}),applySetting();
