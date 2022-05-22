class DataHandler {
  #state = {
    notes: [
      {
        title: 'Note #1',
        text: 'Hejsan svejan hoppsan loppsan.',
      },
      {
        title: 'Note #2',
        text: 'Här är den andra anteckningen',
      },
      {
        title: 'Den tredje anteckningen',
        text: 'Bara test, tredje anteckningen',
      },
    ],
    initTime: null,
    localTimeStamp: null,
    remoteTimeStamp: null,
  };
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
  }

  _intermedSave() {}

  _storeLocal() {
    window.localStorage.setItem('notes', JSON.stringify(this.#state.notes));
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

  save(confirmed = false) {
    if (!confirmed) {
      if (
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

  _genRowMarkup(note, index) {
    // TODO - Begränsa längd på texten
    return `
    <li class="notes__list--item" data-index="${index}">
            <span class="note-title">${note.title}</span>
            <p class="note-brief">${note.text}</p>
          </li class="notes__list--item">    `;
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
}

export default new DataHandler();
