import React from 'react'
import { StyleSheet, Text, Dimensions, TouchableHighlight } from 'react-native'


const style = StyleSheet.create({
    button: {
        fontSize: 38,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0', //cor de fundo da calculadora
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'//cor das linhas da calculadora
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#FF9500',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,

    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3
    }
})

export default props => {
    //css dos botões \/
    //se tiver presente a propriedade double ele adiciona ela e assim serve para as outras abaixo    
    const styleButton = [style.button]
    if (props.double) styleButton.push(style.buttonDouble)
    if (props.triple) styleButton.push(style.buttonTriple)
    if (props.operation) styleButton.push(style.operationButton)
    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={styleButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}

// fontSize: 40 = tamanho da fonte
//height: Dimensions.get('window').width / 4 
// width: Dimensions.get('window').width / 4 
// as duas linhas acima vai pegar a dimensão do celular e divir em 4
// ou seja a altura vai ser exatamente igual a largua 
//textAlign: para ficar centralizado ao meio
//borderWidth: 1, = largura da borda
//borderColor: '#888' = cor () => rapper para fazer com que uma View responda apropriadamente a toques.
//  Ao ser clicado, a opacidade da View é diminuída, ou seja, a cor da View é escurecida


//width: (Dimensions.get('window').width / 4) * 2 = vai ocupar 2 botoes
//width: (Dimensions.get('window').width / 4) * 3 = vai ocupar 3 botoes



// onPress={() => props.onClick(props.label)}>
// para não ter que fica fazendo isso : <Button label='/' operation onClick={() => this.setOperation('/')}/>
// para não ter que fica fazendo isso :Button label='7' onClick={() => this.addDigit(7)}/>
//o resultado sera esse : <Button label='7' onClick={this.addDigit}/> VEJA QUE FICOU MAIS FACIL !!!
