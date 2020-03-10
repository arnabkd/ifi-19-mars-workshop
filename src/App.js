import React, { useState } from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { getTwitterDataFor } from "./utils";
import { client } from "./utils";
import { TextField } from "@material-ui/core";

function App() {
  const [data, setData] = useState("");
  const [userToStalk, setUserToStalk] = useState("");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const result = await getTwitterDataFor(userToStalk);
            const parsed = JSON.stringify(result, undefined, 2);
            setData(parsed);
          }}
        >
          <>
            <TextField
              onChange={e => setUserToStalk(e.currentTarget.value)}
            ></TextField>
            <Button type="submit">See latest tweet</Button>
          </>
        </form>

        <pre style={{ textAlign: "justify" }}>
          <code>{data}</code>
        </pre>
      </div>
    </ApolloProvider>
  );
}

export default App;
