# hotel-app

Login Flow
User fills up input
  - react-hook-form --> handleSubmit(onSubmit) prop
User submits
  - useMutation --> signUp(data) - custom fn that will be used to pass data in Login
    onSuccess
     - save in localstorage
     - call dispatch to save in data in state
     - toast success alert