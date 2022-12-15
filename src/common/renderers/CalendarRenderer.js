export default class CalendarRenderer {
    // gets called once before the renderer is used
    init(params) {
      //console.log('[sayho]', params);
      // create the cell
      this.eGui = document.createElement('div');
      this.eGui.innerHTML = `
            <span class="align-middle">
                <input class="form-control" type="date" value="${params.data.DATE}"/>
            </span>
         `;
  
      // get references to the elements we want
      this.eButton = this.eGui.querySelector('.btn-simple');
  
      // set value into cell
      this.cellValue = this.getValueToDisplay(params);
    }
  
    getGui() {
      return this.eGui;
    }
  
    // gets called whenever the cell refreshes
    refresh(params) {
      // set value into cell again
      this.cellValue = this.getValueToDisplay(params);
      this.eValue.innerHTML = this.cellValue;
  
      // return true to tell the grid we refreshed successfully
      return true;
    }
  
    // gets called when the cell is removed from the grid
    destroy() {
      // do cleanup, remove event listener from button
      if (this.eButton) {
        // check that the button element exists as destroy() can be called before getGui()
        this.eButton.removeEventListener('click', this.eventListener);
      }
    }
  
    getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    }
  }
  