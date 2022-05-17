'use strict';

let activeMenu = undefined; //to be able to close any open menus

//Element selectors
const wrapper = document.querySelector('.wrapper');
const menuItemFile = document.querySelector('#menu__item--file');
const fileSubMenu = document.querySelector('#menu__item-file--submenu');
const menuItemEdit = document.querySelector('#menu__item--edit');
const editSubMenu = document.querySelector('#menu__item-edit--submenu');
const notesList = document.querySelector('.notes__list');
const allSubMenus = [fileSubMenu, editSubMenu];

//Event handlers
menuItemFile.addEventListener('click', function () {
  activeMenu === fileSubMenu
    ? (activeMenu = undefined)
    : (activeMenu = fileSubMenu);
  toggleMenu(fileSubMenu);
});

menuItemEdit.addEventListener('click', function () {
  activeMenu === editSubMenu
    ? (activeMenu = undefined)
    : (activeMenu = editSubMenu);
  toggleMenu(editSubMenu);
});

wrapper.addEventListener('click', function (e) {
  if (activeMenu !== undefined) toggleMenu(activeMenu);
});

notesList.addEventListener('click', function (e) {
  const noteElement = e.target.closest('.notes__list--item');
  setActiveNote(noteElement);
});

//Helper functions

const toggleMenu = function (menuItem) {
  // TODO: Om två menyer är öppna så funkar inte detta.
  menuItem.classList.toggle('hidden');
};

const setActiveNote = function (noteElement) {
  [...notesList.children].forEach(el => el.classList.remove('active'));
  noteElement.classList.add('active');
  // TODO: Ladda content
};
