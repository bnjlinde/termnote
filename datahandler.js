class DataHandler {
  #state = {
    notes: [],
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

  storeLocal() {
    // TODO
  }

  getLocalStorage() {
    return this.#state.notes;
  }

  syncRemote() {
    /**
     * Kolla timestamp på remote. Om nyare än local, ersätt local. Om inte, ersätt remote
     */
  }
}
