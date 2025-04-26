// route("products/:pid", "./product.tsx");
import { useFetcher } from "react-router";

export default function Product() {
  const getFetcher = useFetcher();
  const postFetcher = useFetcher();

  //   // Function to handle GET request
  //   function handleGetRequest() {
  //     getFetcher.load("/resource");
  //   }

  return (
    <div>
      <h1>Resource Routes Demo</h1>

      {/* GET Request Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h2>GET Request</h2>
        <button
          onClick={function () {
            getFetcher.load("/resource");
          }}
          style={{
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Fetch Data (GET)
        </button>
        {getFetcher.state !== "idle" && (
          <span style={{ marginLeft: "10px" }}> Loading...</span>
        )}

        {getFetcher.data && (
          <div style={{ marginTop: "15px" }}>
            <h3>GET Response:</h3>
            <pre
              style={{
                background: "#f5f5f5",
                color: "black",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {JSON.stringify(getFetcher.data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* POST Request Section */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h2>POST Request</h2>
        <postFetcher.Form method="post" action="/resource">
          <input
            type="text"
            name="message"
            defaultValue="Hello from POST request"
            style={{
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit Data (POST)
          </button>
        </postFetcher.Form>
        {postFetcher.state !== "idle" && (
          <span style={{ marginLeft: "10px" }}> Submitting...</span>
        )}

        {postFetcher.data && (
          <div style={{ marginTop: "15px" }}>
            <h3>POST Response:</h3>
            <pre
              style={{
                background: "#f5f5f5",
                color: "black",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {JSON.stringify(postFetcher.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
