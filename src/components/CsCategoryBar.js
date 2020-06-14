import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class CsCategoryBar extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      listArray: [],
    }

    this.listsRef = React.createRef()
  }

  getData = async (categoryParentId) => {
    const response = await fetch(
      `http://localhost:3002/cscategory/${categoryParentId}`
    )
    const json = await response.json()
    const cscategory = json.rows

    this.setState({
      data: cscategory,
    })
    

    return this.state.data
  }

  treeMenu = async (categoryParentId) => {
    let output = await this.getData(categoryParentId)

    if (output) {
      // this.state.listArray.push(`<ul class="cat-lists">`)
      for (let i = 0; i < output.length; i++) {
        this.state.listArray.push(
          `<ul class="cat-lists"><li ><a class="cat-list" href="${output[i]['linkUrl']}?categoryId=${output[i]['categoryId']}">${output[i]['categoryName']}</a></li></ul>`
        )
        await this.treeMenu(output[i]['categoryId'])
      }
      // this.state.listArray.push(`</ul>`)
      // console.log(this.state.listArray)
    }
    // console.log(output)
    return this.state.listArray
  }

  async componentDidMount() {
    await this.treeMenu(0)
    //console.log(await this.treeMenu(0));
    let listsData = this.state.listArray.join('')
    this.listsRef.current.innerHTML = listsData
  }

  render() {
    return (
      <div
        ref={this.listsRef}
        className="cat-container"
        onClick={() => localStorage.setItem('page', 1)}
      ></div>
    )
  }
}

export default withRouter(CsCategoryBar)
