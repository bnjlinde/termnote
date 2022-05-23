'use strict';

import datahandler from './datahandler.js';

let activeNote = null;

// Move to config
const APP_TITLE = 'TermNote v0.1';

//Element selectors
const titlebar = document.querySelector('.titlebar__title');
const wrapper = document.querySelector('.wrapper');
const menuItems = document.querySelector('#menu__items');
const fileSubMenu = document.querySelector('#menu__item-file--submenu');
const editSubMenu = document.querySelector('#menu__item-edit--submenu');
const viewSubMenu = document.querySelector('#menu__item-view--submenu');
const helpSubMenu = document.querySelector('#menu__item-help--submenu');
const notesList = document.querySelector('.notes__list');
const editor = document.querySelector('#editor');
const menuItemSettings = document.querySelector('#menu__item-file--settings');
const settingsScreen = document.querySelector('.settings__screen');
const settingsSaveBtn = document.querySelector('#settings__save--button');
const allSubMenus = [fileSubMenu, editSubMenu, viewSubMenu, helpSubMenu];
const zoomplus = document.querySelector('#zoomplus');
const zoommin = document.querySelector('#zoommin');
const btnSave = document.querySelector('#menu__item-file--save');
const btnNew = document.querySelector('#menu__item--file-new');
const btnDel = document.querySelector('#deleteNote');
// const tempLoadButton = document.querySelector('#loadNotes');

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

//========== Menu functions ============//
const closeMenus = function () {
  allSubMenus.forEach(el => {
    el.classList.add('hidden');
  });
};

const openMenu = function (submenu) {
  submenu.classList.remove('hidden');
};

wrapper.addEventListener('click', closeMenus);
settingsScreen.addEventListener('click', closeMenus);

//========== Settings screen functions ============//

// Settings window
menuItemSettings.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.remove('hidden');
  wrapper.classList.add('hidden');
  closeMenus();
});

settingsSaveBtn.addEventListener('click', function () {
  document.querySelector('.settings__screen').classList.add('hidden');
  wrapper.classList.remove('hidden');
  saveApplySettings();
  closeMenus();
});

btnSave.addEventListener('click', function () {
  const x = datahandler.saveNotes();
});

// Save note on focus out
editor.addEventListener('focusout', function () {
  const contents = editor.value;
  if (contents === '') return;
  const title = contents.slice(0, contents.indexOf('\n'));
  const textcontent = contents.slice(contents.indexOf('\n'));
  datahandler.saveNote(activeNote, {
    title: title,
    text: textcontent,
  });
  loadNotes();
});

const saveApplySettings = function () {
  const theme = document.querySelector('input[name="theme"]:checked').value;
  const font = document.querySelector('input[name="font"]:checked').value;
  const autosave = document.querySelector(
    'input[name="autosave"]:checked'
  ).value;
  datahandler.saveSettings({
    theme: theme,
    font: font,
    autosave: autosave === 'autosaveon' ? true : false,
  });
  setFont(font);
  setTheme(theme);
  // Timed save on/off
  if (autosave === 'autosaveoff') {
    datahandler.stopSaveTimer();
  } else {
    datahandler.saveTimer();
  }
};

const setFont = function (font) {
  // const style = getComputedStyle(root);
  switch (font) {
    case 'Ubuntu':
      document
        .querySelector(':root')
        .style.setProperty('--term-font', 'Ubuntu Mono');
      break;
    case 'RedHat':
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
zoomplus.addEventListener('click', function () {});

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
  editor.value = `${datahandler.getNote(index).title}\n${
    datahandler.getNote(index).text
  }`;
  titlebar.innerHTML = `${APP_TITLE}<span class="title-note">/${
    datahandler.getNote(index).title
  }/</span>`;
  activeNote = index;
};

notesList.addEventListener('click', function (e) {
  const noteElement = e.target.closest('.notes__list--item');
  if (!noteElement) return;
  loadNote(noteElement.dataset.index);
  activeNote = +noteElement.dataset.index;
  setActiveNote(noteElement);
});

const setActiveNote = function (noteElement) {
  [...notesList.children].forEach(el => el.classList.remove('active'));
  noteElement.classList.add('active');
};

const newNote = function () {
  const newNote = datahandler.newNote();
  loadNotes();
  loadNote(newNote - 1);
  const newNoteEl = document.querySelector(
    `.notes__list--item[index="${newNote}"]`
  );
  closeMenus();
  editor.focus();
};

btnNew.addEventListener('click', newNote);

btnDel.addEventListener('click', function () {
  datahandler.deleteNote(activeNote);
  loadNotes();
  editor.value = '';
});

const init = function () {
  loadNotes();
  loadNote(0);
  editor.focus();
};

window.addEventListener('load', init);
