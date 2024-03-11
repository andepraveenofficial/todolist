
import { BsPencilFill } from 'react-icons/bs'
import { TbCircleXFilled } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { deleteTodo, editTodo } from '../Store/todolistSlice'

const TodoItem = ({ todo, todotext, setShowErrorMessage }) => {
    const { id, item, updatedCount } = todo

    const dispatch = useDispatch()
    return (
        <div className="flex mb-4 items-center">
            <p className="w-full text-grey-darkest">
                {`${item} (Updated ${updatedCount} Times)`}
            </p>
            <button
                className="flex-none p-2 ml-4 mr-2 hover:text-white text-green-500 hover:bg-green-500 focus:outline-none border rounded-md"
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
                <BsPencilFill className="h-6 w-6 " />
            </button>

            <button
                className="flex-none p-2 ml-2 text-red-500 hover:text-white hover:bg-red-500 focus:outline-none border rounded-md"
                onClick={() => { dispatch((deleteTodo(id))) }}
            >
                <TbCircleXFilled className="h-6 w-6" />
            </button>
        </div>
    )
}

export default TodoItem