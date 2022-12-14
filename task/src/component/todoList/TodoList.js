import { createRef, useCallback, useEffect, useState } from 'react';
import Todo from './Todo';
import axios from 'axios';

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
            console.log(data.data);
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
            console.log(data.data); 
            console.log('등록성공!');
            setTodoInfos(todoInfos.concat(data.data));
            console.log('todoInfos:',todoInfos);
            
        })
    }

    useEffect(() => {
        getTodo();
    },[],[setTodoInfos])

    return(
        <>
        <div>
            입력창 <input type="text" ref={content}></input>
            <button type='button' onClick={CreateTodo}>+</button>
        </div>
        <div>
            <Todo todoInfos={todoInfos}/>
        </div>
        </>

    )
}

export default TodoList;