
/* ******************************************************* */
/* DOMContentLoaded */
document.addEventListener("DOMContentLoaded", () => {

  // 해더 에니메이션 시작
  waveAnimation();

  // 시간이벤트 시작
  setTimeEvent();

  // 클릭이벤트
  // 이메일 복사
  const email = document.getElementById("email");
  email.addEventListener("click", () => {
    if(emailFl) return;
    emailFl = true;
    copyToClipboard("hyunj1017@naver.com");
    const emailBackup = email.innerHTML;
    email.innerHTML = '<i class="fa-brands fa-square-js" style="color: #FFD43B;"></i>이메일이 복사되었습니다: hyunj1017@naver.com';
    setTimeout(() => {
      email.innerHTML = emailBackup;
      emailFl = false;
    }, 3000);
  });

  // 전화번호 복사
  const phone = document.getElementById("phone");
  phone.addEventListener("click", () => {
    if(phoneFl) return;
    phoneFl = true;
    copyToClipboard("010-2113-3766");
    const phoneBackup = phone.innerHTML;
    phone.innerHTML = '<i class="fa-brands fa-square-js" style="color: #FFD43B;"></i>전화번호가 복사되었습니다: 010-2113-3766';
    setTimeout(() => {
      phone.innerHTML = phoneBackup;
      phoneFl = false;
    }, 3000);
  }); // click end

  // 클립보드 복사 함수
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('복사 실패:', err);
    });
  } // copyToClipboard end

  // 깃발모으기
  for(let i=0;i<contents.length;i++){
    const flag = false;
    sectionFlags.push(flag);
  } // for end

  // 첫화면 로딩
  const currentHeight = window.scrollY;
  for(let i = 0; i<contents.length; i++ ){

    const content = contents[i];
    const contentHead = content.offsetTop;
    const contentTail = content.offsetTop + content.offsetHeight;

    if(( contentHead < currentHeight + windowHeight < contentTail  ) || ( contentTail > currentHeight > contentHead ) ) {
      sectionFlags[i] = true;
      content.style.transition = "none";
      content.style.transform = "translateX(-100vW)";
      content.style.opacity = 1;
      content.style.transition = "all 0.5s ease";
      content.style.transform = "translateX(0)";
    }
    
  }// for end

});
let emailFl = false;
let phoneFl = false;




/* ******************************************************* */
/* slide */

const contents = document.querySelectorAll("main .contents-section");
let windowHeight = window.innerHeight;
let preHeight = 0;
let scrollStatus = "down";
let sectionFlags = [];


function recalculatePositions() {
  windowHeight = window.innerHeight; // 현재 윈도우 높이 갱신
  console.log("Window resized, recalculating positions...");
}
window.addEventListener("resize", recalculatePositions);

// 위 25% 또는 아래 25% 이상이 모이면 100% 보이게할거임
// 현재화면 높이의 25% : window.innerHeight / 4

// 무시
// 윗좌표 : headHeignts[i]
// 위 25% 좌표 : headHeignts[i] + window.innerHeight / 4

// 아래에서 25% 좌표 : tailHeights[i] - window.innerHeight / 4
// 아랫좌표 : tailHeights[i]
// 무시
window.addEventListener("scroll", () => {
  const currentHeight = window.scrollY;

  backgroundMoving(currentHeight);

  if(currentHeight > preHeight) {
    scrollStatus = "down";
  } else {
    scrollStatus = "up";
  }
  preHeight = currentHeight;

  for(let i = 0; i<contents.length; i++ ){

    const content = contents[i];
    const contentHead = content.offsetTop;
    const contentTail = content.offsetTop + content.offsetHeight;

    if(scrollStatus === "down") {
      if(currentHeight + windowHeight < contentHead) continue;
      if(currentHeight + windowHeight < contentHead + (windowHeight*0.6)){
        if(sectionFlags[i] === true) continue;
        sectionFlags[i] = true;
        content.style.transition = "none";
        content.style.transform = "translateX(100vW)";
        content.style.opacity = 1;
        content.style.transition = "all 0.5s ease";
        content.style.transform = "translateX(0)";
      }
      if(currentHeight > contentTail - (windowHeight*0.4)) {
        if(sectionFlags[i] === false) continue;
        content.style.transition = "all 0.5s ease";
        content.style.transform = "translateX(100vW)";
        setTimeout((() => {
          sectionFlags[i] = false;
          content.style.opacity = 0;
        }), 500);
      }
    }
    
    if(scrollStatus === "up") {
      if(currentHeight > contentTail) continue;
      if(currentHeight > contentTail - (windowHeight*0.75)) {
        if(sectionFlags[i] === true) continue;
        sectionFlags[i] = true;
        content.style.transition = "none";
        content.style.transform = "translateX(-100vW)";
        content.style.opacity = 1;
        content.style.transition = "all 0.5s ease";
        content.style.transform = "translateX(0)";
      }
      if(currentHeight + windowHeight < contentHead + (windowHeight*0.25)) {
        if(sectionFlags[i] === false) continue;
        content.style.transition = "all 0.5s ease";
        content.style.transform = "translateX(-100vW)";
        setTimeout((() => {
          sectionFlags[i] = false;
          content.style.opacity = 0;
        }), 500);
      }
    }
  }

}) // scroll end

