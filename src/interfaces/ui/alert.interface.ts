export interface AlertOptions {
  alertMessage: AlertMessage
  alertType: AlertType
}

export type AlertMessage = string
export type AlertType = 'danger' | 'success'
