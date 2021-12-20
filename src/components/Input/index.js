import React, { useState } from 'react'
import { TextInput as MDTextInput, HelperText } from 'react-native-paper'
import { useTheme } from '@theme'

const Input = ({
  label,
  fieldName,
  mode = 'outlined',
  formik,
  withoutFormik,
  value,
  onChangeValue,
  ...props
}) => {
  const { Colors, Variables } = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <MDTextInput
        label={label}
        value={withoutFormik ? value : formik?.values[fieldName]}
        onBlur={
          withoutFormik
            ? () => setIsFocused(false)
            : formik?.handleBlur(fieldName)
        }
        onFocus={() => setIsFocused(true)}
        onChangeText={
          withoutFormik
            ? (value) => onChangeValue(value)
            : formik?.handleChange(fieldName)
        }
        mode={mode}
        outlineColor={Colors.noSelect}
        theme={{
          colors: {
            primary: Colors.main,
            placeholder: isFocused ? Colors.noSelect : Colors.black
          },
          roundness: 8
        }}
        style={{ backgroundColor: 'white' }}
        error={formik?.touched[fieldName] && Boolean(formik?.errors[fieldName])}
        {...props}
      />
      {formik?.touched[fieldName] && formik?.errors[fieldName] && (
        <HelperText type="error" visible>
          {formik.errors[fieldName]}
        </HelperText>
      )}
    </>
  )
}

export default Input
