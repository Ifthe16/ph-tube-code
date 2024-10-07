console.log('video script added');

function getTimeString(time) {
    // get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
}

// 1 - Fetch, Load and Show Categories on html

// create loadCategories
const loadCategories = () => {

    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        // .then((data) => console.log(data.categories))
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

// create loadVideos
const loadVideos = () => {

    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        // .then((data) => console.log(data.categories))
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));
};

const loadCategoryVideos = (id) => {
    // alert(id);
    // fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            // sobaike active class remove korao
            removeActiveClass();
            // id er class k active korao
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn);
            activeBtn.classList.add("active");
            displayVideos(data.category)
        })
        .catch((error) => console.log(error));
}

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);
        //create a button 

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class ="btn category-btn">${item.category}</button>
        `

        // add button to category container
        categoryContainer.append(buttonContainer);
    });
};

// create displayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="assets/Icon.png"/>
    <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
    </div>
    `;
        return;
    }
    else {
        videoContainer.classList.add('grid');
    }

    videos.forEach(video => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
         <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail} class="h-full w-full object-cover" />

      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-8 bg-black rounded p-1 text-white text-xs">${getTimeString(video.others.posted_date)}</span>`
            }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
   <div>
   <img class="w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture}/>
   </div>
   <div>
   <h2 class="font-bold">${video.title}</h2>
  <div class="flex items-center gap-2">
  <p class="text-gray-400">${video.authors[0].profile_name}</p>
  ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /> ` : ""}
  </div>
   <p> </p>
   </div>
  </div>
        `;
        videoContainer.append(card);
    });
}
loadCategories();
loadVideos();
