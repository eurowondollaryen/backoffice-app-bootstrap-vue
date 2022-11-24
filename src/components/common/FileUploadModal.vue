<template>
  <div class="custom-modal-wrapper" tabindex="-1" role="dialog" v-if="visible">
    
      <div class="card shadow container" id="common-modal" @mousedown="dragMouseDown" @mousemove="dragMouse" @mouseup="dragMouseUp">
        <div class="modal-header" id="common-modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" aria-label="Close" @click="modalClose">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5>첨부파일 목록</h5>
          <div id="file-list-area">
            <ul class="list-group">
              <li class="list-group-item" v-for="file in fileList" v-bind:key="file.src">{{ file.name }}</li>
            </ul>
          </div>
          <hr/>
          <div id="file-drop-area" @drop="fileDrop" @dragover="allowDrop">여기에 파일을 놓아주세요</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" >저장</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="modalClose">Close</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FileUploadModal',
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    title: {
      type: String,
      require: false,
    },
    //서버에 저장될 첨부파일 id값. 첨부파일 없는 경우, id 없음.
    fileIdxx: {
      type: String,
      require: false
    },
    fileNumberLimit: {
      type: Number,
      require: false,
      default: 5
    }
  },
  data: function() {
    return {
      modalWidth: 300,
      modalHeight: 300,
      isDragging: false,
      posAfterX: 0,
      posAfterY: 0,
      posBeforeX: 0,
      posBeforeY: 0,
      fileList: []
    }
  },
  methods: {
    modalClose: function() {
      this.$emit('modalStateChange', false);
    },
    dragMouseDown: function(e) {
      e.preventDefault();
      this.isDragging = true;
      this.posBeforeX = e.clientX;
      this.posBeforeY = e.clientY;
      //console.log("[dragMouseDown]", e);
    },
    dragMouseUp: function(e) {
      e.preventDefault();
      if(this.isDragging) {
        this.isDragging = false;
      }
      //console.log("[dragMouseUp]", e);
    },
    dragMouse: function(e) {
      e.preventDefault();
      if(this.isDragging) {
        this.posAfterX = this.posBeforeX - e.clientX;
        this.posAfterY = this.posBeforeY - e.clientY;
        this.posBeforeX = e.clientX;
        this.posBeforeY = e.clientY;
        let elmnt = document.getElementById("common-modal");
        elmnt.style.top = (elmnt.offsetTop - this.posAfterY) + "px";
        elmnt.style.left = (elmnt.offsetLeft - this.posAfterX) + "px";
        //console.log("[dragMouse]", e);
      }
    },
    allowDrop: function(e) {
      e.preventDefault();
    },
    fileDrop: function(e) {
      e.preventDefault();
      const droppedFiles = e.dataTransfer.files;
      this.addFiles(droppedFiles);
    },
    addFiles: async function(fileList) {
      //파일 추가 후 첨부파일 수가 제한될 경우, return false
      if(fileList.length + this.fileList.length > this.fileNumberLimit) {
        alert("파일 개수는 " + this.fileNumberLimit + "개를 넘을 수 없습니다.");
        return false;
      }
      for(let i = 0; i < fileList.length; ++i) {
        const src = await this.readFiles(fileList[i]);
        console.log(i);
        console.log(fileList[i].src);
        console.log(src);
        fileList[i].src = src;
        this.fileList.push(fileList[i]);
      }
      console.log(this.fileList);
    },
    readFiles: async function(fileList) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          resolve(e.target.result);
        }
        reader.readAsDataURL(fileList);
      });
    },
    handleRemove: function(index) {
      this.fileList.splice(index, 1);
    }
  }
}
</script>

<style>
/* The Modal (background) */
.custom-modal-wrapper {
  position: fixed; /* Stay in place */
  z-index: 999999; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal-header {
  cursor: move;
}

#common-modal {
  position: absolute;
}

#file-drop-area {
  border: dashed;
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
  width: 100%;
  height: 200px;
}

</style>