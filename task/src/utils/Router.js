import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from '../component/todoList/TodoList';
import SignIn from '../component/user/SignIn';
import SignUp from '../component/user/SignUp';

// axios.defaults.baseURL = 'https://pre-onboarding-selection-task.shop/';
// axios.defaults.withCredentials = true;

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signIn" element={<SignIn />}/>
                    <Route path="/signUp" element={<SignUp />}/>
                    <Route path="/todo" element={<TodoList />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default Router;