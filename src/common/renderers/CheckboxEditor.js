export default class CheckboxEditor {
  // gets called once before the renderer is used
  init(params) {
    // create the cell
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
        <input
            type="checkbox"
            class="inp-checkbox"
            checked={this.params.value}
          />
        `;

    // get references to the elements we want
    this.eCheckbox = this.eGui.querySelector('.inp-checkbox');

    this.eCheckbox.onchange = (event) => {
      this.cellValue = event.target.checked;
    };

    // set value into cell
    this.cellValue = this.getValueToDisplay(params);
  }

  getGui() {
    return this.eGui;
  }
  // focus and select can be done after the gui is attached
  afterGuiAttached() {
    this.eCheckbox.focus();
    this.eCheckbox.select();
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
    if (this.eCheckbox) {
      // check that the button element exists as destroy() can be called before getGui()
      this.eCheckbox.removeEventListener('onchange', this.eventListener);
    }
  }

  getValueToDisplay(params) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}