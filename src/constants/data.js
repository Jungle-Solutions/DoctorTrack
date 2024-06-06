export const specialties = [
  { label: "Clínica Médica", value: "clinica medica" },
  { label: "Cirurgia", value: "cirurgia" },
  { label: "Pediatria", value: "pediatria" },
  { label: "Ginecologia e Obstetrícia", value: "ginecologia e obstetricia" },
  { label: "Psiquiatria", value: "psiquiatria" },
  { label: "Medicina de Família e Comunidade", value: "medicina de familia e comunidade" },
];

export const specialtiesArray = [
  { label: "Selecione a Especialidade", value: "selecione a especialidade", enabled: false, style: { color: "gray" } },
  ...specialties.map((specialty, index) => specialty),
];