// 문서 전체높이
const backgroundBox = document.querySelector("#backgroundBox");
const backgroundMoving = (currentHeight) => {
  const backgroundImg = document.querySelector("#backgroundBox img");
  const backgroundImgHeght = backgroundImg.offsetHeight;
  
  // 이미지 높이 - 화면높이(가변범위)
  const height = backgroundImgHeght - windowHeight;

  // 문서 전체 높이 - 화면 높이(가변높이)
  const docHeight = document.documentElement.scrollHeight;

  backgroundBox.style.top = `${(currentHeight/docHeight)*(height)*(-1)}px`;

};


/* ******************************************************* */
/* ERD 이미지 */
const semiErdImg = document.getElementById("semi-erd");
const finalErdImg = document.getElementById("final-erd");
let semiErdImgTime = false;
let semiErdImgState = false;
let finalErdImgTime = false;
let finalErdImgState = false;

semiErdImg.addEventListener('mouseenter', () => {
  enterEvent();
}); // mouseenter end

semiErdImg.addEventListener("click", () => {
  if(semiErdImgState) {
    if(semiErdImgTime) return;
    leaveEvent();
  } else enterEvent();
}) // click end

semiErdImg.addEventListener('mouseleave', () => {
  leaveEvent();
}); // mouseleave end

const enterEvent = () => {
  if(semiErdImgTime) return;
  semiErdImgTime = true;
  
  semiErdImg.style.transition = "all 0.3s ease";
  semiErdImg.style.cursor = 'pointer';
  semiErdImg.style.position = 'absolute';
  semiErdImg.style.top = '0';
  semiErdImg.style.right = '-10vw';
  semiErdImg.style.zIndex = '1';
  semiErdImg.style.width = '80vw';
  semiErdImg.style.height = 'auto';
  semiErdImg.style.maxHeight = '90vh';
  semiErdImg.style.border = '1px solid black';
  
  setTimeout((() => {
    semiErdImgState = true;
    semiErdImgTime = false;
  }), 300);
}

const leaveEvent = () => {
  if(!semiErdImgState) return;
  semiErdImg.style.transition = "none";
  semiErdImg.style.cursor = 'default';
  semiErdImg.style.position = 'static';
  semiErdImg.style.width = '300px';
  semiErdImg.style.height = 'auto';
  semiErdImg.style.border = 'none';
  semiErdImgState = false;
} // leaveEvent end


finalErdImg.addEventListener('mouseenter', () => {
  enterEvent2();
}); // mouseenter end

finalErdImg.addEventListener("click", () => {
  if(finalErdImgState) {
    if(finalErdImgTime) return;
    leaveEvent2();
  } else enterEvent2();
}) // click end

finalErdImg.addEventListener('mouseleave', () => {
  leaveEvent2();
}); // mouseleave end

