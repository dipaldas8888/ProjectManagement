import Image from "../assets/no-projects.png";
import Button from "./Button.jsx";
export default function NoprojectSelected({ onStartAddProject }) {
  return (
    <div className="mt-30 ml-5 text-center w-2/3 ">
      <img
        src={Image}
        alt="No Picture Shown"
        className="w-20 h-16 object-contain mx-auto "
      />
      <h2 className="text-xl font-bold text-stone-400 my-4">
        No project selected
      </h2>
      <p className="text-stone-400 mb-4">
        Please select a project from the sidebar
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new Project</Button>
      </p>
    </div>
  );
}
