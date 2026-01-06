export const input = (required = true, placeholder: string, id: string, type = "text") => {
  return `
    <input
      class="custom-input"
      type="${type}"
      id="${id}"
      name="${id}"
      placeholder="${placeholder}"
      ${required ? "required" : ""}
      aria-invalid="false"
    >
  `;
};
