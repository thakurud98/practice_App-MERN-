import React from 'react'
import { Alert } from 'react-bootstrap'
// import { MdCheckCircle } from "react-icons/fa";
// var showEror = true;
// var showSuccess = true;

export function successPop (msg) { return  <Alert variant={"success"}> {msg}</Alert> }
export function errorPop (msg) { return <Alert variant={"danger"}> {msg}</Alert> }
