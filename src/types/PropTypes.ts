import { Employee } from "./DomainTypes";

export interface BaseInputProps {
  onChange: (value: string, name: string) => void
  value: string
  name: string
  // isValid: boolean
  label: string
  error: string
  placeholder: string
}

export interface ITextBoxPops extends BaseInputProps {
  placeholder: string
}

export interface ISelectOptionProps extends BaseInputProps {
  options: string[] | Employee []
}

export interface IIncidentProps {
  title: string
  assignee: Employee
  status: string
}