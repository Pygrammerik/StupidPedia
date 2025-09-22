// StupidPedia Application Logic

// Data from the provided JSON
const siteData = {
  categories: {
    "Животные": ["Собака", "Кот", "Корова", "Лошадь", "Свинья", "Курица", "Утка", "Гусь", "Овца", "Коза", "Медведь", "Волк", "Лиса", "Заяц", "Белка", "Ёж", "Лев", "Тигр", "Слон", "Жираф", "Зебра", "Обезьяна", "Кенгуру", "Пингвин", "Попугай", "Орёл", "Сова", "Воробей", "Голубь", "Ворона", "Синица", "Ласточка", "Дятел", "Кукушка", "Соловей"],
    "Растения": ["Арбуз", "Дыня", "Яблоко", "Груша", "Банан", "Апельсин", "Лимон", "Вишня", "Слива", "Персик", "Абрикос", "Виноград", "Клубника", "Малина", "Черника", "Смородина", "Крыжовник", "Роза", "Тюльпан", "Нарцисс", "Ромашка", "Подсолнух", "Одуванчик", "Фиалка", "Лилия", "Дуб", "Береза", "Сосна", "Ель", "Клен", "Липа", "Ива", "Тополь", "Каштан", "Рябина"],
    "Предметы": ["Стол", "Стул", "Кровать", "Диван", "Шкаф", "Окно", "Дверь", "Лампа", "Телевизор", "Холодильник", "Плита", "Микроволновка", "Утюг", "Пылесос", "Стиральная машина", "Компьютер", "Телефон", "Часы", "Книга", "Ручка", "Карандаш", "Тетрадь", "Линейка", "Ножницы", "Молоток", "Отвертка", "Гвоздь", "Винт", "Болт", "Гайка", "Пила", "Топор", "Лопата", "Грабли", "Ведро"],
    "Еда": ["Хлеб", "Молоко", "Масло", "Сыр", "Творог", "Сметана", "Кефир", "Йогурт", "Мясо", "Колбаса", "Ветчина", "Рыба", "Икра", "Яйцо", "Рис", "Гречка", "Макароны", "Картофель", "Морковь", "Лук", "Чеснок", "Помидор", "Огурец", "Капуста", "Свекла", "Редиска", "Салат", "Укроп", "Петрушка", "Соль", "Сахар", "Мед", "Варенье", "Конфеты", "Торт"],
    "Транспорт": ["Машина", "Автобус", "Трамвай", "Троллейбус", "Поезд", "Самолет", "Вертолет", "Корабль", "Лодка", "Яхта", "Велосипед", "Мотоцикл", "Скутер", "Метро", "Такси", "Грузовик", "Фургон", "Трактор", "Экскаватор", "Бульдозер", "Кран", "Пожарная машина", "Скорая помощь", "Полицейская машина", "Снегоуборочная машина"],
    "Природа": ["Солнце", "Луна", "Звезда", "Облако", "Дождь", "Снег", "Ветер", "Гром", "Молния", "Радуга", "Туман", "Роса", "Иней", "Лед", "Река", "Озеро", "Море", "Океан", "Гора", "Холм", "Долина", "Лес", "Поле", "Луг", "Пустыня", "Остров", "Пляж", "Берег", "Камень", "Песок", "Глина", "Земля"],
    "Технологии": ["Компьютер", "Планшет", "Смартфон", "Интернет", "Сайт", "Программа", "Приложение", "Игра", "Видео", "Фото", "Музыка", "Файл", "Папка", "Диск", "Флешка", "Клавиатура", "Мышь", "Монитор", "Принтер", "Сканер", "Роутер", "Камера", "Микрофон", "Наушники", "Колонки"]
    "Каучук синтетический бутадиен-стирольный СКС-30": ["Каучук синтетический бутадиен-стирольный СКС-30"]
  }
};

// Get all articles with their categories
function getAllArticles() {
  const articles = {};
  Object.entries(siteData.categories).forEach(([category, items]) => {
    items.forEach(item => {
      articles[item] = {
        title: item,
        definition: `${item} - Это ${item.toLowerCase()}`,
        category: category
      };
    });
  });
  return articles;
}

