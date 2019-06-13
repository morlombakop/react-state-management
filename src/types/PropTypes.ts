export interface BaseInputProps {
  onChange: (value: string, name: string) => void
  name: string
  label: string
  error: string
  placeholder: string
}

export interface ITextBoxPops extends BaseInputProps {
  placeholder: string
  value: string
}

export interface ISelectOptionProps extends BaseInputProps {
  options: string[]
  value: string
}

export interface IIncidentProps {
  title: string
  assignee: string
  status: string
}