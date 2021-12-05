import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
    
    return (
        // Use a react fragment here
        <>
            {tasks.map((task, index) => (<Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}></Task>))}
        </>
    );
};

Tasks.defaultProps = {
    tasks: [],
};

export default Tasks;