const enterEvent2 = () => {
  if(finalErdImgTime) return;
  finalErdImgTime = true;
  
  finalErdImg.style.transition = "all 0.3s ease";
  finalErdImg.style.cursor = 'pointer';
  finalErdImg.style.position = 'absolute';
  finalErdImg.style.top = '0';
  finalErdImg.style.right = '-10vw';
  finalErdImg.style.zIndex = '1';
  finalErdImg.style.width = '80vw';
  finalErdImg.style.height = 'auto';
  finalErdImg.style.maxHeight = '90vh';
  finalErdImg.style.border = '1px solid black';
  
  setTimeout((() => {
    finalErdImgState = true;
    finalErdImgTime = false;
  }), 300);
}

const leaveEvent2 = () => {
  if(!finalErdImgState) return;
  finalErdImg.style.transition = "none";
  finalErdImg.style.cursor = 'default';
  finalErdImg.style.position = 'static';
  finalErdImg.style.width = '300px';
  finalErdImg.style.height = 'auto';
  finalErdImg.style.border = 'none';
  finalErdImgState = false;
} // leaveEvent end

/* ******************************************************* */
/* header-icons */
const headerIcons = document.getElementById("header-icons");

const wave = headerIcons.children;

const waveAnimation = () => {
  // 2초마다 각 아이콘들을화면 오른쪽에서 왼쪽으로 이동
  for(let i = 0; i < wave.length; i++){
    const icon = wave[i];
    
    // 이동과 회전 애니메이션 적용
    setTimeout(() => {
      icon.style.transition = "all 12s linear";
      icon.style.left = "-10vw";
      icon.style.transform = "rotate(-1080deg)";
    }, 2000 * i);
  }
  
  // 각 요소 이동 후 다시시작
  setTimeout(() => {
    for (let i = 0; i < wave.length; i++) {
      const icon = wave[i];
      setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.left = '110vw';
        icon.style.transform = 'rotate(0deg)';
      }, 2000 * i);
      
    }
    setTimeout( () => {waveAnimation()} , 2000);
  }, 2000 * (wave.length - 1 ));
} // waveAnimation end


/* ******************************************************* */
// 모든 <a> 태그 이벤트
document.querySelectorAll('.sliderA').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    let targetElement = document.querySelector(this.getAttribute('href'));
    const headerHeight = windowHeight * 0.2;
    let topData = 0;
    
    while (targetElement) {
      topData += targetElement.offsetTop;
      targetElement = targetElement.offsetParent;
    }
    
    topData = topData - headerHeight;

    // 목표 위치로 스크롤
    window.scrollTo({
      top: topData,
      behavior: 'smooth'
    });
  });
}); // slider a end


/* ******************************************************* */
/* log */
const logSkills = document.querySelectorAll(".skill-relative");
const logChanges = document.querySelectorAll(".skill-change");
const logLogs = document.querySelectorAll(".skill-absolute");

logSkills.forEach((skill, index) => {
  skill.addEventListener('mouseenter', () => {
    logChanges[index].style.opacity = 0;
    logLogs[index].style.display = 'block';
  });
  skill.addEventListener('mouseleave', () => {
    logChanges[index].style.opacity = 1;
    logLogs[index].style.display = 'none';
  });
});

/* ******************************************************* */
/* skillStack2 */

const shyImgs = document.querySelectorAll(".shy-img");
const hiddenImgs = document.querySelectorAll(".hidden-img");

shyImgs.forEach((shyImg, index) => {
  shyImg.addEventListener('mouseenter', () => {
    hiddenImgs[index].style.display = 'flex';
  });
  hiddenImgs[index].addEventListener('mouseleave', () => {
    hiddenImgs[index].style.display = 'none';
  });
});


/* ******************************************************* */
/* comments */
const commentIcon = document.querySelector("#comment");
commentIcon.addEventListener('click', () => {
  footer.style.bottom = 0;
  setTimeout(() => {
    footerFl = false;
  }, 300);
  renderingComments();
}); // click end

