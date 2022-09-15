export const sortArr = (a, b) => {
  if (a.isDone < b.isDone) return -1;
  if (a.isDone > b.isDone) return 1;
  return 0;
};

export const getPriorityColor = (priority) => {
  const colors = {
    critical: "red.700",
    high: "red.300",
    medium: "orange.300",
    low: "green.300",
  };
  return colors[priority] || "black";
};
