export const removeMaskDocNumber = (docNumber: string) => {
  return docNumber.replace(/\D/g, "");
};

export const applyMaskCpf = (cpf: string) => {
  return cpf
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
};

export const applyMaskPhone = (phoneNumber: string) => {
  return phoneNumber
    .replace(/\D/g, "")
    .replace(/^(\d{1,3})(\d{2})(\d{5})(\d{4})/g, "+$1 $2 $3$4");
};
