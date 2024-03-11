

import { useEffect, useRef, useState } from "react";
import TodoItem from "../Components/TodoItem";

// import { todolistHardData } from "./../Utils/todolistHardData"

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
            <div className="flex items-center justify-center w-full min-w-[475px] font-sans h-100 bg-teal-lightest">
                <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-center text-grey-darkest">Day Goals!</h1>
                        <div className="flex gap-2 mt-4">
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Add a Todo"
                                ref={todotext}
                            />

                            <button className="flex-none px-4 py-2 text-teal-500 border-2 border-teal-500 rounded-lg hover:text-white hover:bg-teal-500 focus:outline-none focus:border-teal-700"
                                onClick={() => {
                                    const currentTodoText = todotext.current.value;
                                    if (currentTodoText) {
                                        const todolistItems = currentTodoText.trim().split(" ");
                                        const lastItem = todolistItems.pop()
                                        let todoItemsCount = 1;
                                        if (isNaN(lastItem)) {
                                            todolistItems.push(lastItem)
                                        }
                                        else {
                                            todoItemsCount = parseInt(lastItem)
                                        }

                                        const finalTodotext = todolistItems.join(" ")
                                        dispatch(addTodo({ finalTodotext, todoItemsCount }))
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