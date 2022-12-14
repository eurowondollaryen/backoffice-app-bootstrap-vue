export default class DeleteButtonRenderer {
    // gets called once before the renderer is used
    init(params) {
      //console.log('[sayho]', params);
      // create the cell
      this.eGui = document.createElement('div');
      this.eGui.innerHTML = `
            <span class="align-middle">
                <span class="my-value"></span>
                <button class="btn btn-danger btn-sm btn-simple">삭제</button>
            </span>
         `;
  
      // get references to the elements we want
      this.eButton = this.eGui.querySelector('.btn-simple');
  
      // set value into cell
      this.cellValue = this.getValueToDisplay(params);
      this.SEQ = params.data.SEQ;
  
      // add event listener to button
      this.eventListener = () => {
        
        if(!confirm(`${this.SEQ}번 데이터를 삭제하시겠습니까?`)) {
          return false;
        }
        if(!params.data.SEQ) {
          alert("서버에 저장되지 않은 데이터입니다.");
        }
        params.context.componentParent.delete01(params.data.SEQ);//부모 component의 delete01 함수 호출
      }
      this.eButton.addEventListener('click', this.eventListener);
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
  