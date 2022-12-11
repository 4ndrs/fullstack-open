import { gql, useQuery } from "@apollo/client";
const ALL_PERSON = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;
const App = () => {
  const result = useQuery(ALL_PERSON);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
        </div>
      ))}
    </div>
  );
};

export default App;
