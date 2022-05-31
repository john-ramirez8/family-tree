import { FC, ReactNode } from "react";
import { Person } from "../../model/person";
import FamilyMember from "../family-member/family-member.component";
import "./family-tree.css";

interface Props {
  people: Person[];
}

const hasChildren = (person: Person) => {
  return person.children && person.children.length;
};

const haveSameChildren = (firstPerson: Person, secondPerson: Person) => {
  const sortedFirstChildren = new Set(firstPerson.children);
  const sortedSecondChildren = new Set(secondPerson.children);
  const intersection = new Set(
    [...sortedFirstChildren].filter((x) => sortedSecondChildren.has(x))
  );

  return intersection.size === sortedFirstChildren.size;
};

const findPartner = (familyTree: Person[], person: Person) => {
  return familyTree
    .filter((f) => f.id !== person.id)
    .find((f) => haveSameChildren(person, f));
};

const renderFamilyTree = (
  personId: number,
  wholeTree: Person[],
  level: number
): ReactNode => {
  const person = wholeTree.find((f) => f.id === personId);

  // Can't find the person in the data.
  if (!person) {
    return <></>;
  }

  if (!hasChildren(person)) {
    // Render the person themselves.
    return <FamilyMember person={person} level={level} />;
  } else {
    const partner = findPartner(wholeTree, person);

    // Render the person, their spouse, then their children.
    return (
      <>
        <div className="spouses">
          <FamilyMember person={person} level={level} />
          {partner && <FamilyMember person={partner} level={level++} />}
          <div className="children">
            {person.children.map((childId) => {
              return renderFamilyTree(childId, wholeTree, level);
            })}
          </div>
        </div>
      </>
    );
  }
};

const FamilyTree: FC<Props> = ({ people }) => {
  return (
    <div className="family-tree">
      {renderFamilyTree(people[0]!.id, people, 0)}
    </div>
  );
};

export default FamilyTree;
