import Form from "./components/Form";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Form />
      </QueryClientProvider>
    </div>
  );
}

export default App;
