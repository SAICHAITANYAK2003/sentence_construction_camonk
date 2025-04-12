import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { QuizProvider } from "./context/QuizContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Questions from "@/pages/Questions";
import Results from "@/pages/Results";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/questions" component={Questions} />
      <Route path="/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <div className="app-container">
          <Router />
        </div>
        <Toaster />
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;
