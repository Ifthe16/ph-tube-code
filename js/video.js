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

// create displayCategories
const displayCategories = (data) => {
    console.log(data);
};
loadCategories();

