
import { BsPencilFill } from 'react-icons/bs'
import { TbCircleXFilled } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { deleteTodo, editTodo } from '../Store/todolistSlice'

const TodoItem = ({ todo, todotext, setShowErrorMessage }) => {
    const { id, item, updatedCount } = todo

    const dispatch = useDispatch()
    return (
        <li className="flex items-center p-3 m-2 mb-4 border shadow-md rounded-xl">
            <p className="w-full text-grey-darkest">
                {`${item} (Updated ${updatedCount} Times)`}
            </p>
            <button
                className="flex-none p-2 ml-4 mr-2 text-green-500 border rounded-md hover:text-white hover:bg-green-500 focus:outline-none"
                onClick={() => {
                    if (todotext.current.value) {
                        dispatch((editTodo({ id, updatedTodoText: todotext.current.value })))
                        todotext.current.value = ""
                    }
                    else {
                        setShowErrorMessage(true)
                    }
                }}
            >
                <BsPencilFill className="w-6 h-6 " />
            </button>

            <button
                className="flex-none p-2 ml-2 text-red-500 border rounded-md hover:text-white hover:bg-red-500 focus:outline-none"
                onClick={() => { dispatch((deleteTodo(id))) }}
            >
                <TbCircleXFilled className="w-6 h-6" />
            </button>
        </li>
    )
}

export default TodoItem