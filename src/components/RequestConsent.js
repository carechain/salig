// Frameworks
import React, { Component } from 'react'
import { uport } from '../utilities/uportSetup'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AppActions from '../actions/AppActions'

import styled from 'styled-components'

const RequestConsentWrap = styled.section`
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    position: inherit;
  }
`
const RequestConsentArea = styled.section`
  font-size: 28px;
  text-align: center;
`
const RequestConsentTable = styled.table`
  margin: auto;
  text-align: left;
`

const RequestConsentLabel = styled.label`
  position: relative;
  top: 10px;
`

const RequestConsentButton = styled.button`
  margin-top: 20px;
`

const RequestConsentNextButton = styled.button`
  margin-top: 20px;
`

const RequestConsentSubText = styled.p`
  margin: 20px auto 3em auto;
  font-size: 18px;
`

const CONSENTCLAIM = 'Consent Agreement'

class RequestConsent extends Component {

  constructor (props) {
    super(props)
    this.consentbtnClick = this.consentbtnClick.bind(this)
  }

  consent() {
      document.location = "me.uport:consent"
  }

  consentbtnClick () {
    uport.attestCredentials({
      sub: this.props.uport.address,
      //claim: {Relationship: CONSENTCLAIM},
      claim: {name: this.props.uport.name},
      exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
      uriHandler: (log) => { console.log(log) }
    })
  }

  render (props) {
    return (
      <RequestConsentWrap>
        <h4>Consent to Data Processing</h4>
        <RequestConsentArea>
          <RequestConsentTable>
            <tbody>
              <tr>
                <td style={{"paddingRight":"8em"}}>
                  <RequestConsentLabel>Agreement: Lorem Ipsum</RequestConsentLabel>
                </td>
                <td>
                  <RequestConsentButton onClick={this.consent}>Get</RequestConsentButton>
                </td>
              </tr>
            </tbody>
          </RequestConsentTable>
          <RequestConsentNextButton onClick={this.props.actions.requestConsentDemoComplete}>Next</RequestConsentNextButton>
        </RequestConsentArea>
      </RequestConsentWrap>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    uport: state.App.uport
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RequestConsent)