// Application state
const appState = {
  currentPage: 'landing',
  currentArticle: null,
  currentCategory: null,
  allArticles: getAllArticles(),
  featuredArticle: null
};

// DOM elements
let elements = {};

// Navigation functions
function showLandingPage() {
  console.log('Showing landing page');
  document.getElementById('landing-page').style.display = 'flex';
  document.getElementById('main-page').classList.add('hidden');
  appState.currentPage = 'landing';
}

function showMainPage() {
  console.log('Showing main page');
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('main-page').classList.remove('hidden');
  showHomeContent();
  appState.currentPage = 'main';
}

function showHomeContent() {
  console.log('Showing home content');
  if (elements.homeContent) elements.homeContent.classList.remove('hidden');
  if (elements.articleContent) elements.articleContent.classList.add('hidden');
  if (elements.categoryContent) elements.categoryContent.classList.add('hidden');
}

function showArticle(articleTitle) {
  console.log('Showing article:', articleTitle);
  const article = appState.allArticles[articleTitle];
  if (!article) {
    console.error('Article not found:', articleTitle);
    return;
  }

  appState.currentArticle = article;
  
  // Update article page content
  if (elements.articleTitle) elements.articleTitle.textContent = article.title;
  if (elements.articleDefinition) elements.articleDefinition.textContent = article.definition;
  if (elements.articleCategory) elements.articleCategory.textContent = article.category;
  
  // Update category link
  if (elements.articleCategoryLink) {
    elements.articleCategoryLink.onclick = function(e) {
      e.preventDefault();
      showCategory(article.category);
    };
  }
  
  // Generate related articles (same category, random selection)
  const relatedArticles = siteData.categories[article.category]
    .filter(title => title !== article.title)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
  
  if (elements.relatedLinks) {
    elements.relatedLinks.innerHTML = '';
    relatedArticles.forEach((title, index) => {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = title;
      link.onclick = function(e) {
        e.preventDefault();
        showArticle(title);
      };
      elements.relatedLinks.appendChild(link);
      
      // Add separator except for last item
      if (index < relatedArticles.length - 1) {
        elements.relatedLinks.appendChild(document.createTextNode(' • '));
      }
    });
  }

  // Show article content
  if (elements.homeContent) elements.homeContent.classList.add('hidden');
  if (elements.articleContent) elements.articleContent.classList.remove('hidden');
  if (elements.categoryContent) elements.categoryContent.classList.add('hidden');
}

function showCategory(categoryName) {
  console.log('Showing category:', categoryName);
  appState.currentCategory = categoryName;
  
  const articles = siteData.categories[categoryName] || [];
  
  // Update category page content
  if (elements.categoryTitle) elements.categoryTitle.textContent = `Категория:${categoryName}`;
  if (elements.categoryDescription) elements.categoryDescription.textContent = `Статьи в категории "${categoryName}":`;
  
  if (elements.categoryArticles) {
    elements.categoryArticles.innerHTML = '';
    
    articles.forEach(articleTitle => {
      const articleEl = document.createElement('div');
      articleEl.className = 'category-article-item';
      articleEl.innerHTML = `<h3>${articleTitle}</h3>`;
      articleEl.onclick = function() {
        showArticle(articleTitle);
      };
      elements.categoryArticles.appendChild(articleEl);
    });
  }

  // Show category content
  if (elements.homeContent) elements.homeContent.classList.add('hidden');
  if (elements.articleContent) elements.articleContent.classList.add('hidden');
  if (elements.categoryContent) elements.categoryContent.classList.remove('hidden');
}

// Search functionality
function performSearch(query) {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  Object.keys(appState.allArticles).forEach(title => {
    if (title.toLowerCase().includes(lowerQuery)) {
      results.push(title);
    }
  });
  
  return results.slice(0, 10);
}

