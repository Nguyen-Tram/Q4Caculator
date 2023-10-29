import {useState} from "react";
import {View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F5F5F5'
  },
  flex: {
    flex: 1
  },
  flexColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    flexDirection: 'row'
  },
  result: {
    padding: 20
  },
  keyboard: {
    rowGap: 5
  },
  centered: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    width: 50,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  operatorKey: {
    color: '#FF9501'
  },
  grayKey: {
    backgroundColor: '#FBFBFB'
  },
  calcKey: {
    color: 'white',
    backgroundColor: '#FF9501'
  },
})

const numRows = [0, 1, 2].reverse().map(row => ((row *= 3, [row + 1, row + 2, row + 3])));
const operatorList = ['/', '*', '-'];

function App() {

  const [displayValue, setDisplayValue] = useState('0')
  const [operator, setOperator] = useState(null)
  const [firstValue, setFirstValue] = useState('')

  const handleNumberInput = (num) => {
    if (displayValue === '0') {
      setDisplayValue(num.toString())
    } else {
      setDisplayValue(displayValue + num)
    }
  }

  const handleOperatorInput = (operator) => {
    setOperator(operator);
    setFirstValue(displayValue);
    setDisplayValue('0');
  }

  const handleEqual = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    if (operator === '+') {
      setDisplayValue((num1 + num2).toString());
    } else if (operator === '-') {
      setDisplayValue((num1 - num2).toString());
    } else if (operator === '*') {
      setDisplayValue((num1 * num2).toString());
    } else if (operator === '/') {
      setDisplayValue((num1 / num2).toString());
    }
    setOperator(null);
    setFirstValue('');
  }

  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  }

  return (
      <View style={{...styles.flex, ...styles.root, ...styles.flexColumn, ...styles.centered}}>
        <View style={{...styles.flexRow, ...styles.result, gap: 6}}>
          <Text>{firstValue}</Text>
          <Text>{operator}</Text>
          {(!operator || displayValue !== '0') && <Text>{displayValue}</Text>}
        </View>
        <View>
          <View style={[styles.flexRow]}>
            <View style={{...styles.keyboard}}>
              {
                numRows.map((row, index) => (
                    <View key={index} style={[styles.flexRow]}>
                      {
                        row.map((num, index) => (
                            <Text key={index} style={{...styles.centered, ...styles.key}} onPress={() => handleNumberInput(num)}>{num}</Text>
                        ))
                      }
                    </View>
                ))
              }
            </View>
            <View style={{...styles.flex, ...styles.flexColumn, ...styles.keyboard}}>
              {
                operatorList.map((operator, index) => (
                    <Text key={index} style={{...styles.centered, ...styles.key, ...styles.operatorKey, ...styles.grayKey}} onPress={() => handleOperatorInput(operator)}>{operator}</Text>
                ))
              }
            </View>
          </View>
          <View style={[styles.flexRow]}>
            <Text style={{...styles.centered, ...styles.key, width: 100}} onPress={() => handleNumberInput(0)}>0</Text>
            <Text style={{...styles.centered, ...styles.key, ...styles.operatorKey}} onPress={() => handleOperatorInput('+')}>+</Text>
            <Text style={{...styles.centered, ...styles.key, ...styles.calcKey}} onPress={handleEqual}>=</Text>
          </View>
          <View>
            <Text style={{...styles.centered, ...styles.key, ...styles.grayKey, width: 200}} onPress={handleClear}>C</Text>
          </View>
        </View>
      </View>
  );
}

export default App;
