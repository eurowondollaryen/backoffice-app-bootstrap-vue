export default class CalendarEditor {
    // gets called once before the renderer is used
    init(params) {
      //console.log('[sayho]', params);
      // create the cell
      this.eGui = document.createElement('div');
      this.eGui.innerHTML = `
            <span class="align-middle">
                <input class="form-control inp-calendar" type="date" v-model="cellValue"/>
            </span>
         `;
  
      // get references to the elements we want
      //TODO: implement change value of calendar
      this.eCalendar = this.eGui.querySelector('.inp-calendar');

      this.eCalendar.onchange = (event) => {
        this.cellValue = event.target.value;
        console.log(this.cellValue);
      };
  
      // set value into cell
      this.cellValue = this.getValueToDisplay(params);
    }
  
    getGui() {
      return this.eGui;
    }
    // focus and select can be done after the gui is attached
    afterGuiAttached() {
      this.eCalendar.focus();
      this.eCalendar.select();
    }

    getValue() {
      return this.cellValue;
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
      if (this.eCalendar) {
        // check that the button element exists as destroy() can be called before getGui()
        this.eCalendar.removeEventListener('onchange', this.eventListener);
      }
    }
  
    getValueToDisplay(params) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    }
  }
  