function showSearchSuggestions(suggestions, inputElement) {
  const suggestionsEl = document.getElementById('search-suggestions');
  if (!suggestionsEl) return;
  
  suggestionsEl.innerHTML = '';
  
  if (suggestions.length === 0) {
    suggestionsEl.classList.remove('show');
    return;
  }
  
  suggestions.forEach(suggestion => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    item.textContent = suggestion;
    item.onclick = function() {
      inputElement.value = '';
      suggestionsEl.classList.remove('show');
      showArticle(suggestion);
    };
    suggestionsEl.appendChild(item);
  });
  
  suggestionsEl.classList.add('show');
}

function hideSearchSuggestions() {
  setTimeout(() => {
    const suggestionsEl = document.getElementById('search-suggestions');
    if (suggestionsEl) {
      suggestionsEl.classList.remove('show');
    }
  }, 200);
}

// Random article function
function showRandomArticle() {
  console.log('Showing random article');
  const allTitles = Object.keys(appState.allArticles);
  const randomTitle = allTitles[Math.floor(Math.random() * allTitles.length)];
  showArticle(randomTitle);
}

// Initialize featured article
function initializeFeaturedArticle() {
  const featuredArticles = ['Арбуз', 'Собака', 'Компьютер', 'Солнце', 'Хлеб'];
  const randomFeatured = featuredArticles[Math.floor(Math.random() * featuredArticles.length)];
  const article = appState.allArticles[randomFeatured];
  
  if (article && elements.featuredTitle && elements.featuredDefinition) {
    appState.featuredArticle = article;
    elements.featuredTitle.textContent = article.title;
    elements.featuredDefinition.textContent = article.definition;
  }
}

// Initialize application
function initializeApp() {
  console.log('Initializing StupidPedia');
  
  // Get DOM elements
  elements = {
    landingPage: document.getElementById('landing-page'),
    mainPage: document.getElementById('main-page'),
    homeContent: document.getElementById('home-content'),
    articleContent: document.getElementById('article-content'),
    categoryContent: document.getElementById('category-content'),
    
    // Landing page elements
    landingSearchInput: document.getElementById('landing-search-input'),
    landingSearchBtn: document.getElementById('landing-search-btn'),
    
    // Main page elements
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-button'),
    wikiLogo: document.getElementById('wiki-logo'),
    
    // Article page elements
    articleTitle: document.getElementById('article-title'),
    articleDefinition: document.getElementById('article-definition'),
    articleCategory: document.getElementById('article-category'),
    articleCategoryLink: document.getElementById('article-category-link'),
    relatedLinks: document.getElementById('related-links'),
    backButton: document.getElementById('back-button'),
    
    // Category page elements
    categoryTitle: document.getElementById('category-title'),
    categoryDescription: document.getElementById('category-description'),
    categoryArticles: document.getElementById('category-articles'),
    backButtonCat: document.getElementById('back-button-cat'),
    
    // Featured article elements
    featuredTitle: document.getElementById('featured-title'),
    featuredDefinition: document.getElementById('featured-definition'),
    featuredLink: document.getElementById('featured-link')
  };

  // Log missing elements for debugging
  Object.entries(elements).forEach(([key, element]) => {
    if (!element) {
      console.warn(`Element not found: ${key}`);
    }
  });

  // Initialize featured article
  initializeFeaturedArticle();

  // Set up event listeners
  setupEventListeners();
  
  console.log('StupidPedia initialized successfully');
}

