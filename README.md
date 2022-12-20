## wanted-pre-onboarding-frontend : task

## 💡실행방법

```
npm i
npm start
```

## 📌경로설명

```
- / : 메인
- /signUp : 회원가입
- /signIn :로그인
- /todo : todolist 목록
```

## 📌구조

```
📦src
 ┣ 📂component
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜Main.js
 ┃ ┃ ┗ 📜Main.scss
 ┃ ┣ 📂todoList
 ┃ ┃ ┣ 📜Todo.js
 ┃ ┃ ┣ 📜Todo.scss
 ┃ ┃ ┣ 📜TodoList.js
 ┃ ┃ ┗ 📜TodoList.scss
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📜SignIn.js
 ┃ ┃ ┣ 📜SignIn.scss
 ┃ ┃ ┣ 📜SignUp.js
 ┃ ┃ ┗ 📜SignUp.scss
 ┃ ┗ 📜Commons.scss
 ┣ 📂utils
 ┃ ┗ 📜Router.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┗ 📜index.js
```

## 📌구조 설계 이유

**1. 로그인 / 회원가입**

```javascript
const [userInfo, setUserInfo] = useState({
  email: "",
  pw: "",
  validEmail: false,
  validPW: false,
});
```

- 로그인, 회원가입 모두 이메일, 패스워드 입력창이 각각 하나밖에 없기 때문에 실시간으로 입력되는 값에 따라 유효성 검사를 하고자 useState로 이메일, 패스워드, 유효성검사들을 한번에 생성하였습니다.
- 즉, 위처럼 실시간으로 입력되는 값을 받기 위해서 `createRef`를 사용하여 input값을 가져와 userInfo 에 설정해주었습니다.

```javascript
disabled = {userInfo.validEmail && userInfo.validPW == true ? false : true};
```

- button의 비활성화도 마찬가지로 useState에 저장된 유효성 검사 값을 활용해서 설정해주었습니다.

`💡정리해서, 버튼 비활성화, 유효성검사를 처리하기 위해 useState에 모두 한번에 설정해 준 것입니다. `

**+)token**

- 로그인 여부에 따라서 리다이렉트 처리를 구현한다는 것이 토큰 유무에 따라 이동시켜준다고 판단하여 token state 변동에 따른 useEffect를 사용하였습니다.

**2. CRUD**

- 우선, CRUD로 구분짓기에 앞서 TodoList, Todo 로 컴포넌트를 분리한 이유는 TodoList는 전체적인 데이터를 관리한다고 생각하고, Todo는 그 안에 있는 개별적으로 하나 하나를 관리하는 것이라고 생각하여 분리하였습니다.
  그렇기에 TodoList에서는 전체데이터를 불러오는 getTodo, 전체데이터에 추가하는 createTodo를 작성하였고 Todo에는 TodoList로부터 props (전체 데이터 중 한개씩)를 전달받아 개별적인 데이터 하나의 객체를 수정하는 update , 삭제하는 delete를 작성하였습니다.

```javascript
const apiURL = "https://pre-onboarding-selection-task.shop/";
```

- api 주소설정은 각 컴포넌트마다 선언해주었는데 이 부분의 경우 api 모듈을 따로 분리해서 사용하는 것이 좋다고 생각합니다.

```javascript
// delete 파트
const [visible, setVisible] = useState(true);
.
.
<button type='button' className='deletebtn' value={eachTodo.id} onClick={(e) => deleteTodo(e.target.value)}>삭제</button>
```

- 저는 위의 delete부분에서는 delete함수에 삭제하고자 하는 id값을 전달하기 위해 button value에 컴포넌트에 전달받은 객체 중 id 값을 담아주고 이 값을 onClick 이벤트 함수에 사용하였습니다. ( 이부분은 그냥 delete(id))로 해도 되었던 것 같습니다.) 이 때, 데이터상으로는 해당 id값이 삭제가 되지만 앞단에서는 해당 값이 아닌 가장 마지막에 create된 id값을 가진 컴포넌트가 삭제되는 것 처럼 보였습니다. 이를 해결하기 위해서
  `const [visible, setVisible] = useState(true)`를 설정해준 것입니다. 즉, 데이터 삭제가 되면 visible이 false가 되어 컴포넌트가 보이지 않게 설정.

**3. +) style-component를 아직 사용해본적이 없기 때문에 scss를 사용하였습니다.**

## 📌시연영상

##### 1. 로그인 / 회원가입 / todo list 기능 구현

<img src="https://user-images.githubusercontent.com/107825260/207725889-5563ad87-c25b-422a-adc0-272e79f919a8.gif">

##### 2. 토큰 유무에 따른 redirect확인

<img src="https://user-images.githubusercontent.com/107825260/207725962-e7b760d7-ccbf-4010-aafe-8c937cf860d3.gif">

## 📌구현 요구 사항 목록

##### 1. 로그인 / 회원가입

`/`경로에 로그인 / 회원가입 기능을 개발해주세요

- 페이지 안에 이메일 입력창, 비밀번호 입력창, 제출 버튼이 포함된 형태로 구성해주세요
- 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다.

##### Assignment1

- 이메일과 비밀번호의 유효성 검사기능을 구현해주세요
  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상
  - 입력된 이메일과 비밀번호가 위 조건을 만족할 때만 버튼이 활성화 되도록 해주세요
  - 보안 상 실제 사용하고 계신 이메일과 패스워드말고 테스트용 이메일, 패스워드 사용을 권장드립니다.

##### Assignment2

- 로그인 API를 호출하고, 올바른 응답을 받았을 때

  `/todo`경로로 이동해주세요

  - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요

##### Assignment3

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요
  - 로컬 스토리지에 토큰이 있는 상태로 `/` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/` 경로로 리다이렉트 시켜주세요

---

##### 2. TODO LIST

##### Assignment4

- `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시되어야 합니다.
- 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가되도록 해주세요

##### Assignment5

- 투두 리스트의 수정, 삭제 기능을 구현해주세요
  - 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화되고 투두 리스트의 내용을 수정할 수 있도록 해주세요
  - 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출하거나 수정을 취소할 수 있도록 해주세요
  - 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제되도록 해주세요

---
