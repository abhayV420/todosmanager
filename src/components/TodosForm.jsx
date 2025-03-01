import React, {useState} from 'react';
import { useTodo } from '../contexts';
import { audios } from '../assets/audios/audios';

function TodoForm() {
    const [todo, setTodo] = useState('');
    const [msg, setMsg] = useState("🔽");
    const{addTodo} = useTodo();

    const add = (e) => {
        e.preventDefault();
        if(!todo) {
            setMsg("Field is empty ⚠");
            new Audio(audios.errorAudio).play();
        }else if(todo.length < 5){
            setMsg("Todo must be at least 5 characters ⚠");
            new Audio(audios.errorAudio).play();

        }
        else{
            addTodo({todo, completed: false});
            setTodo("")};
            new Audio(audios.addAudio).play();
        }

    return (
        <form onSubmit={add}  className="flex flex-col items-center gap-4">
            <div className={`cursor-default text-lg text-red-600 `} >{msg}</div>
           <div className='flex w-[100%]'>
           <input
            value={todo}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                onChange={(e)=>{
                    setTodo(e.target.value);
                    setMsg('🔽');
                    setBoo(false);
                }}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-red-600 hover:bg-red-700 text-white shrink-0">
                Add
            </button>
           </div>
        </form>
    );
}

export default TodoForm;