function setupEventListeners() {
  console.log('Setting up event listeners...');

  // Language links on landing page - all lead to main page
  document.querySelectorAll('.language-link').forEach((link, index) => {
    console.log(`Setting up language link ${index}`);
    link.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Language link clicked');
      showMainPage();
    });
  });

  // Project items on landing page
  document.querySelectorAll('.project-item').forEach((item, index) => {
    console.log(`Setting up project item ${index}`);
    item.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Project item clicked');
      showMainPage();
    });
  });

  // Landing search functionality
  if (elements.landingSearchInput) {
    elements.landingSearchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = this.value.trim();
        console.log('Landing search enter:', query);
        if (query) {
          const suggestions = performSearch(query);
          if (suggestions.length > 0) {
            showMainPage();
            setTimeout(() => {
              showArticle(suggestions[0]);
            }, 100);
          } else {
            showMainPage();
          }
        } else {
          showMainPage();
        }
      }
    });
  }

  if (elements.landingSearchBtn) {
    elements.landingSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const query = elements.landingSearchInput.value.trim();
      console.log('Landing search button clicked:', query);
      if (query) {
        const suggestions = performSearch(query);
        if (suggestions.length > 0) {
          showMainPage();
          setTimeout(() => {
            showArticle(suggestions[0]);
          }, 100);
        } else {
          showMainPage();
        }
      } else {
        showMainPage();
      }
    });
  }

  // Wiki logo click
  if (elements.wikiLogo) {
    elements.wikiLogo.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Wiki logo clicked');
      showHomeContent();
    });
  }

  // Navigation links in sidebar
  document.querySelectorAll('.nav-link').forEach((link, index) => {
    console.log(`Setting up nav link ${index}:`, link.getAttribute('data-action'));
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const action = this.getAttribute('data-action');
      console.log('Nav action:', action);
      
      switch(action) {
        case 'home':
          showHomeContent();
          break;
        case 'random':
          showRandomArticle();
          break;
        case 'all-articles':
          const categories = Object.keys(siteData.categories);
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          showCategory(randomCategory);
          break;
      }
    });
  });

  // Category links in sidebar
  document.querySelectorAll('.category-link').forEach((link, index) => {
    const category = link.getAttribute('data-category');
    console.log(`Setting up category link ${index}:`, category);
    link.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Category clicked:', category);
      showCategory(category);
    });
  });

  // Category items on home page
  document.querySelectorAll('.category-item').forEach((item, index) => {
    const category = item.getAttribute('data-category');
    console.log(`Setting up category item ${index}:`, category);
    item.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Category item clicked:', category);
      showCategory(category);
    });
  });

  // Featured article functionality
  if (elements.featuredTitle) {
    elements.featuredTitle.addEventListener('click', function(e) {
      e.preventDefault();
      if (appState.featuredArticle) {
        showArticle(appState.featuredArticle.title);
      }
    });
  }

  if (elements.featuredLink) {
    elements.featuredLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (appState.featuredArticle) {
        showArticle(appState.featuredArticle.title);
      }
    });
  }

  // Back buttons
  if (elements.backButton) {
    elements.backButton.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back button clicked');
      showHomeContent();
    });
  }

  if (elements.backButtonCat) {
    elements.backButtonCat.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Back button cat clicked');
      showHomeContent();
    });
  }

  // Main search functionality
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', function(e) {
      const query = this.value;
      console.log('Search input:', query);
      if (query.length > 0) {
        const suggestions = performSearch(query);
        console.log('Search suggestions:', suggestions);
        showSearchSuggestions(suggestions, this);
      } else {
        hideSearchSuggestions();
      }
    });

    elements.searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = this.value.trim();
        console.log('Search enter:', query);
        if (query) {
          const suggestions = performSearch(query);
          if (suggestions.length > 0) {
            this.value = '';
            hideSearchSuggestions();
            showArticle(suggestions[0]);
          }
        }
      }
    });

    elements.searchInput.addEventListener('blur', hideSearchSuggestions);
  }

  if (elements.searchButton) {
    elements.searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      const query = elements.searchInput.value.trim();
      console.log('Search button clicked:', query);
      if (query) {
        const suggestions = performSearch(query);
        if (suggestions.length > 0) {
          elements.searchInput.value = '';
          hideSearchSuggestions();
          showArticle(suggestions[0]);
        }
      }
    });
  }

  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (elements.searchInput && searchSuggestions &&
        !elements.searchInput.contains(e.target) && 
        !searchSuggestions.contains(e.target)) {
      hideSearchSuggestions();
    }
  });

  console.log('Event listeners setup complete');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Make functions globally available for debugging
window.StupidPedia = {
  showArticle,
  showCategory,
  showRandomArticle,
  showMainPage,
  showLandingPage,
  performSearch,
  appState,
  siteData
};
