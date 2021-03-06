const yesorno = "https://yesno.wtf/api";
const xhr = new XMLHttpRequest();
const result = document.getElementById("result");
const questionForm = document.getElementById("question-form");
const questionInput = document.getElementById("question-input");
questionForm.addEventListener("submit", e => {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false); // 호환성
  if (questionInput.value !== "") {
    xhr.open("GET", yesorno);
    xhr.send(null);
    Answer(null, null, result); // 로딩 상태로 초기화
    xhr.onreadystatechange = () => {
      const DONE = 4;
      const OK = 200;
      if (xhr.readyState === DONE) {
        if (xhr.status == OK) {
          const { answer } = JSON.parse(xhr.responseText);
          Answer(answer, questionInput.value, result);
        } else {
          console.error("Error : " + xhr.status);
        }
      }
    };
  } else {
    alert("질문을 입력해주세요.");
  }
  return false;
});

const Answer = (answer, text, target) => {
  if (answer === "yes") {
    target.innerHTML = `
        <div class="card round-bordered flex-center result-yes" id="result">
          <p id="result-question">${text} : </p>
          <p id="result-large">해라</p>
          <button onClick="closeCard()" class="button" id="close-card">닫기</button>
        </div>
      `;
  } else if (answer === "no") {
    target.innerHTML = `
        <div class="card round-bordered flex-center result-no" id="result">
          <p id="result-question">${text} : </p>
          <p id="result-large">하지마라</p>
          <button onClick="closeCard()" class="button" id="close-card">닫기</button>
        </div>
      `;
  } else {
    target.innerHTML = `
        <div class="card round-bordered flex-center result-loading" id="result">
          <p>결정 중...</p>
        </div>
      `;
  }
};

const closeCard = () => {
  result.innerHTML = "";
};
