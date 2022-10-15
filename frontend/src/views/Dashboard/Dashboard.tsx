import { FilterProvider } from "../../context/FilterContext";
import { NavBar } from "./components/NavBar";
import { Project } from "./components/Project";

export const Dashboard: React.FC = () => {
  return (
    <>
      <NavBar />
      <FilterProvider>
        <Project />
      </FilterProvider>
    </>
  );
};
