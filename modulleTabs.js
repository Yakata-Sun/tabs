// Объявление константы TabsModule, которая будет хранить наш модуль вкладок.
// Это Immediately Invoked Function Expression (IIFE) - функция, которая выполняется сразу после объявления.
// IIFE создает приватную область видимости, предотвращая загрязнение глобального пространства имен.
const TabsModule = (function () {

  // --- Приватные переменные ---
  // Эти переменные доступны только внутри этого модуля.

  // Получаем все элементы с классом 'catalog_tab'.
  // Это кнопки или заголовки вкладок, на которые пользователь будет нажимать.
  const tabButtons = document.querySelectorAll('.catalog_tab');
  // Получаем все элементы с классом 'catalog_content'.
  // Это содержимое, которое будет отображаться при активации соответствующей вкладки.
  const tabContents = document.querySelectorAll('.catalog_content');

  // --- Функции модуля ---

  // Функция для установки начальной активной вкладки при загрузке страницы.
  function initActiveTab() {
    // Ищем элемент кнопки вкладки, который уже имеет класс 'catalog_tab_active'.
    // Это позволяет задать активную вкладку по умолчанию в HTML.
    const activeTab = document.querySelector('.catalog_tab_active');
    // Проверяем, был ли найден такой активный таб.
    if (activeTab) {
      // Извлекаем значение атрибута 'data-tab' из найденной активной кнопки.
      // Например, если HTML выглядит так: <div class="catalog_tab catalog_tab_active" data-tab="description">...</div>
      // то 'target' станет "description".
      const target = activeTab.dataset.tab;
      // Ищем соответствующий элемент контента по его атрибуту 'data-tab-id'.
      // Например, если 'target' - "description", то ищется элемент с data-tab-id="description".
      const content = document.querySelector(`[data-tab-id="${target}"]`);
      // Проверяем, был ли найден соответствующий контент.
      if (content) {
        // Добавляем класс 'catalog_content_active' к найденному элементу контента.
        // Этот класс, скорее всего, делает содержимое видимым (например, через CSS display: block;).
        content.classList.add('catalog_content_active');
      }
    }
  }

  // Функция для переключения вкладок при клике.
  // Принимает объект события click как аргумент.
  function switchTab(event) {
    // Получаем элемент, на который был произведен клик.
    // event.currentTarget - это элемент, к которому прикреплен обработчик события (сама кнопка вкладки).
    const clickedTab = event.currentTarget;
    // Извлекаем значение атрибута 'data-tab' из кликнутой вкладки.
    const target = clickedTab.dataset.tab;

    // --- Удаление классов активности у всех табов и контента ---
    // Перебираем все кнопки вкладок.
    tabButtons.forEach(tab =>
      // Удаляем класс 'catalog_tab_active' с каждой кнопки.
      // Это гарантирует, что только одна вкладка будет активной.
      tab.classList.remove('catalog_tab_active')
    );
    // Перебираем все блоки содержимого вкладок.
    tabContents.forEach(content =>
      // Удаляем класс 'catalog_content_active' с каждого блока.
      // Это скрывает все предыдущие активные блоки содержимого.
      content.classList.remove('catalog_content_active')
    );

    // --- Добавление классов активности к выбранному табу и контенту ---
    // Добавляем класс 'catalog_tab_active' к кнопке, по которой только что кликнули.
    // Это визуально выделяет активную вкладку.
    clickedTab.classList.add('catalog_tab_active');
    // Ищем соответствующий элемент контента по его атрибуту 'data-tab-id', используя значение 'target'.
    const targetContent = document.querySelector(`[data-tab-id="${target}"]`);
    // Проверяем, был ли найден соответствующий контент.
    if (targetContent) {
      // Добавляем класс 'catalog_content_active' к найденному элементу контента.
      // Это делает содержимое активной вкладки видимым.
      targetContent.classList.add('catalog_content_active');
    }
  }

  // Функция для назначения обработчиков событий (слушателей).
  function bindEvents() {
    // Перебираем каждую кнопку вкладки из коллекции tabButtons.
    tabButtons.forEach(tab => {
      // Добавляем слушатель события 'click' к каждой кнопке.
      // При клике на кнопку будет вызвана функция switchTab.
      tab.addEventListener('click', switchTab);
    });
  }

  // Функция инициализации модуля.
  // Это публичный метод, который запускает всю логику модуля.
  function init() {
    // Сначала вызываем функцию для установки начальной активной вкладки.
    initActiveTab();
    // Затем вызываем функцию для привязки обработчиков событий к кнопкам вкладок.
    bindEvents();
  }

  // Возвращаем объект, который делает публичные методы доступными извне модуля.
  // В данном случае, мы делаем доступным только метод 'init'.
  return {
    init: init
  };
})(); // IIFE немедленно вызывается здесь.

// --- Запуск модуля после загрузки DOM ---

// Добавляем слушатель события 'DOMContentLoaded' к объекту document.
// Это событие срабатывает, когда весь HTML документ полностью загружен и распарсен,
// но до того, как будут загружены таблицы стилей, изображения и подфреймы.
document.addEventListener('DOMContentLoaded', () => {
  // Когда DOM загружен, вызываем метод init() нашего модуля TabsModule.
  // Это запускает всю логику работы вкладок на странице.
  TabsModule.init();
});
