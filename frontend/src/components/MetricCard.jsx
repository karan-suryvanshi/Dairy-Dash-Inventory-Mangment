function MetricCard({
  title,
  value,
  icon,
  description,
  iconColor,
  iconBackground,
}) {
  return (
    <div className="dd-card dd-metric-card p-4 h-100">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="dd-metric-title">{title}</div>

          <h2 className="dd-metric-value mt-3 mb-1">{value}</h2>

          <div className="dd-metric-description">{description}</div>
        </div>

        <div
          className="dd-metric-icon"
          style={{
            color: iconColor,
            backgroundColor: iconBackground,
          }}
        >
          <i className={`bi ${icon}`} />
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
