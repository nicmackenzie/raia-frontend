import Petition from './Petition';

function Petitions({ petitions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {petitions.length > 0 &&
        petitions.map(petition => <Petition key={petition.id} {...petition} />)}
    </div>
  );
}

export default Petitions;
