<template>
  <div>
    <div class="card">
      <div class="fc-toolbar-chunk p-3">
        <h2 class="fc-toolbar-title float-left font-weight-bold" id="fc-dom-1">{{ headerTitle }}</h2>
        <div class="btn-group float-right">
          <button type="button" @click="prevMonth" class="fc-prev-button btn btn-primary"><span class="fa fa-chevron-left"></span>
          </button>
          <button type="button" @click="moveToToday" class="fc-today-button btn btn-primary">오늘</button>
          <button type="button" @click="nextMonth" class="fc-next-button btn btn-primary"><span class="fa fa-chevron-right"></span>
          </button>
        </div>
      </div>
      <table class="table-wrapper shadow">
        <thead>
          <tr>
            <th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in weekList" v-bind:key="week.index">
            <td v-for="day in week" v-bind:key="day.seq" :class="day.class">
              {{ day.text }}
              <div v-if="scheduleList[day.date] != undefined">
                {{ scheduleList[day.date].title }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    props: {
    },
    mounted: function() {
      this.todayYmd = this.getYmdFromDate(this.date);
      this.setHeaderTitleByDate(this.todayYmd);
      this.setWeekListByDate(this.todayYmd);
      
    },
    data: function() {
        return {
          weekList: [],
          scheduleList: {"20230108": {title: "스케쥴"}},
          date: new Date(),
          headerTitle: "",
          todayYmd: ""
        };
    },
    methods: {
      getYmdFromDate: function(dateObj) {
        return dateObj.getFullYear() + "-" + (dateObj.getMonth()+1) + "-" + dateObj.getDate();
      },
      moveToToday: function() {
        this.date = new Date(this.todayYmd);
        this.setHeaderTitleByDate(this.todayYmd);
        this.setWeekListByDate(this.todayYmd);
      },
      nextMonth: function() {
        this.date.setMonth(this.date.getMonth()+1);
        this.setHeaderTitleByDate(this.getYmdFromDate(this.date));
        this.setWeekListByDate(this.getYmdFromDate(this.date));
      },
      prevMonth: function() {
        this.date.setMonth(this.date.getMonth()-1);
        this.setHeaderTitleByDate(this.getYmdFromDate(this.date));
        this.setWeekListByDate(this.getYmdFromDate(this.date));
      },
      getClassTextByDate: function(dateObject, todayDate) {
        let classText = "";
        classText += dateObject.getDay() == 6 || dateObject.getDay() == 0
                     ? "background-weekend"
                     : "";//주말은 배경 회색
        classText += todayDate.getMonth() != dateObject.getMonth()
                     ? ""
                     : " font-weight-bold";//해당 월 텍스트 bold
                     //날짜가 오늘이면 background 표시
        classText += this.getYmdFromDate(dateObject) == this.todayYmd
                     ? " background-today"
                     : "";
        return classText;
      },
      setHeaderTitleByDate: function(ymd) {
        let ymdDate = new Date(ymd);

        if(ymdDate == "Invalid Date") {
          alert("[error]올바른 날짜 형태가 아닙니다. ymd:" + ymd);
          return false;
        }
        this.headerTitle = ymdDate.getFullYear() + "년 " + (ymdDate.getMonth() + 1) + "월";
      },
      setWeekListByDate: function(ymd) {//yyyy-mm-dd 형태
        let today = new Date(ymd);

        if(today == "Invalid Date") {
          alert("[error]올바른 날짜 형태가 아닙니다.");
          return false;
        }
        
        let currentDate = new Date(ymd);
        currentDate.setDate(1);//해당 월의 1일로 설정
        //요일이 월요일(1)이면, 달력을 그리기 위해 이전일자 중 가장 가까운 일요일(0)로 이동
        currentDate.setDate(1-currentDate.getDay());
        
        //weekList 초기화
        this.weekList = [];
        let seq = 1;
        //Calendar 6줄 생성
        for(let i = 0; i < 6; ++i) {
          let week = [];
          for(let j = 0; j < 7; ++j) {
            const text = today.getMonth() != currentDate.getMonth()
            ? currentDate.getMonth()+1 + "월 " + currentDate.getDate() + "일"
            : currentDate.getDate() + "일";
            let classText = this.getClassTextByDate(currentDate, today);
            console.log(this.getYmdFromDate(currentDate));
            week.push({text: text, class: classText, seq: seq++, date: today});
            currentDate.setDate(currentDate.getDate() + 1);
          }
          this.weekList.push(week);
        }
      }
    }
}
</script>

<style scoped>
th {
  text-align: right;
  padding: 10px;
  width: 14.28%;
  height: 50px;
}
td {
  border: solid 1px #e6e6e6;
  padding: 5px;
  text-align: right;
  vertical-align: top;
  width: 14.28%;
  height: 120px;
}
td:hover {
  cursor: pointer;
  background-color: #f3f3f3;
  transition: 0.07s;
}
.table-wrapper {
  margin: 10px;
}
.background-weekend {
  background-color: #f2f2f2;
}
.background-today {
  background-color: skyblue;
}
</style>