import { createRef, useCallback, useEffect, useState } from 'react';
import Todo from './Todo';
import axios from 'axios';
import './TodoList.scss';
import {BsPlusLg} from 'react-icons/bs';

const apiURL = 'https://pre-onboarding-selection-task.shop/';


const TodoList = () => {

    const [todoInfos ,setTodoInfos] = useState([]);
    const [Num, setNum] = useState(1);
    const content = createRef();

    const getTodo = () => {

        axios({
            method:'get',
            url: apiURL + 'todos',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
            }
        })
        .then((res) => { return res;})
        .then((data) => {
            setTodoInfos(data.data);
        })
    }


    const CreateTodo = () => {

        axios({
            method:'post',
            url: apiURL + 'todos',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
                "Content-Type": `application/json`,
            },
            data: {
                id : Num + 1,
                todo: content.current.value
            }
        })
        .then((res) => { return res })
        .then((data) => {
            console.log('등록성공!');
            setTodoInfos(todoInfos.concat(data.data));
            content.current.value="";
        })
    }

    useEffect(() => {
        getTodo();
    },[],[setTodoInfos])

    return(
        <div className='Todo_entire_section'>
            <div className='todo_part'>
                <h1>TODO LIST</h1>
                <div className='input_section'>
                    <input type="text" ref={content} placeholder="해야할 일을 입력해보세요!"></input>
                    <button type='button' onClick={CreateTodo}><BsPlusLg /></button>
                </div>
                <div>
                    {todoInfos.map((todoInfo) => {
                        return (
                        <Todo todoInfo={todoInfo} setTodoInfos={setTodoInfos} getTodo={getTodo}/>
                    )})}
                </div>
            </div>
        </div>

    )
}

export default TodoList;