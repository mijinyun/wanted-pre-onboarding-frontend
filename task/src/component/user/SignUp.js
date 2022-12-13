import axios from 'axios';
import {createRef , useState} from 'react'
import { useNavigate } from 'react-router-dom';

const apiURL = 'https://pre-onboarding-selection-task.shop/';

const SignUp = () => {

    const navigate = useNavigate();

    const [userInfo , setUserInfo] = useState({
        email:'', pw:'',validEmail: false, validPW: false,
    });

    const email = createRef();
    const pw = createRef();

    // 이메일, 패스워드 유효성 검사
    const checking = (e) => {

        setUserInfo({
            ...userInfo,
            email : email.current.value,
            pw : pw.current.value,
            validEmail: email.current.value.includes('@'),
            validPW: pw.current.value.length >=8,
        })
    }

    //회원가입 실행
    const register = (e) => {
        e.preventDefault();
        const { email , pw } = userInfo;

        axios({
            method:'post',
            url: apiURL + 'auth/signup',
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
            if (data.status === 201) {alert('회원가입완료!'); navigate('/signIn');}
            else if (data.status === 400) alert('해당 이메일이 존재함.')
        })
    }


    return (

        <>
            <div className="warningText"></div>
            <form>
                이메일: <input type="email" ref={email} name="email" onChange={checking}></input>
                비밀번호: <input type="password" ref={pw} name="pw" onChange={checking}></input>
                <button 
                    type='button' 
                    className="signBtn" 
                    disabled = {userInfo.validEmail && userInfo.validPW == true ? false : true}
                    onClick={register}>회원가입</button>
            </form>
        </>
    )
}

export default SignUp;