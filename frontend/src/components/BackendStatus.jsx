import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { checkBackendHealth } from "../features/health/healthSlice";

function BackendStatus() {
  const dispatch = useDispatch();

  const { data, loading, success, error } = useSelector(
    (state) => state.health,
  );

  useEffect(() => {
    dispatch(checkBackendHealth());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(checkBackendHealth());
  };

  return (
    <div className="dd-card p-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h5 className="mb-1">Backend Connection</h5>

          <p className="mb-0 small">Spring Boot API connectivity</p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={handleRetry}
          disabled={loading}
        >
          <i className="bi bi-arrow-clockwise me-1" />

          {loading ? "Checking..." : "Retry"}
        </button>
      </div>

      <hr />

      {loading && (
        <div className="text-secondary">
          <span className="spinner-border spinner-border-sm me-2" />
          Checking backend connection...
        </div>
      )}

      {!loading && success && (
        <div className="text-success">
          <i className="bi bi-check-circle-fill me-2" />
          Backend Connected
          <div className="small text-secondary mt-2">
            {data?.message || "Health API responded successfully"}
          </div>
          <div className="small text-secondary mt-1">
            Status: {data?.status || "Connected"}
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-danger">
          <i className="bi bi-exclamation-circle-fill me-2" />
          Backend Connection Failed
          <div className="small mt-2">{error}</div>
        </div>
      )}

      {!loading && !success && !error && (
        <div className="text-secondary">
          Backend connection has not been checked.
        </div>
      )}
    </div>
  );
}

export default BackendStatus;
