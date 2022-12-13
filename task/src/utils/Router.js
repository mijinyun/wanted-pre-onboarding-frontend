import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TodoList from '../component/todoList/TodoList';
import SignIn from '../component/user/SignIn';
import SignUp from '../component/user/SignUp';

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