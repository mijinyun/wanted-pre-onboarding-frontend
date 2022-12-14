import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TodoList from '../component/todoList/TodoList';
import SignIn from '../component/user/SignIn';
import SignUp from '../component/user/SignUp';
import Main from '../component/main/Main';


const Router = () => {

    const navigate = useNavigate();
    const [token, setToken] = useState();

    useEffect(() => {
        const isToken = localStorage.getItem('access_token');
        isToken != undefined && setToken(isToken);
        token != undefined? navigate('/todo') : navigate('/');
    },[token])


    return (
        <>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path="/signIn" element={<SignIn />}/>
                <Route path="/signUp" element={<SignUp />}/>
                <Route path="/todo" element={<TodoList />} />
            </Routes>
        </>
    )
}

export default Router;