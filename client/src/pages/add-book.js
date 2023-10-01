import AddBookForm from '../components/AddBookForm';
import Navbar  from '../components/Navbar';


export default function AddBookPage() {
  return (
    <div>
      <Navbar />
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginTop: '15px', color: 'black', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
  Add a New One...
</h1>

      <AddBookForm />
    </div>
  );
}