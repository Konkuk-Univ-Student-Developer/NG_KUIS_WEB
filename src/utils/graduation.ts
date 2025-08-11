export const getStatusStyle = (status: React.ReactNode) => {
  switch (status) {
    case "합격":
      return "text-blue font-bold";
    case "불합":
      return "text-danger font-bold";
    default:
      return "text-black";
  }
};
