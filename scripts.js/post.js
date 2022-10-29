import { getBlogById } from "./request.js";

const homeButton = document.querySelector(".homeButton");
homeButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

async function renderPost() {
  const newsId = localStorage.getItem("newsId");
  const post = await getBlogById(newsId);
  const postTitle = document.querySelector(".postTitle");
  postTitle.innerText = post.title;

  const postDescription = document.querySelector(".postDescription");
  postDescription.innerText = post.description;

  const postImage = document.querySelector(".postImage");
  postImage.src = post.image;
  postImage.alt = post.title;

  const postContent = document.querySelector(".postContent");
  postContent.innerText = post.content;
}

renderPost();

import { getBlog } from "./request.js";

async function getNews() {
  let allNews = [];
  let newsCategory = localStorage.getItem("category");
  let blog;

  for (let i = 0; i < 3; i++) {
    blog = await getBlog(i);
    allNews.push(blog.news);
  }

  async function renderCategories() {
    // let allNews = [];
    const countNews = blog.count;
    const newsPerPage = 6;
    let getCategories = [];
    let AllCategories = [];
    let filteredsCategories = [];
    const navCategories = document.querySelector(".navCategories");

    for (let i = 0; i < countNews / newsPerPage; i++) {
      const iterateBlog = await getBlog(i);
      getCategories.push(iterateBlog.news.map((news) => news.category));
      allNews.push(iterateBlog.news);
    }

    AllCategories = getCategories.flat();
    filteredsCategories = [...new Set(AllCategories)];

    navCategories.insertAdjacentHTML(
      "beforeend",
      `
      <li class="navItem">
      <button class="categoryButton" id="Todos">Todos</button>
      </li>
    `
    );
    filteredsCategories.map((category) => {
      navCategories.insertAdjacentHTML(
        "beforeend",
        `
        <li class="navItem">
          <button class="categoryButton" id="${category}">${category}</button>
        </li>
      `
      );
    });

    const categoryButtons = document.querySelectorAll(".categoryButton");
    categoryButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        newsCategory = e.target.id;
        console.log(newsCategory);
        localStorage.setItem("category", newsCategory);
        window.location.href = "../index.html";
      });
    });
  }

  renderCategories();
}

getNews();
