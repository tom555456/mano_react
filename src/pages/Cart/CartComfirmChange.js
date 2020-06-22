import React, { Fragment, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap"
import areaData from "../areaData"
import { withRouter } from "react-router-dom";



function CartComfirmChange(props) {

    const [member, setMember] = useState([])
    const [note, setNote] = useState("")
    const [isSame, setIsSame] = useState(true)


      //選擇地區時會自動改變
    const [indexstatus, setIndexstatus] = useState(0)

    const city = areaData.map((value,index) => {
      return(
        <option key={index}value={value.city} >{value.city}</option>
    )})

    const district = areaData.map((value,index) => {
      return(
        value.district.map((area,index)=>{
          return(
            <option key={index}value={area} >{area}</option>
          )
        })
      
    )})
    function areaChange(){
      var objS = document.getElementById("pid");
      setIndexstatus(objS.selectedIndex)
    }



    async function getData(id) {
      const request = new Request(`http://localhost:3002/order/member/${id}`, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      })
  
      const response = await fetch(request)
      const data = await response.json()

      setMember(data[0])
    }

      
      useEffect(() => {
        props.changeBackgroundColorLight()
        const member = JSON.parse(localStorage.getItem('member'))
        const id = member[0].id

        getData(id)

      }, [])

    
      async function updateMemberToSever(item) {
        const request = new Request("http://localhost:3002/membercenter/edit", {
          method: "PUT",
          body: JSON.stringify(item),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        })
    
        console.log("After JSON: ", JSON.stringify(item))
    
        const response = await fetch(request)
        const data = await response.json()
    
      }
      
      const handleEditedSave = (member) => {
        const newMember = member
        updateMemberToSever(newMember)
        setMember(newMember)
      }
  
    
    return(
        <>   
        <Container className="w-75">
            <div className="text-center">
                <h3>配送資訊</h3>
            </div>
            <Fragment>
            <div className="d-flex justify-content-between mt-5">
                <div className="form-group w-50">
                    <label htmlFor="example3">收件人姓名：</label>
                    <input type="text" id="example3" className="form-control form-control-sm" 
                           value={isSame ? member.memberName : ""}
                           onChange={(event) => setMember({
                               ...member,
                               memberName: event.target.value
                           })} />
                </div>
                <div className="form-group w-50 ml-5">
                    <label htmlFor="example3">收件人電話：</label>
                    <input type="text" id="example3" className="form-control form-control-sm"
                           value={isSame ? member.phone : ""}
                           onChange={(event) => setMember({
                               ...member,
                               phone: event.target.value
                           })}/>
                </div>
            </div>

            <label htmlFor="example3">收件地址：</label>
            <div className="d-flex align-items-center justify-content-between">
            <div className="form-group">
              <select id="pid" onChange={(event)=>{areaChange();
                    setMember({
                      ...member,
                      paymentCity: event.target.value,
                      paymentDistrict: "請選擇區域",
                    })
                  }}>
                  {city}
                  </select>
                  <select className="ml-4" value={isSame ? member.paymentDistrict : ""} onChange={(event)=>{
                    setMember({
                      ...member,
                      paymentDistrict: event.target.value,
                    })
                  }}>
                  {district[indexstatus]}
                  </select>
              </div>
              <div className="form-group w-75 ml-3">
                {/* <label htmlFor="example3">收件地址：</label> */}
                <input type="text" id="example3" className="form-control form-control-sm"
                       value={isSame ? member.shipAddress : ""}
                       onChange={(event) => setMember({
                            ...member,
                            shipAddress: event.target.value
                        })}/>
              </div>
            </div>

            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultChecked" onClick={() => setIsSame(!isSame)} checked={isSame ? true : false} />
                <label class="custom-control-label" for="defaultChecked">同上一次</label>
            </div>

            <div className="form-group">
                <label htmlFor="example3">備註：</label>
                <input type="text" id="example3" className="form-control form-control-sm"
                        onChange={(event) => setNote(event.target.value)} />
            </div>

            </Fragment>
            <div className="d-flex justify-content-center pt-3 pb-3">
                <Button className="mt-2 mb-2" variant="outline-primary"
                        onClick={() => {
                            handleEditedSave(member);
                            const memberArray = []
                            memberArray.push(member)
                            console.log(memberArray)
                            localStorage.setItem("member", JSON.stringify(memberArray))
                            localStorage.setItem("note", note)
                            const path = props.history.location.pathname
                            if(path.includes("/mall")) props.history.push("/mall/cart/comfirm")
                            else props.history.push("/life/cart/comfirm")

                        }}>確認配送資訊</Button>
            </div>
            </Container>
        </>
    )
    
}


export default withRouter(CartComfirmChange);