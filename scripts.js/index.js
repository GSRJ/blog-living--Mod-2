import { getBlog } from "./request.js";

const observedNews = document.querySelector(".observedNews");
const topButton = document.querySelector(".topButton");
let page = -1;
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
        window.location.reload();
      });
    });

    categoryButtons.forEach((button) => {
      if (button.id === newsCategory) {
        button.parentElement.classList.add("active");
      }
    });
  }

  renderCategories();

  function renderNews(page, category) {
    if (
      category === undefined ||
      category === "" ||
      category === "Todos" ||
      category === null
    ) {
      allNews[page].forEach((news) => {
        observedNews.insertAdjacentHTML(
          "beforebegin",
          `
            <div class="news">
                <img src="${news.image}" alt="${news.title}" />
                <div class="newsContent">
                <h2>${news.title}</h2>
                <p>${news.description}</p>
                <span class="accessNews" id="${news.id}">Acessar conteúdo</span>
          </div>`
        );
      });
      topButton.addEventListener("click", () => {
        window.location.reload();
      });
    } else {
      observer.disconnect();
      allNews.flat().forEach((news) => {
        if (news.category === category) {
          observedNews.insertAdjacentHTML(
            "beforebegin",
            `
            <div class="news">
                <img src="${news.image}" alt="${news.title}" />
                <div class="newsContent">
                <h2>${news.title}</h2>
                <p>${news.description}</p>
                <span class="accessNews" id="${news.id}">Acessar conteúdo</span>
          </div>`
          );
        }
      });
    }
    const accessNews = document.querySelectorAll(".accessNews");
    accessNews.forEach((news) => {
      news.addEventListener("click", (e) => {
        localStorage.setItem("newsId", e.target.id);
        window.location.href = "../pages/post.html";
      });
    });
  }
  let observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        page++;
        renderNews(page, newsCategory);
        if (page === 2) {
          observer.disconnect();
        }
      }
    },
    { threshold: 0.7 }
  );
  observer.observe(observedNews);
}

getNews();
