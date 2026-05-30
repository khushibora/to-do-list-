import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() =>{
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [task, setTask] = useState("");
  const AddTask = () => {
    if (task.trim() === "") return; {/* Prevent adding empty tasks1*/}

  setTasks([...tasks, {
    text: task,
    completed: false,    /*updated array string of task into object */
  },
]);
  setTask("");
}

{/*delete function*/}
const deleteTask = (indexToDelete) => {
  
  const updatedTasks = tasks.filter((item, index) => index !== indexToDelete);
  setTasks(updatedTasks);
};

/*complete function*/
const completeTask = (indexToComplete) => {
  const updatedTasks = tasks.map((item, index) => {
    if(index===indexToComplete){
  return {
    text: item.text,
    completed: !item.completed, /*toggle completed status*/ 
  };
  }
  return item;
});
setTasks(updatedTasks);
};

useEffect(() => {
localStorage.setItem("tasks", JSON.stringify(tasks)); //saves tasks to local storage whenever tasks state changes//
},[tasks]); //runs whenever tasks state changes, can be used for side effects like saving to local storage//  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5E6D3]">
    <div className="w-87.5 bg-[#FFF8EA] rounded-[30px] p-6 shadow-xl min-h-137.5 flex flex-col items-center">
      <h1 className=" mt-4 text-3xl font-bold text-center text-[#5C4033]">
        To-Do List App
      </h1>
      <p className="text-center mt-2 text-[#7A5C4D]">Organize your day</p>
      <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="To-Do List" className="mx-auto mt-4 w-40" />
      
      <input
      type="text"
      placeholder="Write your task..."
      value={task}
      onChange={(e) => setTask(e.target.value)} 
      className="w-full mt-6 p-3 rounded-2xl border"
      />
      <p className="mt-4 text-[#5C4033]">
  Current Task: {task}
</p>
      <button onClick={AddTask} className="w-full mt-8 bg-[#E6B566] text-white py-3 rounded-2xl">Add Task</button>
      <div className=" w-full mt-6 flex-1 overflow-auto "> {/*flex-1: takes up remaining space, overflow-auto: adds scrollbar if content exceeds container height*/}

      {/* task card */}
        {tasks.map((item, index) => (
          <div
          key={index}

           className="bg-[#FFF8EA] rounded-xl p-4 shadow-md m-2 flex justify-between">
           <div><input type="checkbox" 
           checked={item.completed}
           onChange={() => completeTask(index)}
           ></input><span className={item.completed ? "line-through text-[#7A5C4D]" : ""}>{item.text}</span>
           </div>      {/* grouped this tags together to avoid cramped spacing */}
           
            <button onClick={() => deleteTask(index)}>Delete</button>
            
           </div>))}
      </div>
    </div>
    </div>
  )

}



export default App