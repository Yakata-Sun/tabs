'use strict';
window.addEventListener('DOMContentLoaded', function () {//добавление обработчика события DOMContentLoaded ддля всего окна- когда загружена структура документа
  let tab = document.querySelectorAll('.info-header-tab');//получение всех элементов по классу и создание из них псевдомассива элементов (псевдоколлекция)по классу info-header-tab (отдельный тег теперь можно найти в этом массиве по индексу)
  let tabHeader = document.querySelector('.info-header');//получение всех элементов по классу и создание из них псевдомассива элементов (псевдоколлекция)по классу info-tabcontent (отдельный тег теперь можно найти в этом массиве по индексу)
  let tabContent = document.querySelectorAll('.info-tabcontent');//получение всех элементов по классу и создание из них псевдомассива элементов (псевдоколлекция)по классу info-tabcontent (отдельный тег теперь можно найти в этом массиве по индексу)

function hideContent(a) {//функция для скрытия контента по клику на иконку меню
    for (let i = a; i < tab.length; i++) {//проход по всем элементам псевдоколлекции и присвоение классу active только если этот элемент совпадает с тем, который нажали
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
      console.log('hide');
    }
  }
  hideContent(1);
  function showContent(b) {//функция для показа контента по клику на иконку меню
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
      console.log('show');
    }}
  
  document.addEventListener('click', function (e) {
    let target = e.target; //получение целевого элемента
    if (target.classList.contains('info-header-tab')) { //проверка на класс info-header-tab в целевом элементе
      e.target.classList.add('active');//добавление класса active в целевом элементе 
      console.log('2!');
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {//если клик прошел на таб по индексу i
          hideContent(0); //скрытие всех контентов
          showContent(i); //показ контента по индексу i
          console.log('4!');
          break;
        }
      }
    }
    else {
      console.log('5!');
    }
  });
});