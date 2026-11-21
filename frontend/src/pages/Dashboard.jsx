import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchDashboardSummary
} from "../features/dashboard/dashboardSlice";

import MetricCard from "../components/MetricCard";

import DashboardCharts from "../components/DashboardCharts";

import BackendStatus from "../components/BackendStatus";

function Dashboard() {

  const dispatch = useDispatch();

  const {
    summary,
    loading,
    error,
    success
  } = useSelector((state) => state.dashboard);

  useEffect(() => {

    dispatch(fetchDashboardSummary());

  }, [dispatch]);

  const handleRefresh = () => {

    dispatch(fetchDashboardSummary());

  };

  const displayValue = (value) => {

    return loading && !success ? "--" : value;

  };

  return (

    <div className="dd-dashboard">

      {/* Page Heading */}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>

          <h1 className="dd-page-title">
            Dashboard Overview
          </h1>

          <p className="dd-page-subtitle">
            Monitor your DairyDash AI enterprise operations.
          </p>

        </div>

        <button
          type="button"
          className="btn btn-dd-primary"
          onClick={handleRefresh}
          disabled={loading}
        >

          <i className="bi bi-arrow-clockwise me-2" />

          {loading ? "Refreshing..." : "Refresh Data"}

        </button>

      </div>

      {/* Error Message */}

      {error && (

        <div className="dd-dashboard-error mb-4">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

            <div>
              <i className="bi bi-exclamation-triangle-fill me-2" />
              Unable to load dashboard summary: {error}
            </div>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={handleRefresh}
            >
              Retry
            </button>

          </div>

        </div>

      )}

      {/* Loading Message */}

      {loading && (

        <div className="dd-dashboard-loading mb-3">

          <span className="spinner-border spinner-border-sm me-2" />

          Loading dashboard information...

        </div>

      )}

      {/* Metric Cards */}

      <div className="row g-4 mb-4">

        <div className="col-sm-6 col-xl-4">

          <MetricCard
            title="Total Products"
            value={displayValue(summary.totalProducts)}
            icon="bi-box-seam"
            description="Products registered in the system"
            iconColor="#2f855a"
            iconBackground="#e8f2ec"
          />

        </div>

        <div className="col-sm-6 col-xl-4">

          <MetricCard
            title="Total Categories"
            value={displayValue(summary.totalCategories)}
            icon="bi-tags"
            description="Product categories registered"
            iconColor="#3182ce"
            iconBackground="#e8f1fb"
          />

        </div>

        <div className="col-sm-6 col-xl-4">

          <MetricCard
            title="Total Suppliers"
            value={displayValue(summary.totalSuppliers)}
            icon="bi-truck"
            description="Suppliers registered in the system"
            iconColor="#b7791f"
            iconBackground="#fff4dc"
          />

        </div>

      </div>

      {/* Charts */}

      <div className="mb-4">

        <DashboardCharts />

      </div>

      {/* System Status */}

      <div className="row g-4">

        <div className="col-lg-6">

          <BackendStatus />

        </div>

        <div className="col-lg-6">

          <div className="dd-card p-4 h-100">

            <h5 className="mb-2">
              Platform Modules
            </h5>

            <p className="small mb-3">
              Current frontend implementation status
            </p>

            <div className="dd-module-status">

              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Category Management</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Product Management</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Supplier Management</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2">
                <span>Inventory Management</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2 border-top">
                <span>Purchase Orders</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2 border-top">
                <span>Warehouses & Reports</span>
                <span className="text-success">Available</span>
              </div>

              <div className="d-flex justify-content-between py-2 border-top">
                <span>Users & Roles</span>
                <span className="text-success">Directory</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
