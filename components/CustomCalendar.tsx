import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function CustomCalendar (){
  const [currentDate, setCurrentDate] = useState(new Date());

  
  return (
    <View style={styles.container}>
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <CalendarGrid currentDate={currentDate} />
    </View>
  );
};
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

const DaysOfWeek = () => {
  const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  return (
    <View style={styles.weekContainer}>
      {days.map((day, index) => (
        <Text key={index} style={styles.dayOfWeek}>{day}</Text>
      ))}
    </View>
  );
};

const CalendarGrid = ({ currentDate }: { currentDate: Date }) => {
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const allDays = [];
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    allDays.push(
      [month-1, prevMonthLastDay-i]
    );
  }
  // Calculate days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    allDays.push(
      [month, i]
    );
  }
  // Calculate days for the next month to fill up 6 rows
  const totalCells = allDays.length;
  for (let i = 1; i <= 42 - totalCells; i++) {
    allDays.push(
      [month+1, i]
    );
  }
  
  const monthArray = [];
  for(let i = 0; i < 6 ; i++ ){
    const row = allDays.slice(i * 7, i * 7 + 7);
    monthArray.push(row);
  }
  const target = [month, day]
  function containsSubArray(data: number[][], subArray: number[]): boolean {
    return data.some(array =>
      array.length === subArray.length && array.every((value, index) => value === subArray[index])
    );
  }
  return (
    <View style={styles.grid}>
      <DaysOfWeek />
      <View style={styles.datesContainer}>
        {
        monthArray.map((row, rowIndex) => (
          !containsSubArray(row, target)? (
            row.map((item, colIndex) => (
              <View key={colIndex} style={styles.dateContainer}>
                <Text style={[styles.dateText, styles.currentMonthText]}>
                {item[1]}</Text>
              </View>
            ))
          ) : (
            row.map((item, colIndex) => (
            //if yes add a line to the bottom of the week
            //and a single line to the day
              <View key={colIndex} style={[styles.dateContainer, {}]}>
                {!(item[1] === target[1] && item[0] ===target[0]) ? (
                  <Text style = {[styles.dateText, styles.currentMonthText]}>
                    {item[1]}
                  </Text>
                ) : (
                  <View style={styles.currentDay}> 
                    <Text style = {[styles.dateText, styles.currentMonthText]}>
                    {item[1]}
                  </Text>

                  </View>
                )}
                {/* <Text style={[styles.dateText, styles.currentMonthText]}>
                </Text>*/}
                <View style={styles.currentWeek}/>
              </View>
            ))
          )
        ))
        }
      </View>
    </View>
  );
};
  const CalendarHeader = ({ currentDate, setCurrentDate }) => {
    const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <View style={styles.header}>
      {/*<TouchableOpacity onPress={handlePreviousMonth}>
        <Text style={styles.arrow}>{'<'}</Text>
      </TouchableOpacity>*/}
      <Text style={styles.monthText}>
        {currentDate.toLocaleString('default', { month: 'long' })} 
      </Text>
      {/*<TouchableOpacity onPress={handleNextMonth}>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>*/}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // padding: 10,
    alignSelf: 'center',
    transform: [{ scale: 0.85 }], // Scale down the entire calendar
    backgroundColor: '#1D2021',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: '#1D2021',
  },
  arrow: {
    fontSize: 18,
    color: '#EBDBB2',
  },
  monthText: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#EBDBB2',
    textTransform: 'none',
  },
  grid: {
    flexDirection: 'column',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayOfWeek: {
    width: '14%',
    textAlign: 'center',
    // fontWeight: 'bold',
    paddingBottom: 7,
    color: '#EBDBB2',
    fontSize: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
    // backgroundColor: '#1D2021',
  },
  dateContainer: {
    width: '14%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
    // backgroundColor: '#1D2021',
  },
  dateText: {
    textAlign: 'center',
    // color: '#EBDBB2',
    fontSize: 12,
  },
  dimmedText: {
    color: '#928374',
  },
  prevMonthText: {
    color: 'red', // Example of a different color for previous month days
  },
  currentMonthText: {
    color: '#EBDBB2',
  },
  currentWeek: {
    bottom: 6,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FE8019', // Adjust color as needed
  },
  currentWeekDay: {
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Example of a bottom border for current week days
  },
  currentDay: {
    borderTopWidth: 2,
    borderColor: '#FE8019',
    paddingBottom: 3,
    paddingTop:3,
    paddingLeft:7,
    paddingRight:7,
  },
});

export default CustomCalendar;


