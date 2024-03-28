export interface AlertOptions {
  readonly alertMessage: string
  readonly alertType: AlertType
}

export type AlertType = Readonly<'danger' | 'success'>
