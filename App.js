import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'


//displayValue = '0' vai começar com 0
//clearDisplay = false, vai dizer se o display ele precisar ser limpo para o proximo digito ou se nao precisa ser limpo vai efetuar outra soma
//operation: null, para ver qual operação vai fazer (+ - * /)
//values: [0, 0], logica vista na aula 56 qualuqer coisa dar uma olhada
//current: 0 indice do array que esta no momento setando !!


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {

  state = { ...initialState } //fazendo um clone do const fora da class

  //para clicar nos digitos
  addDigit = n => {

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay // impepde que o 0 seja digitado inicialmente varias vezes tipo 00000000

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) { //impede que seja digitado mais de um . (impossibilitando isso 8.1.2.3.4)
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n //concatena os numeros ou seja (se eu digitar 12315, vai mostrar todos eles e naão um de cada)
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  //chama o AC para limpar a memoria 
  clearMemory = () => {
    this.setState({ ...initialState })
  }

  //quando clicar em dividir, multiplicar, subtrair, somar ou igual
  setOperation = operation => {
    if (this.state.current === 0) { //para que quando eu colocar os primeiros numeros e apertar alguma operação(+ - / *) ele começe a digitar novos numeros para podermos dar o = ou fazer outra operação
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals, //se eu colocar true no lugar de !equals ele vai fazer o seguinte quando fazemos uma operação 20+20=40 quando aparecer 40 e eu colocar mais numero 123 ele vai ficar como 40123, se eu colocar true e tiver 40 como resutlado e apertar 123 ele vai limpar e mostrar 123
        values,
      })
    }
  }

  //Observação quando tem parametro eu preciso passar exp:  <Button label='/' operation onClick={() => this.setOperation('/')}/>
  //sem parametro <Button label='AC' triple onClick={this.clearMemory}/>

  //repare que eu vou marcar como double, triple ou operation
  //faço isso pois no component Button esta o css de cada um e tem uma function com if dizendo que
  //quando eu colocar triple ele chama o style.buttonTriple e assim vai...
  render() {
    return (
      <View style={styles.Container}>
        <Display value={this.state.displayValue} />
        <View style={styles.Button}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Button: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})


//Observação tudo que estiver dentro de `${variavel ou const}` é transformado em string 