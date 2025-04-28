import { useNavigate } from "react-router";
import { useOAuth } from "../hooks/useOAuth";

export function AuthorizeButton() {
  const navigate = useNavigate();
  const { clients } = useOAuth();

  return (
    <button
      onClick={() => navigate("/resource/client/authorize")}
      className="authorize-button"
    >
      Authorize with {clients[0]?.client_id || "OAuth Provider"}
    </button>
  );
}
