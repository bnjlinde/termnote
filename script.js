'use strict';

let activeMenu = undefined; //to be able to close any open menus

//Element selectors
const wrapper = document.querySelector('.wrapper');
const menuItemFile = document.querySelector('#menu__item--file');
const fileSubMenu = document.querySelector('#menu__item-file--submenu');
const menuItemEdit = document.querySelector('#menu__item--edit');
const editSubMenu = document.querySelector('#menu__item-edit--submenu');
const notesList = document.querySelector('.notes__list');
const menuItemSettings = document.querySelector('#menu__item-file--settings');
const settingsSaveBtn = document.querySelector('#settings__save--button');
const allSubMenus = [fileSubMenu, editSubMenu];

//Event handlers

//TODO: Implement keyboard shortcuts
document.querySelector('body').addEventListener('keydown', function (e) {
  if (e.key === 'å' && e.ctrlKey) alert('Huzzah');
});

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
  // Behöver fixa så att menyn inte återöppnas när man klickar wrappern...
  if (activeMenu !== undefined) activeMenu.classList.add('hidden');
});

notesList.addEventListener('click', function (e) {
  const noteElement = e.target.closest('.notes__list--item');
  setActiveNote(noteElement);
});

menuItemSettings.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.remove('hidden');
  wrapper.classList.add('hidden');
});

settingsSaveBtn.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.add('hidden');
  wrapper.classList.remove('hidden');
  saveApplySettings();
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

const setFont = function (font) {
  // const style = getComputedStyle(root);
  switch (font) {
    case 'Ubuntu':
      console.log('UBUNTU');
      document
        .querySelector(':root')
        .style.setProperty('--term-font', 'Ubuntu Mono');
      break;
    case 'RedHat':
      console.log('REDHAT');
      document
        .querySelector(':root')
        .style.setProperty('--term-font', 'Red Hat Mono');
      break;
    default:
      break;
  }
};

const setTheme = function (theme) {
  switch (theme) {
    case 'greentheme':
      document
        .querySelector(':root')
        .style.setProperty('--term-color-dark', '#2f9e19');
      document
        .querySelector(':root')
        .style.setProperty('--term-color', '#4af626');
      break;
    case 'orangetheme':
      document
        .querySelector(':root')
        .style.setProperty('--term-color-dark', '#9e6a19');
      document
        .querySelector(':root')
        .style.setProperty('--term-color', '#e89e26');
      break;
    default:
      break;
  }
};

const saveApplySettings = function () {
  const theme = document.querySelector('input[name="theme"]:checked').value;
  const font = document.querySelector('input[name="font"]:checked').value;
  const settings = {
    theme: theme,
    font: font,
  };
  setFont(font);
  setTheme(theme);
  // console.log(settings);
};
