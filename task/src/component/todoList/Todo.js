import { useState } from 'react';
import axios from 'axios';
import './Todo.scss';
import {FcApproval} from 'react-icons/fc';

const apiURL = 'https://pre-onboarding-selection-task.shop/';

const Todo = (props) => {
    
    const getTodo = props.getTodo;
    const [eachTodo, setEachTodo] = useState(props.todoInfo);
    const [editMode , setEditMode] = useState(false);
    const [editInput, setEditInput] = useState(eachTodo.todo);
    const [check, setCheck] = useState(false);

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

    const deleteTodo = (id) => {
        console.log(id);
        axios({
            method:'delete',
            url: apiURL + `todos/` + id,
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        .then((res) => {return res})
        .then((data) => {
            // console.log(data);
            if (data.status === 204) {
                getTodo();
            }
        })
    }

    const changeCheck = (checked) => {
        if(checked) setCheck(true);
        else setCheck(false);
    }



    return(
        <div className="todo_entire_section">
            <table className='todo_table'>
                <input type='checkbox' onChange={(e) => changeCheck(e.target.checked)}></input>
                <tr key={eachTodo.id}  style={{display:'table', width:'100%',alignContent:'center'}}>
                    <td className='todo_input_section'>
                        { editMode ? <input type='text' className="updateInputSection" onChange={(e) => setEditInput(e.target.value)} defaultValue={editInput}></input> : <div>{eachTodo.todo}</div> }
                    </td>
                    <td style={{width:'10%'}}>{check == false ? <span> x </span> :  <span> <FcApproval /> </span>}</td>
                    <td style={{width:'15%'}}>
                        { editMode ? 
                            (<div>
                                <button type='button' className='completebtn' onClick={completeTodo}>완료</button>
                                <button type='button' className='cancelbtn' onClick={cancelTodo}>취소</button>
                            </div>) 
                        : 
                        (<button type='button' className='updatebtn' onClick={updateTodo}>수정</button>)}
                    </td>
                    <td style={{width:'10%'}}>
                        <button type='button' className='deletebtn' value={eachTodo.id} onClick={(e) => deleteTodo(e.target.value)}>삭제</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Todo;