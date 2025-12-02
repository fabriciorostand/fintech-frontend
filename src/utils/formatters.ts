export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  ).toLocaleDateString("pt-BR");
};