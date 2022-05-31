import "./App.css";
import FamilyTree from "./component/family-tree/family-tree.component";
import familyTree from "./constant/family-tree.json";

const App = () => {
  return <FamilyTree people={familyTree} />;
};

export default App;
