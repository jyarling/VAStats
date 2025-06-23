export interface ElectronAPI {
  openExternal: (url: string) => Promise<void>
  saveData: (key: string, value: unknown) => Promise<void>
  loadData: (key: string) => Promise<unknown>
}

declare global {
  interface Window {
    electron: ElectronAPI
  }
}

export {}
