'use strict';

import datahandler from './datahandler.js';
console.log(datahandler);

let activeMenu = undefined; //to be able to close any open menus

// Move to config
const APP_TITLE = 'TermNote v0.1';

//Element selectors
const titlebar = document.querySelector('.titlebar__title');
const wrapper = document.querySelector('.wrapper');
const menuItems = document.querySelector('#menu__items');
// const menuItemFile = document.querySelector('#menu__item--file');
const fileSubMenu = document.querySelector('#menu__item-file--submenu');
// const menuItemEdit = document.querySelector('#menu__item--edit');
const editSubMenu = document.querySelector('#menu__item-edit--submenu');
// const menuItemView = document.querySelector('#menu__item--view');
const viewSubMenu = document.querySelector('#menu__item-view--submenu');
// const menuItemHelp = document.querySelector('#menu__item--help');
const helpSubMenu = document.querySelector('#menu__item-help--submenu');
const notesList = document.querySelector('.notes__list');
const editor = document.querySelector('#editor');
const menuItemSettings = document.querySelector('#menu__item-file--settings');
const settingsSaveBtn = document.querySelector('#settings__save--button');
const allSubMenus = [fileSubMenu, editSubMenu, viewSubMenu, helpSubMenu];
const zoomplus = document.querySelector('#zoomplus');
const zoommin = document.querySelector('#zoommin');
const btnSave = document.querySelector('#menu__item-file--save');
// const tempLoadButton = document.querySelector('#loadNotes');

//Event handlers

//TODO: Implement keyboard shortcuts
document.querySelector('body').addEventListener('keydown', function (e) {
  if (e.key === 'å' && e.ctrlKey) alert('Huzzah');
});

menuItems.addEventListener('click', function (e) {
  const submenu = e.target.querySelector('.submenu');
  if (!submenu) return;
  if (!submenu.classList.contains('hidden')) {
    closeMenus();
  } else {
    closeMenus();
    openMenu(submenu);
  }
});

const closeMenus = function () {
  allSubMenus.forEach(el => {
    el.classList.add('hidden');
  });
};

const openMenu = function (submenu) {
  submenu.classList.remove('hidden');
};

wrapper.addEventListener('click', closeMenus);

// Settings window
menuItemSettings.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.remove('hidden');
  wrapper.classList.add('hidden');
});

settingsSaveBtn.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.add('hidden');
  wrapper.classList.remove('hidden');
  saveApplySettings();
});

btnSave.addEventListener('click', function () {
  const x = datahandler.save();
  if (typeof x === 'function') x();
});

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

zoommin.addEventListener('click', function () {});

//Editor and notes list functions
const clear = el => (el.innerHtml = '');

const loadNotes = function () {
  try {
    const markup = datahandler.getNotesList();
    clear(notesList);
    notesList.innerHTML = markup;
  } catch (err) {
    console.error(`Error when loading notes: ${err}`);
  }
};

const loadNote = function (index) {
  editor.value = datahandler.getNote(index).text;
  titlebar.innerHTML = `${APP_TITLE}<span class="title-note">/${
    datahandler.getNote(index).title
  }/</span>`;
  // console.log(datahandler.getNote(index).text);
};

notesList.addEventListener('click', function (e) {
  const noteElement = e.target.closest('.notes__list--item');
  loadNote(noteElement.dataset.index);
  setActiveNote(noteElement);
});

const setActiveNote = function (noteElement) {
  [...notesList.children].forEach(el => el.classList.remove('active'));
  noteElement.classList.add('active');
  // TODO: Ladda content
};

const init = function () {
  loadNotes();
};

window.addEventListener('load', init);
