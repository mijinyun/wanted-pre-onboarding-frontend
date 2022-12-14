
const Todo = (props) => {
    const todoInfos = props.todoInfos;

    return(
        <>
        {todoInfos.map((todoinfo) => {
            return (
                <div style={{display:'flex'}}>
                <div>{todoinfo.todo}</div>
                <div>{todoinfo.isCompleted == false ? <span> x </span> :  <span> V </span>}</div>
                <button>수정</button>
                <button>삭제</button>
                </div>
            )
        })

        }
        </>
    )
}

export default Todo;
