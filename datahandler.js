class DataHandler {
  #state = {
    notes: [],
    initTime: null,
    localTimeStamp: null,
    remoteTimeStamp: null,
    saveOnTime: 10,
  };

  #settings = {};
  /**
   * Denna klass ska göra följande:
   * 0. Hålla all information som state
   * 1. Vid initiering: Hämta senaste datan, om den så är lokal eller remote
   * 2. Etablera timer för automatiskt sparande
   * 3. Tillhandahålla funktioner för automatiskt sparande
   */

  constructor() {
    this.#state.initTime = Date.now();
    this._getLocalStorage();
    if (this.#state.notes.length < 1) this.newNote();
    if (this.#settings.autosave) this.startSaveTimer();
  }

  startSaveTimer(interval = this.#state.saveOnTime) {
    this.saveTimer = setTimeout(
      function () {
        this.saveNotes(true);
      }.bind(this),
      this.#state.saveOnTime * 1000
    );
  }

  stopSaveTimer() {
    clearTimeout(this.saveTimer);
  }

  _stopIntermedSave() {
    clearTimeout(this.saveTimer);
  }

  _storeLocal() {
    window.localStorage.setItem('notes', JSON.stringify(this.#state.notes));
    this.localTimeStamp = Date.now();
  }

  _getLocalStorage() {
    try {
      const notes = JSON.parse(window.localStorage.getItem('notes'));
      if (notes) this.#state.notes = notes;
    } catch (err) {
      console.error(`Could not get local storage, ${err}`);
    }
  }

  _syncRemote() {
    /**
     * Kolla timestamp på remote. Om nyare än local, ersätt local. Om inte, ersätt remote
     */
  }

  saveNotes(confirmed = false) {
    if (!confirmed) {
      if (
        window.localStorage.getItem('notes') &&
        window.confirm(
          'This will overwrite your currently stored notes. OK?'
        ) === true
      ) {
        this._storeLocal();
      }
    } else {
      this._storeLocal();
    }
  }

  saveNote(index, contents) {
    try {
      if (!this.#state.notes[index]) {
        this.#state.notes.push(contents);
      } else {
        this.#state.notes[index].text = contents.text;
        this.#state.notes[index].title = contents.title;
      }
      this.saveNotes(true);
    } catch (err) {
      console.error(`Could not store note, ${err}`);
    }
  }

  _genRowMarkup(note, index) {
    // TODO - Begränsa längd på texten
    return `
    <li class="notes__list--item" data-index="${index}">
            <span class="note-title">${note.title}</span>
            <p class="note-brief">${note.text}</p>
          </li class="notes__list--item">`;
  }

  getNotesList() {
    try {
      const markup = this.#state.notes
        .map((note, index) => this._genRowMarkup(note, index))
        .join('');
      return markup;
    } catch (err) {
      console.error(`Error when generating notes list: ${err}`);
    }
  }

  getNote(index) {
    try {
      return this.#state.notes[index];
    } catch (err) {
      console.log(`Error when getting note: ${err} - Location: ${this}`);
    }
  }

  newNote() {
    this.#state.notes.push({
      title: 'NEWNOTE',
      text: '',
    });
    return this.#state.notes.length; // Index of new note, to be loaded in the interface
  }

  deleteNote(index) {
    this.#state.notes.splice(index, 1);
    console.log(this.#state.notes);
  }

  saveSettings(settingsObj) {
    this.#settings = settingsObj;
  }

  getSettings() {
    return this.#settings;
  }
}

export default new DataHandler();
