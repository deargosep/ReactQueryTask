import DropDownPicker from 'react-native-dropdown-picker'
import React, { useState, useEffect } from 'react'
import styles from './styles'
import { HelperText } from 'react-native-paper'
import { useTheme } from 'theme'

const Select = ({ placeholder, selectItems, formik, fieldName }) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(selectItems)
  const [value, setValue] = useState(null)

  const { Colors } = useTheme()

  useEffect(() => {
    if (open) {
      formik.setFieldTouched(fieldName, false)
      formik.setErrors({ ...formik.errors, [fieldName]: null })
    }
  }, [open])

  return (
    <>
      <DropDownPicker
        props={{ activeOpacity: 1 }}
        listItemContainerStyle={styles().listItemContainer}
        textStyle={styles().text}
        style={styles(open, formik, fieldName).wrapper}
        dropDownContainerStyle={styles().dropDownContainer}
        translation={{ PLACEHOLDER: placeholder }}
        placeholderStyle={{
          color:
            formik?.touched[fieldName] && formik?.errors[fieldName]
              ? Colors.error
              : Colors.black
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        onChangeValue={(newVal) => formik.setFieldValue(fieldName, newVal)}
        setValue={setValue}
        setItems={setItems}
      />
      {formik.touched[fieldName] && formik.errors[fieldName] && (
        <HelperText type="error" visible>
          {formik.errors[fieldName]}
        </HelperText>
      )}
    </>
  )
}

export default Select
