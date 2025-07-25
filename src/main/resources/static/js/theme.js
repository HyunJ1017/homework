/*

  - 문서 생성시 페이지 태마 설정
  - 흰색,검은색 변경

  - 태마가 변경된 상태에서 새로운 객체가 형성되면? -> 좋지는않음...
  - 객체속성에 넣을까?

  - 현재: 클레스 부여 후 버튼 클릭시 로딩되있는 모든 객체 찾아서 변경하기
    - 로딩되있는것도 아님, 처음 페이지 생성때 부터 전 객체가 로딩이 되어있음

  - 개선
    - 페이지 로드할때마다 테마변경함수 콜업
    - 이러면 번쩍번쩍하지 않나?
      - 기본 검정 -> 흰색 변경
    

  서버 클래스
  public class ThemeDto {
    private String backgroundColor;
    private String color;
    private String linkColor;
    private String borderColor;
  }

*/


/* ***************************************************************************************************** */
// 태마적용 삭제

// document.querySelectorAll('*').forEach(element => {
//   element.style.color = pageTheme.color;
// });

// userThemeBackgroundColor.forEach(element => {
//   element.style.backgroundColor = pageTheme.backgroundColor;
// }); // forEach end

// if(pageTheme.backgroundColor === 'black'){
//   userThemeBackgroundColor70.forEach(element => {
//     element.style.backgroundColor = 'rgb(5, 5, 5)';
//   })
//   // backgroundImg.style.filter = 'opacity(0.13)';
//   contentsSections.forEach(element => {
//     element.style.backgroundColor = 'rgba(255, 255, 255, 0)';
//     element.style.border = `1px solid ${pageTheme.borderColor}`;
//   })
//   userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//   document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
//     element.style.color = 'black';
//   })

// } else if (pageTheme.backgroundColor === 'white') {
//   userThemeBackgroundColor70.forEach(element => {
//     element.style.backgroundColor = 'rgb(250, 250, 250)';
//   })
//   // backgroundImg.style.filter = 'opacity(0.2)';
//   contentsSections.forEach(element => {
//     element.style.backgroundColor = 'rgba(255, 255, 255, 0.88)';
//     element.style.border = `1px solid ${pageTheme.borderColor}`;
//   })
//   userThemeBackgroundColorSlider.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//   document.querySelectorAll(".userTheme-backgroundColorSlider>a").forEach(element => {
//     element.style.color = 'white';
//   })
// } // backgroundColor end


// userThemeBorders.forEach(element => {
//   element.style.border = `1px solid ${pageTheme.borderColor}`;
// })
// userThemeBorderTops.forEach(element => {
//   element.style.borderTop = `1px solid ${pageTheme.borderColor}`;
// })
// userThemeBorderBottoms.forEach(element => {
//   element.style.borderBottom = `1px solid ${pageTheme.borderColor}`;
// })
// userThemeBorderTables.forEach(element => {
//   element.style.borderColor = pageTheme.borderColor;
// })

/* ***************************************************************************************************** */
                            
                            
                            
                            
const gear = document.querySelector('#gear');
const footer = document.querySelector('footer');
const footerContents = document.querySelector('.footer-contents');
const loader = document.querySelector('#loader');
let themeFl = false;
let footerFl = false;

gear.addEventListener('click', () => {
  footer.style.bottom = '-5vh';
  footerFl = true;
  setTimeout(() => {
    footerFl = false;
  }, 300);
  renderingThemeSection();
}); // click end

footer.addEventListener('mouseleave', () => {
  if(footerFl) return;
  footer.style.bottom = '-15vh';
  contentsClear();
});  // mouseleave end

