// Frameworks
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'
import styled from 'styled-components'
import { uport } from '../utilities/uportSetup'

const WelcomeWrap = styled.section``
const ConnectUport = styled.button``
const SubText = styled.p`
  margin: 0 auto 3em auto;
  font-size: 24px;
`
const NavBar = styled.nav`
color: #000000;
padding: 20px 40px;
font-size: 18px;
display: flex;
justify-content: center;
align-items: right;
text-align: right;
vertical-align-items: top;
vertical-align: top;
`



class Welcome extends Component {

  constructor (props) {
    super(props)
    this.connectUport = this.connectUport.bind(this)
  }

  connectUport () {
    uport.requestCredentials(
      { requested: ['name', 'country'],
        notifications: true }
    ).then((credentials) => {
        console.log({credentials})
        this.props.actions.connectUport(credentials)
    })
  }

  render () {
    return (
    <WelcomeWrap>
            <img src="/min-doktor.png" width="400px"></img>
            <SubText>Trygg vård när du behöver det</SubText>
      <NavBar>
         <ConnectUport
          onClick={this.connectUport}>
          Logga in
        </ConnectUport>
      </NavBar>
    </WelcomeWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  }
}
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(AppActions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
