import axios from 'axios';
import { createRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiURL = 'https://pre-onboarding-selection-task.shop/';

const SignIn = () => {

    const navigate = useNavigate();

    const [loginInfo , setLoginInfo] = useState({
        email:'', pw:'',validEmail: false, validPW: false,
    });

    const email = createRef();
    const pw = createRef();

    // 이메일, 패스워드 유효성 검사
    const checking = (e) => {

        setLoginInfo({
            ...loginInfo,
            email : email.current.value,
            pw : pw.current.value,
            validEmail: email.current.value.includes('@'),
            validPW: pw.current.value.length >=8,
        })
    }

    const login = (e) => {
        e.preventDefault();
        const { email , pw } = loginInfo;

        axios({
            method:'post',
            url: apiURL + 'auth/signin',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                email: email,
                password: pw,
            }
        })
        .then((res) => { return res })
        .then((data) => {

            console.log(data);
            if (data.status === 200) {
                alert('로그인 성공!'); 
                navigate('/todo');
                localStorage.setItem('access_token',data.data.access_token);
            }
            else if (data.status === 401) alert('아이디 또는 비밀번호 틀림 or 없는 회원');

        })
    }

    return (
        <>
            <form>
                이메일: <input type="email" ref={email} name="email" onChange={checking}></input>
                비밀번호: <input type="password" ref={pw} name="pw" onChange={checking}></input>
                <button 
                    type='button' 
                    className="loginBtn" 
                    disabled = {loginInfo.validEmail && loginInfo.validPW == true ? false : true}
                    onClick={login}>로그인</button>
            </form>
        </>
    )
}

export default SignIn;
