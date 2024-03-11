

import { useEffect, useRef, useState } from "react";
import TodoItem from "../Components/TodoItem";

import { todolistHardData } from "./../Utils/todolistHardData"

import { addTodo } from "../Store/todolistSlice";
import { useDispatch, useSelector } from "react-redux";

const Todolist = () => {
    const todotext = useRef("")

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const dispatch = useDispatch()
    const todolist = useSelector((state) => state.todolist)
    console.log(todolist)


    useEffect(() => {
        if (showErrorMessage) {
            const timeoutId = setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [showErrorMessage]);

    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest text-center">Day Goals!</h1>
                        <div className="flex mt-4 gap-2">
                            <input
                                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Add a Todo"
                                ref={todotext}
                            />

                            <button className="flex-none px-4 py-2 border-2 border-teal-500 rounded-lg text-teal-500 hover:text-white hover:bg-teal-500 focus:outline-none focus:border-teal-700"
                                onClick={() => {
                                    const currentTodoText = todotext.current.value;
                                    if (currentTodoText) {
                                        dispatch(addTodo(currentTodoText))
                                        todotext.current.value = ""
                                    }
                                    else {
                                        setShowErrorMessage(true)
                                    }

                                }}>
                                Add Todo
                            </button>
                        </div>
                        <div>
                            {showErrorMessage && < span className="text-red-500">Please Enter Todo</span>}
                        </div>
                    </div>
                    <ul>
                        {todotext && todolist.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} todotext={todotext} setShowErrorMessage={setShowErrorMessage} />
                        ))}

                    </ul>
                </div>
            </div>

        </div >
    )
}

export default Todolist