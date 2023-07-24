// 의도적으로 history에 url을 넣어준다
// 현재 주소에 맞는 페이지를 그려주는 함수 생성
// 페이지 주소 이동에 맞게 그려주는 함수 호출
//

const route = (event) => {
  event.preventDefault();
  // history 를 사용하여 브라우저 url 변경
  window.history.pushState({}, "", event.target.href);
  // 앞 줄 코드에서 push한 url에 맞는 페이지 매칭하기
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "/about": "/pages/about.html",
  "/lorem": "/pages/lorem.html",
};
// 결국 페이지를 그려주는 역활
const handleLocation = async () => {
  const path = window.location.pathname;
  //path name에 맞는 파일경로
  const route = routes[path] || routes[404];
  // 파일 텍스트로 변환
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
};
// 브라우저 이동시(뒤로가기 앞으로가기) 발생하는 이벤트 설정
window.onpopstate = handleLocation;
//window 객체의 프로퍼티로 만들
window.route = route;
// 초기 로딩
handleLocation();
