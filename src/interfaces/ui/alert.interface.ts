export interface AlertOptions {
  alertMessage: string
  alertType: AlertType
}

export type AlertType = 'danger' | 'success'
