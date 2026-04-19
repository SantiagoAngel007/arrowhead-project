export function useLogin() {
  const login = (code: string, alias: string) => {
    console.log('login:', code, alias)
  }

  return { login }
}
