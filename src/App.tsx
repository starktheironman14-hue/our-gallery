import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import EntryGate from './components/EntryGate/EntryGate';

function App() {
  const [entryGranted, setEntryGranted] = useState(false);

  // Show entry gate if not granted access
  if (!entryGranted) {
    return <EntryGate onSuccess={() => setEntryGranted(true)} />;
  }

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
