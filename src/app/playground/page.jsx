/* eslint-disable max-len */
'use client'
import { get, push, ref, update } from 'firebase/database'
import html2canvas from 'html2canvas'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import '../styles/globals.css'
import { SubmitButton } from '../components/shared/SubmitButton'

import { database } from '../../firebase/firebase'
import Modal from '../components/modal'
import { Navbar } from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import { GlobalButton } from '../components/shared/GlobalButton'
//import { color } from 'html2canvas/dist/types/css/types/color'

const TicketPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 25px 45px;
  padding: 40px 0px;
  border: 1px solid aqua;
`

const TicketContainer = styled.div`
  width: 98%;
  height: 343px;
  border: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 980px) {
    flex-direction: column;
    align-items: center;
  }
`
const FormBg = styled.div`
  height: auto;
  width: auto;
  margin-right: 20px;
  align-items: center;
  border: 1.5px solid;
  border-image-source: linear-gradient(212.47deg, #bd00ff 0%, rgba(0, 0, 0, 0) 44.37%);

  border-image-slice: 1;
  border-radius: 10px;

  background: linear-gradient(212.47deg, rgba(189, 0, 255, 0.2) 0%, rgba(0, 0, 0, 0) 44.37%);
  box-shadow: 0px 18px 59.599998474121094px 0px #cc3cff1a inset;
`
const FormSection = styled.div`
  opacity: 1;
  width: 458px;
  height: 278px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 3vw 1.5vw 1vw 1.5vw;
  background: linear-gradient(
    180deg,
    rgba(156, 154, 255, 0.1) 0%,
    rgba(234, 173, 255, 0.084) 123.17%
  );

  border-radius: 10px;

  box-shadow: -1px 2px 9.800000190734863px 0px #ffffff40 inset;
`
const FormText = styled.p`
  border: 0px solid pink;
  margin: 20px 0px 5px 0px;
`

const Input = styled.input`
  background-color: #292929;
  height: 19px;
  padding: 10px;
  margin: 5px 0px 20px 0px;
  border-radius: 11px;
  border: 1.8px solid #e88eff33;
`

const TicketPreview = styled.div`
  background-color: black;
  width: 500px;
  border: 1px solid white;
  padding: 20px;
  margin: 10px;
  padding: 2vw 4vw;
  border-radius: 20px;
  min-height: 200px;
`
const ArrayHolder = styled.div`
  width: 100%;

  border: 1px solid white;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`
const ColorText = styled.p`
  border: 0px solid pink;
`
const ColorArray = styled.div`
  border: 0px solid pink;
  flex: 0.4;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const ClrButton = styled.span`
  height: 25px;
  width: 25px;
  margin: 1.5vw 1vw;
  cursor: pointer;
`

const MyTicketPage = () => {
  const colors = ['#206EA6', '#4C1077', '#BBD3D9', '#FECF29', '#14F195']
  // const { currentUser } = useContext(AuthContext)
  var currentUser = {
    name: 'uder1',
    mail: 'hey@gmail.com'
  }
  const [ticketInfo, setTicketInfo] = useState({
    name: '',
    teamName: '',
    email: '',
    bgcolor: '',
    ticketImage: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [existingTicketKey, setExistingTicketKey] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
      return
    }

    // Fetch existing ticket
    const ticketsRef = ref(database, `tickets/${currentUser.uid}`)
    get(ticketsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const tickets = snapshot.val()
        const lastTicketKey = Object.keys(tickets).pop()
        setTicketInfo({
          name: tickets[lastTicketKey].name,
          teamName: tickets[lastTicketKey].teamName,
          email: tickets[lastTicketKey].email,
          bgcolor: tickets[lastTicketKey].bgcolor,
          ticketImage: tickets[lastTicketKey].ticketImage
        })
        setExistingTicketKey(lastTicketKey)
        setShowModal(true)
      }
    })
  }, [currentUser, router])

  const handleChange = (e) => {
    setTicketInfo({ ...ticketInfo, [e.target.name]: e.target.value })
  }

  const generateTicket = () => {
    const ticketElement = document.getElementById('ticketPreview')
    html2canvas(ticketElement).then((canvas) => {
      const image = canvas.toDataURL('image/png')

      if (currentUser) {
        const ticketRef = ref(database, `tickets/${currentUser.uid}`)
        const updateRef = existingTicketKey
          ? ref(database, `tickets/${currentUser.uid}/${existingTicketKey}`)
          : push(ticketRef)
        update(updateRef, {
          ...ticketInfo,
          ticketImage: image
        }).then(() => {
          setTicketInfo({ ...ticketInfo, ticketImage: image })
          setShowModal(true)
          setEditMode(false)
        })
      }
    })
  }

  return (
    <>
      <Navbar />

      <TicketPage>
        <TicketContainer>
          <FormBg>
            <FormSection>
              <FormText>Your name:</FormText>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={ticketInfo.name}
                onChange={handleChange}
              />
              <FormText>Team name:</FormText>
              <Input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={ticketInfo.teamName}
                onChange={handleChange}
              />

              <></>
              <SubmitButton onClick={generateTicket}>
                {existingTicketKey ? 'Update Ticket' : 'Generate Ticket'}
              </SubmitButton>
            </FormSection>
          </FormBg>

          <TicketPreview
            id="ticketPreview"
            style={{ background: ticketInfo.bgcolor ? ticketInfo.bgcolor : '#04040D' }}
          >
            <h2>{ticketInfo.name || 'Your Name'}</h2>
            <p>{ticketInfo.teamName || 'Your Team Name'}</p>
            <p>{ticketInfo.email || 'Your Email'}</p>
          </TicketPreview>
        </TicketContainer>
        <ArrayHolder>
          <ColorText>choose color: </ColorText>
          <ColorArray>
            {colors.map((c) => (
              <ClrButton
                key={c}
                style={{ backgroundColor: c }}
                onClick={() => setTicketInfo({ ...ticketInfo, bgcolor: c })}
              />
            ))}
          </ColorArray>
        </ArrayHolder>

        <GlobalButton>Register for HackNITR</GlobalButton>
      </TicketPage>
    </>
  )
}
export default MyTicketPage
