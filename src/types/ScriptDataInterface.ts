export interface ScriptDataInterface {
  id: string;
  title: string;
  message: string | {varA: string; varB:string; varC?: string;};
}