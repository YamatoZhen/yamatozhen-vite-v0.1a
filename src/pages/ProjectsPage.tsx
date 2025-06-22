import Dropdown from "../components/dropdown/dropdown";
import Loader from "../components/loader/Loader";

const dropItems = [
  { href: "#item1", label: "item" },
  { href: "#item2", label: "item" },
  { href: "#item3", label: "item" },
  { href: "#item4", label: "item" }
]

function ProjectsPage(){
  return (
    <>
    <section className='home-section'>
    <div>
          <Loader/>
        </div>
      <Dropdown position="right" iconName="add" items={dropItems} label={"dropdown"} id={"0"} type={"outlined"}/>
    </section>
    </>
  );
};

export default ProjectsPage;