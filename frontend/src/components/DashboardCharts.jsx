import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Demonstration data only.
// Replace with actual inventory and order APIs later.

const monthlyData = [
  { month: "Jan", purchases: 120, sales: 95 },
  { month: "Feb", purchases: 150, sales: 115 },
  { month: "Mar", purchases: 135, sales: 110 },
  { month: "Apr", purchases: 180, sales: 145 },
  { month: "May", purchases: 165, sales: 140 },
  { month: "Jun", purchases: 210, sales: 175 },
];

const categoryData = [
  { name: "Milk", value: 40 },
  { name: "Dairy", value: 25 },
  { name: "Cheese", value: 20 },
  { name: "Other", value: 15 },
];

const chartColors = ["#2f855a", "#e0ad48", "#3182ce", "#8b75bb"];

function DashboardCharts() {
  return (
    <div className="row g-4">
      {/* Bar Chart */}

      <div className="col-lg-8">
        <div className="dd-card p-4 h-100">
          <div className="mb-4">
            <h5 className="dd-chart-title">Operations Overview</h5>

            <p className="dd-chart-subtitle">
              Illustrative monthly purchase and sales data
            </p>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 10,
                  left: -15,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="month" axisLine={false} tickLine={false} />

                <YAxis axisLine={false} tickLine={false} />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="purchases"
                  name="Purchases"
                  fill="#2f855a"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill="#e0ad48"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dd-demo-note">
            <i className="bi bi-info-circle me-1" />
            Sample data – not connected to transactions.
          </div>
        </div>
      </div>

      {/* Pie Chart */}

      <div className="col-lg-4">
        <div className="dd-card p-4 h-100">
          <div className="mb-4">
            <h5 className="dd-chart-title">Product Mix</h5>

            <p className="dd-chart-subtitle">
              Illustrative category distribution
            </p>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index]} />
                  ))}
                </Pie>

                <Tooltip />

                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="dd-demo-note">
            <i className="bi bi-info-circle me-1" />
            Sample data – not actual product records.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
