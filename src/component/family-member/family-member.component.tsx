import { Person } from "../../model/person";
import { combineClassNames } from "../../utils/css-utils";
import "./family-member.css";

interface Props {
  person: Person;
  level: number;
}

const FamilyMember = ({ person }: Props) => {
  const classes = combineClassNames(
    "family-member",
    person.gender == "male" ? "male-family-member" : "female-family-member"
  );

  return <div className={classes}>{person.name}</div>;
};

export default FamilyMember;
