function DashboardCards() {
  const cards = [
    {
      title: "Components",
      value: "0",
      color: "#2563eb",
    },
    {
      title: "Vulnerabilities",
      value: "0",
      color: "#dc2626",
    },
    {
      title: "Risk Score",
      value: "Low",
      color: "#16a34a",
    },
    {
      title: "Licenses",
      value: "0",
      color: "#ca8a04",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: card.color,
            color: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h3>{card.title}</h3>
          <h1>{card.value}</h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;