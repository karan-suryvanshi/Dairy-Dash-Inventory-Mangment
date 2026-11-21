import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="dd-card p-5 text-center">
      <h1 className="display-4 fw-bold">404</h1>

      <h4>Page Not Found</h4>

      <p>
        The page you are looking for does not exist.
      </p>

      <Link
        to="/admin/dashboard"
        className="btn btn-dd-primary"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;