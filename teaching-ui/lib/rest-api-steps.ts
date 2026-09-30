export interface RestApiStep {
  title: string;
  explanation: string;
  showRequest: boolean;
  showResponse: boolean;
  activeNode: "client" | "server" | null;
  clientDetail: string;
  serverDetail: string;
}

// This is a hand-authored example for the UI, not an AI output contract.
export const restApiSteps: readonly RestApiStep[] = [
  {
    title: "Two programs, one conversation",
    explanation: "Your browser is the client. The API server is a separate program that can provide data to it.",
    showRequest: false,
    showResponse: false,
    activeNode: null,
    clientDetail: "Wants a list of books",
    serverDetail: "Provides book data",
  },
  {
    title: "The client sends a request",
    explanation: "The browser sends an HTTP GET request to /books. GET asks the server to return a resource.",
    showRequest: true,
    showResponse: false,
    activeNode: "client",
    clientDetail: "Sends GET /books",
    serverDetail: "Receives the request",
  },
  {
    title: "The server handles it",
    explanation: "The API server reads the request, finds the book data, and prepares a response.",
    showRequest: true,
    showResponse: false,
    activeNode: "server",
    clientDetail: "Waits for a response",
    serverDetail: "Finds the books",
  },
  {
    title: "The server sends a response",
    explanation: "The server replies with an HTTP status (200 OK) and the requested book data. In this example, the data is JSON.",
    showRequest: true,
    showResponse: true,
    activeNode: "server",
    clientDetail: "Receives the response",
    serverDetail: "Sends 200 OK + JSON",
  },
  {
    title: "The client uses the data",
    explanation: "The browser reads the JSON and can display the books to the user. The request and response are complete.",
    showRequest: true,
    showResponse: true,
    activeNode: "client",
    clientDetail: "Displays the books",
    serverDetail: "Request complete",
  },
];
