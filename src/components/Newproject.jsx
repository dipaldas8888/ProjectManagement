import { useRef } from 'react';

function Newproject({ onAdd, onCancel }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();


    const dueDateFromInput = dueDateRef.current.value;
    let formattedDueDate;

    if (dueDateFromInput instanceof Date) {
      formattedDueDate = dueDateFromInput.toISOString(); // Converts Date object to ISO 8601 UTC string
    } else if (typeof dueDateFromInput === 'string') {
      // If it's a date string without time, append a default time (midnight UTC)
      formattedDueDate = `${dueDateFromInput}T00:00:00Z`;
    } else {
      // Handle other cases or set a default
      formattedDueDate = new Date().toISOString(); // Example: current time in UTC
    }




    const projectData = JSON.stringify({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: formattedDueDate,
    });

    console.log('Project Data:', projectData);
    handleCreateProject(projectData);
    onAdd(projectData);
  }


  const handleCreateProject = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/projects", requestOptions);
      const result = await response.text(); // Or response.json() if your API returns JSON
      console.log(result);
      // Optionally, update your component's state or trigger a re-render
    } catch (error) {
      console.error('error', error);
      // Optionally, update your component's state to display an error message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 border rounded shadow-md bg-stone-100"
    >
      <div>
        <label className="block text-sm font-bold text-stone-600">Title</label>
        <input
          type="text"
          ref={titleRef}
          className="w-full p-2 border rounded bg-stone-200"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-600">
          Description
        </label>
        <textarea
          ref={descriptionRef}
          className="w-full p-2 border rounded bg-stone-200"
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-600">Due Date</label>
        <input
          type="date"
          ref={dueDateRef}
          className="w-full p-2 border rounded bg-stone-200"
        //  S required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-bold text-white bg-green-500 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default Newproject;