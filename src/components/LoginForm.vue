<template>
  <section class="vh-100" style="background-color: #f6f6f6;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong">
          <div class="card-body p-5 text-center shadow">

            <h3 class="mb-5">IT Team Admin Tool</h3>
            <form v-on:submit="loginSubmit">
              <div class="form-outline mb-4">
                <input v-model="user_idxx" type="text" id="user-idxx" class="form-control form-control-lg" placeholder=" "/>
                <label class="form-label" for="user-idxx">아이디</label>
              </div>
              <div class="form-outline mb-4">
                <input v-model="user_pswd" type="password" id="user-pswd" class="form-control form-control-lg" placeholder=" "/>
                <label class="form-label" for="user-pswd">비밀번호</label>
              </div>

              <!-- Checkbox -->
              <div class="form-check d-flex justify-content-start mb-4">
                <label class="form-check-label" for="chk-remember-pswd"> 아이디 기억하기 </label>
                <input class="form-check-input" type="checkbox" value="" id="chk-remember-pswd" v-model="remember_id_yn" />
              </div>

              <button class="btn btn-primary btn-lg btn-block" type="submit">로그인</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script>
import VueCookies from "vue-cookies";
//import axios from 'axios';
//import config from '../config.js';
export default {
  data: function() {
    return {
      user_idxx: '',
      user_pswd: '',
      remember_id_yn: false
    };
  },
  created: function() {//Vue lifecycle
    if(VueCookies.get("remember_id")) {
      this.user_idxx = VueCookies.get("remember_id");//아이디 기억하기(아이디값)
      this.remember_id_yn = VueCookies.get("remember_id_yn");//아이디 기억하기
    }
  },
  methods: {
    loginSubmit: function(e) {
      e.preventDefault(e);//submit의 기본 성질인 page refresh를 방지
      
      window.location = "/";
      
      /*
      //아이디 기억하기 체크 시, Cookie 저장
      if(this.remember_id_yn) {
        VueCookies.set("remember_id", this.user_idxx, 60 * 60 * 24 * 7);//아이디 기억하기 수명은 7일
        VueCookies.set("remember_id_yn", this.remember_id_yn, 60 * 60 * 24 * 7);
      }

      //로그인 POST 요청
      axios.post(config.serverUrl + "/auth/login", {
        user_idxx: this.user_idxx,
        user_pswd: this.user_pswd
      }).then(function(response) {
          //console.log(response.data);
          //로그인 성공
          if(response.data[0]["token"]) {
            const cookieLifeTime = 60 * 60 * 1 * 24;//기본 Cookie 수명 24시간
            VueCookies.set("companyName", response.data[0]["COMPANY_NM"], cookieLifeTime);//회사명, 수명은 1시간
            VueCookies.set("token", response.data[0]["token"], cookieLifeTime);//인증 토큰, 수명은 1시간
            window.location = "/";//Main화면으로 redirect
          } else {
            console.log("login failed..");
          }
      })
      .catch(function(error) {
          console.log(error); 
      });
      */
    }
  }
}
</script>

<style>
.form-outline {
  position: relative;
}

.form-outline label {
  position: absolute;
  top:25%;
  left:20px;
  color:#999;
  font-weight: 400;
  font-size: 17px;
  pointer-events: none;
}

form .form-outline input:focus ~ label,
form .form-outline input:not(:placeholder-shown) ~ label{
  top:0%;
  font-size: 16px;
  color:#0275d8;
  background:#fff;
  transform:translateY(-50%);
  transition: 0.3s;
}
</style>