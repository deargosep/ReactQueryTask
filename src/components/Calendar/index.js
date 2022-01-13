import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'theme'
import { uniqueId } from 'lodash-es'
import Spacer from 'components/Spacer'
// import { getSpecialistSchedule } from 'store/selectors/specialists'
import { useSelector } from 'react-redux'
import Loading from 'components/Loading'

const Calendar = ({
  navigation,
  pickReception = true,
  currentPickedDay,
  setCurrentPickedDay,
  setDisabledButton,
  selectYear,
  setSelectYear,
  selectMonth,
  setSelectMonth,
  today
}) => {
  const { t } = useTranslation()
  const { Images } = useTheme()

  const [weeks, setWeeks] = useState([])
  const [showPicker, setShowPicker] = useState('')

  // const schedule = useSelector(getSpecialistSchedule)

  const [isLoading, setIsLoading] = useState(false)

  // Fix Адаптировать шрифт

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]

  const [years, setYears] = useState([])

  const fillYears = () => {
    const filledYears = []
    for (let year = 1920; year <= today.getFullYear(); year++) {
      filledYears.push(year)
    }
    setYears(filledYears.reverse())
  }

  const weekDays = ['Пн', 'Вт', 'Cр', 'Чт', 'Пт', 'Сб', 'Вс']

  // useEffect(() => {
  //   if (schedule) showCalendar(selectMonth, selectYear)
  // }, [schedule])

  useEffect(() => {
    if (!pickReception) showCalendar(selectMonth, selectYear)
  }, [])

  const showCalendar = (month, year) => {
    setIsLoading(true)
    const firstDay = new Date(year, month).getDay() - 1
    setWeeks([])

    setSelectYear(year)
    setSelectMonth(month)

    let date = 1
    for (let week = 0; week < 5; week++) {
      let daysInWeek = []
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < firstDay) {
          daysInWeek.push({
            currentDay: false,
            pickedDay: false,
            active: false,
            events: [],
            value: '',
            isReception: false,
            id: uniqueId('day_')
          })
        } else if (date > daysInMonth(month, year)) {
          break
        } else {
          const createdDay = {
            currentDay: false,
            pickedDay: false,
            active: !pickReception ? true : false,
            events: [],
            value: date,
            isReception: false,
            id: uniqueId('day_')
          }

          let eventsData
          if (pickReception) {
            eventsData = checkEvents(month, year, date)
            createdDay.events = eventsData.events
            createdDay.isReception = eventsData.isReception
          }

          if (createdDay.events.length) createdDay.active = true

          if (
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth() &&
            pickReception
          ) {
            createdDay.currentDay = true
          }
          daysInWeek.push(createdDay)
          date++
        }
      }
      setWeeks((prevState) => {
        return [...prevState, [...daysInWeek]]
      })
      setIsLoading(false)
    }
  }

  const checkEvents = (month, year, day) => {
    const dayIndex = activeDays.findIndex(
      (activeDay) => activeDay.date === `${year}-${month + 1}-${day}`
    )
    const checkedDay = activeDays[dayIndex] ? activeDays[dayIndex] : null
    return {
      events: checkedDay?.times ? checkedDay.times : [],
      isReception: checkedDay
        ? checkedDay.times.some((receiptDate) => receiptDate.reception)
        : false
    }
  }

  const daysInMonth = (iMonth, iYear) => {
    return 32 - new Date(iYear, iMonth, 32).getDate()
  }

  const next = () => {
    const nextYear = selectMonth === 11 ? selectYear + 1 : selectYear
    const nextMonth = (selectMonth + 1) % 12
    setSelectYear(nextYear)
    setSelectMonth(nextMonth)
    showCalendar(nextMonth, nextYear)
  }

  const previous = () => {
    const previousYear = selectMonth === 0 ? selectYear - 1 : selectYear
    const previousMonth = selectMonth === 0 ? 11 : selectMonth - 1
    setSelectYear(previousYear)
    setSelectMonth(previousMonth)
    showCalendar(previousMonth, previousYear)
  }

  const openPicker = (mode) => {
    setShowPicker(mode)
  }

  const pickMonth = (month) => {
    setShowPicker('')
    setSelectMonth(month)
    showCalendar(month, selectYear)
  }

  const pickYear = (year) => {
    setShowPicker('')
    setSelectYear(year)
    showCalendar(selectMonth, year)
  }

  const pickDay = (week, day) => {
    if (
      !pickReception &&
      new Date(selectYear, selectMonth, day.value) > today
    ) {
      setDisabledButton(true)
      setWeeks((prevState) => {
        return prevState.map((week, index) => {
          if (currentPickedDay && index === currentPickedDay.weekIndex) {
            week[currentPickedDay.dayIndex].pickedDay = false
          }
          return week
        })
      })
      return
    }

    if (day.active) {
      setWeeks((prevState) => {
        const indexWeek = prevState.indexOf(week)
        const indexDay = prevState[indexWeek].indexOf(day)
        setCurrentPickedDay({
          weekIndex: indexWeek,
          dayIndex: indexDay,
          value: day,
          fullDate: `${selectYear}-${selectMonth + 1 < 10 ? '0' : ''}${
            selectMonth + 1
          }-${day.value < 10 ? '0' : ''}${day.value}`
        })

        if (!pickReception) setDisabledButton(false)

        return prevState.map((week, index) => {
          if (index === indexWeek && !currentPickedDay) {
            week[indexDay].pickedDay = true
          }
          if (currentPickedDay) {
            if (index === currentPickedDay.weekIndex)
              week[currentPickedDay.dayIndex].pickedDay = false
            if (index === indexWeek) week[indexDay].pickedDay = true
          }
          return week
        })
      })
    }
  }

  useEffect(() => {
    fillYears()
    showCalendar(selectMonth, selectYear)
  }, [])

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <View style={styles().monthYearContainer}>
        <TouchableOpacity onPress={() => previous()}>
          <Image source={Images.backArrow} style={styles().controlArrow} />
        </TouchableOpacity>
        <Spacer horizontal size={10} />
        <TouchableOpacity
          style={styles(showPicker, 'month').selected}
          onPress={() => openPicker('month')}
        >
          <Text style={[styles(showPicker).selectedText]}>
            {months[selectMonth]}
          </Text>
          <Image source={Images.arrows} style={styles().arrows} />
        </TouchableOpacity>
        <Spacer horizontal size={10} />
        <TouchableOpacity
          style={styles(showPicker, 'year').selected}
          onPress={() => openPicker('year')}
        >
          <Text style={styles().selectedText}>{selectYear}</Text>
          <Image source={Images.arrows} style={styles().arrows} />
        </TouchableOpacity>
        <Spacer horizontal size={10} />
        <TouchableOpacity onPress={() => next()}>
          <Image
            source={Images.backArrow}
            style={[
              styles().controlArrow,
              { transform: [{ rotate: '180deg' }] }
            ]}
          />
        </TouchableOpacity>
      </View>
      <Spacer size={20} />
      {!showPicker && (
        <>
          <FlatList
            data={weekDays}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row' }}
            renderItem={({ item, index }) => (
              <Text style={styles().dayName}>{item}</Text>
            )}
            keyExtractor={(item) => item}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={weeks ? weeks : []}
            renderItem={({ item }) => {
              let week = item
              return (
                <FlatList
                  data={item}
                  style={{ flexDirection: 'row' }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => pickDay(week, item)}>
                      <View style={styles(null, null, item).dayNumberContainer}>
                        <Text style={styles(null, null, item).dayNumber}>
                          {item.value}
                        </Text>
                      </View>
                      {item.isReception && <View style={styles().event}></View>}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.id}
                />
              )
            }}
            keyExtractor={(item, index) => index}
          />
        </>
      )}

      {showPicker === 'month' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={months}
          style={styles().selectWrapper}
          contentContainerStyle={styles().selectItemsContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles().selectItemContainer}
              onPress={() => pickMonth(index)}
            >
              <Text style={styles().selectItemText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
      {showPicker === 'year' && (
        <FlatList
          data={years}
          showsVerticalScrollIndicator={false}
          style={styles().selectWrapper}
          contentContainerStyle={styles().selectItemsContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles().selectItemContainer}
              onPress={() => pickYear(item)}
            >
              <Text style={styles().selectItemText}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  )
}

export default Calendar
