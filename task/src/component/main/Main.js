import { useNavigate } from 'react-router-dom';
import './Main.scss';

const Main = () => {
    const navigate = useNavigate();

    return (
        <div className='main_entire_section'>
            <div className='btn_section'>
                <button type='button' onClick={() => navigate('/signIn')}>로그인하러가기</button>
                <button type='button' onClick={() => navigate('/signUp')}>회원가입하러가기</button>
            </div>
        </div>
    )
}

export default Main;