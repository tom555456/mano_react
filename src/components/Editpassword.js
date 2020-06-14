import React from "react"
import { Form } from "react-bootstrap"

function Editpassword(props) {
  const { member, setMember,ischangepwd, setIschangepwd } = props
  return (
    <>
      <form style={{"width":"200px"}}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>輸入舊密碼</Form.Label>
          <Form.Control
            id="oldpassword"
            type="password"
            value={member.password}
            onChange={(event) => {
              setMember({
                ...member,
                password: event.target.value,
              })
            }}
          />
          <Form.Label>輸入新密碼</Form.Label>
          <Form.Control
            id="oldpassword"
            type="password"
            value={member.password}
            onChange={(event) => {
              setMember({
                ...member,
                password: event.target.value,
              })
            }}
          />
          <Form.Label>再次輸入新密碼</Form.Label>
          <Form.Control
            id="oldpassword"
            type="password"
            value={member.password}
            onChange={(event) => {
              setMember({
                ...member,
                password: event.target.value,
              })
            }}
          />
          <button className="btn btn-primary" onClick={()=>{setIschangepwd(!ischangepwd)}}>Submit</button>
        </Form.Group>
      </form>
    </>
  )
}
export default Editpassword
