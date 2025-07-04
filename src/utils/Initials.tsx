export const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  const first = names[0]?.[0] || "";
  const last = names[1]?.[0] || "";
  return (first + last).toUpperCase();
};
