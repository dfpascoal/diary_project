declare module 'storybook/test' {
  // Tipos genéricos para integração de testes do Storybook.
  // Ajuste se quiser tipos mais fortes importando de @testing-library/* ou jest.
  export const fn: (...args: any[]) => any;
  export const expect: any;
  export const userEvent: any;
  export const within: any;
  const _default: any;
  export default _default;
}
