import React, { Component } from 'react'
import axios from 'axios'
import {Tile} from  'powerbi-report-component'

export class Tiles extends Component {
    constructor(props){
        super(props)
        this.state={
            accessToken:"",
            embedUrl:"",
            embedId:"",
            dashboardId:"",
            style:{
                width:"100%",
                height:"500px"
            },
            error:""

        }
        this.getData()
    }
    
    getData=()=>{
        axios.get("http://localhost:5300/getEmbedToken").then((success)=>{
            console.log(success.data);
            this.setState({accessToken:success.data.accessToken,embedUrl:success.data.embedUrl,
                dashboardId:success.data.dashboardId,embedId:success.data.embedId})
        }).catch((error)=>{
            this.setState({error:"Error Occurred"})
        })
    }
    render() {
        return (
            <div className="mt-5 mr-5 ml-5">
                <h2 className="mb-4 text-center">
                    Power BI Tile in React Application
                </h2>
                <div className="card" style={{padding:"20px"}}>
                        {this.state.accessToken!==""&&this.state.embedUrl!==""&&this.state.embedId!==""? <Tile tokenType="Embed" 
                                accessToken={this.state.accessToken}
                                embedUrl={this.state.embedUrl}
                                embedId={this.state.embedId}
                                dashboardId={this.state.dashboardId}
                                style={this.state.style}/>:null}
                    </div>
            </div>
        )
    }
}

export default Tiles