const renderingComments = () => {
  footerContents.style.height = '15vh';
  footerContents.style.flexDirection = 'column';
  footerContents.style.justifyContent = 'center';
  footerContents.innerHTML
  = '<h4>댓글 입니다</h4>'
  + `<div id="comments-board" style="border: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'}; border-radius: 5px;">`
  +   `<table id="commentLists" style="border-bottom: 1px solid ${pageTheme.borderColor == "black" ? 'black' : 'white'};">`
  +   '</table>'
  +   `<div class="comments-enter">`
  +     '<span id="comment-count">0/50</span>'
  +     '<input type="text" id="comment-input" placeholder="댓글을 입력해주세요">'
  +     '<div id="comment-enter">입력</div>'
  +   '</div>'
  + '</div>';

  const commentLists = document.querySelector('#commentLists');
  const commentInput = document.querySelector('#comment-input');
  const commentEnter = document.querySelector('#comment-enter');
  const commentCount = document.querySelector('#comment-count');
  commentLists.innerHTML = '';

  fetch('/main/getComments')
  .then(response => response.json())
  .then(comments => {

    if(comments.length === 0){
      commentLists.innerHTML = '댓글이 존재하지 않습니다.';
      return;
    }

    comments.forEach(comment => {
      const commentRow = document.createElement('tr');
      commentRow.innerHTML = `<td><div>${comment.content}</div><div>${comment.regDate}</div></td><td>${comment.writer}</td>`;
      commentRow.classList.add("commentRow");
      commentRow.dataset.commentNo = comment.commentNo;
      commentLists.appendChild(commentRow);
    });

    commentLists.scrollTop = commentLists.scrollHeight;
  }); // fetch end

  commentInput.addEventListener('keyup', (e) => {

    const length = commentInput.value.length;

    if (e.key === 'Enter' && length <= 50) {
      commentEnter.click();
    }

    commentCount.innerText = `${length}/50`;
    if(length > 50){
      commentCount.style.color = 'red';
      return;
    }
    commentCount.style.color = pageTheme.color;


  }); // keyup end

  commentEnter.addEventListener('click', () => {
    const comment = commentInput.value;
    if(comment.length === 0){
      alert("내용을 입력해 주세요");
      return;
    }
    if(comment.length > 50){
      alert("50자 이내의 내용을 입력해 주세요");
      return;
    }

    const sendObj = {
      "content" : comment,
      "writer" : visitor
    }
    fetch('/main/writeComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendObj)
    })
    .then(response => response.json())
    .then(result => {
      if(result.code == 1){
        const comment = result.comment;
        const commentDiv = document.createElement('div');
        commentDiv.innerHTML = `<div>${comment.writer}</div><div>${comment.content}</div><div>${comment.regDate}</div>`;
        commentDiv.classList.add("commentDiv");
        commentDiv.dataset.commentNo = comment.commentNo;
        commentLists.appendChild(commentDiv);
        commentLists.scrollTop = commentLists.scrollHeight;
        commentInput.value = '';
      } else if(result.code == 2){
        alert("입력하신 내용은 추가하실 수 없습니다.");
      } else {
        alert("통신오류가 있습니다.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }); // click end

} // renderingComments end


/* ******************************************************* */
/* setTimeEvent */


const setTimeEvent = () => {
  const clockSurver = document.querySelector('#clock-surver');
  const clockSystem = document.querySelector('#clock-system');
  
  
  let hour;
  let minute;
  let second;
  let ms;
  
  const surverTime = clockSurver.innerText.split(':');
  hour = Number(surverTime[0]);
  minute = Number(surverTime[1]);
  second = Number(surverTime[2].split('.')[0]);
  ms = Number(surverTime[2].split('.')[1]);
  
  // 오라클 시간
  intervalClock("#clock-surver", hour, minute, second, ms);
  
  const now = new Date();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
  ms =  Math.floor(now.getMilliseconds()/10);
  
  // 시스템시간
  intervalClock("#clock-system", hour, minute, second, ms);

  
};


const intervalClock = (clockDomName, hour, minute, second, ms) => {

  const intervalClock = setInterval(() => {
    const clockDom = document.querySelector(`${clockDomName}`);

    if(ms === 100){
      ms = -1;
      second += 1;
    }
    if(second === 60){
      second = 0;
      minute += 1;
    }
    if(minute === 60){
      minute = 0;
      hour += 1;
    }
    if(hour === 24){
      hour = 0;
    }
    
    ms += 1;
    clockDom.innerText = `${zeroSum(hour)}:${zeroSum(minute)}:${zeroSum(second)}.${zeroSum(ms)}`;
  }, 10);
};

const zeroSum = (num) => {
  if(num < 10){
    return `0${num}`;
  }
  return num;
}
