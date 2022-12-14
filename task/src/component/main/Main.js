import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <button type='button' onClick={() => navigate('/signIn')}>로그인하러가기</button>
            <button type='button' onClick={() => navigate('/signUp')}>회원가입하러가기</button>
        </>
    )
}

export default Main;