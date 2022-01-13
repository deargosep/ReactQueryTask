import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import styles from './styles'
import * as Yup from 'yup'
import { Formik } from 'formik'
import TextInputMask from 'react-native-text-input-mask'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import Wrapper from 'components/Wrapper'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import Spacer from 'components/Spacer'
import { HelperText } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import {
  uploadAvatar as uploadAvatarAction,
  editProfile,
  getCurrentUser
} from 'store/modules/auth/actions'
import { setModal } from 'store/modules/modals/actions'
import { currentUserSelector } from 'store/selectors/auth'
import { useQueryClient } from 'react-query'

const EnterProfile = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  console.log(1)

  const [isLoading, setIsLoading] = useState(false)

  const queryClient = useQueryClient()

  // const user = useSelector(currentUserSelector)
  const user = queryClient.getQueryData('getCurrentUser')
  console.log(user)

  const profileSchema = Yup.object().shape({
    fio: Yup.string().required(t('auth.enterProfile.form.errors.fio')),
    birth: Yup.string().required(t('auth.enterProfile.form.errors.birth')),
    gender: Yup.string().required(t('auth.enterProfile.form.errors.gender')),
    INN: Yup.string()
      .required(t('auth.enterProfile.form.errors.INN'))
      .min(14, t('auth.enterProfile.form.errors.INN'))
      .max(14, t('auth.enterProfile.form.errors.INN')),
    passport: Yup.string()
      .required(t('auth.enterProfile.form.errors.passport'))
      .min(9, t('auth.enterProfile.form.errors.passport'))
      .max(9, t('auth.enterProfile.form.errors.passport')),
    avatar: Yup.object().required(t('auth.enterProfile.form.errors.photo'))
  })

  const avatarSchema = Yup.object().shape({
    avatar: Yup.object().required(t('auth.enterProfile.form.errors.photo'))
  })

  const dispatch = useDispatch()

  const uploadAvatar = (formik) => {
    launchImageLibrary(
      {
        mediaType: 'photo'
      },
      (response) => {
        if (response.assets) {
          console.log(response.assets[0])
          formik.setFieldValue('avatar', response.assets[0])
        }
      }
    )
  }

  const uploadAvatarToAPI = (avatar) => {
    const photo = new FormData()
    photo.append('photo', {
      type: avatar.type,
      uri: avatar.uri,
      name: 'photo'
    })
    dispatch(
      uploadAvatarAction(
        photo,
        (response) => {
          setIsLoading(false)
          dispatch(getCurrentUser())
        },
        (error) => setIsLoading(false)
      )
    )
  }

  const uploadProfileData = (values, setFieldError) => {
    setIsLoading(true)

    if (user.source !== 'current') {
      uploadAvatarToAPI(values.avatar)
    } else {
      dispatch(
        editProfile(
          {
            phone: user.phone,
            fullName: values.fio,
            sex: values.gender,
            birthDate: values.birth,
            inn: values.INN,
            passport: values.passport
          },
          () => {
            uploadAvatarToAPI(values.avatar)
          },
          () => {
            setIsLoading(false)
          }
        )
      )
    }
  }

  const setBirthDate = (formik, date) => {
    formik.setFieldValue('birth', date)
  }

  return (
    <Formik
      initialValues={{
        fio: '',
        birth: '',
        gender: '',
        INN: '',
        passport: '',
        avatar: ''
      }}
      onSubmit={(values, { setFieldError }) =>
        uploadProfileData(values, setFieldError)
      }
      validationSchema={
        user.source !== 'current' ? avatarSchema : profileSchema
      }
    >
      {(formik) => (
        <Wrapper>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              user.source !== 'current' ? styles().fullProfile : {}
            }
          >
            <View>
              <Spacer size={12} />
              <Text style={styles().text}>{t('auth.enterProfile.text')}</Text>
              <Spacer size={16} />
            </View>
            {user.source === 'current' ? (
              <>
                <TouchableOpacity
                  style={styles().photo}
                  onPress={() => uploadAvatar(formik)}
                >
                  <Image
                    source={
                      formik.values.avatar
                        ? {
                            uri: formik.values.avatar.uri
                          }
                        : Images.photo
                    }
                    style={styles().avatar}
                  />
                  <Text style={styles().uploadPhoto}>
                    {t('auth.enterProfile.photo')}
                  </Text>
                </TouchableOpacity>
                {formik.touched.avatar && Boolean(formik.errors.avatar) && (
                  <HelperText type="error" visible style={styles().avatarError}>
                    {formik.errors.avatar}
                  </HelperText>
                )}
                <Spacer size={16} />
                <Input
                  label={t('auth.enterProfile.form.fio')}
                  fieldName="fio"
                  formik={formik}
                />
                <Spacer size={5} />
                <TouchableOpacity
                  style={{ zIndex: 5 }}
                  onPress={() =>
                    dispatch(
                      setModal({
                        modal: 'birthDate',
                        modalAction: (date) => setBirthDate(formik, date)
                      })
                    )
                  }
                >
                  <Input
                    label={t('auth.enterProfile.form.birth')}
                    fieldName="birth"
                    formik={formik}
                    editable={false}
                  />
                </TouchableOpacity>
                <Spacer size={10} />
                <Select
                  formik={formik}
                  fieldName="gender"
                  placeholder={t('auth.enterProfile.form.gender')}
                  selectItems={[
                    {
                      label: t('auth.enterProfile.form.genderValues.male'),
                      value: 'male'
                    },
                    {
                      label: t('auth.enterProfile.form.genderValues.female'),
                      value: 'female'
                    }
                  ]}
                />
                <Spacer size={5} />
                <Input
                  label={t('auth.enterProfile.form.INN')}
                  fieldName="INN"
                  formik={formik}
                  placeholder="12323123131231"
                  keyboardType="phone-pad"
                />
                <Spacer size={5} />
                <Input
                  label={t('auth.enterProfile.form.passport')}
                  fieldName="passport"
                  formik={formik}
                  placeholder="AN2453676"
                />
                <Spacer size={24} />
              </>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles().photoForFullProfile}
                  onPress={() => uploadAvatar(formik)}
                >
                  <Image
                    source={
                      formik.values.avatar
                        ? {
                            uri: formik.values.avatar.uri
                          }
                        : Images.photo
                    }
                    style={styles().avatarForFullProfile}
                  />
                  <Spacer size={40} />
                  <Text style={styles().uploadPhoto}>
                    {t('auth.enterProfile.photo')}
                  </Text>
                </TouchableOpacity>
                {Boolean(formik.errors.avatar) && (
                  <HelperText type="error" visible style={styles().avatarError}>
                    {formik.errors.avatar}
                  </HelperText>
                )}
              </View>
            )}
            <View>
              <Button
                handlePress={formik.handleSubmit}
                text={t('auth.enterProfile.button')}
                isLoading={isLoading}
              />
              <Spacer size={12} />
              <Text style={styles().policyText}>
                {t('auth.enterProfile.policy')}
                <TouchableOpacity onPress={() => console.log(formik.errors)}>
                  <Text style={styles().policyActionText}>
                    {t('auth.enterProfile.policyAction')}
                  </Text>
                </TouchableOpacity>
              </Text>
              <Spacer size={12} />
            </View>
          </ScrollView>
        </Wrapper>
      )}
    </Formik>
  )
}

export default EnterProfile
