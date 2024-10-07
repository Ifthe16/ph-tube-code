console.log('video script added');
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

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach((item) => {
        console.log(item);
        //create a button 

        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;

        // add button to category container
        categoryContainer.append(button);
    });
};

// create displayVideos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach(video => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
         <figure>
    <img
      src=${video.thumbnail} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
        `;
        videoContainer.append(card);
    });
}
loadCategories();
loadVideos();
