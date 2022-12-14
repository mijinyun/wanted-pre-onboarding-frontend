import axios from 'axios';
import {createRef , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SignUp.scss';

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
    
    console.log(userInfo);

    //회원가입 실행
    const register = (e) => {
        e.preventDefault();
        const { email , pw } = userInfo;
        console.log(email);
        console.log(pw);
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
            console.log(data);
            if (data.status === 201) {
                alert('회원가입완료!'); 
                navigate('/signIn');
            } 
        })
        .catch((err) => {
            document.querySelector('.warning').innerHTML = `<p style="color:red;">해당 이메일은 이미 존재합니다.</p>`;
        })
    }

    return (

        <div className='signup_entire_section'>
            <h1>SIGN UP</h1>
            <div className="warning"></div>
            <form>
                <input type="email" ref={email} name="email" placeholder="이메일을 입력해주세요. (ex)abc@abc.abc" onChange={checking}></input>
                <input type="password" ref={pw} name="pw" placeholder='비밀번호를 입력해주세요.(8자이상)' onChange={checking}></input>
                <button 
                    type='button' 
                    className="signBtn" 
                    disabled = {userInfo.validEmail && userInfo.validPW == true ? false : true}
                    onClick={register}>회원가입</button>
            </form>
        </div>
    )
}

export default SignUp;