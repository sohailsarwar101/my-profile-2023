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



// document.querySelectorAll('.slider_inner').forEach(item => {
//     let slider = item;
//     let isDown = false;
//     let startX;
//     let scrollLeft;

//     slider.addEventListener('mousedown', (e) => {
//         isDown = true;
//         slider.style.cursor = 'grabbing';
//         startX = e.pageX - slider.offsetLeft;
//         scrollLeft = slider.scrollLeft;
//     });
//     slider.addEventListener('mouseleave', () => {
//         isDown = false;
//         slider.style.cursor = 'grab';
//     });
//     slider.addEventListener('mouseup', () => {
//         isDown = false;
//         slider.style.cursor = 'grab';
//     });
//     slider.addEventListener('mousemove', (e) => {
//         if (!isDown) return;
//         e.preventDefault();
//         const x = e.pageX - slider.offsetLeft;
//         const walk = (x - startX) * 3; //scroll-fast
//         slider.scrollLeft = scrollLeft - walk;
//         //console.log(walk);
//     });
// });


const slider = document.querySelector('.slider_inner');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});



// const scrollContainer = document.querySelector(".slider_inner");

// scrollContainer.addEventListener("wheel", (evt) => {
//     evt.preventDefault();
//     scrollContainer.scrollLeft += evt.deltaY;
// });