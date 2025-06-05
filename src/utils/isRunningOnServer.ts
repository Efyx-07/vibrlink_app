export const isRunningOnServer = (): boolean => {
  return !(typeof window !== 'undefined' && window.document);
};
