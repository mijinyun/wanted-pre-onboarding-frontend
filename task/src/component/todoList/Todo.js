import { useState } from 'react';
import axios from 'axios';

const apiURL = 'https://pre-onboarding-selection-task.shop/';

const Todo = (props) => {
    
    const [eachTodo, setEachTodo] = useState(props.todoInfo);
    const [editMode , setEditMode] = useState(false);
    const [editInput, setEditInput] = useState(eachTodo.todo);

    const updateTodo = () => {
        setEditMode(true);
    }

    const cancelTodo = () => {
        setEditMode(false);
    }

    const completeTodo = () => {
        
        console.log('editInput:',editInput);
        axios({
            method:'PUT',
            url: apiURL + `todos/${eachTodo.id}`,
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
                "Content-Type": `application/json`,
            },
            data : {
                todo : editInput,
                isCompleted : eachTodo.isCompleted,
            }
        })
        .then((res) => { return res.data; })
        .then((data) => {
            console.log('수정성공');
            setEachTodo({
                ...eachTodo,
                todo: editInput
            })
            setEditMode(false);
        })
    }

    const deleteTodo = () => {
        
        axios({
            method:'delete',
            url: apiURL + `todos/` + eachTodo.id,
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        .then((res) => {return res})
        .then((data) => {
            // console.log(data);
            if (data.status === 204) {
                document.querySelector('.test').remove();
            }
        })
    }



    return(
        <div className="test">
            <div key={eachTodo.id} style={{display:'flex'}}>
                    { editMode ? <input type='text' onChange={(e) => setEditInput(e.target.value)} defaultValue={editInput}></input> : <div>{eachTodo.todo}</div> }

                    <div>{eachTodo.isCompleted == false ? <span> x </span> :  <span> V </span>}</div>

                    { editMode ? 
                        (<div>
                            <button type='button' onClick={completeTodo}>완료</button>
                            <button type='button' onClick={cancelTodo}>취소</button>
                        </div>) 
                    : 
                    (<button type='button' onClick={updateTodo}>수정</button>)}

                    <button type='button' onClick={deleteTodo}>삭제</button>
                </div>
        </div>
    )
}

export default Todo;
