import{b as x,t as $}from"../chunks/disclose-version.CWNsIQCv.js";import{r as B,v as L,D as o,_ as r,B as v,$ as m,Y as p,Z as c}from"../chunks/runtime.Duh0JOlv.js";import{d as y}from"../chunks/events.DkfrRslz.js";import{b as g,a as P,P as R,r as d}from"../chunks/axios.CDk1X5Fl.js";import{o as S}from"../chunks/index-client.Bx_TZC6P.js";const k=!0,w=k;var A=$('<div id="landingPage" class="svelte-lbpb1q"><div class="loginBox svelte-lbpb1q"><input type="text" placeholder="이름" class="svelte-lbpb1q"> <input type="text" placeholder="회원 번호" class="svelte-lbpb1q"> <div class="btnBox svelte-lbpb1q"><button class="join svelte-lbpb1q">회원가입</button> <button class="login svelte-lbpb1q">로그인</button></div></div></div>');function E(f,_){B(_,!0);let s=m(""),a=m("");S(()=>{localStorage.getItem("userInfo")&&(location.href="/score")});const h={onLogin:()=>{console.log("onLogin()"),console.log("정보 입력 필터 기능"),(o(s)===""||o(a)==="")&&alert("로그인 정보를 입력해주세요"),I.login()},onJoin:()=>{}},I={login:async()=>{await P.get(`${R}/bap/login?name=${o(s)}&num=${o(a)}`).then(e=>{const t=e.data;t.length>0&&w?(localStorage.setItem("userInfo",`${t[0].name}/${t[0].memberNum}`),location.href="/score"):t.length===0&&alert("로그인 정보를 확인해주세요")})}};var n=A(),b=p(n),l=p(b);d(l);var i=r(l,2);d(i);var u=r(i,2),q=r(p(u),2);q.__click=function(...e){var t;(t=h.onLogin)==null||t.apply(this,e)},c(u),c(b),c(n),g(l,()=>o(s),e=>v(s,e)),g(i,()=>o(a),e=>v(a,e)),x(f,n),L()}y(["click"]);export{E as component};