const renderingThemeSection = () => {
  footerContents.style.height = '10vh';
  footerContents.style.flexDirection = 'column';
  footerContents.style.justifyContent = 'center';
  footerContents.innerHTML
  = '<h4>화면 태마 변경</h4>'
  + '<div id="themeList-background">'
  + `<div class="userTheme-border" id="backgroundColorBlack" style="border: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'};">검은색 Black</div>`
  + `<div class="userTheme-border" id="backgroundColorWhite" style="border: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'};">흰색 White</div>`
  + '</div>';

  // 검은색 클릭시
  document.querySelector('#backgroundColorBlack').addEventListener('click', () => {
    // 중복실행 방지
    if(themeFl) return;
    themeFl = true;
    gear.style.display = 'none';
    loader.style.display = 'block';

    // 태마객체 변경
    pageTheme = {
      backgroundColor : 'black',
      color : 'white',
      linkColor : 'white',
      borderColor : 'white'
    };

    // 현제페이지 변경
    renderingTheme(pageTheme);

    // 세션 변경요청
    fetch('/main/theme?theme=theme&type=black')
    .then(response => response.json())
    .then(result => {
      pageTheme = result;
      loader.style.display = 'none';
      gear.style.display = 'block';
      themeFl = false;
    })
    .catch(err => {
      console.log(err);
    });
  }); // click end

  // 흰색 클릭시
  document.querySelector('#backgroundColorWhite').addEventListener('click', () => {
    // 중복실행 방지
    if(themeFl) return;
    themeFl = true;
    gear.style.display = 'none';
    loader.style.display = 'block';

    // 태마객체 변경
    pageTheme = {
      backgroundColor : 'white',
      color : 'black',
      linkColor : 'black',
      borderColor : 'black'
    };

    // 현제페이지 변경
    renderingTheme(pageTheme);

    // 세션 변경요청
    fetch('/main/theme?theme=theme&type=white')
    .then(response => response.json())
    .then(result => {
      pageTheme = result;
      loader.style.display = 'none';
      gear.style.display = 'block';
      themeFl = false;
    })
    .catch(err => {
      console.log(err);
    });
  }); // click end
} // renderingTheme end

const contentsClear = () => {
  footerContents.style.height = '15vh';
  footerContents.style.flexDirection = 'row';
  footerContents.style.justifyContent = 'flex-end';
  footerContents.innerHTML = '';
}  // contentsClear end

// *************************************************************************************************
// 테마 변경 함수
const renderingTheme = (pageTheme) => {

  // pageTheme : 서버에서 받아온 테마 정보

  // backgroundColor, color, linkColor(?), borderColor

  const userThemeBackgroundColor = document.querySelectorAll(".userTheme-backgroundColor");
  // 메인바디 배경
  const userThemeBackgroundColor70 = document.querySelectorAll(".userTheme-backgroundColor70");
  // 해더, 푸터 배경
  const userThemeBackgroundColorSlider = document.querySelector(".userTheme-backgroundColorSlider");
  // 좌측 슬라이더
  const contentsSections = document.querySelectorAll(".contents-section");
  // 내용
  // const backgroundImg = document.querySelector("#backgroundBox>img");
  // 배경그림(삭제)
  const userThemeBorders = document.querySelectorAll(".userTheme-border");
  // 없나??
  const userThemeBorderTops = document.querySelectorAll(".userTheme-borderTop");
  // 푸터 머릿선
  const userThemeBorderBottoms = document.querySelectorAll(".userTheme-borderBottom");
  // 해더 바닥선
  const userThemeBorderTables = document.querySelectorAll(".userTheme-borderTable");
  // 테이블선모양


  userThemeBackgroundColor.forEach(element => {
    element.style.backgroundColor = pageTheme.backgroundColor;
  })
  userThemeBackgroundColor70.forEach(element => {
    element.style.backgroundColor = pageTheme.backgroundColor;
  })
  userThemeBackgroundColorSlider.style.backgroundColor = pageTheme.backgroundColor;

  document.querySelectorAll("*").forEach(element => {
    element.style.color = pageTheme.color;
  });

  contentsSections.forEach(element => {
    element.style.backgroundColor = pageTheme.backgroundColor;
    element.style.border = `1px solid ${pageTheme.borderColor}`;
  })

  userThemeBorders.forEach(element => {
    element.style.border = `1px solid ${pageTheme.borderColor}`;
  })
  userThemeBorderTops.forEach(element => {
    element.style.borderTop = `1px solid ${pageTheme.borderColor}`;
  })
  userThemeBorderBottoms.forEach(element => {
    element.style.borderBottom = `1px solid ${pageTheme.borderColor}`;
  })
  userThemeBorderTables.forEach(element => {
    element.style.borderColor = pageTheme.borderColor;
  })


}
// *************************************************************************************************
